from gcm   import *
import json

def send(username,message,id_cel,args):
    try:
         gcm = GCM("AIzaSyAAFlAM3nJkwF_Lycelx5J5RC0aHfyHPT4")
         notification = {'message': message,'username': username,'type': 'notification','args':  json.dumps(args)}
         gcm.plaintext_request(registration_id=id_cel, data=notification)
         
    except:
         print "Oops!  Registration id is not valid anymore..."
    
