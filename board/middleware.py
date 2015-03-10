from django.template import RequestContext
from django.template.loader import render_to_string
from django.http import HttpResponseForbidden

from api1.board.views import SettingView, FeedView, HideView
from board.models import DeniedIP

from django import http
from django.conf import settings




__all__ = [
    "set_session_defaults", "SessionDefaultsMiddleware",
    "DenyMiddleware", "DisableCSRFMiddleware"
]


METHODS = ("GET", "POST", "UPDATE", "DELETE")
WHITELIST = ()
try:
    XS_SHARING_ALLOWED_ORIGINS = getattr(settings, "XS_SHARING_ALLOWED_ORIGINS", '')
    XS_SHARING_ALLOWED_METHODS = getattr(settings, "XS_SHARING_ALLOWED_METHODS", ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'])
    XS_SHARING_ALLOWED_HEADERS = getattr(settings, "XS_SHARING_ALLOWED_HEADERS", [])
except:
    XS_SHARING_ALLOWED_ORIGINS = 'socialchan-serv.herokuapp.com'
    XS_SHARING_ALLOWED_METHODS = ['POST','GET','OPTIONS', 'PUT', 'DELETE']
    XS_SHARING_ALLOWED_HEADERS = []


def set_session_defaults(request):
    for res in (SettingView, FeedView, HideView):
        default = type(res.default)()  # prevent errors due to mutability
        request.session.setdefault(res.storage_name, default)


class SessionDefaultsMiddleware(object):
    def process_request(self, request):
        set_session_defaults(request)


def ip_in(ip, model):
    """Return True if the given ip address is in one of the ban models."""
    try:
        for i in model.objects.all():
            if ip in i.network():
                return i.reason or ""
    except ValueError:
        pass
    return False


def get_ip(request):
    """Gets the true client IP address of the request.

       Contains proxy handling involving HTTP_X_FORWARDED_FOR
       and multiple addresses.
    """
    #ip = request.META["HTTP_X_FORWARDED_FOR"]
    #if not ip or ip == "120.0.0.1" and "HTTP_X_FORWARDED_FOR" in request.META:
    ip = request.META["HTTP_X_FORWARDED_FOR"]
    return ip.split(", ")[0] 


def forbid(request, reason=""):
    """
        Forbids a user to access the site
        Cleans up their session (if it exists)
        Returns a templated HttpResponseForbidden when banning requests
        Override the `403.html` template to customize the error report
    """
    request.session.clear()
    return HttpResponseForbidden(
        render_to_string("banned.html",
            {"reason": reason},
            context_instance=RequestContext(request)
        )
    )


class DenyMiddleware(object):
    """Forbids any request if they are in the DeniedIP list."""
    def process_request(self, request):
        ip = get_ip(request)
        if not request.method in METHODS or ip in WHITELIST:
            return False

        ban_reason = ip_in(ip, DeniedIP)
        if ban_reason is not False:
            return forbid(request, ban_reason)


class DisableCSRFMiddleware(object):
    def process_request(self, request):
        request._dont_enforce_csrf_checks = True
        
#https://gist.github.com/prasanthn/5450772        
class XsSharingMiddleware(object):
    """
        This middleware allows cross-domain XHR using the html5 postMessage API.
 
        eg.
        Access-Control-Allow-Origin: http://foo.example
        Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE
        Access-Control-Allow-Headers: ["Content-Type"]
 
    """
    def process_request(self, request):
 
        if 'HTTP_ACCESS_CONTROL_REQUEST_METHOD' in request.META:
            response = http.HttpResponse()
            response['Access-Control-Allow-Origin'] = XS_SHARING_ALLOWED_ORIGINS
            response['Access-Control-Allow-Methods'] = ",".join(XS_SHARING_ALLOWED_METHODS)
            response['Access-Control-Allow-Headers'] = ",".join(XS_SHARING_ALLOWED_HEADERS)
            return response
 
        return None
 
    def process_response(self, request, response):
        # Avoid unnecessary work
        if response.has_header('Access-Control-Allow-Origin'):
            return response
 
        response['Access-Control-Allow-Origin'] = XS_SHARING_ALLOWED_ORIGINS
        response['Access-Control-Allow-Methods'] = ",".join(XS_SHARING_ALLOWED_METHODS)
 
        return response
