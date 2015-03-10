from django.contrib.auth.models	    import User
from django.core.paginator			import Paginator
from django.utils.translation		import ugettext as _
from rest_framework				    import status
from rest_framework.response		import Response
from rest_framework.views			import APIView
from message.models                 import Message_receive, Message_send
from rest_framework.permissions	    import IsAuthenticated
from .resources					    import *
from .permissions					import *
from user_profile.models            import UserProfile


class ValidationError(Exception):
	"""
		El error es lanzado cuando el contenido creado por usuario es 
		invalidoThe error raised when content created by user is invalid.
		NOTA: django.forms.ValidationError no se puede usar aqui por que
		nosotros necesitamos serializar la excepcion.
	"""
	pass
	
def create_msg(request, view):
	
	formsendmsg = MessageSendResource.Meta.form(request.POST)
	formreceivemsg = MessageReceiveResource.Meta.form(request.POST)
	to = request.POST.get("to_user")
	msg = request.POST.get("msg")	
	
	if not User.objects.filter(username=to).exists():
		raise ValidationError(
			_("Username does not exist")
		)	
	elif UserProfile.blacklist.through.objects.filter(to_userprofile=request.user.profile, from_userprofile=User.objects.filter(username=to)).exists():
		raise ValidationError(
			_("You can not send messages to this user because you are blacklisted")
		)		
	elif not formsendmsg.is_valid():
		raise ValidationError(dict(form.errors))
	else:		
		 recipient_sent=formsendmsg.save(commit= False)
		 recipient_received=formreceivemsg.save(commit= False)		
		 
		 recipient_sent.fromThe = recipient_received.fromThe  = request.user.profile
		 recipient_sent.to = recipient_received.to = User.objects.get(username=to).profile
		 
		 recipient_sent.save()
		 recipient_received.save()
	
		 
	return
		
class MessageCreateView(APIView):
	permission_classes = (IsAuthenticated,)
	def post(self, request, *args, **kwargs):
		"""Revisa errores."""	
		try:
			create_msg(request,self)
		
		except ValidationError as e:
			return Response({"detail": e.message}, status.HTTP_400_BAD_REQUEST)		 
		return Response(status.HTTP_201_CREATED)

	
		
class MessageProfileView(APIView):
	permission_classes = (IsAuthenticated,IsOwnerPk)
	def get(self, request, pk, *args, **kwargs):		
		self.check_object_permissions(request,pk)	
		
		if 'msgsentuser' in request.GET:			
			msgs=list(Message_send.objects.filter(fromThe=pk).order_by('-pub_date').values("fromThe", "to", "to__profile_picture", "to__user__username", "msg_html", "pub_date", "id"))

		elif 'msgreceiveduser'  in request.GET:		
			msgs=list(Message_receive.objects.filter(to=pk).order_by('-pub_date').values("fromThe", "fromThe__profile_picture", "fromThe__user__username", "to", "msg_html", "pub_date", "id", "msg_read"))
					
		p = Paginator(msgs, 10)		
		pagemsg = p.page(request.GET.get("page"))	
		msgs= pagemsg.object_list

		for d in msgs:
			for key, value in d.iteritems():
				if key == "pub_date":					
					d[key] = str(value)

		return Response({'msgs': msgs, 'num_page':  p.num_pages} , status.HTTP_200_OK)

	def delete(self, request,pk, *args, **kwargs):
		"""Revisa errores."""
		try:
			self.check_object_permissions(request,pk)	
			if 'clearsendall' in request.GET:			
				Message_send.objects.filter(fromThe=UserProfile.objects.get(id=pk)).delete()		
			elif 'clearreceiveall' in request.GET:
				Message_receive.objects.filter(to=UserProfile.objects.get(id=pk)).delete()					   
		except ValidationError as e:
			raise Response({"detail": e.message}, status.HTTP_400_BAD_REQUEST )		 
		return Response(status=status.HTTP_204_NO_CONTENT) 

		

		
class MsgDetailView(APIView):
	permission_classes = (IsAuthenticated,IsOwnerPk)
	def put(self, request,pkmsg,pkprofile, *args, **kwargs):
		"""Revisa errores."""
		try:		
			self.check_object_permissions(request,pkprofile)			
			self.check_object_permissions(request, Message_receive.objects.get(id=pkmsg).to.id)
			Message_receive.objects.filter(id=pkmsg).update(msg_read= bool(request.DATA.get("value")))					   
		except ValidationError as e:
			raise Response({"detail": e.message}, status.HTTP_400_BAD_REQUEST )		   
	   
		return Response()
		
	def delete(self, request,pkmsg,pkprofile, *args, **kwargs):
		"""Revisa errores."""
		try:
			self.check_object_permissions(request,pkprofile)	
			if 'deletemsgsend' in request.GET:
		
				msg =  MessageSendResource.Meta.model.objects.get(id=pkmsg)
				self.check_object_permissions(request, msg.fromThe.id  )
				msg.delete()	
							   	
			elif 'deletemsgreceive' in request.GET:	
			
				msg =  MessageReceiveResource.Meta.model.objects.get(id=pkmsg)
				self.check_object_permissions(request, msg.to.id  )
				msg.delete()	
				
				
						   
		except ValidationError as e:
			raise Response({"detail": e.message}, status.HTTP_400_BAD_REQUEST )		 
		return Response(status=status.HTTP_204_NO_CONTENT)

