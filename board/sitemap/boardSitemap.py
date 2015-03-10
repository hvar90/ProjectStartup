from django.contrib.sitemaps import Sitemap
from board.models			 import Post, Section
from django.db.models        import Q

class PostClassSitemap(Sitemap):
    changefreq = "daily"
    priority = 1
    i18n = True

    def items(self):
        return Post.objects.filter(thread__section=1)#id para clasificados

    def lastmod(self, obj):
        return obj.date        

        
class PostSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.5
    i18n = True

    def items(self):
        return Post.objects.filter(~Q(thread__section = 1))

    def lastmod(self, obj):
        return obj.date
        
class SectionSitemap(Sitemap):
    changefreq = "yearly"
    priority = 0.3
    i18n = True
    

    def items(self):
        return Section.objects.all()

