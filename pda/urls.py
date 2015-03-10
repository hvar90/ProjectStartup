from django.conf.urls     import include, patterns,url

urlpatterns = patterns("pda.views",
    (r"^$", "index"),
    (r"^user/edit$", "edit_user"),
    (r"^user/friends$", "friends_user"),
    (r"^user/groups$", "groups_user"),
    (r"^searchmembers/$", "list_members"),
    (r"^editgroup/(?P<id_section>\d+)$", "edit_section"),
    (r"^user/(?P<username>\w+)/$", "user"),
    (r"^(?P<section_slug>\w+)/$", "section", {"page": 1}),
    (r"^(?P<section_slug>\w+)/page(?P<page>\d+)$", "section"),
  
)
