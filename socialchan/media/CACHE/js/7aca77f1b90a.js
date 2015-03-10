/**
 * Copyright (c) 2011, Paul Miller.
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function(window, $, undefined) {
"use strict";

var app = {};

$.extend({
  settings: function(name, value) {
    var elem = $('body');
    if (typeof name === 'undefined') {
      return elem.attr('class').split(' ');
    } else if (typeof value === 'undefined') {
      if (name === 'style') {
        return $('html').attr('id');
      } else {
        return elem.hasClass(name);
      }
    } else {
      if (name === 'style') {
        $('html').attr('id', value)
      } else {
        elem.toggleClass(name)
      }
      switch (name) {
        case 'style':
          $('html').attr('id', value);
          break;
        default:
          elem.toggleClass(name);
          break;
      }
      var type = 'post';
      var url = 'setting/';
      var data = {'key': name, 'value': value};

      if (value === 'false' || value === false || value === '') {
        value = '';
        type = 'del';
        url += data.key;
      }
      type = type.toLowerCase();
      $.api[type](url, data).error(function(xhr) {
        $.notification('error', gettext('Settings error'));
      });
    }
  }
});

$.fn.hasScrollBar = function() {
  return this.get(0).scrollHeight - 1 > this.height();
};

// pre-localize messages because of django bug
var m = [
  'Reason', 'Reply', 'Message is too long.', 'Full text', 'Thread',
  'Post', 'hidden', 'hide', 'Replies', 'New message in thread ', 'Post not found'
];
for (var i = 0, l = m.length; i < l; i++) {
  gettext(m[i]);
}

// Recaptcha focus bug
if (typeof Recaptcha !== 'undefined') {
  Recaptcha.focus_response_field = function() {};
}

var curPage = (function() {
  // page detector
  var data = {
    type: $('#container').attr('role'),
    cache: {}
  };

  switch (data.type) {
    case 'page':
    case 'posts':
    case 'threads':
      data.section = window.location.href.split('/')[3];
      break;
    case 'thread':
      data.section = window.location.href.split('/')[3];
      data.type = 'thread';
      data.cache.thread = $('.thread');
      data.cache.first = $('.post:first');
      data.thread = getThreadId(data.cache.thread);
      data.first = getPostPid(data.cache.first);
      break;
    default:
      break;
  }

  return data;
})();


function isjQuery(object) {
  return object instanceof jQuery;
}

/**
 * Tools for get parameter url.
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
/**
 * Tools for textareas.
 */
function PostArea(element) {
  this.textarea = $(element)[0];
}

$.extend(PostArea.prototype, {
  // inserts text in textarea and focuses on it
  insert: function(text) {
    var textarea = this.textarea;
  	if (textarea) {
  		if (textarea.createTextRange && textarea.caretPos) { // IE
  			var caretPos = textarea.caretPos;
  			if (caretPos.text.charAt(caretPos.text.length-1) == ' ') {
  			  caretPost.text = text + ' ';
  			} else {
  			  caretPos.text = text;
  			}
  		} else if (textarea.setSelectionRange) { // Firefox
  			var start = textarea.selectionStart;
  			var end = textarea.selectionEnd;
  			textarea.value = textarea.value.substr(0, start) + text + textarea.value.substr(end);
  			textarea.setSelectionRange(start + text.length, start + text.length);
  		} else {
  			textarea.value += text + " ";
  		}
  		textarea.focus();  		
  	}
  },

  // wraps selected text in tagStart text tagEnd
  // and inserts to textarea
  wrap: function(tagStart, tagEnd, eachLine) {
    var textarea = this.textarea;
    var size = (tagStart + tagEnd).length;

    if (typeof textarea.selectionStart != "undefined") {
      var v = textarea.value;
      var begin = v.substr(0, textarea.selectionStart);
      var selection = v.substr(textarea.selectionStart, textarea.selectionEnd - textarea.selectionStart);
      var end = v.substr(textarea.selectionEnd);
      textarea.selectionEnd = textarea.selectionEnd + size;
      if (eachLine) {
        selection = selection.split('\n');
        selection = $.map(selection, function(x) {
          return tagStart + x;
        }).join('\n');
        textarea.value = begin + selection + end;
      } else {
        textarea.value = begin + tagStart + selection + tagEnd + end;
      }
    }
    textarea.focus();
  }
});

function getThreadId(thread) {
  return parseInt(thread.attr('data-id'), 10);
}

function getPostId(post) {
  return parseInt(post.attr('data-id'), 10);
}

function getPostPid(post) {
  return parseInt(isjQuery(post) ? post.attr('data-pid') : post['data-pid'], 10);
}

function getPostLinkPid(postlink) {
  return postlink.text().match(/>>(\/\w+\/)?(\d+)/)[2];
}

function getPostNumberPid(postnumber) {
  return postnumber.text();
}

function getFileId(file) {
  return file.attr('id').replace('file', '');
}

/**
 * Post container class.
 *
 * Used to push post data in various 'button-click' events.
 */
function PostContainer(span, post) {
  if (!isjQuery(span)) {
    span = $(span);
  }
  var isposts = (curPage.type === 'posts');

  this.span = span;
  this.post = post ? (!isjQuery(post) ? post : $(post)) : span.closest('.post');
  if (curPage.type === 'thread') {
    this.thread = curPage.cache.thread;
    this.first = curPage.cache.first;
  } else {
    this.thread = this.span.closest('.thread');
    this.first = this.thread.find('.post:first-child');;
  }
  this.id = getPostId(this.post);
  this.text_data = {
    'section': curPage.section,
    'first': getPostPid(this.first),
    'pid': getPostPid(this.post)
  };
}

function randomString(length) {
  function randomChar() {
    var n = Math.floor(Math.random() * 62);
    if (n < 10) {
      return n; //1-10
    } else if (n < 36) {
      return String.fromCharCode(n + 55);  // A-Z
    } else {
      return String.fromCharCode(n + 61);  // a-z
    }
  }
  var s = '';
  while(s.length < length) {
    s += randomChar();
  }
  return s;
}

function getCurrentTimestamp() {
  return (new Date()).getTime().toString().slice(0, 10);
}

function checkForSidebarScroll() {
  var bodyHeight = $(window).height();
  var side = $('#sidebar');
  var sideHeight = side.height();

  if (sideHeight > bodyHeight) {
    side.height(parseInt(bodyHeight, 10)).css('overflow-y', 'scroll');
  }
}

// Changes all labels to input placeholders.
function labelsToPlaceholders(list) {
  for (var i=0; i < list.length; i++) {
    var x = list[i];
    var t = $('label[for="' + x + '"]').text();
    var dt = $('.' + x + '-d').find('dt').hide();
    var dd = $('#' + x);
    dd.attr('placeholder', t);
    dd.placeholder(t);
  }
}

// Manipulates elements. Used for user styles.
function manipulator(arr) {
  var cases = {
    after: function(from, to) {
      $(from).remove().insertAfter(to)
    },
    before: function(from, to) {
      $(from).remove().insertBefore(to);
    }
  };

  for (var i in arr) {
    for (var e = 0, l = arr[i].length; e < l; e++) {
      cases[i](arr[i][e][0], arr[i][e][1])
    }
  }
}

// Query string parser.
function parseQs() {
  var d = location.href.split('?').pop().split('&');
  var parsed = {};
  var tmp;

  for (var i = 0, l = d.length; i < l; i++) {
    tmp = d[i].split('=');
    parsed[tmp[0]] = tmp[1];
  }

  return parsed;
}

function slideRemove(elem) {
  if (typeof elem !== 'object') {
    elem = $(elem);
  }
  elem.slideUp(600, function() {
    $(this).remove();
  });
}

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
board: {
  queryString: parseQs(),
  postButtons: {},

  init: function() {
	 
   //esta funcion inicializa el plugin que sirve para visualizar muchas imagenes por post	
   jQuery(function($) {
		  $('.threads')		
			.show(1000, function() {				
					//inicializa la foto galeria  
				$(document).ready(function() { 
					$('.gallery').tn3({ 
					 autoplay:false,
					 height:230,
					 width:230,   
					 skinDir: '/media/tn3/skins'         
			         }); 
				});
    
			})		
	     });  
	  
	  
    var textArea = new PostArea('#message');
    var set = $.settings('hideSectGroup');
    var pass = $.cookie('password');
    var buttons = {
      feed: {storeText: true},
      hidden: {
        onInit: function(data) {
          if (data.span.hasClass('remove')) {
            this.onAdd(data);
          }
        },

        onAdd: function(data) {
          var first = false;
          var post;
          var hideClass = 'hidden';
          if (data.id === getPostId(data.first)) {
            data.thread.addClass(hideClass);
            post = data.first;
            first = true;
          } else {
            post = data.post;
          }
          post.addClass(hideClass);
          var t = first ? gettext('Thread') : gettext('Post');
          var s = $('<span/>').addClass('hide-msg').text(
            t + ' #'+ getPostPid(post) +
            ' ' + gettext('hidden') + '.'
          ).appendTo(post);
          var b = post.find('.post-icon').appendTo(s);
        },

        onRemove: function(data) {
          var p;
          var post;
          if (data.id === getPostId(data.first)) {
            data.thread.removeClass('hidden');
            post = data.first;
          } else {
            post = data.post;
          }
          post.find('.post-icon').appendTo(post.find('header'));
          post.find('.hide-msg').remove();
          post.removeClass('hidden');
        }
      }
    };

    if (pass) {
      $('.password-d #password').val(pass);
    }

    $('#container').delegate('.password-d #password', 'change', function(event) {
      $.cookie('password', this.value);
      $.settings('password', this.value);
    });

    function removeIfPreview(element) {
      element = isjQuery(element) ? element : $(element);
      element.remove();
      //console.log(element, element.parent())
    }

    for (var storageName in buttons) {
      var button = buttons[storageName];

      // Check if current button set is not blocked by user.
      if ($.settings('disable' + storageName)) {
        continue;
      }

      app.board.postButtons[storageName] = button;
      $('.threads').addClass('with' + storageName);
    }

    $('.bbcodes a').click(function(e) {
      e.preventDefault();
      var $this = $(this);
      var start = $this.data('tag');
      var end = $this.data('tagEnd');
      var isCode = $this.attr('class') === 'code';
      if (typeof end === 'undefined') {
        end = start;
      }

      textArea.wrap(start, end, isCode);
    });
    
    $('.go-back').on('click', function(e)
		{ 
			
		  window.history.back()
		  
		})

    // TODO: Toggleclass
    $('.threads').delegate('.post-icon', 'click', function(event) {
      event.preventDefault();
      var t = $(this);
      var cont = new PostContainer(t, t.closest('.post'));
      var span = cont.span;
      var post = cont.post;
      var postId = cont.id;
      var storageName = t.attr('data-storage');
      var current = app.board.postButtons[storageName];
      var apiLink = storageName + '/';

      if (span.hasClass('add')) {  // add
        span.removeClass('add').addClass('remove');
        $.api.post(apiLink, {value: postId}).error(defaultErrorCallback);
        if (current.onAdd) {
          current.onAdd(cont);
        }
      } else {  // remove
        span.removeClass('remove').addClass('add');
        $.api.del(apiLink + postId).error(defaultErrorCallback);
        if (current.onRemove) {
          current.onRemove(cont);
        }
      }
    });

    $('#container[role="storage"]').delegate('.post-icon', 'click', function() {
      event.preventDefault();
      var t = $(this);
      var postId = getPostId(t.closest('tr'));
      var storageName = t.attr('data-storage');
      var apiLink = storageName + '/';
      if (t.hasClass('add')) {
        t.removeClass('add').addClass('remove');
        $.api.post(apiLink, {value: postId}).error(defaultErrorCallback);
      } else {
        t.removeClass('remove').addClass('add');
        $.api.del(apiLink + postId).error(defaultErrorCallback);
      }
    });

    $('.storage-clear-icon').click(function(event) {
      $.api.del($(this).attr('data-storage'));
    });

    function previewPosts() {
      $('.threads').delegate('.postlink', 'mouseover', function(event) {
		
        var $this = $(this);
        var m = $this.attr('href').match(/(?:\/(\w+)\/)?(\d+)/);
        var globalLink = !!m[1] || !$('#post' + m[2]).length;
        var board = m[1] || curPage.section;
        var pid = m[2];
        var post = $this.closest('.post');
        var prevTree = post.hasClass('post-preview') ? post.parent() : false;
        var timestamp = getCurrentTimestamp();
        var id = 'preview-' + pid + '-' + timestamp;
        var doc = document.documentElement;
        var body = document.body;
        var top = event.clientY + (doc.scrollTop || body.scrollTop);
        var left = event.clientX + (doc.scrollLeft || body.scrollLeft) - doc.clientLeft + 1;

        if (globalLink) {
          //console.log('Searching the post', board, pid);
          var p = $('.post[data-pid="' + pid + '"]');
          if (p.length) {
            return p;
          }

          var url = 'post/' + board + '/' + pid + '?html=1';
          $.api.get(url).success(function(response) {
            createPreview(response.html, board, pid, true, prevTree);
          }).error(function(xhr) {
            $.notification( gettext('Post not found'),'error');
          });
        } else {
          createPreview($('#post' + pid).html(), board, pid, false, prevTree);
        }

        function createPreview(html, board, pid, globalLink, prevTree) {
          var treeid = 'tree' + board + pid;
          var previews = $('<div class="post-previews-tree"/>').attr('id', treeid);
          var tree = $('#' + treeid);
          var div = $(html).clone();
          var check = $(div.get(0));
          var outer = $('<article/>').addClass('post post-preview')
            .attr('id', id)
            .css({'top': top + 11 +'px', 'left': left + 'px'});
          var to;

          // remove icons
          div.find('.post-icon, .is_closed, .is_pinned').remove();
          // we've got post information through API, so
          // remove not necessary elements
          if (check.hasClass('post')) {
            //console.log('Global link', check);
            div = check.children();
          }

          if (globalLink) {
            div.find('.number a').attr('href', '/' + board + '/' + pid);
          }

          if (!$('#' + outer.attr('id')).length) {
            outer.append(div);
            if (prevTree) {
              outer.appendTo(prevTree);
            } else {
              previews.appendTo('.threads').append(outer);
            }
          }
        }

        function bindRemovePreview(link, id) {
          var prev = $('#' + id);
          var timeout;
          link = link.add(prev);
          //console.log('Binded preview remove', prev);

          link.mouseout(function() {
            timeout = window.setTimeout(function() {
              //prev.remove();
              removeIfPreview(prev);
            }, 300);
          }).mouseover(function() {
            window.clearTimeout(timeout);
          });
        }

        window.setTimeout(function() {
          bindRemovePreview($this, id);
        }, 200);
      });
    }

    if (!$.settings('disablePostsPreview')) {
      previewPosts();
    }
   
    $('.actions .removePosts .button').click(function(event) {
      event.preventDefault();     
      var $this = $(this);
      $this.next().toggle();
      $('.threads').toggleClass('deletingPosts');
    });

    $('#ban_ip').click(function(event) {
      var $this = $(this);
      var $input = $('<input type="text" id="ban_reason" name="ban_reason"/>')
        .attr('placeholder', gettext('Reason'));

      if ($this.attr('checked')) {
        $input.insertAfter('label[for="ban_ip"]');
      } else {
        $('#ban_reason').remove();
      }
    });

    // Posts deletion
    $('.threads').delegate('.post', 'click', function(event) {
      if (!$('.threads').hasClass('deletingPosts')) {
        return true
      };
      var $this = $(this);
      var password;
      var onlyFiles = !!$('#only_files').attr('checked');
      var banIp = !!$('#ban_ip').attr('checked');
      var deleteAll = !!$('#delete_all').attr('checked');
      var target = !onlyFiles ? $this : $this.find('.file, .filemeta');
      var url = !onlyFiles ?
          'post/' + target.data('id') :
          'file/' + getFileId(target.find('img'));
      password = $('.password-d #password').val();

      url += '?password=' + password;
      url += '&' + $('.removePosts').serialize();
      target.addClass('deleted');
      $.api.del(url).error(function(xhr) {
        $.notification($.parseJSON(xhr.responseText)['detail'],'error');
        target.removeClass('deleted');
      }).success(function(data) {
        if (onlyFiles) {
          slideRemove(target);
          return true;
        }
        // Deleting all user posts.
        if (deleteAll) {
          var t = target.find('.ip').text();
          $('.ip').filter(function() {
            return $(this).text() === t;
          }).each(function() {
            var post = $(this).closest('.post');
            post.addClass('deleted');
            slideRemove(post);
          });
        }

        // post is not first in thread
        if (target.prev().length !== 0) {
          slideRemove(target.add(target.find('img')));
        } else {
          if (curPage.type === 'thread') {
            window.location.href = './';
          }
          var thread = target.parent();
          thread.children().addClass('deleted');
          slideRemove(thread);
        }
      });
    });

    $('.threads').delegate('.number > a', 'click', function(e) {
		
      if (curPage.type === 'page' || curPage.type === 'thread') {
        if (!$.settings('disableQuickReply')) {
          var n = $('#post' + $(this).text());
          $('.newpost').insertAfter(n);
          
          if (curPage.type === 'page') {
            var thread_id = getThreadId(n.parent());
            var input = '<input type="hidden" value="' + thread_id + '" id="thread" name="thread" />';
            $('.newpost form').append(input);
            app.ajaxBoard.quickReplied = true;
          }
        }
        textArea.insert('>>' + e.target.innerHTML + ' ');
        return false
      } else {
        return true;
      }
    });

    // sidebar-related
    if (!set) {
      return false;
    }
    set = set.split(',');

    for (var i = 0, l = set.length; i < l; i++) {
      $('#list-group' + set[i]).slideToggle(0);
    }   
    
  }
},

settings: {
  init: function() {
    // those things depend on cookie settings
    var body = $('body');
    var qs = parseQs();
    var settings = $('#container[role="settings"]')
      .find('input[type="checkbox"], select');
    var style = $('html').attr('id');
    var dn = $('#enableDesktopNotifications').click(function() {
      $.notification.request();
    });

    if (!$.notification.checkSupport() || $.notification.check()) {
      dn.closest('dl').hide();
    }

    $('#style').val(style);

    settings.each(function() {
      var $this = $(this);
      if (body.hasClass($this.attr('id'))) {
        $this.attr('checked', true);
      }
    });

    settings.change(function(event) {
      var $this = $(this);
      var value = $this.val();
      var id = $this.attr('id');
      if ($this.attr('checked') !== undefined) {
        value = $this.attr('checked') ? true : '';
      }
      $.settings(id, value);
    });

    $('#sidebar .hide').click(function(event) {
      event.preventDefault();
      var key = 'hideSidebar';
      var value = !$.settings(k);
      $.settings(key, value);
      changes[key](value);
    });

    $('#sidebar h3').click(function(e) {
      var $this = $(this);
      var num = $this.attr('id').split('group').pop();
      var key = 'hideSectGroup';
      var set = $.cookie(key);
      var $ul = $('#list-group' + num);
      var hidden = (ul.css('display') === 'none');
      set = set ? set.split(',') : [];

      if (hidden) {
        var iof = set.indexOf(num);
        if (iof !== -1) {
          set.splice(iof, 1);
        }
      } else {
        set.push(num);
      }

      $.cookie(key, set);
      $ul.slideToggle(500, checkForSidebarScroll);
    });

    $('.toggleNsfw').click(function(event) {
      event.preventDefault();
      var bool = $('body').hasClass('nsfw') ? '' : true;
      $.settings('nsfw', bool);
    });

    $('.nsfw .threads').delegate('img', 'hover', function(event) {
      $(this).toggleClass('nsfw');
    });
    
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
		}
	});
    
    
    
  }
},

style: {
  init: function() {
    var style = $.settings('style');
    checkForSidebarScroll();
    $('.tripcode:contains("!")').addClass('staff');

    $(document).scroll(function() {
      var pxo = window.pageXOffset;
      var val = typeof pxo === 'number' ? pxo : document.body.scrollLeft;
      $('.sidebar').css('left', '-' + val + 'px');
    });

    if ($.settings('newForm')) {
      var styleInfo = {
        after: [
          ['.newpost input[type="submit"]', '.file-d'],
          ['.password-d', '.topic-d'],
          ['.file-d', '.message-d'],
        ]
      };

      labelsToPlaceholders(['username', 'email', 'topic', 'message', 'captcha']);
      $('.newpost').addClass('new-style')
      $('.empty').remove();
      manipulator(styleInfo);
    }

    $('.section .post:first-child').each(function(x) {
      var $this = $this;
      var href = $this.find('.number a').attr('href');
      var span = $('<span/>').addClass('answer')
        .html('[<a href="'+href+'">'+ gettext('Reply') +'</a>]');
      if ($this.find('.is_closed').length == 0) {
        span.insertBefore($this.find('.number'));
      }
    });

    // Force english keys in captcha
    $('#main').delegate('#recaptcha_response_field', 'keypress', function(event) {
      var key;
      if (event.which < 1040 || event.which > 1279) {
        return true;
      }
      event.preventDefault();
      switch(event.which) {
        case 1081: key = 'q'; break;
        case 1094: key = 'w'; break;
        case 1091: key = 'e'; break;
        case 1082: key = 'r'; break;
        case 1077: key = 't'; break;
        case 1085: key = 'y'; break;
        case 1075: key = 'u'; break;
        case 1096: key = 'i'; break;
        case 1097: key = 'o'; break;
        case 1079: key = 'p'; break;
        case 1092: key = 'a'; break;
        case 1099: key = 's'; break;
        case 1074: key = 'd'; break;
        case 1072: key = 'f'; break;
        case 1087: key = 'g'; break;
        case 1088: key = 'h'; break;
        case 1086: key = 'j'; break;
        case 1083: key = 'k'; break;
        case 1076: key = 'l'; break;
        case 1103: key = 'z'; break;
        case 1095: key = 'x'; break;
        case 1089: key = 'c'; break;
        case 1084: key = 'v'; break;
        case 1080: key = 'b'; break;
        case 1090: key = 'n'; break;
        case 1100: key = 'm'; break;
        default: return true;
      }
      event.target.value = event.target.value + key;
    });

    // images resize se cambio por que ahora se utiliza un plugin para visualizar muchas imagenes en un solo post
    //$('.threads, .postsResults').delegate('.file', 'click', function(event) {
      //event.preventDefault();
      //var $this = $(this);
      //var $children = $this.children();
      //var $post = $this.closest('.post');
      //var isResized = $post.hasClass('resized');

      //if (!isResized) {
        //$children.data('thumb', $children.attr('src'));
        //$children.attr('src', $this.attr('href'));
      //} else {
        //$children.attr('src', $children.data('thumb'));
      //}
      //$post.toggleClass('resized');
      //$post.parent().toggleClass('resized');
    //});

    $('.button').click(function(event) {
      $(this).toggleClass('active');
    });

    $('.expandImages').click(function(event) {
      event.preventDefault();
      $('.file').trigger('click');
    });

    $('.filterPosts .button').click(function(event) {
      var active = $(this).hasClass('active');
      $('.post').show();
      if (active) {
        var $checkbox = $('.filterPosts #filterImages');
        if ($checkbox.attr('checked')) {
          $checkbox.trigger('change');
        }
        $('.filterPosts .slider').trigger('slidechange');
      }
      $('.filterParams, .sliderInfo').toggle();
      $('.filterPosts .slider').toggle();
    });

    $('.filterPosts .slider')
      .slider({max: 15})
      .hide()
      .bind('slidechange', function() {
        var $posts = $('.post');
        var $slider = $('.filterPosts .slider');
        var value = $slider.slider('value');
        var $filtered = $posts.filter(function() {
          var pid = getPostPid(this);
          if (value === 0) {
            $posts.show();
            return false;
          }
          // Hide posts, that don't have answers
          if (!(pid in app.posts.map)) {
            return true;
          }

          // Hide posts with answers count less than value
          return app.posts.map[pid].length < value;
        });
        console.log(app.posts.map);
        console.log('Filtered posts with %s answers.', value);
        console.log($filtered);
        $filtered.hide();
    });

    $('.filterPosts #filterImages').change(function() {
      var posts = $('.post').filter(function() {
        return !$(this).find('.file').length;
      });
      var checked = this.checked;
      if (checked) {
        posts.hide();
      } else {
        posts.show();
      }
    });

    // strip long posts at section page
    $('.post .message').each(function() {
      var $this = $(this);
      if ($this.hasScrollBar()) {
        $this.css('overflow', 'hidden');
        var span = $('<span/>').addClass('skipped')
          .text(gettext('Message is too long.'))
          .appendTo($this.parent());
        var a = $('<a href="#showFullComment" class="skipped"/>')
          .text(gettext('Full text'))
          .click(function(event) {
            event.preventDefault();
            $this.css('overflow', 'auto');
            $(this).parent().remove();
          })
          .appendTo(span);
      }
    });

    // modpanel
    $('.ip').each(function(x) {
      var $this = $(this);
      $this.insertBefore($this.prev().find('.number'));
    });

    if (!style) {
      return false;
    }

    $('html').attr('id', style);

    if (style === 'klipton') {
      $('.thread').click(function(event) {
        var $this = $(this);
        $('.postlist').remove();
        $('.selected').removeClass('selected');
        if ($this.hasClass('selected')) {
          return false;
        }
        $this.addClass('selected');
        var $section = $('<section/>').addClass('postlist').appendTo('#main');
        var $post = $(this).find('.post').clone();
        $post.appendTo($section)
        return false;
      });
    }

    $('.kTabs').tabs();
  }
},

posts: {
  map: {},
  data: {},
  cache: {},

  init: function(selector) {
	 
    var posts = selector && typeof selector !== 'function' ?
      isjQuery(selector) ?
        selector :
        $(selector) :
      $('.post');
    var map = {};
    this.cache = {};

    for (var i = 0, l = posts.length; i < l; i++) {
      var post = posts[i];
      var $post = $(post);
      var $links = $post.find('.postlink').map(function() {
        return $(this);
      });
      var pid = getPostPid($post);

      // Initialize answers map.
      for (var j = 0, ll = $links.length; j < ll; j++) {
        var href = getPostLinkPid($links[j]);
        var targetSelector = '#post' + href;
        var $target = $(targetSelector);

        if (href in map) {
          if (map[href].indexOf(pid) !== 0) {
            map[href].push(pid);
          }
        } else {
          map[href] = [pid];
        }

        this.cache[href] = $target

        if (curPage.type === 'thread' && $target.length !== 0) {
          $target.attr('href', targetSelector);
        }
      }
    }

    this.initButtons();
    this.buildAnswersMap(map, true);
  },

  initButtons: function() {
    var $posts = $('.thread .post:first-child');
    var buttons = app.board.postButtons;

    $posts.each(function() {
      var post = $(this);
      var id = getPostId(post);

      for (var storageName in buttons) {
        var button = buttons[storageName];
        var $span = post.find('.post-icon[data-storage="' + storageName + '"]');
        var idInStorage = window.session[storageName].indexOf(id);

        if (idInStorage !== null && idInStorage >= 0) {
          $span.removeClass('add').addClass('remove');
        }

        if (button.onInit) {
          button.onInit(new PostContainer($span, post));
        }
      }
    });
  },

  buildAnswersMap: function(map, concat) {
    if ($.settings('disableAnswersMap')) {
      return false;
    }
    for (var i in map) {
      var links = [];
      var $cache = this.cache[i].find('.answer-map');
      var cacheExists = !!$cache.length;
      var $div = cacheExists ?
        $cache :
        $('<div class="answer-map"/>');
      var $post = $('#post' + i);
      var $skipped = $post.find('.skipped');

      for (var j = 0, ll = map[i].length; j < ll; j++) {
        var text = map[i][j];
        links.push('<a class="postlink" href="#post'+ text +'">&gt;&gt;'+ text +'</a>');
      }

      if (!cacheExists) {
        $div.html(gettext('Replies') + ':' + links.join(','));
      } else {
        $div.html($div.html() + ',' + links.join(','));
      }

      if ($skipped.length) {
        $div.insertBefore($skipped);
      } else {
        $post.append($div);
      }

      $div.insertBefore( + '.skipped');
      $('#post' + i).append();
    }

    if (concat) {
      for (var attr in map) {
        this.map[attr] = map[attr];
      }
    }
  }
},

hotkeys: {
  init: function() {
	  
    
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
			
	   $('#tabs-messages').on('click', '.replyMsg ', function(e) {              
								
				 var user = $(this).attr('to') ? $(this).attr('to') :  $(this).attr('from')
				 location.href ='/messages/send?user=' + user ;									
			});	   
  }
},

emoticons: {
  init: function() {
	  
	 $('.comment').emoticonize();
	
	
	 $('#btn-emoticons').on('click', function(e) {
               
			e.preventDefault();      
			$("#menu-emoticons").fadeToggle("slow");             
			
		});	
		
	 $('.send-message #menu-emoticons .css-emoticon').on('click', function(e)
		{ 
			
		   var emoticon = e.target.getAttribute('data-tag');	
		   $('#msg').focus().val($('#msg').val() + '/// ' + emoticon + ' /// ');
		  
		})
		
	 $('.newpost #menu-emoticons .css-emoticon').on('click', function(e)
		{ 
		   var emoticon = e.target.getAttribute('data-tag');	
		   $('#message').focus().val($('#message').val() + '/// ' + emoticon + ' /// '); 
		})	 
  }
},

classified: {
  init: function() {	 
	function initmap(raster, target, view)
	{
		var map = new ol.Map({
			  layers: [raster],
			  renderer: ol.RendererHint.CANVAS,
			  target: target,
			  view: view
			});
			
		return map  
	}
	
	//is executed only in the classified section    
   jQuery(function($) {
	  $('#popup-map-select-classified')		
		.show(1000, function() {
			$( "#accept-location" ).hide();
			var Colom = ol.proj.transform([-76.5194 , 3.4327], 'EPSG:4326', 'EPSG:900913'); 			
			var coordinate;	
			var raster = new ol.layer.Tile({
					source: new ol.source.OSM()
					});	
			
			var view = new ol.View2D({
			  // the view's initial state
			  center: Colom,
			  zoom: 13
			});
			
			var map = initmap(raster,'map-select',view);				
			// Popup showing the position where the user clicked
			var popup = new ol.Overlay({
			  element: document.createElement("div"),	
			});
			
			var element = popup.getElement();	
			map.addOverlay(popup);
			map.addControl(new ol.control.ZoomSlider());
				
			//changes the position of the popup window	
			function onClick(evt) {
				
				  coordinate = evt.getCoordinate();	
				  var view = map.getView();
				  var maxResolution = 156543.034;	
				  coordinate[0]= coordinate[0] + ( 60000 / ( maxResolution / view.getResolution() ) );
				  coordinate[1]= coordinate[1] - ( 8790000 / ( maxResolution / view.getResolution() ) )	;
				  $(element).popover('destroy');
				  popup.setPosition(coordinate);		
				  $(element).popover({
					'placement': 'bottom',
					'animation': false,
					'html': true,
					'content': '<img src="/media/images/blank2.png" style="width:28px; height:48px;" >' 
				  });
				  
				  $(element).popover('show');			  
				  $( "#accept-location" ).show();
			 };

			map.on('click', onClick);
			
			$( "#accept-location" ).on('click', function() {
				  $( "#location" ).val( '{"location": {"lon": "'+coordinate[0]+'", "lat": "'+coordinate[1]+'"}}' );
			});	
			
			$( "#clear-location-classi" ).on('click', function() {
				
			   $( "#accept-location" ).hide();
			   $(element).popover('destroy');
			   $( "#location" ).val('');
			   
			});	
		})		
	});
	   //is executed only in the classified section    
	   jQuery(function($) {
	  $('#popup-map-show-classified ')		
		.show(1000, function() {
			
			var view = new ol.View2D({
			  // the view's initial state			 
			  zoom: 16
			});	
			var raster = new ol.layer.Tile({
					source: new ol.source.OSM()
					});							
			var popup = new ol.Overlay({
			  element: document.createElement("div"),	
			});			
			var element = popup.getElement();	
			
			var map = initmap(raster,'map-show',view);
			map.addOverlay(popup);	
			map.addControl(new ol.control.ZoomSlider());
			// se ingresa la etiqueta de la ubicacion del clasificado 
			$('.popup-show-classified-button').on('click', function(e) {
               
                var lon = e.target.getAttribute('lon');  
                var lat = e.target.getAttribute('lat');  
                view = map.getView()              
                view.setCenter([lon/1, lat/1]); // se divide entre 1 para solucionar bug de OL3
             
                $(element).popover('destroy');
				popup.setPosition([lon,lat]);		
				$(element).popover({
					'placement': 'bottom',
					'animation': false,
					'html': true,
					'content': '<img src="/media/images/blank2.png" style="width:28px; height:48px;" >' 
			     });			     
			    $(element).popover('show');	

            });
		})		
	});
	
	
  }
},

popups: {
  init: function() {  
    ;(function($) {
        // popup windows register-login of the user 
        $(function() {

            $('.no-logged').on('click', function(e) {
               
                e.preventDefault();                   
                $('#window-login-register').bPopup();

            });
        });    
            
        // popup of the window to select the location of classified
        $(function() {
            $('#popup-select-classified-button').on('click', function(e) {               
                e.preventDefault();   
                                   
                $('#popup-map-select-classified').bPopup();
            });

        });       
      
        
        $(function() {
            $('.popup-show-classified-button').on('click', function(e) {
               
                e.preventDefault();                              
                $('#popup-map-show-classified').bPopup();
               
            });

        });
    })(jQuery);
    
  }
},

ajaxUsers: {
  init: function() {
	  
	$('#menu-account').on('click', '#sendInvitation', function(e) {              
									
			 var idProfile = $(this).attr('idprofile');
			 
			 $.api.put('user/sendinvitation', JSON.parse('{"idProfile":"'+idProfile+'"}')).success(function(response) {			   
			   
			
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
      url: $.api.url +'user/editprofile/',
      dataType: 'json',
    
    
      data: $(this).serializeArray(), 
      type:  'PUT',   
      
    }); 
    
    $('.footer-link-img a').click(function() { 
    
      $.api.put('user/removimgprofile/').error(function(xhr) {
		  
		defaultErrorCallback(xhr);
      
      }).success(function(response) {
		  
		  window.location.reload()	
		  
      });		 
		return false; 
	});
	
	$('#register').submit(function() { 	
		
		  var postData = $(this).serializeArray();		
						
		  $.api.post('user/newuser',postData).success(function(response) {
			
			    window.location.reload();			    			
									 
		  }).error(function(response) {
			
			  defaultErrorCallback(response);
		  });				
		
	    return false; 
	});
	
	$('#received, #menu-account').on('click','.addBlackList', function(e) {              
				
		  var idFrom= $(this).attr('from');						
		  $.api.put('user/addblacklist', JSON.parse('{"idfrom":"'+idFrom+'"}')).success(function(response) {		
			 
			   $.notification(gettext('The user has been added to the blacklist'),'success');	 		
									 
		  }).error(function(response) {
			
			    $.notification(jQuery.parseJSON(response.responseText).detail,'success');		
		  });						
	});	
	
    $('#tabs-contacts').on('click', '.btnremoveblacklist ', function(e) {              
									
				 var iduser = $(this).attr('iduser');
				 $.api.put('user/updateblacklist',JSON.parse('{"iduser":"'+iduser+'"}')).success(function(response) {		
								
					  $.notification(gettext('The user has been eliminated from the blacklist'),'success');
					  $("#blackuserid" + iduser).fadeOut(300, function() { $(this).remove(); });													
											 
				  }).error(function(xhr) {
					   alert('error');
				  });									
			});
		
	jQuery(function($) {
		  $('#blacklist')		
			.show(1000, function() {				
					 
				 $.api.get('user/getblacklist?_accept=application/json').success(function(response) {		
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
							
							var photo = profile.profile_picture ? /files/+profile.profile_picture : "/media/images/users/user2.png";								
							tmp +='<li id="contactsid'+profile.id+'" >\
									   <img  username="'+ profile.user.username +'" class="imgUserContact pointer" src="'+ photo +'" alt="Profile photo" height="62" width="62"><br>\
									   <a href="/user/'+profile.user.username+'/">'+profile.user.username+'</a>\
									   <img removecontactid='+profile.id+' class="pointer removContact" src="/media/images/famfamfam/icons/cancel.png" title="'+gettext('Remove contact')+'"  height="17" width="17">\
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
										   <a href="'+post.link+'">'+post.thread__section__name+'</a>&nbsp;&mdash;\
										   '+post.message.slice(0,100)+'\
								       </li></br>';						
							});	
							
						 $(tmp).appendTo('#ul_posts');	
					  }	
				
						 
				  }).error(function(xhr) {
					   alert('error');
				  }); 
                  			
				  		
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
					    $.each(response[0], function(i, post) {
								tmp +='<li>\
										   <a href="'+post.link+'">'+post.thread__section__name+'</a>&nbsp;&mdash;\
										   '+post.message.slice(0,100)+'\
								       </li></br>';					
								
							});
						$(tmp).appendTo('#ul_anonymous_posts');	
					  }	
				
						 
				  }).error(function(xhr) {
					   alert('error');
				  }); 
                  			
				  		
			})		
	     });
	     
	 jQuery(function($) {
		  $('#groups')		
			.show(1000, function() {					
					 
				 $.api.get('section/getsectionsbyusers?username='+$('#title-username').attr('username')+'&_accept=application/json').success(function(response) {					 
					
					 if (!response.length)
					  {
					     $(	
						   '<p>'+ gettext('No groups yet.') +'</p>'					
						  ).appendTo('#ul_groups');
					  }
					 else
					  {
						  var tmp = '';    
					      $.each(response, function(i, section) {						
								tmp +='<li class="removsection"  id="sectionid'+section.id+'" >\
										  <a href="/'+section.slug+'/">/'+section.slug+'/'+section.name+'</a>\
										  <img removesectionid='+section.id+' class="pointer imgremovsection" src="/media/images/famfamfam/icons/cancel.png" title="'+gettext('Remove group')+'"  height="17" width="17">\
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
				 $.api.del('section/removesection',JSON.parse('{"idsection":"'+idsection+'"}')).success(function(response) {								
					  
					  $.notification(gettext('The group was deleted successfully'),'success');	
					  $("#sectionid" + idsection).fadeOut(300, function() { $(this).remove(); });													
											 
				  }).error(function(xhr) {
					   alert('error');
				  });									
			});      
	     
	 jQuery(function($) {
		  $('#block-invitation-contacts')		
			.show(1000, function() {				
					 
				 $.api.get('user/getcontactinvitation?_accept=application/json').success(function(response) {
					 
						
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
								tmp +='<li id="invitationcontactid'+objuser.user.id+'" >\
										  <h2>\
											 <a href="/user/'+objuser.user.username+'/">'+objuser.user.username+'</a>\
											 <img notacceptiduser='+objuser.user.id+' class="pointer btnNotAcceptContact" src="/media/images/famfamfam/icons/cancel.png" title="'+gettext('Not accept')+'"  height="17" width="17">&nbsp;&nbsp;&nbsp;<img acceptiduser='+objuser.user.id+' class="pointer btnAcceptContact" src="/media/images/famfamfam/icons/accept.png" title="'+gettext('Accept')+'"  height="17" width="17">\
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
		$("#invitationcontactid" + iduser ).fadeOut(300, function() { $(this).remove(); });  	
		$.api.put('user/acceptcontact', JSON.parse('{"iduser":"'+iduser+'"}')).success(function(response) {	
			
			 $.notification(gettext('The user has been added to your contact list'),'success');		 	
									 
		}).error(function(response) {
			
			  alert('no funciono');		
		});
				 	
									 
	 }).error(function(response) {
			
			  alert('no funciono');		
	 });
	 
	$('#block-invitation-contacts').on('click','.btnNotAcceptContact',function() {	
			
		var iduser=  $(this).attr('notacceptiduser');		 
		$("#invitationcontactid" + iduser).fadeOut(300, function() { $(this).remove(); });  
		$.api.put('user/denycontact', JSON.parse('{"iduser":"'+iduser+'"}')).success(function(response) {				
			
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
																
									var photo = msg.to.profile_picture ? /files/+msg.to.profile_picture : "/media/images/users/user2.png"							 				   
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
												 		<span to='+msg.to.id +' class="msgIcon replyMsg"><img  class="largerIcon" src="/media/images/famfamfam/icons/email2.png" title=""> '+ gettext("Send another message") +' </span>\
														<span id-msg='+msg.id+' class="msgIcon msgDel"><img  class="largerIcon" src="/media/images/famfamfam/icons/cross2.png" title="">'+ gettext("Delete message") +' </span>\
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
					  }); ; 
                 } 			
				 insermsgsents(0); 
				 
				 
				 function insermsgrecv(pageNumber) {
					 
					  var current_page =  pageNumber ? pageNumber : 1	
					  $("#msg-received").html("");				
					  $.api.get('message/msgreceiveduser/?page='+current_page+'&_accept=application/json').success(function(response) {								
								var tmp_msgs = '';
							    $.each(response.objects, function(i, msg) {																		     
									var checked =  msg.msg_read  ? 'checked' : ' ';		
									var photo = msg.fromThe.profile_picture ? /files/+msg.fromThe.profile_picture : "/media/images/users/user2.png";										
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
													<span  from='+msg.fromThe.id+' class="msgIcon replyMsg"><img  class="largerIcon" src="/media/images/famfamfam/icons/email2.png" title=""> '+ gettext("Reply") +' </span>\
													<span id-msg='+msg.id+' class="msgIcon msgDel"><img  class="largerIcon" src="/media/images/famfamfam/icons/cross2.png" title="">'+ gettext("Delete message") +' </span>\
													<span from='+msg.fromThe.id+' class="msgIcon addBlackList"><img  class="largerIcon" src="/media/images/famfamfam/icons/user_delete2.png" title="">'+ gettext("Add to blacklist") +' </span>\
											   </div>\
										  </div>\
										</div>'	;
																
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

	
	$('#tabs-messages').on('click','.msgDel', function(e) {              
				
			var idmsg= $(this).attr('id-msg');						
			$.api.del('message/deletemsg/', JSON.parse('{"idmsg":"'+idmsg+'"}')).success(function(response) {			   
			   
			  $(".msgbox" + idmsg).fadeOut(300, function() { $(this).remove(); });
			  $.notification(gettext('The message has been removed.'), 'success');		 		
									 
		  }).error(function(response) {
			
			  alert('no');	
		  });						
	});	
	
	$('#clear_msg_send').on('click', function(e) {   			
							
		    $.api.del('message/clearsendall/').success(function(response) {			   
			   
			  $("#msg-sent").fadeOut(300, function() { $(this).remove(); });
			  $.notification(gettext('The message has been removed.'), 'success');		 		
									 
		  }).error(function(response) {
			
			  alert('no');	
		  });						
	});
	
	$('#clear_msg_receive').on('click',function(e) {  		
							
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
  validCaptchas: 0,
  quickReplied: false,

  init: function() {
    var $password = $('.password-d #password');
    if (!$password.val()) {
      $password.val(randomString(8));
    }
   
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
					 
				
		  $.api.post('section/newsection',postData).success(function(response) {		
						   
			  location.href ='/' + slug ;			  			
									 
		  }).error(function(response) {
			
			  defaultErrorCallback(response);
		  });				
		
	    return false; 
	}); 	
	
	
	$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('.newpost form').addClass('fileupload-processing');
    $('.newpost form').fileupload({
	    singleFileUploads: false,	 
	    success: function(response) {
			
			if (typeof response === 'string') {
			  response = $.parseJSON(response);
			}

			if (response['field-errors'] || response['errors'] || response['detail']) {
			  defaultErrorCallback(response);
			} else {
			  app.ajaxBoard.success(response)            
			}
		  },
		 error: defaultErrorCallback,		
		 always: function(){ $(".newpost form .table tr").remove(); $(".newpost .start").toggle();},  
		 dataType: 'json',          
         url: $.api.url + 'post/?html=1&_accept=application/json',        
        })
    });
    
    // se realiza para que no muestre la interfaz de eliminacion de imagenes y para poder enviar mensajes sin archivos
    $( '.newpost  #files').on('change', function(){ $(".newpost form .table tr").remove();  $(".newpost .start").toggle();});
  
        
	
	
	
	
	$('.newpost .start').click(function() {	        
                $.ajax({					 
					  success: function(response) {
						
						if (typeof response === 'string') {
						  response = $.parseJSON(response);
						}

						if (response['field-errors'] || response['errors'] || response['detail']) {
						  defaultErrorCallback(response);
						} else {
						  app.ajaxBoard.success(response)            
						}
					  },
					  error: defaultErrorCallback,
					  url: $.api.url + 'post/?html=1&_accept=application/json',
					  dataType: 'json', 				   
					  data: $('.newpost form').serializeArray(), 
					  type:  'POST',             
					}); 
		});	
   
  
    
   
    
        
  },

  success: function(data) {
    $('#'+$(data.html).attr('id')).emoticonize();  
    $('#'+$(data.html).attr('id')+ ' .gallery').tn3({ 
         autoplay:false,
         height:230,
         width:230,
         skinDir: '/media/tn3/skins'     
         });     
    if (curPage.type !== 'thread' && !app.ajaxBoard.quickReplied) { // redirect
      window.location.href = './' + data.pid;
      return true;
    }

    if (app.ajaxBoard.quickReplied || $.settings('disablePubSub')) {
     // console.log('Received post html', data.html);
      var $html = $(data.html);
     
      var $html = $([$html[0], $html[2]]);
      var $post = $html     
        .hide()         
        .appendTo('.thread')
        .fadeIn(500);
        
      $post.find('.tripcode:contains("!")').addClass('staff');    
      app.posts.init($post);
     
    
    }

    if (app.ajaxBoard.quickReplied) {
      $('input[name="thread"]').remove();
      app.ajaxBoard.quickReplied = false;
    }

    if (++this.validCaptchas > 2) {
      $('.captcha-d').remove();
    }

    var newpost = $('.newpost');
    if (newpost.parent().hasClass('thread')) {
      var b = $.settings('bottomForm') && curPage.type === 'thread' ?
        '.actions' :
        '#main';
      newpost.insertBefore(b);    
    }
    try {	
          window.location.hash = '#post' + data.pid;               
    } catch(e) {}
    $('.captcha-img').trigger('click');
    // clear entered data
    newpost.find('textarea').val('');
    newpost.find(':input').each(function() {
      var $this = $(this);
      switch ($this.attr('type')) {
        case 'email':
        case 'file':
        case 'select-multiple':
        case 'select-one':
        case 'text':   
        case 'textarea':
          $this.val('');
          break;     
        case 'checkbox':
        case 'radio':
          $this.attr('checked', true);
          break;
      }
    });
  }
},

/**
 * Realtime publish-subscribe system.
 *
 * Uses long polling to check for new posts.
 */
pubsub: {
  sleepTime: 500,
  maxSleepTime: 1000 * 60 * 15,
  cursor: null,
  newMsgs: 0,

  init: function() {
    if (curPage.type !== 'thread' || $.settings('disablePubSub')) {
      return false;
    }

    this.poll();
  },

  showNewPostNotification: function(text, section, thread) {
    var pageTitle = $('title').text().split('] ').pop();
    var dnTitle = gettext('New message in thread ') + '/' + section + '/' + thread;

    // increment new messages count
    $('title').text('[' + (++this.newMsgs) + '] ' + pageTitle);

    // add new messages counter to the window title
    $(document).mousemove(function(event) {
      $('title').text(pageTitle);
      $(document).unbind('mousemove');
      app.pubsub.newMsgs = 0;
    });

    if ($.notification.check()) {
		
      $.notification(text, 3000, dnTitle);
    }
  },

  poll: function() {
    var args = {};
    if (app.pubsub.cursor) {
      args.cursor = app.pubsub.cursor;
    }
    $.api.post('stream/'+ curPage.thread).error(function() {
      if (app.pubsub.sleepTime < app.pubsub.maxSleepTime) {
        app.pubsub.sleepTime *= 2;
      } else {
        app.pubsub.sleepTime = app.pubsub.maxSleepTime;
      }

      //console.log('Poll error; sleeping for', pubsub.sleepTime, 'ms');
      window.setTimeout(app.pubsub.poll, app.pubsub.sleepTime);
    }).success(function(response) {
      if (!response.posts) {
        return false;
      }
      app.pubsub.cursor = response.cursor;
      var posts = response.posts;

      app.pubsub.cursor = posts[posts.length - 1].id;
      //console.log(posts.length, 'new msgs');
      for (var i = 0, l = posts.length; i < l; i++) {
        var $p = $(posts[i]);
        var $post = $([$p[0], $p[2]])  // p[1] is text node
          .hide()
          .appendTo('.thread')
          .fadeIn(500, function(event) {
            $(this).attr('style', '');
        });

        $post.find('.tripcode:contains("!")').addClass('staff');
        app.posts.init($post);
      }
      var text = $post.find('.message').text();
      app.pubsub.showNewPostNotification(text, curPage.section, curPage.first);
      window.setTimeout(app.pubsub.poll, 0);
    });
  }
}
});

$(function() {
  var l = ['board', 'settings', 'style', 'posts', 'hotkeys','popups', 'ajaxBoard', 'ajaxMessages', 'ajaxUsers', 'pubsub', 'classified', 'emoticons', 'messages', 'users'];
  $.each(l, function(i, item) {
    app[item].init();
  });
});

window.app = app;

})(window, jQuery);
