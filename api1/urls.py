from django.conf.urls import url, include, patterns


urlpatterns = patterns("", url(r"^$", "api"),
    url(r"^", include("api1.board.urls")),
    url(r"^", include("api1.user_profile.urls")),
    url(r"^", include("api1.message.urls")),
 
)

