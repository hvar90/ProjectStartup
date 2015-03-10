from rest_framework      import serializers
from board               import models


class ThreadResource(serializers.ModelSerializer):
    """A read/delete resource for Thread."""
    class Meta:
		model = models.Thread
		fields = (
			"id", "section_id", "bump", "is_pinned",
			"is_closed", "html",
		)


class PostResource(serializers.ModelSerializer):
	"""A create/list resource for Post."""
	thread = serializers.PrimaryKeyRelatedField(read_only=True)
	class Meta:
		form = models.PostFormNoCaptcha
		model = models.Post
		depth = 1
		fields = [
			"id", "pid", "poster", "tripcode", "topic", "is_op_post",
			"date", "message", "email", "data", "html","thread"
			#("thread", ("id", ("section", ("id", "slug")))),
		]
	


class SectionResource(serializers.ModelSerializer):
    """A read resource for Section."""
   
    class Meta:
		model = models.Section
		depth = 1
		fields = (
			"id",  "bumplimit", "description",
			"filesize_limit", "default_name", "anonymity", "threadlimit",
			"group", "type", "slug", "name"
		)


class SectionGroupResource(serializers.ModelSerializer):
    """A read resource for SectionGroup."""
    class Meta:
		model = models.SectionGroup
		fields = ("id", "name", "order", "is_hidden")


class FileResource(serializers.ModelSerializer):
    """A list resource for File."""
    class Meta:
		model = models.File
		fields = ("id", "post", "name", "type", "size", "image_width",
				  "image_height", "hash", "file", "thumb")


class FileTypeResource(serializers.ModelSerializer):
    """A read resource for FileType."""
    class Meta:
		model = models.FileType
		fields = ("id", "category_id", "type", "extension")


class FileTypeGroupResource(serializers.ModelSerializer):
    """A read resource for FileTypeGroup."""
    class Meta:
		model = models.FileTypeGroup
