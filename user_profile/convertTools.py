from user_profile.models	 import UserProfile
from message.models	 import Message_receive,Message_send
	
def profileDictToObj(profileDict):	
	
	profileObj = UserProfile(**profileDict)
	return profileObj
	
def msgRecDictToObj(msgDict):	
	
	msgObj = Message_receive(**msgDict)
	return msgObj
	
	
def msgSendDictToObj(msgDict):	
	
	msgObj = Message_send(**msgDict)
	return msgObj
