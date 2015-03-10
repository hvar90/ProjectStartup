/**
 * tire web application framework.
 *
 * Copyright (c) 2011, Paul Miller.
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(window, $, undefined) {

var tire = {
  init: function(options) {
    var self = this;
    options = options || {modules: {}};
    for (var i = 0, l = options.modules.length; i < l; i++) {
      self[options.modules[i]] = {};
    }
    if (window.notAppPage) {
      return;
    }
    $(function() {
      $.each(['path', 'style'], function(i, item) {
        tire[item].init();
      });
    });
  },
  acts: {main: {}},
  style: {init: function() {}},

  l10n: function(text) {
    return text;
  },

  authKey: 'sid',
  isAuthenticated: function() {
    return !!$.cookie(this.authKey);
  },

  _subscriptions: {},
  _timeouts: {},
  _timeout: 500,
  /** 
   * This function would subscribe to path (e.g. 'feed') and listen for the
   * incoming data. It reconnects automatically.
   */
  subscribe: function(path, data) {
    var self = this;
    var xhr = $.api.post(path, data || {})
    .success(function(sdata) {
      self.defaultSubCallback(sdata);
      self._timeout = 500;
      self._timeouts[path] = window.setTimeout(function() {
        self.subscribe(path);
      }, 0);
    })
    .error(function() {
      self._timeout *= 2;
      console.error('Polling error, reconnecting in %ss.', self._timeout / 1000);
      self._timeouts[path] = window.setTimeout(function() {
        self.subscribe(path, data);
      }, self._timeout);
    });
    return (this._subscriptions[path] = xhr);
  },

  unsubscribe: function(path) {
    this._subscriptions[path].abort();
    window.clearTimeout(this._timeouts[path]);
  },

  defaultSubCallback: function(data) {
    return tire.rpc.parse(data);
  }
};


tire.rpc = {
  // Parses incoming JSON data in format {"method": "...", "params": "..."}
  // and does procedures, described in the message.
  parse: function(data) {
    var self = this;
    var prm, roster;
    if (!data) {
      return null;
    }
    if ($.isArray(data)) {
      for (var i = 0, l = data.length; i < l; i++) {
        self.parse(data[i]);
      }
      return null;
    }
    console.log('Processing item', data.method, data.params);
    if (data.method in self.methods) {
      self.methods[data.method](data.params);
    } else {
      throw new TypeError('Undefined JSON RPC method ' + data.method);
    }
  },

  methods: {}
};


// Methods to deal with browser history and querystring (path).
tire.path = {
  // List of application routes. Format:
  // [url regexp, callback to be executed (Function or String), *options].
  // This list transforms to [regexp, pageName, callback, *options].
  routes: [],
  controllers: {},
  errors: {},
  routeSelector: '.push',
  defaultTitle: 'tire.js',

  _state: {},
  state: null,

  compileRoutes: function() {
    var self = this;
    var p, re, name, fn, res;
    for (var i = 0, l = this.routes.length; i < l; i++) {
      p = route[0];
      re = _.isRegExp(p) ? p : new RegExp(p);
      name = route[1];
      fn = _.isFunction(name) ?
        name :
        self.controllers[name] || function() {};
      res = [re, name, fn].concat(route.slice(2));
      this.routes.push(res);
    }
  },

  // Changes user's browser URL to 'to' arg.
  redirect: function(path, title) {
    var self = tire.path;
    // Append slash.
    path = path[0] === '/' ? path : '/' + path;
    console.log('Redirecting to', path);
    History.pushState(self.state, title || self.defaultTitle, path);
    self.initPath(path);
  },

  pushState: function(path) {
    // Remove question mark
    path = path.slice(1).split('=');
    path[0] = path[1];
  },

  raise: function(errorCode) {
    var error = this.errors[errorCode];
    error && error();
  },

  // Route -- list in format [regexp, pageName, callback, *options]
  initRoute: function(route, match) {
    var regexp = route[0];
    var pageName = route[1];
    var callback = route[2];
    var options = route.slice(3);
    var hasOption = function(thing) {
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i] === thing) {
          return true;
        }
      }
      return false;
    };
    var loggedIn = tire.isAuthenticated();
    if (!hasOption('passauth')) {
      if (hasOption('noauth') && loggedIn) {
        console.log('User is authenticated, redirecting to main page.');
        return this.redirect('/');
      } else if (!hasOption('noauth') && !loggedIn) {
        console.log('User is not authenticated, redirecting to login page.');
        return this.redirect('/login');
      }
    }
    
    // #container.chat would show only #chat section etc.
    $('#container').attr('class', pageName);
    $('#main > section').hide()
      .filter('#' + pageName + '-page').show();
    //$('#main > *').removeClass('active');
    //$('#' + pageName).addClass('active');
    callback(match);
  },

  initPath: function(path) {
    path = path || window.location.pathname;
    var self = this;
    var match = false;
    var route;

    for (var i = 0, l = this.routes.length; i < l; i++) {
      route = this.routes[i];
      match = path.match(route[0])
      if (match) {
        break;
      }
    }

    if (!match) {
      return this.raise(404);
    }

    return this.initRoute(route, match[1]);
  },

  // Init pathes and listen for path changes.
  init: function() {
    var self = this;
    this.compileRoutes();
    $(this.routeSelector).click(function(event) {
      event.preventDefault();
      var path = $(this).attr('href');
      self.redirect(path);
    });
    this.initPath();
  }
};

window.tire = function(options) {
  tire.init(options);
  return tire;
};

})(window, jQuery);
/**
 * jQuery Notification class. Provides great browser messages.
 *
 * Images of this plugin are taken from the code of jquery.toastmessage
 * by akquinet (2010, license: apache 2.0).
 */
(function($) {
var Notification = function(message, type, options) {
  if (!(this instanceof Notification)) {
    return new Notification(message, type, options);
  }
  var options = $.extend({text: message, type: type}, options || {});
  this.show(options);
},
  wn = window.webkitNotifications;

$.extend(Notification.prototype, {
  settings: {
    inEffect: {opacity: 'show'}, // in effect
    inEffectDuration: 600, // in effect duration in ms
    stayTime: 3000, // time in miliseconds before the item has to disappear
    text: '',  // content of the item
    sticky: false, // should the notification item be sticky or not?
    type: 'notice', // notice, warning, error, success
    position: 'top-right', // top-right, center, middle-bottom etc
    close: null // callback function when the message is closed
  },

  html: '\
<div class="notification-wrapper">\
  <div class="notification">\
    <div class="notification-image"></div>\
    <div class="notification-close"></div>\
    <p></p>\
  </div>\
</div>\
',
  
  dShow: function(text, timeout, title, icon) {
    timeout = timeout || 3000;
    title = title || $.trim($('title').text());
    icon = icon || $('link[rel="apple-touch-icon"]').attr('href');
    instance = wn.createNotification(icon, title, text);
    instance.show();
    window.setTimeout(function() {
      instance.cancel();
    }, timeout);
  },

  show: function(options) {
    var self = this;
    var settings = $.extend(this.settings, options);
    var ntfs = $(this.html).find('.notification');
    // global container for all notifications
    if (!$('.notifications').length) {
      $('<div class="notifications ' + settings.position + '"/>')
        .appendTo('body');
    }
    ntfs.parent().addClass(settings.type).appendTo('.notifications');
    ntfs.find('p').html(settings.text);
    ntfs.hide()
      .animate(settings.inEffect, settings.inEffectDuration);

    ntfs.find('.notification-close').click(function() {
      self.remove(ntfs, settings);
    });

    if (!settings.sticky) {
      window.setTimeout(function() {
        self.remove(ntfs, settings);
      },
      settings.stayTime);
    }
  },

  remove: function(obj, options) {
    obj.animate({opacity: '0'}, 600, function() {
      obj.parent().animate({height: '0px'}, 300, function() {
        obj.parent().remove();
      });
    });
    // callback
    if (options && options.close !== null) {
      options.close();
    }
  }
});

$.extend(Notification, {
  // requests permission to show desktop notifications
  request: function(callback) {
    if (!this.checkSupport()) {
      return false;
    }
    wn.requestPermission(callback);
  },

  check: function() {
    return (this.checkSupport() && wn.checkPermission() === 0);
  },
  
  checkSupport: function() {
    return !!wn;
  }
});

$.extend({notification: Notification});
})(jQuery);


/**
 * jQuery API class. Used to communicate with RESTful web-applications.
 */
 
$.extend({
   api: (function() {
     // Change API url in your app with $.api.url = 'new-value';    
     var items = {
       url: 'http://socialchan-staging.herokuapp.com/api/1.0/',     
       sleepTime: 500,
       maxSleepTime: 1000 * 60 * 15  // 15 minutes
     };
     var createMethod = function(method) {
       return function(path, data) {
         path = path || '';        
      
         if (jQuery.isFunction(data)) {
           type = type || callback;
           callback = data;
           data = undefined;         
         }
         return jQuery.ajax({
           type: method,
           url: items.url + path,          
           data: data,
           dataType: 'json'
         })
       };
     };

     $.each(['get', 'post', 'put','pubsub'], function(i, method) {
       items[method] = createMethod(method);
     });

     // $.api.delete is SyntaxError because delete is reserved js keyword
     $.each(['del', 'DELETE'], function(i, method) {
       items[method] = createMethod('delete');
     });


     items.subscribe = items.poll = function(path, data) {
       
     };

     items.unsubscribe = items.pollStop = function() {
       window.clearTimeout(items._timeoutId);
     };

     return items;
   })()
});


/**
 * jQuery multipart uploader class.
 */
(function($) {
function MultipartUploader(uri, form) {
  if (typeof form === 'string') {
    form = $(form);
  }
  this.dfd = $.Deferred();
  this.uri = uri;
  this.form = form;
  this.send();
}

$.extend(MultipartUploader.prototype, {
  boundary: 'gc0p4Jq0M2Yt08jU534c0p',

  makeMultipartItem: function(name, value) {
    var res = '';
    res += '--' + this.boundary + '\r\n';
    res += 'Content-Disposition: form-data; ';
    res += 'name="' + name + '"\r\n\r\n';
    res += value + '\r\n';
    return res;
  },

  serializedToMultipart: function(list) {
    // convert jQuery.serializeArray(arr) to multipart data
    var res = '';
    for (var i = 0, item; item = list[i++];) {
      res += this.makeMultipartItem(item.name, item.value);
    }
    return res;
  },

  fileToMultipart: function(fileInput, callback) {
    var files = fileInput.attr('files');
    var fr = new FileReader();
    var file = files[0];
    var self = this;

    if (!file) {
      return callback('');
    }
    
    function wrapFile(fileData) {
      var res = '';
      res += '--' + self.boundary + '\r\n'
      res += 'Content-Disposition: form-data; name="' + fileInput.attr('id') + '"; ';
      res += 'filename="' + file.name + '"\r\n';
      res += 'Content-Type: ' + file.type + '\r\n\r\n';
      res += fileData + '\r\n';
      res += '--' + self.boundary + '--\r\n';
      return res
    }
    
    fr.onload = function(event) {
      if (event.loaded !== event.total) {
        return false;
      }
      callback(wrapFile(event.currentTarget.result));
    };
    
    fr.readAsBinaryString(file);
  },

  send: function() {
    var fr = new FileReader();
    var xhr = new XMLHttpRequest();
    var body = ''; // request body
    var self = this;
    var fileInput = this.form.find('input[type="file"]:first');

    xhr.open('POST', this.uri, true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + this.boundary);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          self.dfd.resolve($.parseJSON(xhr.responseText));
        } else {
          self.dfd.reject(xhr);
        }
      }
    };
    body += this.serializedToMultipart(this.form.serializeArray());
    this.fileToMultipart(fileInput, function(fileData) {
      body += fileData;
      
      if (xhr.sendAsBinary) { // native support by Firefox
        xhr.sendAsBinary(body);
      } else if (Uint8Array) { // use FileWriter API in Chrome
        var blob = new BlobBuilder();
        var arrb = new ArrayBuffer(body.length);
        var ui8a = new Uint8Array(arrb, 0);
        for (var i = 0; i < body.length; i++) {
          ui8a[i] = (body.charCodeAt(i) & 0xff);
        }
        blob.append(arrb);
        xhr.send(blob.getBlob());
      } else { // send raw data
        xhr.send(body);
      }
      
    });
    return this;
  }
});

$.extend({
  mpu: function(uri, form) {
    return (new MultipartUploader(uri, form)).dfd;
  }
});

})(jQuery);

$.fn.extend({
  slideToggleWidth: function() {
    return this.each(function() {
      $(this).animate({width: 'toggle'}, {
        specialEasing: {width: 'linear', height: 'easeOutBounce'}
      })
    });
  }
});

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
$.extend({
  cookie: function(name, value, options) {
    if (typeof value !== 'undefined') { // name and value given, set cookie
      options = options || {};
      var path = options.path ? '; path=' + (options.path) : '; path=/';
      var domain = options.domain ? '; domain=' + (options.domain) : '';
      var secure = options.secure ? '; secure' : '';
      var expires = '';
      if (value === null) {
        value = '';
        options.expires = -1;
      }
      if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
        var date;
        if (typeof options.expires === 'number') {
          date = new Date();
          date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        } else {
          date = options.expires;
        }
        expires = '; expires=' + date.toUTCString();
      }
      document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
      return value;
    } else { // only name given, get cookie
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = $.trim(cookies[i]);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
  }
});

/*
 * jStorage
 * Simple local storage wrapper to save data on the browser side.
 *
 * Copyright (c) 2010 Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under MIT-style license.
 */
(function(f){if(!f||!(f.toJSON||Object.toJSON||window.JSON)){throw new Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!")}var g={},d={storage:"{}"},h=null,j=0,l=f.toJSON||Object.toJSON||(window.JSON&&(JSON.encode||JSON.stringify)),e=f.evalJSON||(window.JSON&&(JSON.decode||JSON.parse))||function(m){return String(m).evalJSON()},i=false;_XMLService={isXML:function(n){var m=(n?n.ownerDocument||n:0).documentElement;return m?m.nodeName!=="HTML":false},encode:function(n){if(!this.isXML(n)){return false}try{return new XMLSerializer().serializeToString(n)}catch(m){try{return n.xml}catch(o){}}return false},decode:function(n){var m=("DOMParser" in window&&(new DOMParser()).parseFromString)||(window.ActiveXObject&&function(p){var q=new ActiveXObject("Microsoft.XMLDOM");q.async="false";q.loadXML(p);return q}),o;if(!m){return false}o=m.call("DOMParser" in window&&(new DOMParser())||window,n,"text/xml");return this.isXML(o)?o:false}};function k(){if("localStorage" in window){try{if(window.localStorage){d=window.localStorage;i="localStorage"}}catch(p){}}else{if("globalStorage" in window){try{if(window.globalStorage){d=window.globalStorage[window.location.hostname];i="globalStorage"}}catch(o){}}else{h=document.createElement("link");if(h.addBehavior){h.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(h);h.load("storage");var n="{}";try{n=h.getAttribute("storage")}catch(m){}d.storage=n;i="userDataBehavior"}else{h=null;return}}}b()}function b(){if(d.storage){try{g=e(String(d.storage))}catch(m){d.storage="{}"}}else{d.storage="{}"}j=d.storage?String(d.storage).length:0}function c(){try{d.storage=l(g);if(h){h.setAttribute("storage",d.storage);h.save("storage")}j=d.storage?String(d.storage).length:0}catch(m){}}function a(m){if(!m||(typeof m!="string"&&typeof m!="number")){throw new TypeError("Key name must be string or numeric")}return true}f.storage={version:"0.1.5.0",set:function(m,n){a(m);if(_XMLService.isXML(n)){n={_is_xml:true,xml:_XMLService.encode(n)}}g[m]=n;c();return n},get:function(m,n){a(m);if(m in g){if(typeof g[m]=="object"&&g[m]._is_xml&&g[m]._is_xml){return _XMLService.decode(g[m].xml)}else{return g[m]}}return typeof(n)=="undefined"?null:n},deleteKey:function(m){a(m);if(m in g){delete g[m];c();return true}return false},flush:function(){g={};c();try{window.localStorage.clear()}catch(m){}return true},storageObj:function(){function m(){}m.prototype=g;return new m()},index:function(){var m=[],n;for(n in g){if(g.hasOwnProperty(n)){m.push(n)}}return m},storageSize:function(){return j},currentBackend:function(){return i},storageAvailable:function(){return !!i},reInit:function(){var m,o;if(h&&h.addBehavior){m=document.createElement("link");h.parentNode.replaceChild(m,h);h=m;h.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(h);h.load("storage");o="{}";try{o=h.getAttribute("storage")}catch(n){}d.storage=o;i="userDataBehavior"}b()}};k()})(window.jQuery||window.$);

/*================================================================================
 * @name: bPopup - if you can't get it up, use bPopup
 * @author: (c)Bjoern Klinggaard (twitter@bklinggaard)
 * @demo: http://dinbror.dk/bpopup
 * @version: 0.9.4.min
 ================================================================================*/
 (function(b){b.fn.bPopup=function(z,F){function K(){a.contentContainer=b(a.contentContainer||c);switch(a.content){case "iframe":var h=b('<iframe class="b-iframe" '+a.iframeAttr+"></iframe>");h.appendTo(a.contentContainer);r=c.outerHeight(!0);s=c.outerWidth(!0);A();h.attr("src",a.loadUrl);k(a.loadCallback);break;case "image":A();b("<img />").load(function(){k(a.loadCallback);G(b(this))}).attr("src",a.loadUrl).hide().appendTo(a.contentContainer);break;default:A(),b('<div class="b-ajax-wrapper"></div>').load(a.loadUrl,a.loadData,function(){k(a.loadCallback);G(b(this))}).hide().appendTo(a.contentContainer)}}function A(){a.modal&&b('<div class="b-modal '+e+'"></div>').css({backgroundColor:a.modalColor,position:"fixed",top:0,right:0,bottom:0,left:0,opacity:0,zIndex:a.zIndex+t}).appendTo(a.appendTo).fadeTo(a.speed,a.opacity);D();c.data("bPopup",a).data("id",e).css({left:"slideIn"==a.transition||"slideBack"==a.transition?"slideBack"==a.transition?g.scrollLeft()+u:-1*(v+s):l(!(!a.follow[0]&&m||f)),position:a.positionStyle||"absolute",top:"slideDown"==a.transition||"slideUp"==a.transition?"slideUp"==a.transition?g.scrollTop()+w:x+-1*r:n(!(!a.follow[1]&&p||f)),"z-index":a.zIndex+t+1}).each(function(){a.appending&&b(this).appendTo(a.appendTo)});H(!0)}function q(){a.modal&&b(".b-modal."+c.data("id")).fadeTo(a.speed,0,function(){b(this).remove()});a.scrollBar||b("html").css("overflow","auto");b(".b-modal."+e).unbind("click");g.unbind("keydown."+e);d.unbind("."+e).data("bPopup",0<d.data("bPopup")-1?d.data("bPopup")-1:null);c.undelegate(".bClose, ."+a.closeClass,"click."+e,q).data("bPopup",null);H();return!1}function G(h){var b=h.width(),e=h.height(),d={};a.contentContainer.css({height:e,width:b});e>=c.height()&&(d.height=c.height());b>=c.width()&&(d.width=c.width());r=c.outerHeight(!0);s=c.outerWidth(!0);D();a.contentContainer.css({height:"auto",width:"auto"});d.left=l(!(!a.follow[0]&&m||f));d.top=n(!(!a.follow[1]&&p||f));c.animate(d,250,function(){h.show();B=E()})}function L(){d.data("bPopup",t);c.delegate(".bClose, ."+a.closeClass,"click."+e,q);a.modalClose&&b(".b-modal."+e).css("cursor","pointer").bind("click",q);M||!a.follow[0]&&!a.follow[1]||d.bind("scroll."+e,function(){B&&c.dequeue().animate({left:a.follow[0]?l(!f):"auto",top:a.follow[1]?n(!f):"auto"},a.followSpeed,a.followEasing)}).bind("resize."+e,function(){w=y.innerHeight||d.height();u=y.innerWidth||d.width();if(B=E())clearTimeout(I),I=setTimeout(function(){D();c.dequeue().each(function(){f?b(this).css({left:v,top:x}):b(this).animate({left:a.follow[0]?l(!0):"auto",top:a.follow[1]?n(!0):"auto"},a.followSpeed,a.followEasing)})},50)});a.escClose&&g.bind("keydown."+e,function(a){27==a.which&&q()})}function H(b){function d(e){c.css({display:"block",opacity:1}).animate(e,a.speed,a.easing,function(){J(b)})}switch(b?a.transition:a.transitionClose||a.transition){case "slideIn":d({left:b?l(!(!a.follow[0]&&m||f)):g.scrollLeft()-(s||c.outerWidth(!0))-C});break;case "slideBack":d({left:b?l(!(!a.follow[0]&&m||f)):g.scrollLeft()+u+C});break;case "slideDown":d({top:b?n(!(!a.follow[1]&&p||f)):g.scrollTop()-(r||c.outerHeight(!0))-C});break;case "slideUp":d({top:b?n(!(!a.follow[1]&&p||f)):g.scrollTop()+w+C});break;default:c.stop().fadeTo(a.speed,b?1:0,function(){J(b)})}}function J(b){b?(L(),k(F),a.autoClose&&setTimeout(q,a.autoClose)):(c.hide(),k(a.onClose),a.loadUrl&&(a.contentContainer.empty(),c.css({height:"auto",width:"auto"})))}function l(a){return a?v+g.scrollLeft():v}function n(a){return a?x+g.scrollTop():x}function k(a){b.isFunction(a)&&a.call(c)}function D(){x=p?a.position[1]:Math.max(0,(w-c.outerHeight(!0))/2-a.amsl);v=m?a.position[0]:(u-c.outerWidth(!0))/2;B=E()}function E(){return w>c.outerHeight(!0)&&u>c.outerWidth(!0)}b.isFunction(z)&&(F=z,z=null);var a=b.extend({},b.fn.bPopup.defaults,z);a.scrollBar||b("html").css("overflow","hidden");var c=this,g=b(document),y=window,d=b(y),w=y.innerHeight||d.height(),u=y.innerWidth||d.width(),M=/OS 6(_\d)+/i.test(navigator.userAgent),C=200,t=0,e,B,p,m,f,x,v,r,s,I;c.close=function(){a=this.data("bPopup");e="__b-popup"+d.data("bPopup")+"__";q()};return c.each(function(){b(this).data("bPopup")||(k(a.onOpen),t=(d.data("bPopup")||0)+1,e="__b-popup"+t+"__",p="auto"!==a.position[1],m="auto"!==a.position[0],f="fixed"===a.positionStyle,r=c.outerHeight(!0),s=c.outerWidth(!0),a.loadUrl?K():A())})};b.fn.bPopup.defaults={amsl:50,appending:!0,appendTo:"body",autoClose:!1,closeClass:"b-close",content:"ajax",contentContainer:!1,easing:"swing",escClose:!0,follow:[!0,!0],followEasing:"swing",followSpeed:500,iframeAttr:'scrolling="no" frameborder="0"',loadCallback:!1,loadData:!1,loadUrl:!1,modal:!0,modalClose:!0,modalColor:"#000",onClose:!1,onOpen:!1,opacity:0.7,position:["auto","auto"],positionStyle:"absolute",scrollBar:!0,speed:250,transition:"fadeIn",transitionClose:!1,zIndex:9997}})(jQuery);

/*
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},i=0,c=0,l=[];function g(g,d,h,e){var c={data:e||(e===0||e===false)?e:d?d.data:{},_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};g&&a.extend(c,g,{nodes:[],parent:d});if(h){c.tmpl=h;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++i;(l.length?f:b)[i]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a(i[h])[d](k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,m,k){if(d[0]&&a.isArray(d[0])){var g=a.makeArray(arguments),h=d[0],j=h.length,i=0,f;while(i<j&&!(f=a.data(h[i++],"tmplItem")));if(f&&c)g[2]=function(b){a.tmpl.afterManip(this,b,k)};r.apply(this,g)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var i,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(j(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);i=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(j(c,null,i)):i},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function j(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:j(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=k(c).concat(b);if(d)b=b.concat(k(d))});return b?b:k(c)}function k(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,k,g,b,c,d){var j=a.tmpl.tag[k],i,e,f;if(!j)throw"Unknown template tag: "+k;i=j._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=h(b);d=d?","+h(d)+")":c?")":"";e=c?b.indexOf(".")>-1?b+h(c):"("+b+").call($item"+d:b;f=c?e:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else f=e=i.$1||"null";g=h(g);return"');"+j[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(f).split("$1").join(e).split("$2").join(g||i.$2||"")+"__.push('"})+"');}return __;")}function n(c,b){c._wrap=j(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function h(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,h;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(h=j.length-1;h>=0;h--)m(j[h]);m(k)}function m(j){var p,h=j,k,e,m;if(m=j.getAttribute(d)){while(h.parentNode&&(h=h.parentNode).nodeType===1&&!(p=h.getAttribute(d)));if(p!==m){h=h.parentNode?h.nodeType===11?0:h.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[h]||f[h]);e.key=++i;b[i]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;h=a.data(j.parentNode,"tmplItem");h=h?h.key:0}if(e){k=e;while(k&&k.key!=h){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);
