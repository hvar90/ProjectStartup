from django.conf.urls                import include, patterns,url
from django.contrib                  import admin
from django.http                     import HttpResponse
from django.contrib.sitemaps.views   import sitemap
from board.sitemap			         import boardSitemap
from django.views.generic            import TemplateView
admin.autodiscover()

packages = {"packages": ("socialchan.board","socialchan.user_profile","socialchan.message"), }

sitemaps = {
    'classified': boardSitemap.PostClassSitemap, 
    'post': boardSitemap.PostSitemap,
    'section': boardSitemap.SectionSitemap,
}

urlpatterns = patterns("",   
    url(r'^accessdenied/$',TemplateView.as_view(template_name="access_denied.html")),
    url(r'^robots\.txt$', lambda r: HttpResponse("User-agent: *\nDisallow: ", content_type="text/plain")),
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps},
    name='django.contrib.sitemaps.views.sitemap'),
    url(r"^admin/", include(admin.site.urls)),
    url(r"^api/i18n/$", "django.views.i18n.javascript_catalog", packages),
    url(r'^jsi18n/$', 'django.views.i18n.javascript_catalog', packages),
    url(r"^api/1\.0/", include("api1.urls")),   
    url(r"^modpanel/", include("modpanel.urls")), 
    url(r"^", include("pda.urls")),
)

