from django.conf.urls         import  patterns,url
from .views import *



urlpatterns = patterns("api1.message.views",
    
    url(r"^message/$",
        MessageCreateView.as_view()),
    url(r"^message/profile/(?P<pk>\d+)/$",
        MessageProfileView.as_view()),
    #url(r"^message/msgsentuser/$",
        #SentMessageView.as_view()),
    #url(r"^message/msgreceiveduser/$",
        #ReceivedMessageView.as_view()),
	url(r"^message/(?P<pkmsg>\d+)/profile/(?P<pkprofile>\d+)/$",
		MsgDetailView.as_view()),  
    #url(r"^message/changestateread/$",
        #ChangeStateMsgReadView.as_view()), 
     
    #url(r"^message/deletemsgreceive/$",
        #MessageReceiveDeleteView.as_view()),  
    #url(r"^message/deletemsgsend/$",
        #MessageSendDeleteView.as_view()),     
    #url(r"^message/clearsendall/$",
        #MessageSendDeleteAllView.as_view()),
    #url(r"^message/clearreceiveall/$",
        #MessageReceiveDeleteAllView.as_view()),    
	
      
)

