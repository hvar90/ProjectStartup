import								  logging

import json
from urllib							  import urlencode
from urllib2						  import urlopen, URLError
from hashlib						  import md5
from datetime						  import datetime
from django.db.models                 import Q
from django.db.models.signals		  import post_save
from django.dispatch.dispatcher		  import receiver

from django.shortcuts				  import render
from django.contrib.gis.geoip		  import GeoIP

from django.core.files				  import File as DjangoFile
from django.utils.translation		  import ugettext as _

from rest_framework					  import status
from rest_framework.response		  import Response
from rest_framework.views			  import APIView

from user_profile.models			  import GroupSubscriptions
from board							  import models
from board.shortcuts				  import add_sidebar
from board.tools					  import (
										make_tripcode, parse_user_agent,
										get_key, handle_uploaded_file
									  )
from .resources						  import *	
from .permissions					  import *
from modpanel.views					  import is_mod
from django.contrib.auth.models		  import User
from rest_framework.permissions		  import IsAuthenticated
from core		                      import gcm_send  


class ValidationError(Exception):
	"""
		El error es lanzado cuando el contenido creado por usuario es 
		invalido
		NOTA: django.forms.ValidationError no se puede usar aqui por que
		nosotros necesitamos serializar la excepcion.		
	"""
	pass


def api(request):
	"""Renderiza la pagina que contiene algunos ejemplos de usos del API."""
	return render(request, "api.html", add_sidebar())


def adapt_captcha(request):
	"""
		Deshabilita captcha si alguna de estas condiciones son encontradas:
			- usuario ha ingresado 3 captchas valido 
			- usuario ha iniciado session

		Retorna el formulario de la publicacion el cual deberia tener un campo captcha en el.
	"""
	correct = request.session.get("valid_captchas", 0)
	no_captcha =  request.session.get("no_captcha", False) \
			  or request.user.is_authenticated()

	if no_captcha:
		model = models.PostFormNoCaptcha
	else: model = models.PostForm   
   
	form = model(request.POST, request.FILES)

	if not form.is_valid():
		raise ValidationError(dict(form.errors))

	if no_captcha:
		correct -= 1
		request.session["no_captcha"] = bool(correct)
	else:
		correct += 1
		if correct == 3:
			request.session["no_captcha"] = True
			correct = 20
	request.session["valid_captchas"] = correct

	return form


def create_post(request):	
	"""
		Crea una publicacion con los datos que el usuario ha enviado
		Esta publicacion tambien empezara un nuevo hilo si alli no 
		habia un campo "thread" en el "request"
	"""
	user = request.user.is_authenticated() and request.user
	files = request.FILES.getlist("files")	
	thread = request.POST.get("thread")	
	section = request.POST["section"] if not thread else ""
	location = request.POST.get("location") if request.POST.get("location") else ""
	form = adapt_captcha(request)
	post = form.save(commit=False)	
   
	return finish_post(request,
		post, user, thread, files, section, location,
		request.META.get("HTTP_X_FORWARDED_FOR", "127.0.0.1").split(", ")[0],
		request.META["HTTP_USER_AGENT"],
		request.session["feed"]	   
	)
	
def create_section(request):
	
	form = models.SectionForm(request.POST)	
	#slug = form['slug'].value()   
	#name = form['name'].value()
	
	if not form.is_valid():
		raise ValidationError(dict(form.errors))	
	else:	
		 user= request.user.profile	
		 section = form.save()		
		 section.owner = user
		 section.group = models.SectionGroup.objects.get(pk=1)
		 section.save()	
		 user.sections.add(section)
		 user.save()
	return
	
		 
	
	
@receiver(post_save, sender=models.Section)
def section_save(sender, instance, *args, **kwargs):
	 for i in ['1', '2', '3', '4', '5', '6']:
			#revisar como ingresar default manytomany
			instance.filetypes.add(models.FileTypeGroup.objects.get(id=i))	

def mod_delete_post(request, post):
	if request.GET.get("ban_ip"):
		reason = request.GET.get("ban_reason")
		if not reason:			
			return Response({"detail": _("You need to enter ban reason")},
				status.HTTP_400_BAD_REQUEST
			)	
		ip = models.DeniedIP(ip=post.ip, reason=reason, by=request.user)
		ip.save()
		
		return Response(status.HTTP_204_NO_CONTENT)

	if request.GET.get("delete_all"):		
		posts = post.section().posts().filter(ip=post.ip)
		op = posts.filter(is_op_post=True).values("pid", "thread")
		t = models.Thread.objects.filter(id__in=[i["thread"] for i in op])
		t.update(is_deleted=True)

		for p in posts:
			p.remove()
		return Response(status.HTTP_204_NO_CONTENT)
		
	
	return Response(status.HTTP_204_NO_CONTENT)


	
def finish_post(request, post, user, thread, files, section, location, ip, useragent, feed=None):
	# Ingresa alguno atributos comunes.
	post.ip = ip
	post.date = datetime.now()
	post.password = get_key(post.password)
	post.is_op_post = not thread 
	
	

	if len(files)  >  9:
		raise ValidationError(_("Maximum allowed files are 9."))
	
	if models.Wordfilter.objects.scan(post.message):
		raise ValidationError(_("Your post contains blacklisted word."))
	
	if not thread: 
		section = models.Section.objects.get(slug=section)
		thread_o = models.Thread(section=section, bump=post.date)
	else:
		thread_o = models.Thread.objects.get(id=thread)
		section = thread_o.section
		if thread_o.is_closed and not user:
			raise ValidationError(
				_("This thread is closed, you cannot post to it.")
			)
	  
	section_is_feed =  section.type_section == 3

	
	if (section_is_feed  or section.type_section == 7) and not user:
				raise ValidationError(
					_(
						"Authentication required to "
						"create threads in this section"
					)
				)
	elif files:
				
		for f in files:
			allowed = section.allowed_filetypes()
			extension = allowed.get(f.content_type)
			if not extension:
				raise ValidationError(_("Invalid file type"))

			lim = section.filesize_limit
			if f .size > lim > 0:
				raise ValidationError(_("Too big file"))

			m = md5()
			map(m.update, f .chunks())
			# TODO: Check if this file already exists.
			#	   (Is this really needed at all?)
			#if models.File.objects.filter(hash=m.hexdigest()).count() > 0:
			#	raise InvalidFileError(_("This file already exists"))
			
			filetype = models.FileType.objects.filter(extension=extension)[0]		
		
	else:
		if not post.message:
			raise ValidationError(
				_("Enter post message or attach a file to your post")
			)
		elif not thread:
			if section.force_files:
				raise ValidationError(
					_("You need to upload file to create new thread.")
				)			
				
	if not request.user.is_anonymous() or section.type_section == 7:
		 post.user_profile = request.user.profile 
	else : post.is_anonymous = True   	#se ingreso manualmente por que el valor default no funcino... revisar

	# "Bump" el hilo.
	if (post.email.lower() != "sage"
	and thread and thread_o.posts().count() < section.bumplimit):
		thread_o.bump = post.date

	# Procesar la firma.
	author, sign = (post.poster.split("!", 1) + [""])[:2]

	if sign == "OP" and thread and post.password == thread_o.op_post.password:
		post.tripcode = "!OP"

	if sign == "name" and user:
		if request.user.is_superuser:
			post.tripcode = "!{}".format(request.user.username)
		elif request.user.profile.is_mod:
			post.tripcode = "!Mod"

	# Procesar la firma.
	author, tripcode = (author.split("#", 1) + [""])[:2]
	if tripcode:
		post.tripcode = make_tripcode(tripcode)
	post.poster = author

	# Forzar a poner el nombre del autor en algunos "boards".
	if not post.is_anonymous : 
	   post.poster = request.user.username
	 
	elif not post.poster or section.anonymity:
		post.poster = section.default_name
		
	

	if post.email == "mvtn".encode("rot13"):  # easter egg o/
		s = u"\u5350"
		post.poster = post.email = post.topic = s * 10
		post.message = (s + u" ") * 50
		
	if section.type_section == 7:
		# 4 == /class/ - Classifieds
		# Assignar la ubicacion para este clasificado.
		
		post.data = json.loads(location) if location else "" 		

	if section.type_section == 4:
		# 4 == /int/ - International
		# Asignar el codigo del pais a esta publicacion.
		post.data = {
			"country_code": GeoIP().country(post.ip)["country_code"]
		}
	elif section.type_section == 5:
		# 5 == /bugs/ - Bugtracker
		# muestra el browser de usuario derivado del "HTTP User-Agent". 
		parsed = parse_user_agent(useragent)
		browser = parsed.get("browser", {"name": "Unknown", "version": ""})
		platform = parsed.get("os", {"name": "Unknown"})

		browser["os_name"] = platform["name"]
		browser["os_version"] = parsed.get("flavor", {}).get("version", "")
		browser["raw"] = useragent
		post.data = {"useragent": browser}
	  

	if not thread:
		thread_o.save(rebuild_cache=False)
		post.thread = thread_o
	post.pid = section.pid_incr()
	post.save()
	thread_o.save()

	if section_is_feed :
		thread_id = int(thread or post.id)
		feed.append(thread_id)
		
	for f in files:	
		handle_uploaded_file(
				models.File(
					name=f .name, type=filetype,post=post, hash=m.hexdigest(),
					file=DjangoFile(f), image_height=0, image_width=0
				)
			)  
	post.save()
	thread_o.save()	 		
	return post
	
class ThreadInstanceView(APIView):# (esta funcion no es utilizada)
	def get(self, request, *args, **kwargs):
		error()
		slug = kwargs.get("section__slug")
		try:
			if not slug:
				instance = models.Thread.objects.get(**kwargs)
			else:
				op_post = models.Post.objects.get(pid=kwargs["id"],
					thread__section__slug=kwargs["section__slug"])
				instance = op_post.thread
		except (models.Post.DoesNotExist, self.model.DoesNotExist):
			Response(status.HTTP_404_NOT_FOUND)
		res = {f: getattr(instance, f) for f in self.fields}
		# remove nested fields
		fields = [f for f in list(self.resource.fields)
			if isinstance(f, str) and f != "files"]
		res["posts"] = instance.posts().values(*fields)
		return res

		
class PostListOrCreateView(APIView):
	def get(self, request, *args, **kwargs):
		"""Retorna una lista de publicaciones ("posts").  si ?html opcion es especificada, 
		el metodo  retornara solo las publicaciones sin ningun otro campo.
		TODO: implementacion de la paginacion.
		"""
		qs = PostResource.Meta.model.objects.filter(**kwargs).reverse()[:20]
		#error()
		if request.GET.get("html"):
			return Response(qs.values("html"))  
		return  Response(qs)
	def post(self, request, *args, **kwargs):
		"""Revisa errores para el post y retorna una nueva instancia"""
		try:
			instance = create_post(request)
		except ValidationError as e:
			return Response({"detail": e.message},status.HTTP_400_BAD_REQUEST )
		# quita microsegundos que envia django. 
		instance.date = instance.date.strftime("%Y-%m-%d %H:%M:%S")
		url = "http://pubsub-schan.herokuapp.com/api/1.0/streamp/{}"
		idThread = instance.thread.id	
		if instance.is_op_post:	
			 data = urlencode({"html": instance.thread.html.encode("utf-8"),"idThread":instance.thread.id,"isOpPost": str(instance.is_op_post)})
			 instance_response=  instance.thread			 
		else:
			 data = urlencode({"html": instance.html.encode("utf-8"),"idThread":instance.thread.id,"isOpPost": str(instance.is_op_post)})	
			 instance_response=  instance	
		
		if not request.user.is_anonymous():
			 list_subscriptions = GroupSubscriptions.objects.filter(~Q(person=request.user.profile ),Q(section=instance.thread.section)) 			 		 	
		else:			
			 list_subscriptions =GroupSubscriptions.objects.filter(section=instance.thread.section)
			 		
		list_subscriptions.update(isNewPublication=True)	
		for subscription in list_subscriptions:	
				if subscription.person.id_cel != '':
					if subscription.section.type_section != 6:
						gcm_send.send(subscription.person.user.username,
						         'new post',subscription.person.id_cel,
						         {"slug": subscription.section.slug,
						         "name_group": subscription.section.name})	
					else:
						s = GroupSubscriptions.objects.get(~Q(person=subscription.person),section=subscription.section )
						args=	dict()
						args["from"] =	s.person.user.username
						args["section_chat"] =	subscription.section.slug
						gcm_send.send(subscription.person.user.username,
						    'new message',subscription.person.id_cel,
						    {"slug": subscription.section.slug,
						     "from": s.person.user.username})				
		try:
			urlopen(url.format(instance.thread.section.slug), data)
		except URLError:
			logging.warning("Can't refresh messages in pubsub.")
		#self.resource.fields.append("html") se agrego desde el comienzo el campo html, debido la actualizacion de django Rest		
		#serializer =PostResource(instance)		
		return Response({"data": instance_response.html.encode("utf-8"),"is_op": instance.is_op_post,"idThread": idThread} )
	
		

		
class SectionDetailView(APIView):
	
	permission_classes = (IsAuthenticated,IsOwnerPk)
	
	def put(self, request,id, *args, **kwargs):
		"""Revisa errores."""
		try:	
			FILE_ALLOWED_TYPES = ["image/jpeg","image/png"] 					
			section = models.Section.objects.get(pk=id)
			self.check_object_permissions(request,section)
			
			form =    models.SectionForm( request.DATA, request.FILES,instance=section)
			if not form.is_valid():
				raise ValidationError(dict(form.errors))	
			else:				
				if request.FILES:					
					if  not request.FILES["image"].content_type in FILE_ALLOWED_TYPES:
						raise ValidationError(_("Invalid file type")) 
					image =	 models.Section.objects.get(pk=id).image
					delete_image(image)					
				form.save() 				
					
		except ValidationError as e:
			return Response({"detail": e.message},status.HTTP_400_BAD_REQUEST, )				   
	   
		return  Response(status.HTTP_204_NO_CONTENT)
		
def delete_image(image):   
	
	if  image : 
		image.delete() 
	return 
	
def delete_photoUserProfile(pk):   
	
	if UserProfile.objects.get(id=pk).profile_picture : 
		UserProfile.objects.get(id=pk).profile_picture.delete() 
	return  
	
	
class SectionCreateDeleteView(APIView):
	permission_classes = (IsAuthenticated,)
	def post(self, request, *args, **kwargs):
		"""verifica errores"""	
		try:
			create_section(request)
		except ValidationError as e:
			return Response({"detail": e.message} , status.HTTP_400_BAD_REQUEST )		   
	   
		return Response(status.HTTP_201_CREATED)
	def delete(self, request, *args, **kwargs):
		"""verifica errores"""	
		try:
		   models.Section.objects.get(id=request.DATA.get("idsection")).delete()			
		except ValidationError as e:
			Response({"detail": e.message},  status.HTTP_400_BAD_REQUEST )		 
		return Response(status=status.HTTP_204_NO_CONTENT)
		
class PostInstanceView(APIView):
	"""un leer/eliminar recurso para Post."""
	def get(self, request, *args, **kwargs):
		"""Obtiene datos del a publicacion. Si ?html opcion es especificado, el metodo retornara
		solo el html de la publicacion sin ningun otro campo.
		"""
		try:
			post =  models.Post.objects.get(**kwargs)
			if request.GET.get("html"):
				return {"html": post.html}
			return post
		except models.Post.DoesNotExist:
			Response(status.HTTP_404_NOT_FOUND)

	def delete(self, request, *args, **kwargs):
		"""eliminar publicacion."""
		try:
			post = models.Post.objects.get(id=kwargs["id"])
		except models.Post.DoesNotExist:
			Response(status.HTTP_404_NOT_FOUND)
		#key = get_key(request.GET["password"])
		if request.user.is_superuser :			
			mod_delete_post(request, post)	
			post.remove()			
		elif is_mod(request, post.section_slug()) or post.user_profile == request.user.profile :	
			post.remove()				
		else:		   
			return Response( {
				"detail": u"{0}{1}. {2}".format(
					_("Error on deleting post #"), post.pid,
					_("Only the owner of the group or of the post can delete posts")
				)
			},status.HTTP_400_BAD_REQUEST)
		return Response(status.HTTP_204_NO_CONTENT)
	def put(self, request,id, *args, **kwargs):
		"""Revisa errores."""
		try:
			post  = models.Post.objects.get(id=id)	
			files = request.FILES.getlist("files")		
			if post.user_profile == request.user.profile :			
				form  = models.PostFormEdit(request.DATA,instance=post)
				if not form.is_valid():
					raise ValidationError(dict(form.errors))	
				else:				
					if files:
						for f in files:
							allowed = post.thread.section.allowed_filetypes()
							extension = allowed.get(f.content_type)
							if not extension:
								raise ValidationError(_("Invalid file type"))

							lim = post.thread.section.filesize_limit
							if f .size > lim > 0:
								raise ValidationError(_("Too big file"))

							m = md5()
							map(m.update, f .chunks())						
							filetype = models.FileType.objects.filter(extension=extension)[0]	 
							
						files_post = models.Post.objects.get(id=id).files					
						if files_post:  
							for f in files_post.all():  f.delete()					
				post = form.save() 	
				if files:
					for f in files:	
						handle_uploaded_file(
								models.File(
									name=f.name, type=filetype,post=post, hash=m.hexdigest(),
									file=DjangoFile(f), image_height=0, image_width=0
								)
							) 
				post.save()
				post.thread.save()
			else:		   
				return Response( {
					"detail": u"{0}{1}. {2}".format(
						_("Error on updating post #"), post.pid,
						_("Only the owner of the post can update his post")
					)
				},status.HTTP_400_BAD_REQUEST)
						
					
		except ValidationError as e:
			return Response( {
					"detail": u"{0}{1}. {2}".format(
						_("Error on updating post #"), post.pid,
						_("Only the owner of the post can update his post")
					)
				},status.HTTP_400_BAD_REQUEST)	   
		
		return Response({"data": post.html.encode("utf-8"),"idPost": post.id} )

		
class ProfileSectionView(APIView):
	
	def get(self, request,idUsername, *args, **kwargs):	 
		
		try:			
		   user_groups= list(models.Section.objects.filter(owner=User.objects.get(username=idUsername).profile.id).values())
		   #serializer= SectionResource(user_groups,many=True)					
		except ValidationError as e:
			return Response({"detail": e.message}, status.HTTP_400_BAD_REQUEST )		   		   
	   
		return Response(user_groups) 		


class FileInstanceView(APIView):
	def delete(self, request, *args, **kwargs):
		"""Eliminar archivos adjuntos."""		
		try:
			post =  models.Post.objects.get(**kwargs)
		except self.model.DoesNotExist:
			Response(status.HTTP_404_NOT_FOUND)

		#key = get_key(request.GET["password"])
		if  request.user.is_superuser: 
			for f in post.files.all():  f.delete()	
			mod_delete_post(request, post)			  
			post.save()	   
		elif is_mod(request, post.section_slug()):
			for f in post.files.all():  f.delete()		 
			post.save()					 
		else:		   
			return Response( {
				"detail": u"{0}{1}. {2}".format(
					_("Error on deleting post #"), post.pid,
					_("Only the owner of the group or of the post can delete post")
				)
			},status.HTTP_400_BAD_REQUEST)
		return Response(status.HTTP_204_NO_CONTENT)
	


class RandomImageView(APIView):#esta funcion no se utiliza
	def get(self, request, *args, **kwargs):		
		count = kwargs.get("count", 6)
		return self.resource.model.objects.random_images()[:count]
		
class SearchSectionView(APIView):
	def get(self, request, *args, **kwargs):
		#group = kwargs.get("group")
		q = request.GET.get("q")
		group = "all"
		serializer =SectionResource(SectionResource.Meta.model.objects.search_sections(group,q), many=True)
		return Response(serializer.data, status.HTTP_200_OK )
		



class StorageRootView(APIView):
	storage_name = ""
	default = {}

	def get_data(self, request):
		return request.session[self.storage_name]

	def set_data(self, request, value):
		request.session[self.storage_name] = value

	def get(self, request, auth):
		return Response( self.get_data(request), status.HTTP_200_OK)

	def delete(self, request, auth):
		"""Limpia el almacenamiento entero."""
		self.set_data(request, self.default)
		return Response(status.HTTP_204_NO_CONTENT)


class StorageView(StorageRootView):
	"""Base de almacenanmiento para lectura/eliminacion vista."""
	def get(self, request, key):
		return Response(status.HTTP_501_NOT_IMPLEMENTED)


class StorageSetRootView(StorageRootView):
	"""Almacenamiento crear/listar/flush View, que usa "list" para guardar datos."""
	"""se cambio de set() a list() por la actualizacion en django 1.6 donde se necesitan datos q se puedan serializar a JSON"""
	default = list()

	def post(self, request):
		data = self.get_data(request)
		try:
			value = int(request.POST.get("value"))
		except (KeyError, TypeError):
			Response(status.HTTP_400_BAD_REQUEST)
		data.append(value)
		request.session.modified = True
		return Response(data, status.HTTP_201_CREATED)


class StorageSetView(StorageView):
	"""Almacenamiento lectura/eliminacion Vista, que usa "list" para almacenar datos."""
	default = list()

	def delete(self, request, key):
		data = self.get_data(request)
		key = int(key)
		if key in data:
			data.remove(key)
			request.session.modified = True
		return Response(status.HTTP_204_NO_CONTENT)


class StorageDictRootView(StorageRootView):
	"""Almacenamiento crear/listaar/flush Vista, que usa "list" para almacenar datos."""
	default = {}

	def post(self, request):
		data = self.get_data(request)
		try:
			key = request.POST.get("key") 
			value =  request.POST.get("value")   
		except KeyError:
			return Response(status.HTTP_400_BAD_REQUEST)
		data[key] = value
		request.session.modified = True
		return Response(data,status.HTTP_201_CREATED)


class StorageDictView(StorageView):
	"""almacenamiento lectura/eliminacion Vista, que usa "list" para almacenar datos."""
	default = {}

	def get(self, request, key):
		data = self.get_data(request)
		return Response(data.get(key), status.HTTP_200_OK)

	def delete(self, request, key):
		data = self.get_data(request)
		if key in data:
			del data[key]
		request.session.modified = True
		return Response(status.HTTP_204_NO_CONTENT)


class SettingRootView(StorageDictRootView):
	storage_name = "settings"


class SettingView(StorageDictView):
	storage_name = "settings"


class FeedRootView(StorageSetRootView):
	storage_name = "feed"


class FeedView(StorageSetView):
	storage_name = "feed"


class HideRootView(StorageSetRootView):
	storage_name = "hidden"


class HideView(StorageSetView):
	storage_name = "hidden"
