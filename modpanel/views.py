from django.contrib.auth.decorators  import login_required
from django.shortcuts                import render
from board.models                    import Wordfilter, DeniedIP,Section
from board.shortcuts                 import add_sidebar
from user_profile.models             import UserProfile

def is_mod(request, section_slug):
    
    if request.user.is_anonymous(): 
        return False
            
    u = request.user
    id_sections = UserProfile.sections.through.objects.filter(userprofile_id=u.profile.id).values_list('section_id', flat=True)
    slug_sections = Section.objects.filter(id__in=list(id_sections)).values_list('slug', flat=True)
  
    if u.is_authenticated():        
        if u.is_superuser or section_slug in slug_sections:
            return True
    return False

def index(request):
    return render(request, "modpanel/modindex.html", add_sidebar())


@login_required
def wordfilter(request):
    return render(request, "modpanel/wordfilter.html", add_sidebar({
        "wordlist": Wordfilter.objects.all()
    }))


@login_required
def banlist(request):
    
    if request.user.profile.is_mod: 
    
        return render(request, "modpanel/banlist.html", add_sidebar({
            "banlist": DeniedIP.objects.all()
        }))
    else:
        return render(request, "access_denied.html")
