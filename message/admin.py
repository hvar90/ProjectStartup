from django.contrib import admin
from message import models

class MessageSendAdmin(admin.ModelAdmin):
	model= models.Message_send
	date_hierarchy = 'pub_date'
	ordering = ['-pub_date']
	
class MessageReceiveAdmin(admin.ModelAdmin):
	model= models.Message_receive
	date_hierarchy = 'pub_date'
	ordering = ['-pub_date']
	
admin.site.register(models.Message_send,MessageSendAdmin)
admin.site.register(models.Message_receive,MessageReceiveAdmin)





