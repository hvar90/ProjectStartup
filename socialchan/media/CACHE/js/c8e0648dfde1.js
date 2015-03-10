/**
 * Copyright (c) 2011, Paul Miller.
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function(window, $, undefined) {
"use strict";

var app = {};

function defaultErrorCallback(response) {
	
  //document.write(response.responseText); // for debugging 
  var errors = jQuery.parseJSON(response.responseText).field-errors || jQuery.parseJSON(response.responseText).detail;   
  var errorText = '';
  var tmp = [];
  var text, label;
  //console.log('Response', response, ', errors', errors, typeof errors);
  if (typeof errors === 'string') {
	
    errorText = errors;
  } else {
	
    for (var i in errors) {
      text = '';
      label = $('label[for="' + i + '"]');
      if (label.length) {
        text += label.text() + ': ';
      }
      text += errors[i].join(', ');
      tmp.push(text)
    }
    errorText = tmp.join('<br/>');
  }
 
  $.notification(errorText, 'error');
}

$.extend(app, {


settings: {
  init: function() {

    $('.go-back').on('click', function(e)
		{ window.history.back() })

    //genera el cookie necesario para usar ajax y Cross Site Request Forgery (CSRF)    
    var csrftoken = $.cookie('csrftoken');
    function csrfSafeMethod(method) {
		// these HTTP methods do not require CSRF protection
		return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	function sameOrigin(url) {
		// test that a given url is a same-origin URL
		// url could be relative or scheme relative or absolute
		var host = document.location.host; // host + port
		var protocol = document.location.protocol;
		var sr_origin = '//' + host;
		var origin = protocol + sr_origin;
		// Allow absolute or scheme relative URLs to same origin
		return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
			(url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
			// or any other URL that isn't scheme relative or absolute i.e relative.
			!(/^(\/\/|http:|https:).*/.test(url));
	}
	
	//se configura para que cada llamado ajax envien un CSRFToken
	$.ajaxSetup({
		beforeSend: function(xhr, settings) {
			if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
				
				xhr.setRequestHeader("X-CSRFToken", csrftoken);
			}
			$("#overlay_loading img").show();
		},
		complete:function(){      
            $("#overlay_loading img").hide();
		}
	});
    
    
    
  }
},

users: {
  init: function() {
	  
	   $(function() {
		   
	      $( "#tabs-contacts" ).tabs();      
		
	   });
	   
	    $(function() {	   
	     
	      $( "#tabs-activity" ).tabs();
		
	   }); 
	   
	    $(function() {
		   
		 $( "#tabs-account" ).tabs();
		
	   });  
	   
	   $(document).ready(function() {			
			
			 if ($.cookie('show_delcontact_success') == 'true'){
				 
				 $.notification(gettext('This user has been removed from your contact list'),'success');  				 
				 $.cookie('show_delcontact_success', null);
			 }			  
		});
		
	   $('#menu-account').on('click', '.contactsInvitation ', function(e) {              
				location.href ='/user/contactsinvitation' ;								
			});
			
	   $('#contacts').on('click', '.imgUserContact', function(e) {              
									
				 var username = $(this).attr('username'); 
				 location.href ='/user/' + username ;									
			});
		
	      
  }
},

messages: {
  init: function() {
	  
	   $(function() {
		   
		 $( "#tabs-messages" ).tabs();
		
	   }); 
	   
	   $(document).ready(function() {
			 if ($.cookie('show_msg_success') == 'true'){
				 
				 $.notification(gettext('The message was sent successfully'),'success');  				 
				 $.cookie('show_msg_success', null);
			 }
		});	
		
	   $('#tabs-messages').on('click', '.imgUserBoxright, .imgUserBoxleft', function(e) { 									
				 var username = $(this).attr('username'); 
				 location.href ='/user/' + username ;									
			});
			
	   $('#tabs-messages').on('click', '.replyMsg', function(e) { 							
				 var user = $(this).attr('to') ? $(this).attr('to') :  $(this).attr('from')
				 location.href ='/messages/send?user=' + user;									
			});	
	   $('#menu-account').on('click', '.replyMsg', function(e) { 							
				 var user =  $('#title-username').attr('user_account_id')
				 location.href ='/messages/send?user=' + user;									
			});			   
  }
},

emoticons: {
  init: function() {
	  
	 $('.comment').emoticonize();		
	 $('.send-message #menu-emoticons .css-emoticon').on('click', function(e)
		{ 
			
		   var emoticon = e.target.getAttribute('data-tag');	
		   $('#msg').focus().val($('#msg').val() + '/// ' + emoticon + ' /// ');
		  
		})	 
  }
},

popups: {
  init: function() {  
    ;(function($) {
        // popup windows register-login of the user 
        $(function() {
            $('.no-logged').on('click', function(e) {
               
                e.preventDefault();                   
                $('#window-login-register').bPopup({
                
                    easing: 'easeOutBack', 
					speed: 450,
					transition: 'slideDown'                   
                });

            });
        }); 
        $(function() {
            $('#clear_msg_send').on('click', function(e) {
               
                e.preventDefault();                              
                $('#popup-confirm-clearsendmsgs').bPopup({
                
                    easing: 'easeOutBack',
					speed: 450,
					transition: 'slideDown'                   
                });
               
            });

        });
        
        $(function() {
            $('#clear_msg_receive').on('click', function(e) {
               
                e.preventDefault();                              
                $('#popup-confirm-clearreceivemsgs').bPopup({
                  
                    easing: 'easeOutBack',
					speed: 450,
					transition: 'slideDown'                   
                });
               
            });

        });
        
    })(jQuery);
    
  }
},

ajaxUsers: {
  init: function() {
	  
	$('#menu-account').on('click', '#sendInvitation', function(e) {              
									
			 var idProfile = $(this).attr('idprofile');
			 var idAuthenticUser= $(this).attr('authenticUser');	
			 $.api.put('user/profile/'+idAuthenticUser+'/?sendinvitation', JSON.parse('{"idProfile":"'+idProfile+'"}')).success(function(response) {			   
			   
			
			    $.notification(gettext('The request has been sent successfully'), 'success');
		 		
									 
			 }).error(function(response) {				
				  
				  $.notification(jQuery.parseJSON(response.responseText).detail, 'warning');  
			 }); 									
	 }); 
	
	$('#profile-form').ajaxForm({
     
      beforeSend:  function (xhr){
		  
		     if(!($('#profile_picture').val().match(/\.(jpe?g|png|gif)$/))  && !($('#profile_picture').val() == '') )
			  {			  
				$.notification(gettext('Invalid type file , allowed [png | gif | jpg | jpeg]'), 'error');
				xhr.abort();  
			  }	              
            },
      success: function(response) {
         $.notification(gettext('Changes saved'), 'success');	
      },
      error: defaultErrorCallback,     
      url: $.api.url +'user/profile/'+$('#profile-form').attr('authenticUser')+'/?updateProfile',
      dataType: 'json',
    
    
      data: $(this).serializeArray(), 
      type:  'PUT',   
      
    }); 
    
    $('.footer-link-img a').click(function() { 
    
      $.api.put('user/profile/'+$(this).attr('authenticUser')+'/?removeFile').error(function(xhr) {
		  
		defaultErrorCallback(xhr);
      
      }).success(function(response) {
		  
		  window.location.reload()	
		  
      });		 
		return false; 
	});
	
	$('#register').submit(function() { 	
		
		  var postData = $(this).serializeArray();		
						
		  $.api.post('user/', postData).success(function(response) {			
			    
			    location.href = "accounts/register/complete/"		    			
									 
		  }).error(function(response) {
			
			  defaultErrorCallback(response);
		  });				
		
	    return false; 
	});
	
	$('#received, #menu-account').on('click','.addBlackList', function(e) {              
				
		  var idFrom= $(this).attr('from');			
		  var idAuthenticUser= $(this).attr('authenticUser');						
		  $.api.put('user/profile/'+idAuthenticUser+'?addBlackList', JSON.parse('{"idfrom":"'+idFrom+'"}')).success(function(response) {		
			 
			   $.notification(gettext('The user has been added to the blacklist'),'success');	 		
									 
		  }).error(function(response) {
			
			    $.notification(jQuery.parseJSON(response.responseText).detail,'success');		
		  });						
	});	
	
    $('#tabs-contacts').on('click', '.btnremoveblacklist ', function(e) {              
									
				 var iduser = $(this).attr('iduser');
				 var idAuthenticUser= $('#tabs-contacts').attr('authenticUser');	
				 $.api.put('user/profile/'+idAuthenticUser+'/?removeBlacklist',JSON.parse('{"iduser":"'+iduser+'"}')).success(function(response) {		
								
					  $.notification(gettext('The user has been eliminated from the blacklist'),'success');
					  $("#blackuserid" + iduser).fadeOut(300, function() { $(this).remove(); });													
											 
				  }).error(function(xhr) {
					   alert('error');
				  });									
			});
		
	jQuery(function($) {
		  $('#blacklist')			  
			.show(1000, function() {				
				 var idAuthenticUser= $('#tabs-contacts').attr('authenticUser');			 
				 $.api.get('user/profile/'+idAuthenticUser+'?_accept=application/json').success(function(response) {		
							var tmp = '';	
							$.each(response.blacklist, function(i, profile) {						
									
								tmp +=  '<li id="blackuserid'+profile.id+'" >\
										  <a href="/user/'+profile.user.username+'/">'+profile.user.username+'</a>\
										  <span class="btnremoveblacklist pointer" iduser='+profile.id+'  >\
											 ('+gettext('Remove')+' )\
										  </span>\
								         </li>';					
								
							});	
							$(tmp).appendTo('#ul_blacklist');														
											 
				  }).error(function(xhr) {
					   alert('error');
				  }); 
                  			
				  		
			})		
	     });
	     
	 $('#tabs-contacts, #menu-account').on('click', '.removContact', function(e) {              
									
				 var iduser = $(this).attr('removecontactid'); 
				 $.api.put('user/removecontact',JSON.parse('{"iduser":"'+iduser+'"}')).success(function(response) {		
								
					  
					  $.cookie('show_delcontact_success', 'true');
					  location.reload()													
											 
				  }).error(function(xhr) {
					   alert('error');
				  });									
			}); 
	     
	 jQuery(function($) {
		  $('#contacts')		
			.show(1000, function() {				
					 
				 $.api.get('user/getcontacts?_accept=application/json').success(function(response) {
					 
					  if (!response.contacts.length)
					  {
					     $(	
						    '<p>'+ gettext('You have no contacts yet.') +'</p>'					
						  ).appendTo('#ul_contacts');
					  }
					 else
					  { 
						var tmp = '';	
						$.each(response.contacts, function(i, profile) {
							
							var photo = profile.profile_picture ? "http://cdn1.socialchan.com/files/"+profile.profile_picture : "http://cdn1.socialchan.com/media/images/users/user2.png";												
							tmp +='<li id="contactsid'+profile.id+'" >\
									   <img  username="'+ profile.user.username +'" class="imgUserContact pointer" src="'+ photo +'" alt="Profile photo" height="62" width="62"><br>\
									   <a href="/user/'+profile.user.username+'/">'+profile.user.username+'</a>\
									   <img removecontactid='+profile.id+' class="pointer removContact" src="http://cdn1.socialchan.com/media/images/famfamfam/icons/cancel.png" title="'+gettext('Remove contact')+'"  height="17" width="17">\
							       </li>';					
							
						});	
						$(tmp).appendTo('#ul_contacts');
						
					   }															
											 
				  }).error(function(xhr) {
					   alert('error');
				  }); 
                  			
				  		
			})		
	     });
	     
	jQuery(function($) {
		  $('#posts')		
			.show(1000, function() {				
					 
				 $.api.get('user/getpostsbyusers?username='+$('#title-username').attr('username')+'&_accept=application/json').success(function(response) {					 
					
					 if (!response[0].length)
					  {
					     $(	
						    '<p>'+ gettext('No posts yet.') +'</p>'					
						  ).appendTo('#ul_posts');
					  }
					 else
					  {
						var tmp = '';  
					    $.each(response[0], function(i, post) {
								tmp +='<li>\
										   <a href="'+post.link+'">'+gettext(post.thread__section__name)+'</a>&nbsp;&mdash;\
										   '+post.message.slice(0,100).replace(/\//g," ")+'\
								       </li></br>';						
							});	
							
						 $(tmp).appendTo('#ul_posts');	
					  }	
				
						 
				  }).error(function(xhr) {
					   alert('error');
				  }).complete(function(xhr) {
						 $('.comment').emoticonize();	
					  });; 
                  			
				  		
			})		
	     });
	     
	 jQuery(function($) {
		  $('#anonymous_posts')		
			.show(1000, function() {					
					 
				 $.api.get('user/getanonymouspostsbyusers?_accept=application/json').success(function(response) {					 
					
					 if (!response[0].length)
					  {
					     $(	
						    '<p>'+ gettext('No anonymous posts yet.') +'</p>'					
						  ).appendTo('#ul_anonymous_posts');
					  }
					 else
					  {
						var tmp = '';  
						var charreplace="/"
					    $.each(response[0], function(i, post) {
								tmp +='<li>\
										   <a href="'+post.link+'">'+gettext(post.thread__section__name)+'</a>&nbsp;&mdash;\
										   '+post.message.slice(0,100).replace(/\//g," ")+'\
								       </li></br>';					
								
							});
						$(tmp).appendTo('#ul_anonymous_posts');	
					  }	
				
						 
				  }).error(function(xhr) {
					   alert('error');
				  }).complete(function(xhr) {
						 $('.comment').emoticonize();	
					  });; 
                  			
				  		
			})		
	     });
	     
	 jQuery(function($) {
		  $('#groups')		
			.show(1000, function() {					
					 
				 $.api.get('section/user/'+$('#title-username').attr('username')+'/?_accept=application/json').success(function(response) {					 
					
					 if (!response.length)
					  {
					     $(	
						   '<p>'+ gettext('No groups created yet.') +'</p>'					
						  ).appendTo('#ul_groups');
					  }
					 else
					  {
						  var tmp = '';    
					      $.each(response, function(i, section) {						
								tmp +='<li class="removsection"  id="sectionid'+section.id+'" >\
										  <a href="/'+section.slug+'/">/'+section.slug+'/'+gettext(section.name)+'</a>\
										  <img removesectionid='+section.id+' class="pointer imgremovsection" src="http://cdn1.socialchan.com/media/images/famfamfam/icons/cancel.png" title="'+gettext('Remove group')+'"  height="17" width="17">\
								       </li>';								
							});
							
						$(tmp).appendTo('#ul_groups');		
							
						 $(".imgremovsection").hide();
						 $(".removsection")
							  .mouseover(function() {										
								$( "img:first", this ).show();
							  
							  })
							  .mouseout(function() {									  
								$( "img:first", this ).hide()
							  });		
					  }					
						 
				  }).error(function(xhr) {
					   alert('error');
				  });                			
				  		
			})		
	     });  
	     
	     
	$('#tabs-activity').on('click', '.imgremovsection', function(e) {              
									
				 var idsection = $(this).attr('removesectionid');
				 $.api.del('section',JSON.parse('{"idsection":"'+idsection+'"}')).success(function(response) {								
					  
					  $.notification(gettext('The group was deleted successfully'),'success');	
					  $("#sectionid" + idsection).fadeOut(300, function() { $(this).remove(); });													
											 
				  }).error(function(xhr) {
					   alert('error');
				  });									
			});      
	     
	 jQuery(function($) {
		  $('#block-invitation-contacts')		
			.show(1000, function() {				
					 
				 $.api.get('user/profile/?getcontactinvitation&_accept=application/json').success(function(response) {
					 if (!response.length)
					  {
					     $(	
							'<p>'+ gettext('You have no invitation yet.') +'</p>'					
						  ).appendTo('#ul_invitation_contacts');
					  }
					 else
					  {
						var tmp = '';    
					    $.each(response, function(i, objuser) {
								tmp +='<li id="invitationcontactid'+objuser.id+'" >\
										  <h2>\
											 <a href="/user/'+objuser.user.username+'/">'+objuser.user.username+'</a>\
											 <img notacceptiduser='+objuser.id+' class="pointer btnNotAcceptContact" src="http://cdn1.socialchan.com/media/images/famfamfam/icons/cancel.png" title="'+gettext('Not accept')+'"  height="17" width="17">&nbsp;&nbsp;&nbsp;<img acceptiduser='+objuser.id+' class="pointer btnAcceptContact" src="http://cdn1.socialchan.com/media/images/famfamfam/icons/accept.png" title="'+gettext('Accept')+'"  height="17" width="17">\
										  </h2>\
								      </li>';					 
							});	
						$(tmp).appendTo('#ul_invitation_contacts');	
					  }																					
											
				  }).error(function(xhr) {
					   alert('error');
				  }); 
                  			
				  		
			})		
	     });
	     
	$('#block-invitation-contacts').on('click','.btnAcceptContact',function() {	
		
		var iduser=  $(this).attr('acceptiduser');	
		var idAuthenticUser= $('#block-invitation-contacts').attr('authenticUser');	
			 
		$("#invitationcontactid" + iduser ).fadeOut(300, function() { $(this).remove(); });  	
		$.api.put('user/profile/'+idAuthenticUser+'/?acceptContact', JSON.parse('{"iduser":"'+iduser+'"}')).success(function(response) {	
			
			 $.notification(gettext('The user has been added to your contact list'),'success');		 	
									 
		}).error(function(response) {
			
			  alert('no funciono');		
		});
				 	
									 
	 }).error(function(response) {
			
			  alert('no funciono');		
	 });
	 
	$('#block-invitation-contacts').on('click','.btnNotAcceptContact',function() {	
			
		var iduser=  $(this).attr('notacceptiduser');
		var idAuthenticUser= $('#block-invitation-contacts').attr('authenticUser');	
				 
		$("#invitationcontactid" + iduser).fadeOut(300, function() { $(this).remove(); });  
		$.api.put('user/profile/'+idAuthenticUser+'/?denyinvitation', JSON.parse('{"iduser":"'+iduser+'"}')).success(function(response) {				
			
			 $.notification(gettext('The user will not be added to the contact list'),'success');			 	
									 
		}).error(function(response) {
			
			  alert('no funciono');		
		});			 	
									 
	 }).error(function(response) {
			
			  alert('no funciono');		
	 });	
	
	$('#login').submit(function() { 	
		
		  var postData = $(this).serializeArray();		
						
		  $.api.post('user/login',postData).success(function(response) {
			
				window.location.reload()			    			
									 
		  }).error(function(response) {
			
			  defaultErrorCallback(response);
		  });				
		
	    return false; 
	});
	
	$('#logout').click(function() {	  	
						
		  $.api.post('user/logout').success(function(response) {
			
				window.location.reload()			    			
									 
		  }).error(function(response) {
			
			 
			  defaultErrorCallback(response);
		  });				
		
	    return false; 
	});  
	
	$('#change_pass_form').on('submit', function(e) {              
         e.preventDefault()
		 $.api.post('user/changepass/',$(this).serializeArray()).success(function(response) {								
			  
			  $.notification(gettext('Changes saved'),'success');														
									 
		  }).error(function(response) {
			   defaultErrorCallback(response);
		  });									
	});
	
	$('#del_account_form').on('submit', function(e) {              
         e.preventDefault()
		 $.api.del('user/delaccount/',$(this).serializeArray()).success(function(response) {								
			  
			  location.reload();	
			 											
									 
		  }).error(function(response) {
			    defaultErrorCallback(response);
		  });									
	}); 
	 
  }
},

ajaxMessages: {
  init: function() {	
    $('#send_message').submit(function() { 			
		
		  var postData = $(this).serializeArray();	
				
		  $.api.post('message/sendmessage/', postData).success(function(response) {			   
			   
			   $.cookie('show_msg_success', 'true');
			   location.href ='./#sent' ;		 		
									 
		  }).error(function(response) {
			
			  defaultErrorCallback(response);
		  });				
		
	    return false; 
	});
	
	jQuery(function($) {
		  $('#tabs-messages')		
			.show(1000, function() {			
				 function insermsgsents(pageNumber) {					 
					  var current_page =  pageNumber ? pageNumber : 1	
					  $("#msg-sent").html("");						  		
					  $.api.get('message/msgsentuser/?page='+current_page+'&_accept=application/json').success(function(response) {		
						  		var tmp_msgs = '';	
							    $.each(response.objects, function(i, msg) {
																
									var photo = msg.to.profile_picture ? "http://cdn1.socialchan.com/files/"+msg.to.profile_picture : "http://cdn1.socialchan.com/media/images/users/user2.png"							 				   
									tmp_msgs += '<div class="msgbox'+ msg.id +'">\
										 <div  username="'+ msg.to.user.username +'" class="imgUserBoxright" >\
										   <img class="imgUser" src="'+ photo +'" alt="Profile photo" height="62" width="62"> \
										   <div class="textImgUser">'+ msg.to.user.username +'</div>\
										 </div>\
										  <div class="triangle-obtuse right-t comment">\
											  <div class="dateMsg" >\
												 <span id="pub_date_msg">' + msg.pub_date + '</span>\
											  </div> \
											  <div class="textMsg">' +  msg.msg_html + '</div>\
											  <div class="footerMsg" >\
												 		<span to='+msg.to.id +' class="msgIcon replyMsg"><img  class="largerIcon" src="http://cdn1.socialchan.com/media/images/famfamfam/icons/email2.png" title=""> '+ gettext("Send another message") +' </span>\
														<span id-msg='+msg.id+' class="msgIcon msgDel"><img  class="largerIcon" src="http://cdn1.socialchan.com/media/images/famfamfam/icons/cross2.png" title="">'+ gettext("Delete message") +' </span>\
											  </div>\
										   </div>\
										 </div>';
								});							
								$( tmp_msgs ).appendTo('#msg-sent');
								$(function() {
								   $('#selector-sent').pagination({
										items:response.num_page,									
										displayedPages: 8, 
										cssStyle: 'light-theme',
										currentPage: current_page,
										onPageClick: function(pageNumber){insermsgsents(pageNumber)},										
										
									  });
								  });
					          			  							
												 
					  }).error(function(xhr) {
						   alert('error');
					  }).complete(function(xhr) {
						 $('.comment').emoticonize();	
					  });  
                 } 			
				 insermsgsents(0); 
				 
				 
				 function insermsgrecv(pageNumber) {
					 
					  var current_page =  pageNumber ? pageNumber : 1	
					  $("#msg-received").html("");				
					  $.api.get('message/msgreceiveduser/?page='+current_page+'&_accept=application/json').success(function(response) {								
								var tmp_msgs = '';
							    $.each(response.objects, function(i, msg) {																		     
									var checked =  msg.msg_read  ? 'checked' : ' ';		
									var photo = msg.fromThe.profile_picture ? "http://cdn1.socialchan.com/files/"+msg.fromThe.profile_picture : "http://cdn1.socialchan.com/media/images/users/user2.png";										
								    tmp_msgs += '<div class="msgbox'+ msg.id +'">\
												  <div  username="'+ msg.fromThe.user.username +'" class="imgUserBoxleft">\
													 <img class="imgUser" src="'+ photo +'" alt="Profile photo" height="62" width="62"> \
													 <div class="textImgUser">'+ msg.fromThe.user.username +'</div>\
												  </div>\
												  <div  id="msgcontent'+ msg.id +'"  class="triangle-obtuse read-'+ msg.msg_read +' left-t comment ">\
													  <div class="dateMsg" >\
														 <span id="pub_date_msg">' + msg.pub_date + '</span>\
													  </div> \
													  <div class="textMsg" >' +  msg.msg_html + '</div>\
													  <div class="footerMsg">\
															<span class="msgIcon"><input id-msg='+msg.id+' class="largerCheckbox checkboxMsg" type="checkbox" '+checked+'  name="" value="">'+ gettext("Mark read") +' </span>\
															<span  from='+msg.fromThe.id+' class="msgIcon replyMsg"><img  class="largerIcon" src="http://cdn1.socialchan.com/media/images/famfamfam/icons/email2.png" title=""> '+ gettext("Reply") +' </span>\
															<span id-msg='+msg.id+' class="msgIcon msgDel"><img  class="largerIcon" src="http://cdn1.socialchan.com/media/images/famfamfam/icons/cross2.png" title="">'+ gettext("Delete message") +' </span>\
															<span from='+msg.fromThe.id+' class="msgIcon addBlackList"><img  class="largerIcon" src="http://cdn1.socialchan.com/media/images/famfamfam/icons/user_delete2.png" title="">'+ gettext("Add to blacklist") +' </span>\
													   </div>\
												  </div>\
												</div>';
																
								});	
							
								$( tmp_msgs ).appendTo('#msg-received');
								$(function() {
								   $('#selector-received').pagination({
										items:response.num_page,									
										displayedPages: 8, 
										cssStyle: 'light-theme',
										currentPage: current_page,
										onPageClick: function(pageNumber){insermsgrecv(pageNumber)},										
									  });
								  });									 	 						
							   	 
					  }).error(function(xhr) {
						   alert('error');
					  }).complete(function(xhr) {
						 $('.comment').emoticonize();	
					  });      
						
                 } 			
				 insermsgrecv(0);
			
				   		
			})	
	    });	    

	
	$('#received').on('click','.msgDel', function(e) {              
				
			var idmsg= $(this).attr('id-msg');						
			$.api.del('message/deletemsgreceive/', JSON.parse('{"idmsg":"'+idmsg+'"}')).success(function(response) {			   
			   
			  $(".msgbox" + idmsg).fadeOut(300, function() { $(this).remove(); });
			  $.notification(gettext('The message has been removed.'), 'success');		 		
									 
		  }).error(function(response) {
			
			  alert('no');	
		  });						
	});
	
	$('#sent').on('click','.msgDel', function(e) {              
				
			var idmsg= $(this).attr('id-msg');						
			$.api.del('message/deletemsgsend/', JSON.parse('{"idmsg":"'+idmsg+'"}')).success(function(response) {			   
			   
			  $(".msgbox" + idmsg).fadeOut(300, function() { $(this).remove(); });
			  $.notification(gettext('The message has been removed.'), 'success');		 		
									 
		  }).error(function(response) {
			
			  alert('no');	
		  });						
	});	
	
	$('#confirm_clear_msg_send').on('click', function(e) {   			
							
		  $.api.del('message/clearsendall/').success(function(response) {			   
			   
			  $("#msg-sent").fadeOut(300, function() { $(this).remove(); });
			  $.notification(gettext('The message has been removed.'), 'success');		 		
									 
		  }).error(function(response) {
			
			  alert('no');	
		  });						
	});
	
	$('#confirm_clear_msg_receive').on('click',function(e) {  		
							
		  $.api.del('message/clearreceiveall/').success(function(response) {			   
			   
			  $("#msg-received").fadeOut(300, function() { $(this).remove(); });
			  $.notification(gettext('The message has been removed.'), 'success');		 		
									 
		  }).error(function(response) {
			
			  alert('no');	
		  });						
	});
	
   $('#received').on('click','.checkboxMsg',function() {
					
		var checkbox = $(this);			 
		if (checkbox.is(':checked')) {
			var check = 'true';
			$("#msgcontent"+checkbox.attr('id-msg')).css("background-color", "#F5D0A9");			
		} else {
			var check = '';			
			$("#msgcontent"+checkbox.attr('id-msg')).css("background-color", "#FCE79B");
		}
		
		$.api.put('message/changestateread/', JSON.parse('{"idmsg":"'+checkbox.attr('id-msg')+'","value":"'+check+'" }')).success(function(response) {			   
			   
			 	
									 
		}).error(function(response) {
			
			  alert('no funciono');		
		});
	 });   	  
    
  }
},

ajaxBoard: {
  init: function() {
	$('#search_sections').submit(function() {		
		$('#ul_search_sections').empty();
		if(($('#q').val().length > 0))
			{  
				if ($('#checkbox_search').is(":checked"))
					{
					  var group= $('#checkbox_search').val();
					}
				else{	var group= 'all';   }
				
				  $.api.get('section/search/'+group+'?q='+$('#q').val()+'&_accept=application/json').success(function(response) {										
							var tmp = '';    				
							$.each(response, function(i, item) {						   
								tmp += '<li><a href="../'+item.slug+'/">/'+item.slug+'/'+item.name+'</a></li>';
							});
							$(tmp).appendTo('#ul_search_sections');
											 
				  }).error(function(xhr) {
					   alert('error');
				  });		
			}
		
	    return false; 
	}); 
	
	$('#new_section').submit(function() { 	
		
		var postData = $(this).serializeArray();		
		var slug = $('#slug', this).val();
					 
				
		  $.api.post('section/',postData).success(function(response) {		
						   
			  location.href ='/' + slug ;			  			
									 
		  }).error(function(response) {
			
			  defaultErrorCallback(response);
		  });				
		
	    return false; 
	});    
  },
},
});

$(function() {
  var l = ['emoticons', 'settings', 'popups', 'ajaxBoard', 'ajaxMessages', 'ajaxUsers','messages', 'users'];
  $.each(l, function(i, item) {
    app[item].init();
  });
});

window.app = app;

})(window, jQuery);
