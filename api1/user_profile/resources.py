from rest_framework                   import serializers
from user_profile                     import models
from django.contrib.auth.models       import User

class UserResource(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class ProfileResource(serializers.ModelSerializer):
    user = UserResource()
    class Meta:
		model = models.UserProfile	
		depth = 2
		fields = ("user","blacklist","contacts","profile_picture","id")
