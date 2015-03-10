from rest_framework.permissions import BasePermission

class IsOwnerMessageSend(BasePermission):
  
    def has_object_permission(self, request, view, obj):      
             
		if isinstance(obj, int):
			return obj == request.user.profile.id   
		else:
			return obj.fromThe.id  == request.user.profile.id
        
class IsOwnerMessageReceive(BasePermission):
  
    def has_object_permission(self, request, view, obj):      
             
		if isinstance(obj, int):
			return obj == request.user.profile.id   
		else: 			
			return obj.to.id == request.user.profile.id      
        
class IsOwnerPk(BasePermission):
  
    def has_object_permission(self, request, view, obj):      
             
        return int(obj) == request.user.profile.id   
