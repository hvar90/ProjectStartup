import pika
import uuid
from pickle import  dumps
from base64 import  b64encode

def payload(type, data, *args):
	pkg=	dict()
	
	if type == "command":
		pkg["type"] =	    "command"
		pkg["command"] =	data
		pkg["args"] =		args
		
	elif type == "response":
		pkg["type"]=		"response"
		pkg["response"]=	data
	
	elif type == "error":
		pkg["type"]=		"error"
		pkg["error"]=		data
	
	else:
		raise Exception("Unknown type:  %s"  %(type))
	
	return pkg

