from django.conf.urls                    import  patterns,url
from board.models                        import SectionFeed, ThreadFeed
from django.views.generic                import TemplateView

urlpatterns = patterns("board.views",
    url(r"^$", "index"),
    url(r"^settings$", "settings"),
    url(r"^faq$", "faq"),
    url(r"^feed$", "storage", {"name": "feed"}),
    url(r"^search/$", "search"),    
    url(r"^searchsections/(?P<nav>[-A-Za-z0-9_ ]+)$", "search_sections"),  
    url(r"^newsection/$", "new_section"),    
    url(r"^editsection/(?P<id_section>\d+)$", "edit_section"),    
    url(r'^accessdenied/$',TemplateView.as_view(template_name="access_denied.html")),
    url(r"^(?P<section_slug>\w+)/$", "section", {"page": 1}),
    url(r"^(?P<section_slug>\w+)/page(?P<page>\d+)$", "section"),
    url(r"^(?P<section_slug>\w+)/threads$", "threads"),
    url(r"^(?P<section_slug>\w+)/rss$", SectionFeed()),
    url(r"^(?P<section_slug>\w+)/search$", "search", {"page": 1}),
    url(r"^(?P<section_slug>\w+)/search/page(?P<page>\d+)$", "search"),
    url(r"^(?P<section_slug>\w+)/(?P<op_post>\d+)$", "thread"),
    url(r"^(?P<section_slug>\w+)/(?P<op_post>\d+)/rss", ThreadFeed()),
)
