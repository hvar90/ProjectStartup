from django.utils.translation	      import ugettext as _
from rest_framework				      import status
from rest_framework.response		  import Response
from datetime					      import datetime
from rest_framework.views		      import APIView
from django.contrib.auth			  import authenticate, login as auth_login , logout as auth_logout
from rest_framework.permissions	      import IsAuthenticated
from board.tools					  import make_post_descriptions
from django.dispatch.dispatcher	      import receiver
from django.db.models.signals	      import pre_delete
from django.db.models			      import Q
from django.contrib.sites.models	  import Site
from board.models				      import Post,Section,Thread,SectionGroup
from django.conf					  import settings
from django.contrib.auth.models	      import User
from user_profile.models			  import *
from resources					      import *
from .permissions				      import *
from core		                      import gcm_send  



class ValidationError(Exception):
	"""
		El error es lanzado cuando el contenido creado por usuario es 
		invalidoThe error raised when content created by user is invalid.
		NOTA: django.forms.ValidationError no se puede usar aqui por que
		nosotros necesitamos serializar la excepcion.
	"""
	pass

def modify_profile(request,pk): 

	FILE_ALLOWED_TYPES = ["image/jpeg","image/png"] 
	
	userProfile=UserProfile.objects.get(id=pk)	
	form =  UserProfileForm( request.DATA,request.FILES, instance=userProfile)

	if not form.is_valid():
		raise ValidationError(dict(form.errors))	
	else:		  
		if request.FILES:
			f= request.FILES["profile_picture"]   
			if  not f.content_type in FILE_ALLOWED_TYPES:
				raise ValidationError(_("Invalid file type"))  
			delete_photoUserProfile(pk)  
		form.save() 
		
	return
	
def delete_photoUserProfile(pk):   
	
	if UserProfile.objects.get(id=pk).profile_picture : 
		UserProfile.objects.get(id=pk).profile_picture.delete() 
	return  
	
def create_user(request):
	
	form = UserForm(request.POST)
	username = form['username'].value() 
	password = form['password'].value()  
	repassword = form['repassword'].value() 
	email =  form['email'].value()   
	if not settings.OPEN_REGISTER:  
			raise ValidationError(
			_("Registration is closed")
		)  
	elif not password == repassword:				
		raise ValidationError(
			_("The verification of the password failure, type the password again")
		)   
	elif not form.is_valid():
		raise ValidationError(dict(form.errors))	
	else:	  
		 user = User.objects.create_user(username, email, password)  
		 user.profile.ip= request.META.get("HTTP_X_FORWARDED_FOR", "127.0.0.1").split(", ")[0]
		 user.profile.save()
		 userAut = authenticate(username=username, password=password)   
		 auth_login(request, userAut)   
	return
	
def login_user(request):	
	
	username = request.POST.get("username")
	password = request.POST.get("password")  
	user = authenticate(username=username, password=password)	 
	if user:
		auth_login(request, user)   
	else:
		raise ValidationError(
			_("Invalid username or password")
		)		  
	return
	
def change_pass_or_email(request,pk):  
	
	form = ChangePassForm(request.POST)
	if request.user.is_active:  
		if request.user.check_password(form['password_current'].value()): 
			if form['new_password'].value() and form['confirm_password'].value():
				if (form['new_password'].value() == form['confirm_password'].value()) :			  
					request.user.set_password(form['new_password'].value())
					request.user.save()					   
				else:
					raise ValidationError(
					_("Confirmation for the new password does not match")
				)	 
			if form['email'].value(): User.objects.filter(pk=pk).update(email=form['email'].value())				
		else:
			raise ValidationError(
				_("Invalid password")
			)
	else:
		raise ValidationError(
			_("You have not activated your account")
		)
		
def del_account(request,pk):
	
	if request.user.username == request.DATA.get("username") and request.user.check_password(request.DATA.get("password")):
		User.objects.get(pk=pk).delete()	
		auth_logout(request)		
	else:
		raise ValidationError(
				_("Invalid username or password")
			)   

@receiver(pre_delete, sender=UserProfile)
def user_delete(sender, instance, *args, **kwargs):
	
	for p in Post.objects.filter(user_profile=instance.id):
		p.remove()  
	Section.objects.filter(owner=instance.id).delete()

	
def logout_user(request):	 
	auth_logout(request)
	
def remove_invitation(request,pk):  
	userFrom = UserProfile.objects.get(id=request.DATA.get("iduser"))
	userTo = UserProfile.objects.get(id=pk)
	userFrom.contact_invitation.remove(userTo)

class UserCreateView(APIView):
	
	def post(self, request, *args, **kwargs):
		"""Revisa errores."""	  
		try:
			create_user(request)
		except ValidationError as e:
			return Response({"detail": e.message}, status=status.HTTP_400_BAD_REQUEST)	 
	   
		return Response(status.HTTP_201_CREATED)
		
class ProfileListView(APIView):
	permission_classes = (IsOwnerPk,)
	def get(self, request, *args, **kwargs):
		"""Revisa errores."""
					  
	   
		if 'getcontactinvitation' in request.GET:   
		
				pk=request.GET.get("pk")
				try:		   
					self.check_object_permissions(request,pk)   
					invitations = list(UserProfile.objects.filter(contact_invitation=pk).values('id','user__username'))						  
				except ValidationError as e:
					return Response({"detail": e.message},status.HTTP_400_BAD_REQUEST, )		
	
				invitations= list(UserProfile.objects.filter(contact_invitation=pk).values('id','user__username'))		
				
				return Response(invitations)
		if 'getmembers' in request.GET:			
	
				members= list(UserProfile.objects.all().values('user__username','profile_picture'))	   
				
				return Response(members)

	
class ProfileDetailView(APIView):
	
	permission_classes = (IsAuthenticated,IsOwnerPk) 
	
	def get(self, request,pk, *args, **kwargs):
		"""Revisa errores."""
		try:			
		   self.check_object_permissions(request,pk)	
		   serializer = ProfileResource(request.user.profile)		 
		except ValidationError as e:
			return Response({"detail": e.message},status.HTTP_400_BAD_REQUEST, )				   
	   
		return Response(serializer.data)   
	
	def put(self, request,pk, *args, **kwargs):
		"""Revisa errores."""
		try:
	
			#self.check_object_permissions(request,pk)   sin terminar
			if 'addBlackList' in request.GET:	  
				userProfile=UserProfile.objects.get(id=request.DATA.get("idfrom"))			 
				if  not UserProfile.blacklist.through.objects.filter(to_userprofile=userProfile , from_userprofile=UserProfile.objects.get(id=pk)).exists():
					UserProfile.objects.get(id=pk).blacklist.add(userProfile)				  
				else:			   
				   raise ValidationError(_("The user is already in blacklist"))
			elif 'removeBlacklist' in request.GET:	
				 
				  UserProfile.objects.get(id=pk).blacklist.remove(UserProfile.objects.get(id=request.DATA.get("iduser")))
		
				  
			elif 'sendinvitation' in request.GET:		 

				userProfile=UserProfile.objects.get(id=request.DATA.get("idProfile"))
				if not UserProfile.contact_invitation.through.objects.filter(to_userprofile=userProfile , from_userprofile=UserProfile.objects.get(id=pk)).exists() and not UserProfile.contact_invitation.through.objects.filter(to_userprofile=UserProfile.objects.get(id=pk), from_userprofile=userProfile).exists():
					UserProfile.objects.get(id=pk).contact_invitation.add(userProfile) 
					if userProfile.id_cel != '':
						gcm_send.send(userProfile.user.username,'new invitation',userProfile.id_cel,{"username": userProfile.user.username,"from": UserProfile.objects.get(id=pk).user.username})						
				else:			   
				   raise ValidationError(_("Already has been sent a contact request to this person"))
						
			elif 'updateProfile' in request.GET:	
					
				modify_profile(request,pk)
				
			elif 'removeFile' in request.GET:
				
				delete_photoUserProfile(request,pk)
				
			elif 'acceptContact' in request.GET:
				 #este usuario envio la invitacion
				 p1 = UserProfile.objects.get(id=request.DATA.get("iduser"))	
				 #este usuario es el q acepta la invitacion
				 p2 = UserProfile.objects.get(id=pk)	
				 name_id_section = request.DATA.get("iduser") + pk		
				 g = SectionGroup.objects.get(pk=2) 
				 
				 s = Section(slug=name_id_section,name=name_id_section,owner=p2,type_section=6,group=g )
				 s.save()			
				 f1 =  Friendship(person1=p1, person2=p2,
						section_chat=s, accepted_invitation=True)
				 f2 =  Friendship(person1=p2, person2=p1,
						section_chat=s)
				 f1.save()	 
				 f2.save()	
				 
				 s1 = GroupSubscriptions(person=p1, section=s)
				 s1.save()  
				 s2 = GroupSubscriptions(person=p2, section=s)
				 s2.save()  
				 if p1.id_cel != '':	
					gcm_send.send(p1.user.username,'accept invitation',p1.id_cel,{"username": p1.user.username,"from": p2.user.username})	 			 					
				 remove_invitation(request,pk)
				
			elif 'denyinvitation' in request.GET:
		
				  remove_invitation(request,pk)  
				  
			elif 'subscribe' in request.GET:		
				 
				  section=Section.objects.get(pk= request.DATA.get("idSection"))
				  userProfile=UserProfile.objects.get(id=pk)
				  s = GroupSubscriptions(person=userProfile, section=section)
				  s.save()  
				  
			elif 'unsubscribe' in request.GET:		
				 
				  section=Section.objects.get(pk= request.DATA.get("idSection"))
				  userProfile=UserProfile.objects.get(id=pk)
				  GroupSubscriptions.objects.get(person=userProfile,
											   section=section).delete()
											   
			elif 'markReadNewPosts' in request.GET:		
				 
				  
				  GroupSubscriptions.objects.filter(section__id=request.DATA.get("idSection"),person__id=pk).update(isNewPublication=False)  
				   
			elif 'markReadNewFriends' in request.GET:				 
				  
				  Friendship.objects.filter(person1__id=pk).update(accepted_invitation=False)  
				   
			elif 'removecontact' in request.GET:		
				
				 Friendship.objects.get(person1__id=pk,person2__id=request.DATA.get("iduser")).section_chat.delete()
				 
		except ValidationError as e:
			return Response({"detail": e.message}, status.HTTP_400_BAD_REQUEST)		  
	   
		return Response(status.HTTP_204_NO_CONTENT)
		
		
class ProfilePostView(APIView):
	permission_classes = (IsAuthenticated,IsOwnerUsername)  
	def get(self, request,username, *args, **kwargs):   
		try:		
		   if 'getposts' in request.GET:				
			   user_posts= Post.objects.filter(user_profile=User.objects.get(username=username).profile,is_anonymous=False).order_by('-date')
			   description_posts= list(make_post_descriptions(user_posts))   
		   elif 'getpostanonymous' in request.GET:  
			   self.check_object_permissions(request,username)			
			   user_posts= Post.objects.filter(user_profile=request.user.profile,is_anonymous=True).order_by('-date')
			   description_posts= list(make_post_descriptions(user_posts))   
		except ValidationError as e:
			return Response( {"detail": e.message}, status.HTTP_400_BAD_REQUEST)	   
		return Response(description_posts)	
	
		   
class UserLogoutView(APIView):
	permission_classes = (IsAuthenticated,)
	def post(self, request, *args, **kwargs):
		"""Revisa errores."""
		try:
			 auth_logout(request)
		except ValidationError as e:
			return Response( {"detail": e.message}, status.HTTP_400_BAD_REQUEST)		   
	   
		return Response(status.HTTP_201_CREATED)	
		
class UserLoginView(APIView):
	
	def post(self, request, *args, **kwargs):
		"""Revisa errores."""
		try:
			 login_user(request)
		except ValidationError as e:
			return Response({"detail": e.message}, status.HTTP_400_BAD_REQUEST,)		   
	   
		return Response(status.HTTP_201_CREATED)
		
class UserDetailView(APIView):
	permission_classes = (IsOwnerPk,)
	def post(self, request,pk, *args, **kwargs):
		"""Revisa errores."""
		try:				
			 self.check_object_permissions(request,pk)	
			 change_pass_or_email(request,pk)
		except ValidationError as e:
			return Response({"detail": e.message}, status.HTTP_400_BAD_REQUEST,)		   
	   
		return Response(status.HTTP_201_CREATED)
		
	def delete(self, request,pk, *args, **kwargs):
		"""Revisa errores."""   
		try:
			 self.check_object_permissions(request,pk)  
			 del_account(request,pk)
		except ValidationError as e:
			return Response({"detail": e.message}, status.HTTP_400_BAD_REQUEST,)		   
	   
		return Response(status.HTTP_204_NO_CONTENT) 
		
class SearchUsersView(APIView):
	def get(self, request, *args, **kwargs):
		q =  request.GET.get("q")	
		results = list(UserProfile.objects.filter(Q(user__username__icontains=q) | Q(user__email__icontains=q) | Q(user__first_name__icontains=q) | Q(user__last_name__icontains=q)).values('user__username','profile_picture'))		 
		return Response(results)

		
		
