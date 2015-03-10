from django.contrib.auth import authenticate
from django.contrib.auth.models	 import User
from common import payload

def check_login(data):	
	username = data[0]["username"].strip()
	password = data[0]["passw"].strip()  
	idCel = data[0]["idCel"]   
	user = authenticate(username=username, password=password)	 
	if user:
		payloadObj = payload("response", "registered")
		user.profile.id_cel = idCel  
		user.profile.save(force_update=True)
		return payloadObj
	else:
		payloadObj = payload("error", "not_registered")
		return payloadObj
		
def register(data):	
	username = data[0]["username"].strip()
	password = data[0]["passw"].strip()   
	email = data[0]["email"].strip() 
	idCel = data[0]["idCel"]   
	
	if not User.objects.filter(username=username).exists():
		user = User.objects.create_user(username, email, password)	
		user.profile.id_cel = idCel 
		user.profile.save(force_update=True) 	
		payloadObj = payload("response", "registered")
		return payloadObj
	else:
		payloadObj = payload("error", "username_repeated")
		return payloadObj	
	
		
class ValidationError(Exception):
	"""
		El error es lanzado cuando el contenido creado por usuario es 
		invalidoThe error raised when content created by user is invalid.
		NOTA: django.forms.ValidationError no se puede usar aqui por que
		nosotros necesitamos serializar la excepcion.
	"""
	pass
