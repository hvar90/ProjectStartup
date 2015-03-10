from django.conf.urls      import  patterns,url


urlpatterns = patterns("user_profile.views",
    url(r"^user/userprofile/$", "edit_profile"),
    url(r"^user/contacts/$", "contacts"),
    url(r"^user/account/$", "account"),
    url(r"^user/activity/$", "activity"),
    url(r"^user/contactsinvitation/$", "contacts_invitation"),
    url(r"^user/(?P<username>\w+)/$", "user_menu"),  
    url(r"^searchmembers/$", "search_members"),
)

