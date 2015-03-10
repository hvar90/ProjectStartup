from rest_framework                   import serializers
from message                          import models
from api1.utils.pagination            import CustomPaginationSerializer

class MessageReceiveResource(serializers.ModelSerializer):
    
    class Meta:
		model = models.Message_receive
		form = models.MessageReceiveForm
		depth = 3
		fields = (
			"fromThe", "to", "msg_html", "id", "msg_read"
		)
		
class MessageSendResource(serializers.ModelSerializer):
    
    class Meta:
		model = models.Message_send
		form = models.MessageSendForm
		depth = 3
		fields = (
			"fromThe", "to", "msg_html", "id"
		)

class PaginatedMessageSendSerializer(CustomPaginationSerializer):
    """

    """
    class Meta:
        object_serializer_class = MessageSendResource
        
class PaginatedMessageReceiveSerializer(CustomPaginationSerializer):
    """
   
    """
    class Meta:
        object_serializer_class = MessageReceiveResource
