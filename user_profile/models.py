from django							    import forms
from django.contrib.auth.models		    import User
from django.db						    import models
from django.utils.translation			import ugettext_lazy as _
from django.db.models.signals			import post_save
from random							    import randint
from board		                        import fields,tools   
from message.models				        import Message_receive


def get_file_path(base):
	"""Construye ruta para almacenar archivos estaticos. Usado en la clase File"""
	def closure(instance, filename):
		return "{base}/{timestamp}{salt}.{ext}".format(
			base=base, timestamp=tools.timestamp_now(),
			salt=randint(10, 99), ext="jpg"
		)
	return closure

class UserProfile(models.Model):
	"""Usuario (moderador etc.)."""
	user = models.OneToOneField(User, related_name='profile', blank=False)	
	birthdate = models.DateField(_("Date of birth"), null=True, blank=True)
	profile_picture = models.FileField(_("Enter or change the current photo"), upload_to=get_file_path("profile_pictures"), blank=True)
	country = models.CharField(_("Country"), max_length=255,  default='', blank=True)	
	phrase = models.CharField(_("Phrase which describes you"), max_length=255, default='', blank=True)
	id_cel = models.CharField(_("Id of the celphone"), max_length=255, default='', blank=True) 
	is_mod = models.BooleanField(default=False)   
	ip =  models.IPAddressField(_("IP"),null=True, blank=True)
	sections = models.ManyToManyField("board.Section",
		verbose_name=_("User owned sections"), blank=True)
	blacklist = models.ManyToManyField("self", symmetrical = False, related_name='blacklist_user',
		verbose_name=_("Blacklist"), blank=True) 	
	contacts = models.ManyToManyField("self", related_name='contacts_user',
	    verbose_name=_("Contacts"), blank=True,symmetrical = False,  through='Friendship')	
	suscriptions = models.ManyToManyField("board.Section", related_name='suscriptions_user',
	    verbose_name=_("Suscriptions"), blank=True, through='GroupSubscriptions')	
	contact_invitation = models.ManyToManyField("self", symmetrical = False, related_name='contact_invitation_user', 
		verbose_name=_("Contact invitation"), blank=True,null=True)		   

	class Meta:
		verbose_name = _("User profile")
		verbose_name_plural = _("User profiles")

	def __unicode__(self):	   
		return unicode(self.user)
		
	def is_friend(self, user):
		"""verifica si el usuario es un contacto"""
		return self.__class__.contacts.through.objects.filter(person1=self , person2=user).exists()
		
	def is_owner_post(self, id_post):
		"""verifica si el usuario es el propietario de un post"""
		return self.post_set.filter(id=id_post).exists() 	
		
	def is_subscribed(self, idSection):
		"""verifica si el usuario esta suscrito"""
		return self.__class__.suscriptions.through.objects.filter(person=self , section=idSection).exists()
		
	def is_invited(self, id_profile):
		"""verifica si el usuario esta suscrito"""
		return self.__class__.contact_invitation.through.objects.filter(to_userprofile=self.__class__.objects.get(id=id_profile) , from_userprofile=self).exists()
		
	def is_notification_new_post(self, idSection):
		"""verifica si hay nueva publicacion en un grupo"""
		return GroupSubscriptions.objects.filter(person=self , section=idSection , isNewPublication=True).exists()
		
	def groups_with_new_post(self):
		"""verifica grupos con nuevas publicaciones"""
		return GroupSubscriptions.objects.filter(person=self , isNewPublication=True)	
		
	def news_accepted_invitation(self):
		"""verifica grupos con nuevas publicaciones"""
		return Friendship.objects.filter(person1=self , accepted_invitation=True)	
		
	def get_section_chat(self, idFriend):
		"""verifica si hay nueva publicacion en un grupo"""
		return Friendship.objects.get(person1=self , person2__id=idFriend ).section_chat.slug
		
	def unread_messages(self):
		"""devuelve los mensajes sin leer """
		return Message_receive.objects.filter(to=self , msg_read=False).count()
		
	def invitations(self):
		"""devuelve las invitaciones que tiene el usuario"""
		return self.__class__.contact_invitation.through.objects.filter(to_userprofile = self).count()	   
	
	def moderates(self, section_slug):
		"""Boolean value of user moderation rights of section_slug."""
		return self.user.is_superuser or section_slug in self.modded()
		
"""new_message es True si la persona uno ha enviado un mensaje a la persona 2"""
class Friendship(models.Model):
    person1 = models.ForeignKey(UserProfile, related_name='person1')
    person2 = models.ForeignKey(UserProfile, related_name='person2')
    section_chat = models.ForeignKey("board.Section", blank=True,null=True)    
    accepted_invitation = models.BooleanField(default=False)
    
class GroupSubscriptions(models.Model):
    person = models.ForeignKey(UserProfile)
    section = models.ForeignKey("board.Section", blank=True,null=True)
    isNewPublication = models.BooleanField(default=False)
		
def create_user_profile(sender, instance, created, **kwargs):
	"""Crear un profile por cada usuario creado"""
	if created:
		profile, created = UserProfile.objects.get_or_create(user=instance)

post_save.connect(create_user_profile, sender=User)  
	
class UserProfileForm(forms.ModelForm):   
	
	birthdate = forms.DateField(label= _("Date of birth"),required=False, input_formats=('%d-%m-%Y','%Y-%m-%d'))   
	class Meta:
		model = UserProfile
		exclude = ['sections','user','ip','suscriptions','contacts']


class UserForm(forms.ModelForm):
	   
	#captcha = fields.ReCaptchaField(required=False)  
	repassword = forms.CharField()
	   
	class Meta:
		model = User
		fields = ['username','email','password']
	 
class ChangePassForm(forms.Form):
	   
	password_current = forms.CharField(label= _("Current password"),)
	email = forms.EmailField(label= _("Email"),required=False)
	new_password = forms.CharField(label= _("New password"),required=False)
	confirm_password = forms.CharField(label= _("Confirm password"),required=False)  
	
   
		

		


