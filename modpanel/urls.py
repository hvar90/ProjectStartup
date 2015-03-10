from django.conf.urls import patterns,url

urlpatterns = patterns("modpanel.views",
    url(r"^$", "index"),
    url(r"^wordfilter$", "wordfilter"),
    url(r"^banlist$", "banlist"),
    #(r"^(?P<section>\w+)/$", "section", {"page": 1}),
    #(r"^(?P<section>\w+)/page(?P<page>\d+)$", "section"),
    #(r"^(?P<section>\w+)/(?P<op_post>\d+)$", "thread"),
)
