from django.contrib.auth.decorators                import login_required
from django.shortcuts                              import render
from django.contrib.auth.models                    import User
from message.models                                import *
from user_profile.models                           import UserProfile


@login_required(login_url='/accessdenied')    
def messages(request):
	return  render(request, "message/messages.html")
	
@login_required(login_url='/accessdenied')    
def message_send(request):		
	user = UserProfile.objects.get(id = request.GET.get("user")).user.username if request.GET.get("user") else ""
	return  render(request, "message/message_send.html", {"toUser": user, "form": MessageSendForm(),})
