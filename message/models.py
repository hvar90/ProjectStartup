from django.db                           import models
from django                              import forms
from django.utils.translation            import ugettext_lazy as _
from board.dmark                         import DMark
from datetime						     import datetime
   
def get_utc_now():
  return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
   
class MessageManager(models.Manager):    
    def search_msg_sent_user(self,user):				
	    return Message_send.objects.filter(fromThe=user).order_by('-pub_date')
    def search_msg_received_user(self,user):				
	    return Message_receive.objects.filter(to=user).order_by('-pub_date')    
	
        
class Message(models.Model): 

    msg = models.TextField(_("Message"),  max_length=1000)
    msg_html = models.TextField(_("Message html"))
    pub_date = models.DateTimeField(default=get_utc_now)
    objects = MessageManager()
  
    class Meta:
		abstract = True        

    def __unicode__(self):
        return self.msg
        
   
class Message_send(Message):
   
    fromThe = models.ForeignKey("user_profile.UserProfile", verbose_name=_("From"),related_name='sender_fromThe') 
    to = models.ForeignKey("user_profile.UserProfile", verbose_name=_("To the user"),related_name='sender_to')    
 
    class Meta:
        verbose_name = _("Message send")
        verbose_name_plural = _("Messages send")

    def save(self):
        self.msg_html= DMark().convert(self.msg).encode("utf-8")
        super(Message, self).save()   

        
class Message_receive(Message):
  
    fromThe = models.ForeignKey("user_profile.UserProfile", verbose_name=_("From"),related_name='recipient_fromThe')
    to = models.ForeignKey("user_profile.UserProfile", verbose_name=_("To the user"),related_name='recipient_to')
    msg_read = models.BooleanField(default=False)   
  
    class Meta:
        verbose_name = _("Message receive")
        verbose_name_plural = _("Messages receive")

    def save(self):
        self.msg_html= DMark().convert(self.msg).encode("utf-8")
        super(Message, self).save()      

        
class MessageSendForm(forms.ModelForm):
    to_user = forms.CharField(label= _("To the user")) 
 
    class Meta:
        model = Message_send
        fields = ['msg', 'to_user']

class MessageReceiveForm(forms.ModelForm):
    to_user = forms.CharField(label= _("To the user")) 
 
    class Meta:
        model = Message_receive
        fields = ['msg', 'to_user']
