from django.contrib                 import admin
from board		                    import models
from django.contrib.sessions.models import Session

class SessionAdmin(admin.ModelAdmin):
    def _session_data(self, obj):
        return obj.get_decoded()
    list_display = ['session_key', '_session_data', 'expire_date'] 
    list_per_page = 1000
    
    
class ThreadAdmin(admin.ModelAdmin):
    """Admin controller for threads."""
    exclude = ("html",)


class PostAdmin(admin.ModelAdmin):	
    search_fields = ("pid", "thread__section__slug")
    exclude = ("html", "is_op_post")
    date_hierarchy = 'date'
    ordering = ['-date']


class DeniedIPAdmin(admin.ModelAdmin):
    search_fields = ("ip",)

admin.site.register(models.Thread, ThreadAdmin)
admin.site.register(models.Post, PostAdmin)
admin.site.register(models.File)
admin.site.register(models.FileTypeGroup)
admin.site.register(models.FileType)
admin.site.register(models.Section)
admin.site.register(models.SectionGroup)
admin.site.register(models.Wordfilter)
admin.site.register(models.DeniedIP, DeniedIPAdmin)
admin.site.register(Session, SessionAdmin)   

