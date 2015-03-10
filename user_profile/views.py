from django.contrib.auth.decorators                import login_required
from django.shortcuts                              import render
from user_profile.models                           import UserForm,UserProfileForm,ChangePassForm
from django.contrib.auth.models                    import User
from board.shortcuts							   import add_sidebar



@login_required(login_url='/accessdenied') 	 
def edit_profile(request):
	return  render(request,"user_profile/edit_profile.html",{"form": UserProfileForm()})
	
def user_menu(request, username):
	userAccount =  User.objects.get(username=username)
	return  render(request,"user_profile/user_menu.html", {"useracount": userAccount, "form": UserForm()})
	
@login_required(login_url='/accessdenied') 		
def account(request):	
	return  render(request,"user_profile/user_account.html", {"form": ChangePassForm()})
	
@login_required(login_url='/accessdenied') 	
def contacts(request):	
	return  render(request,"user_profile/user_contacts.html")
	
@login_required(login_url='/accessdenied') 	
def activity(request):
	username=request.GET.get("username")
	userAccount =  User.objects.get(username=username)	    
	return  render(request,"user_profile/user_activity.html",{"useracount": userAccount})
	
@login_required(login_url='/accessdenied') 	
def contacts_invitation(request):	
	return  render(request,"user_profile/contacts_invitation.html")
	
def search_members(request):	
	return  render(request, "user_profile/search_members.html", add_sidebar({ 		
		"form": UserForm()   
	}))
    
