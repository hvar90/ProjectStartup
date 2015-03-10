from django.conf.urls          import  patterns,url


urlpatterns = patterns("message.views",

    url(r"^messages/$", "messages"),   
    url(r"^messages/send$", "message_send"),
   
)
