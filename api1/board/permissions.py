from rest_framework.permissions import BasePermission

class IsOwnerPk(BasePermission):
  
    def has_object_permission(self, request, view, obj):      
             
        return obj.owner.id == request.user.profile.id
        
  
