from django.conf.urls          import patterns,url
from rest_framework.generics   import ListCreateAPIView, RetrieveAPIView

from .resources                import *
from .views                    import *

urlpatterns = patterns("api1.board.views", 

    url(r"^setting/$", SettingRootView.as_view() ),
    url(r"^setting/(?P<key>[\w\d]+)$", SettingView.as_view()),

    url(r"^feed/$", FeedRootView.as_view()),
    url(r"^feed/(?P<key>[\d]+)$", FeedView.as_view()),

    url(r"^hidden/$", HideRootView.as_view()),
    url(r"^hidden/(?P<key>[\d]+)?$", HideView.as_view()),   

    url(r"^thread/$",
        ListCreateAPIView.as_view(serializer_class=ThreadResource)),
    url(r"^thread/(?P<section__slug>\w+)/$",
        ListCreateAPIView.as_view(serializer_class=ThreadResource)),
    url(r"^thread/(?P<id>\d+)$",
        ThreadInstanceView.as_view()),
    url(r"^thread/(?P<section__slug>\w+)/(?P<id>\d+)$",
        ThreadInstanceView.as_view()),

    url(r"^post/(?P<id>\d+)$",
        PostInstanceView.as_view()),
    url(r"^post/(?P<thread__section__slug>\w+)/(?P<pid>\d+)$",
        PostInstanceView.as_view()),
    url(r"^post/$",
        PostListOrCreateView.as_view()),
    url(r"^post/(?P<thread__section__slug>\w+)/$",
        PostListOrCreateView.as_view()),
    url(r"^post/(?P<thread__section__slug>\w+)/first/$",
        PostListOrCreateView.as_view(),
        {"is_op_post": True}),
    #url(r"^section/$",
        #ListCreateAPIView.as_view(serializer_class=SectionResource)),
    url(r"^section/$",
        SectionCreateDeleteView.as_view()),  
    url(r"^section/(?P<id>\d+)$",
        SectionDetailView.as_view()),      
    url(r"^section/search/(?P<group>[-A-Za-z0-9_ ]+)$",
        SearchSectionView.as_view()),     
    url(r"^section/user/(?P<idUsername>\w+)/$", 
        ProfileSectionView.as_view()),   
    url(r"^section/(?P<id>\d+)$",
        RetrieveAPIView.as_view(serializer_class=SectionResource)),
    url(r"^section/(?P<slug>\w+)",
        RetrieveAPIView.as_view(serializer_class=SectionResource)),
    url(r"^sectiongroup/",
        ListCreateAPIView.as_view(serializer_class=SectionGroupResource)),
    url(r"^sectiongroup/(?P<id>\d+)",
        RetrieveAPIView.as_view(serializer_class=SectionGroupResource)),       

    url(r"^file/$",
        ListCreateAPIView.as_view(serializer_class=FileResource)),
    url(r"^file/(?P<id>\d+)$",
        FileInstanceView.as_view()),
    url(r"^file/random_image/(?P<count>\d{1,2})",
        RandomImageView.as_view()),

    url(r"^filetype/(?P<id>\d+)$",
        RetrieveAPIView.as_view(serializer_class=FileTypeResource)),
    url(r"^filetype/(?P<extension>[\w\d]+)$",
        RetrieveAPIView.as_view(serializer_class=FileTypeResource)),

    url(r"^filetypegroup/$",
        ListCreateAPIView.as_view(serializer_class=FileTypeGroupResource)),
    url(r"^filetypegroup/(?P<id>\d+)$",
        RetrieveAPIView.as_view(serializer_class=FileTypeGroupResource)),
)

