from rest_framework.permissions import BasePermission

class IsOwnerPk(BasePermission):
  
    def has_object_permission(self, request, view, obj):      
             
        return int(obj) == request.user.profile.id
        
class IsOwnerUsername(BasePermission):
  
    def has_object_permission(self, request, view, obj):      
             
        return obj == request.user.username     
