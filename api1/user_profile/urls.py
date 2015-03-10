from django.conf.urls                import patterns,url

from .views import *

urlpatterns = patterns("api1.user_profile.views",    
  
    url(r"^user/$",
        UserCreateView.as_view()),
    url(r"^user/login$",
        UserLoginView.as_view()), 
    url(r"^user/logout$",
        UserLogoutView.as_view()), 
    url(r"^user/profile/$",
        ProfileListView.as_view()), 
    url(r"^user/profile/(?P<pk>\d+)/$",
        ProfileDetailView.as_view()),
    url(r"^user/profile/(?P<username>\w+)/posts/$",
        ProfilePostView.as_view()),         
    url(r"^user/(?P<pk>\d+)/$", 
        UserDetailView.as_view()), 
    url(r"^users/search/$",
        SearchUsersView.as_view()),  
)

