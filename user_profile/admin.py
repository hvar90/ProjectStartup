from django.contrib import admin
from user_profile import models
from django.contrib.auth.models import User

class ContactstInline(admin.TabularInline):
    model = models.Friendship
    fk_name = "person1"

class UserProfileAdmin(admin.ModelAdmin):
    model= models.UserProfile
    #filter_horizontal = ('sections','contact_invitation') 
    #inlines = (ContactstInline,)
    list_display = ('id','ip','__unicode__','profile_picture') 


class UserAdmin(admin.ModelAdmin):
	model= User
	date_hierarchy = 'date_joined'
	ordering = ['-date_joined']
	list_display = ('id','username','email') 


admin.site.register(models.UserProfile,UserProfileAdmin)
admin.site.unregister(User)
admin.site.register(User,UserAdmin)



