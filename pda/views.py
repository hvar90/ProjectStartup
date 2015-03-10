from django.core.paginator           import Paginator
from django.shortcuts                import get_object_or_404, render, redirect
from board.models                    import Post, Section,SectionForm,Section
from board.shortcuts                 import get_page_or_404, add_sidebar
from user_profile.models             import UserProfileForm,UserProfile
from django.contrib.auth.models      import User
from django.contrib.auth.decorators  import login_required



def index(request):
    return render(request, "index.html", add_sidebar())
    
def user(request, username):
	userAccount =  User.objects.get(username=username)
	return  render(request,"user_profile/user.html", {"useracount": userAccount})
	
@login_required(login_url='/accessdenied') 	 	
def edit_user(request):	
	return  render(request,"user_profile/edit_profile.html", {"form": UserProfileForm()})
	
@login_required(login_url='/accessdenied') 	 	
def edit_section(request,id_section):	
	form = SectionForm(instance=Section.objects.get(pk=id_section)) 
	return  render(request,"board/edit_section.html",{"form": form,"idSection": id_section})
	
@login_required(login_url='/accessdenied') 	 	
def friends_user(request):	
	return  render(request,"user_profile/friends_list.html")
	
@login_required(login_url='/accessdenied') 	 	
def groups_user(request):	
	groups = Section.objects.filter(type_section = 1, owner=request.user.profile)
	return  render(request,"board/groups_list.html",{"groups": groups})	
	
def list_members(request):	
	members = UserProfile.objects.all().exclude(profile_picture = '' ).order_by('-user__date_joined')[:100] 
	return  render(request,"user_profile/members_list.html", {"members": members})

def section(request, section_slug, page):
    s = get_object_or_404(Section, slug=section_slug)
    threads = list(s.threads())
    #p = get_page_or_404(Paginator(s.op_posts(), s.ONPAGE), page)
    return render(request, "board/section.html", {"section": s,
        "threads": threads,"ownerSection": s.owner.user.username ,})

