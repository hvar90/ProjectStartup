// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if (this.console) console.log( Array.prototype.slice.call(arguments) );
};
(function() {
  if (!window.gettext) {
    window.gettext = function(text) {
      return text;
    };
  }
  gettext('Settings error');
})();

// catch all document.write() calls
(function(doc) {
  var write = doc.write;
  doc.write = function(q) {
    if (/docwriteregexwhitelist/.test(q)) {
      write.apply(doc, arguments);
    }
  };
})(document);

/*
jQuery Placeholder 1.1.1

Copyright (c) 2010 Michael J. Ryan (http://tracker1.info/)

Dual licensed under the MIT and GPL licenses:
	http://www.opensource.org/licenses/mit-license.php
	http://www.gnu.org/licenses/gpl.html
*/
(function(a){function f(){var b=a(this);a(b.data(e)).css("display","none")}function i(){var b=this;setTimeout(function(){var c=a(b);a(c.data(e)).css("top",c.position().top+"px").css("left",c.position().left+"px").css("display",c.val()?"none":"block")},200)}var e="PLACEHOLDER-LABEL",j=false,k={labelClass:"placeholder"},g=document.createElement("input");if("placeholder"in g){a.fn.placeholder=a.fn.unplaceholder=function(){};delete g}else{delete g;a.fn.placeholder=function(b){if(!j){a(".PLACEHOLDER-INPUT").live("click",
f).live("focusin",f).live("focusout",i);j=bound=true}var c=a.extend(k,b);this.each(function(){var l=Math.random().toString(32).replace(/\./,""),d=a(this),h=a('<label style="position:absolute;display:none;top:0;left:0;"></label>');if(!(!d.attr("placeholder")||d.data("PLACEHOLDER-INPUT")==="PLACEHOLDER-INPUT")){d.attr("id")||(d.attr("id")="input_"+l);h.attr("id",d.attr("id")+"_placeholder").data("PLACEHOLDER-INPUT","#"+d.attr("id")).attr("for",d.attr("id")).addClass(c.labelClass).addClass(c.labelClass+
"-for-"+this.tagName.toLowerCase()).addClass(e).text(d.attr("placeholder"));d.data(e,"#"+h.attr("id")).data("PLACEHOLDER-INPUT","PLACEHOLDER-INPUT").addClass("PLACEHOLDER-INPUT").after(h);f.call(this);i.call(this)}})};a.fn.unplaceholder=function(){this.each(function(){var b=a(this),c=a(b.data(e));if(b.data("PLACEHOLDER-INPUT")==="PLACEHOLDER-INPUT"){c.remove();b.removeData("PLACEHOLDER-INPUT").removeData(e).removeClass("PLACEHOLDER-INPUT")}})}}})(jQuery);


/*
* jQuery Form Plugin; v20131017
* http://jquery.malsup.com/form/
* Copyright (c) 2013 M. Alsup; Dual licensed: MIT/GPL
* https://github.com/malsup/form#copyright-and-license
*/
;(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;a.length>i;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;o.length>i;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(100*(a/n))),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var l=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,l&&l.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action");w.setAttribute("target",d),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var o=[];try{if(m.extraData)for(var l in m.extraData)m.extraData.hasOwnProperty(l)&&(e.isPlainObject(m.extraData[l])&&m.extraData[l].hasOwnProperty("name")&&m.extraData[l].hasOwnProperty("value")?o.push(e('<input type="hidden" name="'+m.extraData[l].name+'">').val(m.extraData[l].value).appendTo(w)[0]):o.push(e('<input type="hidden" name="'+l+'">').val(m.extraData[l]).appendTo(w)[0]));m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(c){var p=document.createElement("form").submit;p.apply(w)}}finally{w.setAttribute("action",i),r?w.setAttribute("target",r):f.removeAttr("target"),e(o).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),S.reject(x,"timeout"),void 0;if(t==k&&x)return x.abort("server abort"),S.reject(x,"error","server abort"),void 0;if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),setTimeout(s,250),void 0;var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var l=(m.dataType||"").toLowerCase(),c=/(json|script|text)/.test(l);if(c||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(c){var d=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];d?x.responseText=d.textContent?d.textContent:d.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==l&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,l,m)}catch(b){i="parsererror",x.error=r=b||i}}catch(b){a("error caught: ",b),i="error",x.error=r=b||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&300>x.status||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),p&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),p&&e.event.trigger("ajaxError",[x,m,r])),p&&e.event.trigger("ajaxComplete",[x,m]),p&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var l,c,m,p,d,v,g,x,b,y,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(c=0;h.length>c;c++)l=e(h[c]),i?l.prop("disabled",!1):l.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,d="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),y=v.attr2("name"),y?d=y:v.attr2("name",d)):(v=e('<iframe name="'+d+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),p&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},p=m.global,p&&0===e.active++&&e.event.trigger("ajaxStart"),p&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;b=w.clk,b&&(y=b.name,y&&!b.disabled&&(m.extraData=m.extraData||{},m.extraData[y]=b.value,"image"==b.type&&(m.extraData[y+".x"]=w.clk_x,m.extraData[y+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,l,c,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),l=t.url||this.attr2("action"),c="string"==typeof l?e.trim(l):"",c=c||window.location.href||"",c&&(c=(c.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:c,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var p=t.traditional;void 0===p&&(p=e.ajaxSettings.traditional);var d,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,d=e.param(t.data,p)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,p);d&&(g=g?g+"&"+d:d),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var b=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(b,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var y=t.error;t.error=function(e,r,a){var n=t.context||this;y.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;h.length>E;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i=this[0],o=t?i.getElementsByTagName("*"):i.elements;if(!o)return a;var s,u,l,c,f,m,p;for(s=0,m=o.length;m>s;s++)if(f=o[s],l=f.name,l&&!f.disabled)if(t&&i.clk&&"image"==f.type)i.clk==f&&(a.push({name:l,value:e(f).val(),type:f.type}),a.push({name:l+".x",value:i.clk_x},{name:l+".y",value:i.clk_y}));else if(c=e.fieldValue(f,!0),c&&c.constructor==Array)for(r&&r.push(f),u=0,p=c.length;p>u;u++)a.push({name:l,value:c[u]});else if(n.fileapi&&"file"==f.type){r&&r.push(f);var d=f.files;if(d.length)for(u=0;d.length>u;u++)a.push({name:l,value:d[u],type:f.type});else a.push({name:l,value:"",type:f.type})}else null!==c&&c!==void 0&&(r&&r.push(f),a.push({name:l,value:c,type:f.type,required:f.required}));if(!t&&i.clk){var h=e(i.clk),v=h[0];l=v.name,l&&!v.disabled&&"image"==v.type&&(a.push({name:l,value:h.val()}),a.push({name:l+".x",value:i.clk_x},{name:l+".y",value:i.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&n!==void 0&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,l="select-one"==n,c=l?o+1:u.length,f=l?o:0;c>f;f++){var m=u[f];if(m.selected){var p=m.value;if(p||(p=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),l)return p;s.push(p)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1})("undefined"!=typeof jQuery?jQuery:window.Zepto);

/*
 * jQuery CSSEmoticons plugin 0.2.9
 *
 * Copyright (c) 2010 Steve Schwartz (JangoSteve)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Sun Oct 22 1:00:00 2010 -0500
 */
 (function(a){a.fn.emoticonize=function(m){var c=a.extend({},a.fn.emoticonize.defaults,m);var d=[")","(","*","[","]","{","}","|","^","<",">","\\","?","+","=","."];var l=[":-)",":o)",":c)",":^)",":-D",":-(",":-9",";-)",":-P",":-p",":-Þ",":-b",":-O",":-/",":-X",":-#",":'(","B-)","8-)",";*(",":-*",":-\\","?-)",": )",": ]","= ]","= )","8 )",": }",": D","8 D","X D","x D","= D",": (",": [",": {","= (","; )","; ]","; D",": P",": p","= P","= p",": b",": Þ",": O","8 O",": /","= /",": S",": #",": X","B )",": |",": \\","= \\",": *",": &gt;",": &lt;"];var j=[":)",":]","=]","=)","8)",":}",":D",":(",":[",":{","=(",";)",";]",";D",":P",":p","=P","=p",":b",":Þ",":O",":/","=/",":S",":#",":X","B)",":|",":\\","=\\",":*",":&gt;",":&lt;"];var h={"&gt;:)":{cssClass:"red-emoticon small-emoticon spaced-emoticon"},"&gt;;)":{cssClass:"red-emoticon small-emoticon spaced-emoticon"},"&gt;:(":{cssClass:"red-emoticon small-emoticon spaced-emoticon"},"&gt;: )":{cssClass:"red-emoticon small-emoticon"},"&gt;; )":{cssClass:"red-emoticon small-emoticon"},"&gt;: (":{cssClass:"red-emoticon small-emoticon"},";(":{cssClass:"red-emoticon spaced-emoticon"},"&lt;3":{cssClass:"pink-emoticon counter-rotated"},O_O:{cssClass:"no-rotate"},o_o:{cssClass:"no-rotate"},"0_o":{cssClass:"no-rotate"},O_o:{cssClass:"no-rotate"},T_T:{cssClass:"no-rotate"},"^_^":{cssClass:"no-rotate"},"O:)":{cssClass:"small-emoticon spaced-emoticon"},"O: )":{cssClass:"small-emoticon"},"8D":{cssClass:"small-emoticon spaced-emoticon"},XD:{cssClass:"small-emoticon spaced-emoticon"},xD:{cssClass:"small-emoticon spaced-emoticon"},"=D":{cssClass:"small-emoticon spaced-emoticon"},"8O":{cssClass:"small-emoticon spaced-emoticon"},"[+=..]":{cssClass:"no-rotate nintendo-controller"}};var f=new RegExp("(\\"+d.join("|\\")+")","g");var n="(^|[\\s\\0])";for(var g=l.length-1;g>=0;--g){l[g]=l[g].replace(f,"\\$1");l[g]=new RegExp(n+"("+l[g]+")","g")}for(var g=j.length-1;g>=0;--g){j[g]=j[g].replace(f,"\\$1");j[g]=new RegExp(n+"("+j[g]+")","g")}for(var k in h){h[k].regexp=k.replace(f,"\\$1");h[k].regexp=new RegExp(n+"("+h[k].regexp+")","g")}var e="span.css-emoticon";if(c.exclude){e+=","+c.exclude}var b=e.split(",");return this.not(e).each(function(){var o=a(this);var i="css-emoticon";if(c.animate){i+=" un-transformed-emoticon animated-emoticon"}for(var p in h){specialCssClass=i+" "+h[p].cssClass;o.html(o.html().replace(h[p].regexp,"$1<span data-tag='$2' class='"+specialCssClass+"'>$2</span>"))}a(l).each(function(){o.html(o.html().replace(this,"$1<span data-tag='$2' class='"+i+"'>$2</span>"))});a(j).each(function(){o.html(o.html().replace(this,"$1<span data-tag='$2' class='"+i+" spaced-emoticon'>$2</span>"))});a.each(b,function(q,r){o.find(a.trim(r)+" span.css-emoticon").each(function(){a(this).replaceWith(a(this).text())})});if(c.animate){setTimeout(function(){a(".un-transformed-emoticon").removeClass("un-transformed-emoticon")},c.delay)}})};a.fn.unemoticonize=function(b){var c=a.extend({},a.fn.emoticonize.defaults,b);return this.each(function(){var d=a(this);d.find("span.css-emoticon").each(function(){var e=a(this);if(c.animate){e.addClass("un-transformed-emoticon");setTimeout(function(){e.replaceWith(e.text())},c.delay)}else{e.replaceWith(e.text())}})})};a.fn.emoticonize.defaults={animate:false,delay:3000,exclude:"pre,code,.no-emoticons"}})(jQuery);
/**
* simplePagination.js v1.6
* A simple jQuery pagination plugin.
* http://flaviusmatis.github.com/simplePagination.js/
*
* Copyright 2012, Flavius Matis
* Released under the MIT license.
* http://flaviusmatis.github.com/license.html
*/

(function($){

        var methods = {
                init: function(options) {
                        var o = $.extend({
                                items: 1,
                                itemsOnPage: 1,
                                pages: 0,
                                displayedPages: 5,
                                edges: 2,
                                currentPage: 1,
                                hrefTextPrefix: '#page-',
                                hrefTextSuffix: '',
                                prevText: 'Prev',
                                nextText: 'Next',
                                ellipseText: '&hellip;',
                                cssStyle: 'light-theme',
                                labelMap: [],
                                selectOnClick: true,
                                onPageClick: function(pageNumber, event) {
                                        // Callback triggered when a page is clicked
                                        // Page number is given as an optional parameter
                                },
                                onInit: function() {
                                        // Callback triggered immediately after initialization
                                }
                        }, options || {});

                        var self = this;

                        o.pages = o.pages ? o.pages : Math.ceil(o.items / o.itemsOnPage) ? Math.ceil(o.items / o.itemsOnPage) : 1;
                        o.currentPage = o.currentPage - 1;
                        o.halfDisplayed = o.displayedPages / 2;

                        this.each(function() {
                                self.addClass(o.cssStyle + ' simple-pagination').data('pagination', o);
                                methods._draw.call(self);
                        });

                        o.onInit();

                        return this;
                },

                selectPage: function(page) {
                        methods._selectPage.call(this, page - 1);
                        return this;
                },

                prevPage: function() {
                        var o = this.data('pagination');
                        if (o.currentPage > 0) {
                                methods._selectPage.call(this, o.currentPage - 1);
                        }
                        return this;
                },

                nextPage: function() {
                        var o = this.data('pagination');
                        if (o.currentPage < o.pages - 1) {
                                methods._selectPage.call(this, o.currentPage + 1);
                        }
                        return this;
                },

                getPagesCount: function() {
                        return this.data('pagination').pages;
                },

                getCurrentPage: function () {
                        return this.data('pagination').currentPage + 1;
                },

                destroy: function(){
                        this.empty();
                        return this;
                },

                drawPage: function (page) {
                        var o = this.data('pagination');
                        o.currentPage = page - 1;
                        this.data('pagination', o);
                        methods._draw.call(this);
                        return this;
                },

                redraw: function(){
                        methods._draw.call(this);
                        return this;
                },

                disable: function(){
                        var o = this.data('pagination');
                        o.disabled = true;
                        this.data('pagination', o);
                        methods._draw.call(this);
                        return this;
                },

                enable: function(){
                        var o = this.data('pagination');
                        o.disabled = false;
                        this.data('pagination', o);
                        methods._draw.call(this);
                        return this;
                },

                updateItems: function (newItems) {
                        var o = this.data('pagination');
                        o.items = newItems;
                        o.pages = methods._getPages(o);
                        this.data('pagination', o);
                        methods._draw.call(this);
                },

                updateItemsOnPage: function (itemsOnPage) {
                        var o = this.data('pagination');
                        o.itemsOnPage = itemsOnPage;
                        o.pages = methods._getPages(o);
                        this.data('pagination', o);
                        methods._selectPage.call(this, 0);
                        return this;
                },

                _draw: function() {
                        var        o = this.data('pagination'),
                                interval = methods._getInterval(o),
                                i,
                                tagName;

                        methods.destroy.call(this);
                        
                        tagName = (typeof this.prop === 'function') ? this.prop('tagName') : this.attr('tagName');

                        var $panel = tagName === 'UL' ? this : $('<ul></ul>').appendTo(this);

                        // Generate Prev link
                        if (o.prevText) {
                                methods._appendItem.call(this, o.currentPage - 1, {text: o.prevText, classes: 'prev'});
                        }

                        // Generate start edges
                        if (interval.start > 0 && o.edges > 0) {
                                var end = Math.min(o.edges, interval.start);
                                for (i = 0; i < end; i++) {
                                        methods._appendItem.call(this, i);
                                }
                                if (o.edges < interval.start && (interval.start - o.edges != 1)) {
                                        $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
                                } else if (interval.start - o.edges == 1) {
                                        methods._appendItem.call(this, o.edges);
                                }
                        }

                        // Generate interval links
                        for (i = interval.start; i < interval.end; i++) {
                                methods._appendItem.call(this, i);
                        }

                        // Generate end edges
                        if (interval.end < o.pages && o.edges > 0) {
                                if (o.pages - o.edges > interval.end && (o.pages - o.edges - interval.end != 1)) {
                                        $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
                                } else if (o.pages - o.edges - interval.end == 1) {
                                        methods._appendItem.call(this, interval.end++);
                                }
                                var begin = Math.max(o.pages - o.edges, interval.end);
                                for (i = begin; i < o.pages; i++) {
                                        methods._appendItem.call(this, i);
                                }
                        }

                        // Generate Next link
                        if (o.nextText) {
                                methods._appendItem.call(this, o.currentPage + 1, {text: o.nextText, classes: 'next'});
                        }
                },

                _getPages: function(o) {
                        var pages = Math.ceil(o.items / o.itemsOnPage);
                        return pages || 1;
                },

                _getInterval: function(o) {
                        return {
                                start: Math.ceil(o.currentPage > o.halfDisplayed ? Math.max(Math.min(o.currentPage - o.halfDisplayed, (o.pages - o.displayedPages)), 0) : 0),
                                end: Math.ceil(o.currentPage > o.halfDisplayed ? Math.min(o.currentPage + o.halfDisplayed, o.pages) : Math.min(o.displayedPages, o.pages))
                        };
                },

                _appendItem: function(pageIndex, opts) {
                        var self = this, options, $link, o = self.data('pagination'), $linkWrapper = $('<li></li>'), $ul = self.find('ul');

                        pageIndex = pageIndex < 0 ? 0 : (pageIndex < o.pages ? pageIndex : o.pages - 1);

                        options = {
                                text: pageIndex + 1,
                                classes: ''
                        };

                        if (o.labelMap.length && o.labelMap[pageIndex]) {
                                options.text = o.labelMap[pageIndex];
                        }

                        options = $.extend(options, opts || {});

                        if (pageIndex == o.currentPage || o.disabled) {
                                if (o.disabled) {
                                        $linkWrapper.addClass('disabled');
                                } else {
                                        $linkWrapper.addClass('active');
                                }
                                $link = $('<span class="current">' + (options.text) + '</span>');
                        } else {
                                $link = $('<a href="' + o.hrefTextPrefix + (pageIndex + 1) + o.hrefTextSuffix + '" class="page-link">' + (options.text) + '</a>');
                                $link.click(function(event){
                                        return methods._selectPage.call(self, pageIndex, event);
                                });
                        }

                        if (options.classes) {
                                $link.addClass(options.classes);
                        }

                        $linkWrapper.append($link);

                        if ($ul.length) {
                                $ul.append($linkWrapper);
                        } else {
                                self.append($linkWrapper);
                        }
                },

                _selectPage: function(pageIndex, event) {
                        var o = this.data('pagination');
                        o.currentPage = pageIndex;
                        if (o.selectOnClick) {
                                methods._draw.call(this);
                        }
                        return o.onPageClick(pageIndex + 1, event);
                }

        };

        $.fn.pagination = function(method) {

                // Method calling logic
                if (methods[method] && method.charAt(0) != '_') {
                        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else if (typeof method === 'object' || !method) {
                        return methods.init.apply(this, arguments);
                } else {
                        $.error('Method ' +  method + ' does not exist on jQuery.pagination');
                }

        };

})(jQuery);

/*
 * jQuery UI Widget 1.10.3+amd
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */

(function (factory) {
    if (typeof define === "function" && define.amd) {
        // Register as an anonymous AMD module:
        define(["jquery"], factory);
    } else {
        // Browser globals:
        factory(jQuery);
    }
}(function( $, undefined ) {

var uuid = 0,
	slice = Array.prototype.slice,
	_cleanData = $.cleanData;
$.cleanData = function( elems ) {
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
		try {
			$( elem ).triggerHandler( "remove" );
		// http://bugs.jquery.com/ticket/8235
		} catch( e ) {}
	}
	_cleanData( elems );
};

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );
};

$.widget.extend = function( target ) {
	var input = slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData( this.widgetName )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( value === undefined ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( value === undefined ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			// accept selectors, DOM elements
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^(\w+)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

}));

/*
 * tmpl min js
 * https://github.com/sigurdga/django-jquery-file-upload
 *
 */


!function(e){"use strict";var n=function(e,t){var r=/[^\w\-\.:]/.test(e)?new Function(n.arg+",tmpl","var _e=tmpl.encode"+n.helper+",_s='"+e.replace(n.regexp,n.func)+"';return _s;"):n.cache[e]=n.cache[e]||n(n.load(e));return t?r(t,n):function(e){return r(e,n)}};n.cache={},n.load=function(e){return document.getElementById(e).innerHTML},n.regexp=/([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g,n.func=function(e,n,t,r,c,u){return n?{"\n":"\\n","\r":"\\r","	":"\\t"," ":" "}[n]||"\\"+n:t?"="===t?"'+_e("+r+")+'":"'+"+r+"+'":c?"';":u?"_s+='":void 0},n.encReg=/[<>&"'\x00]/g,n.encMap={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#39;"},n.encode=function(e){return String(e).replace(n.encReg,function(e){return n.encMap[e]||""})},n.arg="o",n.helper=",print=function(s,e){_s+=e&&(s||'')||_e(s);},include=function(s,d){_s+=tmpl(s,d);}","function"==typeof define&&define.amd?define(function(){return n}):e.tmpl=n}(this);
/*
 * load image min js
 * https://github.com/sigurdga/django-jquery-file-upload
 *
 */

(function(e){"use strict";var t=function(e,i,a){var n,r,o=document.createElement("img");if(o.onerror=i,o.onload=function(){!r||a&&a.noRevoke||t.revokeObjectURL(r),i&&i(t.scale(o,a))},t.isInstanceOf("Blob",e)||t.isInstanceOf("File",e))n=r=t.createObjectURL(e),o._type=e.type;else{if("string"!=typeof e)return!1;n=e,a&&a.crossOrigin&&(o.crossOrigin=a.crossOrigin)}return n?(o.src=n,o):t.readFile(e,function(e){var t=e.target;t&&t.result?o.src=t.result:i&&i(e)})},i=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL&&webkitURL;t.isInstanceOf=function(e,t){return Object.prototype.toString.call(t)==="[object "+e+"]"},t.transformCoordinates=function(){},t.getTransformedOptions=function(e){return e},t.renderImageToCanvas=function(e,t,i,a,n,r,o,s,d,l){return e.getContext("2d").drawImage(t,i,a,n,r,o,s,d,l),e},t.hasCanvasOption=function(e){return e.canvas||e.crop},t.scale=function(e,i){i=i||{};var a,n,r,o,s,d,l,c,u,g=document.createElement("canvas"),f=e.getContext||t.hasCanvasOption(i)&&g.getContext,h=e.naturalWidth||e.width,m=e.naturalHeight||e.height,p=h,S=m,b=function(){var e=Math.max((r||p)/p,(o||S)/S);e>1&&(p=Math.ceil(p*e),S=Math.ceil(S*e))},v=function(){var e=Math.min((a||p)/p,(n||S)/S);1>e&&(p=Math.ceil(p*e),S=Math.ceil(S*e))};return f&&(i=t.getTransformedOptions(i),l=i.left||0,c=i.top||0,i.sourceWidth?(s=i.sourceWidth,void 0!==i.right&&void 0===i.left&&(l=h-s-i.right)):s=h-l-(i.right||0),i.sourceHeight?(d=i.sourceHeight,void 0!==i.bottom&&void 0===i.top&&(c=m-d-i.bottom)):d=m-c-(i.bottom||0),p=s,S=d),a=i.maxWidth,n=i.maxHeight,r=i.minWidth,o=i.minHeight,f&&a&&n&&i.crop?(p=a,S=n,u=s/d-a/n,0>u?(d=n*s/a,void 0===i.top&&void 0===i.bottom&&(c=(m-d)/2)):u>0&&(s=a*d/n,void 0===i.left&&void 0===i.right&&(l=(h-s)/2))):((i.contain||i.cover)&&(r=a=a||r,o=n=n||o),i.cover?(v(),b()):(b(),v())),f?(g.width=p,g.height=S,t.transformCoordinates(g,i),t.renderImageToCanvas(g,e,l,c,s,d,0,0,p,S)):(e.width=p,e.height=S,e)},t.createObjectURL=function(e){return i?i.createObjectURL(e):!1},t.revokeObjectURL=function(e){return i?i.revokeObjectURL(e):!1},t.readFile=function(e,t,i){if(window.FileReader){var a=new FileReader;if(a.onload=a.onerror=t,i=i||"readAsDataURL",a[i])return a[i](e),a}return!1},"function"==typeof define&&define.amd?define(function(){return t}):e.loadImage=t})(this),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image"],e):e(window.loadImage)}(function(e){"use strict";if(window.navigator&&window.navigator.platform&&/iP(hone|od|ad)/.test(window.navigator.platform)){var t=e.renderImageToCanvas;e.detectSubsampling=function(e){var t,i;return e.width*e.height>1048576?(t=document.createElement("canvas"),t.width=t.height=1,i=t.getContext("2d"),i.drawImage(e,-e.width+1,0),0===i.getImageData(0,0,1,1).data[3]):!1},e.detectVerticalSquash=function(e,t){var i,a,n,r,o,s=e.naturalHeight||e.height,d=document.createElement("canvas"),l=d.getContext("2d");for(t&&(s/=2),d.width=1,d.height=s,l.drawImage(e,0,0),i=l.getImageData(0,0,1,s).data,a=0,n=s,r=s;r>a;)o=i[4*(r-1)+3],0===o?n=r:a=r,r=n+a>>1;return r/s||1},e.renderImageToCanvas=function(i,a,n,r,o,s,d,l,c,u){if("image/jpeg"===a._type){var g,f,h,m,p=i.getContext("2d"),S=document.createElement("canvas"),b=1024,v=S.getContext("2d");if(S.width=b,S.height=b,p.save(),g=e.detectSubsampling(a),g&&(n/=2,r/=2,o/=2,s/=2),f=e.detectVerticalSquash(a,g),g||1!==f){for(r*=f,c=Math.ceil(b*c/o),u=Math.ceil(b*u/s/f),l=0,m=0;s>m;){for(d=0,h=0;o>h;)v.clearRect(0,0,b,b),v.drawImage(a,n,r,o,s,-h,-m,o,s),p.drawImage(S,0,0,b,b,d,l,c,u),h+=b,d+=c;m+=b,l+=u}return p.restore(),i}}return t(i,a,n,r,o,s,d,l,c,u)}}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image"],e):e(window.loadImage)}(function(e){"use strict";var t=e.hasCanvasOption;e.hasCanvasOption=function(e){return t(e)||e.orientation},e.transformCoordinates=function(e,t){var i=e.getContext("2d"),a=e.width,n=e.height,r=t.orientation;if(r)switch(r>4&&(e.width=n,e.height=a),r){case 2:i.translate(a,0),i.scale(-1,1);break;case 3:i.translate(a,n),i.rotate(Math.PI);break;case 4:i.translate(0,n),i.scale(1,-1);break;case 5:i.rotate(.5*Math.PI),i.scale(1,-1);break;case 6:i.rotate(.5*Math.PI),i.translate(0,-n);break;case 7:i.rotate(.5*Math.PI),i.translate(a,-n),i.scale(-1,1);break;case 8:i.rotate(-.5*Math.PI),i.translate(-a,0)}},e.getTransformedOptions=function(e){if(!e.orientation||1===e.orientation)return e;var t,i={};for(t in e)e.hasOwnProperty(t)&&(i[t]=e[t]);switch(e.orientation){case 2:i.left=e.right,i.right=e.left;break;case 3:i.left=e.right,i.top=e.bottom,i.right=e.left,i.bottom=e.top;break;case 4:i.top=e.bottom,i.bottom=e.top;break;case 5:i.left=e.top,i.top=e.left,i.right=e.bottom,i.bottom=e.right;break;case 6:i.left=e.top,i.top=e.right,i.right=e.bottom,i.bottom=e.left;break;case 7:i.left=e.bottom,i.top=e.right,i.right=e.top,i.bottom=e.left;break;case 8:i.left=e.bottom,i.top=e.left,i.right=e.top,i.bottom=e.right}return e.orientation>4&&(i.maxWidth=e.maxHeight,i.maxHeight=e.maxWidth,i.minWidth=e.minHeight,i.minHeight=e.minWidth,i.sourceWidth=e.sourceHeight,i.sourceHeight=e.sourceWidth),i}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image"],e):e(window.loadImage)}(function(e){"use strict";var t=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);e.blobSlice=t&&function(){var e=this.slice||this.webkitSlice||this.mozSlice;return e.apply(this,arguments)},e.metaDataParsers={jpeg:{65505:[]}},e.parseMetaData=function(t,i,a){a=a||{};var n=this,r=a.maxMetaDataSize||262144,o={},s=!(window.DataView&&t&&t.size>=12&&"image/jpeg"===t.type&&e.blobSlice);(s||!e.readFile(e.blobSlice.call(t,0,r),function(t){var r,s,d,l,c=t.target.result,u=new DataView(c),g=2,f=u.byteLength-4,h=g;if(65496===u.getUint16(0)){for(;f>g&&(r=u.getUint16(g),r>=65504&&65519>=r||65534===r);){if(s=u.getUint16(g+2)+2,g+s>u.byteLength){console.log("Invalid meta data: Invalid segment size.");break}if(d=e.metaDataParsers.jpeg[r])for(l=0;d.length>l;l+=1)d[l].call(n,u,g,s,o,a);g+=s,h=g}!a.disableImageHead&&h>6&&(o.imageHead=c.slice?c.slice(0,h):new Uint8Array(c).subarray(0,h))}else console.log("Invalid JPEG file: Missing JPEG marker.");i(o)},"readAsArrayBuffer"))&&i(o)}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image","load-image-meta"],e):e(window.loadImage)}(function(e){"use strict";e.ExifMap=function(){return this},e.ExifMap.prototype.map={Orientation:274},e.ExifMap.prototype.get=function(e){return this[e]||this[this.map[e]]},e.getExifThumbnail=function(e,t,i){var a,n,r;if(!i||t+i>e.byteLength)return console.log("Invalid Exif data: Invalid thumbnail data."),void 0;for(a=[],n=0;i>n;n+=1)r=e.getUint8(t+n),a.push((16>r?"0":"")+r.toString(16));return"data:image/jpeg,%"+a.join("%")},e.exifTagTypes={1:{getValue:function(e,t){return e.getUint8(t)},size:1},2:{getValue:function(e,t){return String.fromCharCode(e.getUint8(t))},size:1,ascii:!0},3:{getValue:function(e,t,i){return e.getUint16(t,i)},size:2},4:{getValue:function(e,t,i){return e.getUint32(t,i)},size:4},5:{getValue:function(e,t,i){return e.getUint32(t,i)/e.getUint32(t+4,i)},size:8},9:{getValue:function(e,t,i){return e.getInt32(t,i)},size:4},10:{getValue:function(e,t,i){return e.getInt32(t,i)/e.getInt32(t+4,i)},size:8}},e.exifTagTypes[7]=e.exifTagTypes[1],e.getExifValue=function(t,i,a,n,r,o){var s,d,l,c,u,g,f=e.exifTagTypes[n];if(!f)return console.log("Invalid Exif data: Invalid tag type."),void 0;if(s=f.size*r,d=s>4?i+t.getUint32(a+8,o):a+8,d+s>t.byteLength)return console.log("Invalid Exif data: Invalid data offset."),void 0;if(1===r)return f.getValue(t,d,o);for(l=[],c=0;r>c;c+=1)l[c]=f.getValue(t,d+c*f.size,o);if(f.ascii){for(u="",c=0;l.length>c&&(g=l[c],"\0"!==g);c+=1)u+=g;return u}return l},e.parseExifTag=function(t,i,a,n,r){var o=t.getUint16(a,n);r.exif[o]=e.getExifValue(t,i,a,t.getUint16(a+2,n),t.getUint32(a+4,n),n)},e.parseExifTags=function(e,t,i,a,n){var r,o,s;if(i+6>e.byteLength)return console.log("Invalid Exif data: Invalid directory offset."),void 0;if(r=e.getUint16(i,a),o=i+2+12*r,o+4>e.byteLength)return console.log("Invalid Exif data: Invalid directory size."),void 0;for(s=0;r>s;s+=1)this.parseExifTag(e,t,i+2+12*s,a,n);return e.getUint32(o,a)},e.parseExifData=function(t,i,a,n,r){if(!r.disableExif){var o,s,d,l=i+10;if(1165519206===t.getUint32(i+4)){if(l+8>t.byteLength)return console.log("Invalid Exif data: Invalid segment size."),void 0;if(0!==t.getUint16(i+8))return console.log("Invalid Exif data: Missing byte alignment offset."),void 0;switch(t.getUint16(l)){case 18761:o=!0;break;case 19789:o=!1;break;default:return console.log("Invalid Exif data: Invalid byte alignment marker."),void 0}if(42!==t.getUint16(l+2,o))return console.log("Invalid Exif data: Missing TIFF marker."),void 0;s=t.getUint32(l+4,o),n.exif=new e.ExifMap,s=e.parseExifTags(t,l,l+s,o,n),s&&!r.disableExifThumbnail&&(d={exif:{}},s=e.parseExifTags(t,l,l+s,o,d),d.exif[513]&&(n.exif.Thumbnail=e.getExifThumbnail(t,l+d.exif[513],d.exif[514]))),n.exif[34665]&&!r.disableExifSub&&e.parseExifTags(t,l,l+n.exif[34665],o,n),n.exif[34853]&&!r.disableExifGps&&e.parseExifTags(t,l,l+n.exif[34853],o,n)}}},e.metaDataParsers.jpeg[65505].push(e.parseExifData)}),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image","load-image-exif"],e):e(window.loadImage)}(function(e){"use strict";var t,i,a;e.ExifMap.prototype.tags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright",36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",42240:"Gamma",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubSecTime",37521:"SubSecTimeOriginal",37522:"SubSecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"PhotographicSensitivity",34856:"OECF",34864:"SensitivityType",34865:"StandardOutputSensitivity",34866:"RecommendedExposureIndex",34867:"ISOSpeed",34868:"ISOSpeedLatitudeyyy",34869:"ISOSpeedLatitudezzz",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRatio",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",42016:"ImageUniqueID",42032:"CameraOwnerName",42033:"BodySerialNumber",42034:"LensSpecification",42035:"LensMake",42036:"LensModel",42037:"LensSerialNumber",0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential",31:"GPSHPositioningError"},e.ExifMap.prototype.stringValues={ExposureProgram:{0:"Undefined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Undefined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},ComponentsConfiguration:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"},Orientation:{1:"top-left",2:"top-right",3:"bottom-right",4:"bottom-left",5:"left-top",6:"right-top",7:"right-bottom",8:"left-bottom"}},e.ExifMap.prototype.getText=function(e){var t=this.get(e);switch(e){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":case"Orientation":return this.stringValues[e][t];case"ExifVersion":case"FlashpixVersion":return String.fromCharCode(t[0],t[1],t[2],t[3]);case"ComponentsConfiguration":return this.stringValues[e][t[0]]+this.stringValues[e][t[1]]+this.stringValues[e][t[2]]+this.stringValues[e][t[3]];case"GPSVersionID":return t[0]+"."+t[1]+"."+t[2]+"."+t[3]}return t+""},t=e.ExifMap.prototype.tags,i=e.ExifMap.prototype.map;for(a in t)t.hasOwnProperty(a)&&(i[t[a]]=a);e.ExifMap.prototype.getAll=function(){var e,i,a={};for(e in this)this.hasOwnProperty(e)&&(i=t[e],i&&(a[i]=this.getText(i)));return a}});

/*
 * jQuery File Upload Plugin 5.40.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, window, document, location, Blob, FormData */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jquery.ui.widget'
        ], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Detect file input support, based on
    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/
    $.support.fileInput = !(new RegExp(
        // Handle devices which give false positives for the feature detection:
        '(Android (1\\.[0156]|2\\.[01]))' +
            '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' +
            '|(w(eb)?OSBrowser)|(webOS)' +
            '|(Kindle/(1\\.0|2\\.[05]|3\\.0))'
    ).test(window.navigator.userAgent) ||
        // Feature detection for all other devices:
        $('<input type="file">').prop('disabled'));

    // The FileReader API is not actually used, but works as feature detection,
    // as some Safari versions (5?) support XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads.
    // window.XMLHttpRequestUpload is not available on IE10, so we check for
    // window.ProgressEvent instead to detect XHR2 file upload capability:
    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // Detect support for Blob slicing (required for chunked uploads):
    $.support.blobSlice = window.Blob && (Blob.prototype.slice ||
        Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
            // The drop target element(s), by the default the complete document.
            // Set to null to disable drag & drop support:
            dropZone: $(document),
            // The paste target element(s), by the default the complete document.
            // Set to null to disable paste support:
            pasteZone: $(document),
            // The file input field(s), that are listened to for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // The following option limits the number of files uploaded with one
            // XHR request to keep the request size under or equal to the defined
            // limit in bytes:
            limitMultiFileUploadSize: undefined,
            // Multipart file uploads add a number of bytes to each uploaded file,
            // therefore the following option adds an overhead for each file used
            // in the limitMultiFileUploadSize configuration:
            limitMultiFileUploadSizeOverhead: 512,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            // Interval in milliseconds to calculate and trigger progress events:
            progressInterval: 100,
            // Interval in milliseconds to calculate progress bitrate:
            bitrateInterval: 500,
            // By default, uploads are started automatically when adding files:
            autoUpload: true,

            // Error and info messages:
            messages: {
                uploadedBytes: 'Uploaded bytes exceed file size'
            },

            // Translation function, gets the message key to be translated
            // and an object with context specific data as arguments:
            i18n: function (message, context) {
                message = this.messages[message] || message.toString();
                if (context) {
                    $.each(context, function (key, value) {
                        message = message.replace('{' + key + '}', value);
                    });
                }
                return message;
            },

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uploads, else
            // once for each file selection.
            //
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows you to override plugin options as well as define ajax settings.
            //
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            //
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                if (data.autoUpload || (data.autoUpload !== false &&
                        $(this).fileupload('option', 'autoUpload'))) {
                    data.process().done(function () {
                        data.submit();
                    });
                }
            },

            // Other callbacks:

            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);

            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);

            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);

            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);

            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);

            // Callback for change events of the fileInput(s):
            // change: function (e, data) {}, // .bind('fileuploadchange', func);

            // Callback for paste events to the pasteZone(s):
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

            // Callback for drop events of the dropZone(s):
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

            // Callback for dragover events of the dropZone(s):
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // Callback for the start of each chunk upload request:
            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

            // Callback for successful chunk uploads:
            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

            // Callback for failed (abort or error) chunk uploads:
            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

            // Callback for completed (success, abort or error) chunk upload requests:
            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false
        },

        // A list of options that require reinitializing event listeners and/or
        // special initialization code:
        _specialOptions: [
            'fileInput',
            'dropZone',
            'pasteZone',
            'multipart',
            'forceIframeTransport'
        ],

        _blobSlice: $.support.blobSlice && function () {
            var slice = this.slice || this.webkitSlice || this.mozSlice;
            return slice.apply(this, arguments);
        },

        _BitrateTimer: function () {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (now, loaded, interval) {
                var timeDiff = now - this.timestamp;
                if (!this.bitrate || !interval || timeDiff > interval) {
                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                    this.loaded = loaded;
                    this.timestamp = now;
                }
                return this.bitrate;
            };
        },

        _isXHRUpload: function (options) {
            return !options.forceIframeTransport &&
                ((!options.multipart && $.support.xhrFileUpload) ||
                $.support.xhrFormDataFileUpload);
        },

        _getFormData: function (options) {
            var formData;
            if ($.type(options.formData) === 'function') {
                return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
                return options.formData;
            }
            if ($.type(options.formData) === 'object') {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _initProgressObject: function (obj) {
            var progress = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (obj._progress) {
                $.extend(obj._progress, progress);
            } else {
                obj._progress = progress;
            }
        },

        _initResponseObject: function (obj) {
            var prop;
            if (obj._response) {
                for (prop in obj._response) {
                    if (obj._response.hasOwnProperty(prop)) {
                        delete obj._response[prop];
                    }
                }
            } else {
                obj._response = {};
            }
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
                    loaded;
                if (data._time && data.progressInterval &&
                        (now - data._time < data.progressInterval) &&
                        e.loaded !== e.total) {
                    return;
                }
                data._time = now;
                loaded = Math.floor(
                    e.loaded / e.total * (data.chunkSize || data._progress.total)
                ) + (data.uploadedBytes || 0);
                // Add the difference from the previously loaded state
                // to the global loaded counter:
                this._progress.loaded += (loaded - data._progress.loaded);
                this._progress.bitrate = this._bitrateTimer.getBitrate(
                    now,
                    this._progress.loaded,
                    data.bitrateInterval
                );
                data._progress.loaded = data.loaded = loaded;
                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(
                    now,
                    loaded,
                    data.bitrateInterval
                );
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger(
                    'progress',
                    $.Event('progress', {delegatedEvent: e}),
                    data
                );
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger(
                    'progressall',
                    $.Event('progressall', {delegatedEvent: e}),
                    this._progress
                );
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _isInstanceOf: function (type, obj) {
            // Cross-frame instanceof check
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },

        _initXHRData: function (options) {
            var that = this,
                formData,
                file = options.files[0],
                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = $.type(options.paramName) === 'array' ?
                    options.paramName[0] : options.paramName;
            options.headers = $.extend({}, options.headers);
            if (options.contentRange) {
                options.headers['Content-Range'] = options.contentRange;
            }
            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
                options.headers['Content-Disposition'] = 'attachment; filename="' +
                    encodeURI(file.name) + '"';
            }
            if (!multipart) {
                options.contentType = file.type || 'application/octet-stream';
                options.data = options.blob || file;
            } else if ($.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: ($.type(options.paramName) === 'array' &&
                                    options.paramName[index]) || paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (that._isInstanceOf('FormData', options.formData)) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(paramName, options.blob, file.name);
                    } else {
                        $.each(options.files, function (index, file) {
                            // This check allows the tests to run with
                            // dummy objects:
                            if (that._isInstanceOf('File', file) ||
                                    that._isInstanceOf('Blob', file)) {
                                formData.append(
                                    ($.type(options.paramName) === 'array' &&
                                        options.paramName[index]) || paramName,
                                    file,
                                    file.uploadName || file.name
                                );
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function (options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && targetHost && targetHost !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options);
            }
        },

        _getParamName: function (options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },

        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
                // If the given file input doesn't have an associated form,
                // use the default widget file input's form:
                if (!options.form.length) {
                    options.form = $(this.options.fileInput.prop('form'));
                }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type ||
                ($.type(options.form.prop('method')) === 'string' &&
                    options.form.prop('method')) || ''
                ).toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' &&
                    options.type !== 'PATCH') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },

        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // jQuery 1.6 doesn't provide .state(),
        // while jQuery 1.8+ removed .isRejected() and .isResolved():
        _getDeferredState: function (deferred) {
            if (deferred.state) {
                return deferred.state();
            }
            if (deferred.isResolved()) {
                return 'resolved';
            }
            if (deferred.isRejected()) {
                return 'rejected';
            }
            return 'pending';
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Adds convenience methods to the data callback argument:
        _addConvenienceMethods: function (e, data) {
            var that = this,
                getPromise = function (args) {
                    return $.Deferred().resolveWith(that, args).promise();
                };
            data.process = function (resolveFunc, rejectFunc) {
                if (resolveFunc || rejectFunc) {
                    data._processQueue = this._processQueue =
                        (this._processQueue || getPromise([this])).pipe(
                            function () {
                                if (data.errorThrown) {
                                    return $.Deferred()
                                        .rejectWith(that, [data]).promise();
                                }
                                return getPromise(arguments);
                            }
                        ).pipe(resolveFunc, rejectFunc);
                }
                return this._processQueue || getPromise([this]);
            };
            data.submit = function () {
                if (this.state() !== 'pending') {
                    data.jqXHR = this.jqXHR =
                        (that._trigger(
                            'submit',
                            $.Event('submit', {delegatedEvent: e}),
                            this
                        ) !== false) && that._onSend(e, this);
                }
                return this.jqXHR || that._getXHRPromise();
            };
            data.abort = function () {
                if (this.jqXHR) {
                    return this.jqXHR.abort();
                }
                this.errorThrown = 'abort';
                that._trigger('fail', null, this);
                return that._getXHRPromise(false);
            };
            data.state = function () {
                if (this.jqXHR) {
                    return that._getDeferredState(this.jqXHR);
                }
                if (this._processQueue) {
                    return that._getDeferredState(this._processQueue);
                }
            };
            data.processing = function () {
                return !this.jqXHR && this._processQueue && that
                    ._getDeferredState(this._processQueue) === 'pending';
            };
            data.progress = function () {
                return this._progress;
            };
            data.response = function () {
                return this._response;
            };
        },

        // Parses the Range header from the server response
        // and returns the uploaded bytes:
        _getUploadedBytes: function (jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
                parts = range && range.split('-'),
                upperBytesPos = parts && parts.length > 1 &&
                    parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            options.uploadedBytes = options.uploadedBytes || 0;
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes,
                mcs = options.maxChunkSize || fs,
                slice = this._blobSlice,
                dfd = $.Deferred(),
                promise = dfd.promise(),
                jqXHR,
                upload;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = options.i18n('uploadedBytes');
                return this._getXHRPromise(
                    false,
                    options.context,
                    [null, 'error', file.error]
                );
            }
            // The chunk upload method:
            upload = function () {
                // Clone the options object for each chunk upload:
                var o = $.extend({}, options),
                    currentLoaded = o._progress.loaded;
                o.blob = slice.call(
                    file,
                    ub,
                    ub + mcs,
                    file.type
                );
                // Store the current chunk size, as the blob itself
                // will be dereferenced after data processing:
                o.chunkSize = o.blob.size;
                // Expose the chunk bytes position range:
                o.contentRange = 'bytes ' + ub + '-' +
                    (ub + o.chunkSize - 1) + '/' + fs;
                // Process the upload data (the blob and potential form data):
                that._initXHRData(o);
                // Add progress listeners for this chunk upload:
                that._initProgressListener(o);
                jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) ||
                        that._getXHRPromise(false, o.context))
                    .done(function (result, textStatus, jqXHR) {
                        ub = that._getUploadedBytes(jqXHR) ||
                            (ub + o.chunkSize);
                        // Create a progress event if no final progress event
                        // with loaded equaling total has been triggered
                        // for this chunk:
                        if (currentLoaded + o.chunkSize - o._progress.loaded) {
                            that._onProgress($.Event('progress', {
                                lengthComputable: true,
                                loaded: ub - o.uploadedBytes,
                                total: ub - o.uploadedBytes
                            }), o);
                        }
                        options.uploadedBytes = o.uploadedBytes = ub;
                        o.result = result;
                        o.textStatus = textStatus;
                        o.jqXHR = jqXHR;
                        that._trigger('chunkdone', null, o);
                        that._trigger('chunkalways', null, o);
                        if (ub < fs) {
                            // File upload not yet complete,
                            // continue with the next chunk:
                            upload();
                        } else {
                            dfd.resolveWith(
                                o.context,
                                [result, textStatus, jqXHR]
                            );
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        o.jqXHR = jqXHR;
                        o.textStatus = textStatus;
                        o.errorThrown = errorThrown;
                        that._trigger('chunkfail', null, o);
                        that._trigger('chunkalways', null, o);
                        dfd.rejectWith(
                            o.context,
                            [jqXHR, textStatus, errorThrown]
                        );
                    });
            };
            this._enhancePromise(promise);
            promise.abort = function () {
                return jqXHR.abort();
            };
            upload();
            return promise;
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
                // Set timer for global bitrate progress calculation:
                this._bitrateTimer = new this._BitrateTimer();
                // Reset the global progress values:
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0;
            }
            // Make sure the container objects for the .response() and
            // .progress() methods on the data object are available
            // and reset to their initial state:
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            // Initialize the global progress values:
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            var total = options._progress.total,
                response = options._response;
            if (options._progress.loaded < total) {
                // Create a progress event if no final progress event
                // with loaded equaling total has been triggered:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: total,
                    total: total
                }), options);
            }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._progress.loaded -= options._progress.loaded;
                this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
        },

        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            // jqXHRorResult, textStatus and jqXHRorError are added to the
            // options object via done and fail callbacks
            this._trigger('always', null, options);
        },

        _onSend: function (e, data) {
            if (!data.submit) {
                this._addConvenienceMethods(e, data);
            }
            var that = this,
                jqXHR,
                aborted,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function () {
                    that._sending += 1;
                    // Set timer for bitrate progress calculation:
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || (
                        ((aborted || that._trigger(
                            'send',
                            $.Event('send', {delegatedEvent: e}),
                            options
                        ) === false) &&
                        that._getXHRPromise(false, options.context, aborted)) ||
                        that._chunkedUpload(options) || $.ajax(options)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        that._sending -= 1;
                        that._active -= 1;
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (that._getDeferredState(nextSlot) === 'pending') {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                        if (that._active === 0) {
                            // The stop callback is triggered when all uploads have
                            // been completed, equivalent to the global ajaxStop event:
                            that._trigger('stop');
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.pipe(send);
                } else {
                    this._sequence = this._sequence.pipe(send, send);
                    pipe = this._sequence;
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    aborted = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(options.context, aborted);
                        }
                        return send();
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                files = data.files,
                filesLength = files.length,
                limit = options.limitMultiFileUploads,
                limitSize = options.limitMultiFileUploadSize,
                overhead = options.limitMultiFileUploadSizeOverhead,
                batchSize = 0,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i,
                j = 0;
            if (limitSize && (!filesLength || files[0].size === undefined)) {
                limitSize = undefined;
            }
            if (!(options.singleFileUploads || limit || limitSize) ||
                    !this._isXHRUpload(options)) {
                fileSet = [files];
                paramNameSet = [paramName];
            } else if (!(options.singleFileUploads || limitSize) && limit) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i += limit) {
                    fileSet.push(files.slice(i, i + limit));
                    paramNameSlice = paramName.slice(i, i + limit);
                    if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                    }
                    paramNameSet.push(paramNameSlice);
                }
            } else if (!options.singleFileUploads && limitSize) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i = i + 1) {
                    batchSize += files[i].size + overhead;
                    if (i + 1 === filesLength ||
                            ((batchSize + files[i + 1].size + overhead) > limitSize) ||
                            (limit && i + 1 - j >= limit)) {
                        fileSet.push(files.slice(j, i + 1));
                        paramNameSlice = paramName.slice(j, i + 1);
                        if (!paramNameSlice.length) {
                            paramNameSlice = paramName;
                        }
                        paramNameSet.push(paramNameSlice);
                        j = i + 1;
                        batchSize = 0;
                    }
                }
            } else {
                paramNameSet = paramName;
            }
            data.originalFiles = files;
            $.each(fileSet || files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                that._initResponseObject(newData);
                that._initProgressObject(newData);
                that._addConvenienceMethods(e, newData);
                result = that._trigger(
                    'add',
                    $.Event('add', {delegatedEvent: e}),
                    newData
                );
                return result;
            });
            return result;
        },

        _replaceFileInput: function (input) {
            var inputClone = input.clone(true);
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // elements set with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _handleFileTreeEntry: function (entry, path) {
            var that = this,
                dfd = $.Deferred(),
                errorHandler = function (e) {
                    if (e && !e.entry) {
                        e.entry = entry;
                    }
                    // Since $.when returns immediately if one
                    // Deferred is rejected, we use resolve instead.
                    // This allows valid files and invalid items
                    // to be returned together in one set:
                    dfd.resolve([e]);
                },
                dirReader;
            path = path || '';
            if (entry.isFile) {
                if (entry._file) {
                    // Workaround for Chrome bug #149735
                    entry._file.relativePath = path;
                    dfd.resolve(entry._file);
                } else {
                    entry.file(function (file) {
                        file.relativePath = path;
                        dfd.resolve(file);
                    }, errorHandler);
                }
            } else if (entry.isDirectory) {
                dirReader = entry.createReader();
                dirReader.readEntries(function (entries) {
                    that._handleFileTreeEntries(
                        entries,
                        path + entry.name + '/'
                    ).done(function (files) {
                        dfd.resolve(files);
                    }).fail(errorHandler);
                }, errorHandler);
            } else {
                // Return an empy list for file system items
                // other than files or directories:
                dfd.resolve([]);
            }
            return dfd.promise();
        },

        _handleFileTreeEntries: function (entries, path) {
            var that = this;
            return $.when.apply(
                $,
                $.map(entries, function (entry) {
                    return that._handleFileTreeEntry(entry, path);
                })
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _getDroppedFiles: function (dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry ||
                    items[0].getAsEntry)) {
                return this._handleFileTreeEntries(
                    $.map(items, function (item) {
                        var entry;
                        if (item.webkitGetAsEntry) {
                            entry = item.webkitGetAsEntry();
                            if (entry) {
                                // Workaround for Chrome bug #149735:
                                entry._file = item.getAsFile();
                            }
                            return entry;
                        }
                        return item.getAsEntry();
                    })
                );
            }
            return $.Deferred().resolve(
                $.makeArray(dataTransfer.files)
            ).promise();
        },

        _getSingleFileInputFiles: function (fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') ||
                    fileInput.prop('entries'),
                files,
                value;
            if (entries && entries.length) {
                return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return $.Deferred().resolve([]).promise();
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{name: value.replace(/^.*\\/, '')}];
            } else if (files[0].name === undefined && files[0].fileName) {
                // File normalization for Safari 4 and Firefox 3:
                $.each(files, function (index, file) {
                    file.name = file.fileName;
                    file.size = file.fileSize;
                });
            }
            return $.Deferred().resolve(files).promise();
        },

        _getFileInputFiles: function (fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
                return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply(
                $,
                $.map(fileInput, this._getSingleFileInputFiles)
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _onChange: function (e) {
            var that = this,
                data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            this._getFileInputFiles(data.fileInput).always(function (files) {
                data.files = files;
                if (that.options.replaceFileInput) {
                    that._replaceFileInput(data.fileInput);
                }
                if (that._trigger(
                        'change',
                        $.Event('change', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    that._onAdd(e, data);
                }
            });
        },

        _onPaste: function (e) {
            var items = e.originalEvent && e.originalEvent.clipboardData &&
                    e.originalEvent.clipboardData.items,
                data = {files: []};
            if (items && items.length) {
                $.each(items, function (index, item) {
                    var file = item.getAsFile && item.getAsFile();
                    if (file) {
                        data.files.push(file);
                    }
                });
                if (this._trigger(
                        'paste',
                        $.Event('paste', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    this._onAdd(e, data);
                }
            }
        },

        _onDrop: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var that = this,
                dataTransfer = e.dataTransfer,
                data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                e.preventDefault();
                this._getDroppedFiles(dataTransfer).always(function (files) {
                    data.files = files;
                    if (that._trigger(
                            'drop',
                            $.Event('drop', {delegatedEvent: e}),
                            data
                        ) !== false) {
                        that._onAdd(e, data);
                    }
                });
            }
        },

        _onDragOver: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var dataTransfer = e.dataTransfer;
            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 &&
                    this._trigger(
                        'dragover',
                        $.Event('dragover', {delegatedEvent: e})
                    ) !== false) {
                e.preventDefault();
                dataTransfer.dropEffect = 'copy';
            }
        },

        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                });
            }
            if ($.support.fileInput) {
                this._on(this.options.fileInput, {
                    change: this._onChange
                });
            }
        },

        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, 'dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
        },

        _setOption: function (key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
                this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ?
                        this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
                options.pasteZone = $(options.pasteZone);
            }
        },

        _getRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _isRegExpOption: function (key, value) {
            return key !== 'url' && $.type(value) === 'string' &&
                /^\/.*\/[igm]{0,3}$/.test(value);
        },

        _initDataAttributes: function () {
            var that = this,
                options = this.options;
            // Initialize options set via HTML5 data-attributes:
            $.each(
                $(this.element[0].cloneNode(false)).data(),
                function (key, value) {
                    if (that._isRegExpOption(key, value)) {
                        value = that._getRegExp(value);
                    }
                    options[key] = value;
                }
            );
        },

        _create: function () {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
        },

        // This method is exposed to the widget API and allows to query
        // the number of active uploads:
        active: function () {
            return this._active;
        },

        // This method is exposed to the widget API and allows to query
        // the widget upload progress.
        // It returns an object with loaded, total and bitrate properties
        // for the running uploads:
        progress: function () {
            return this._progress;
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            var that = this;
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    that._onAdd(null, data);
                });
            } else {
                data.files = $.makeArray(data.files);
                this._onAdd(null, data);
            }
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files or fileInput property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                if (data.fileInput && !data.files) {
                    var that = this,
                        dfd = $.Deferred(),
                        promise = dfd.promise(),
                        jqXHR,
                        aborted;
                    promise.abort = function () {
                        aborted = true;
                        if (jqXHR) {
                            return jqXHR.abort();
                        }
                        dfd.reject(null, 'abort', 'abort');
                        return promise;
                    };
                    this._getFileInputFiles(data.fileInput).always(
                        function (files) {
                            if (aborted) {
                                return;
                            }
                            if (!files.length) {
                                dfd.reject();
                                return;
                            }
                            data.files = files;
                            jqXHR = that._onSend(null, data).then(
                                function (result, textStatus, jqXHR) {
                                    dfd.resolve(result, textStatus, jqXHR);
                                },
                                function (jqXHR, textStatus, errorThrown) {
                                    dfd.reject(jqXHR, textStatus, errorThrown);
                                }
                            );
                        }
                    );
                    return this._enhancePromise(promise);
                }
                data.files = $.makeArray(data.files);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });

}));

/*
 * jQuery File Upload Processing Plugin 1.2.2
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true */
/*global define, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            './jquery.fileupload'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery
        );
    }
}(function ($) {
    'use strict';

    var originalAdd = $.blueimp.fileupload.prototype.options.add;

    // The File Upload Processing plugin extends the fileupload widget
    // with file processing functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // The list of processing actions:
            processQueue: [
                /*
                {
                    action: 'log',
                    type: 'debug'
                }
                */
            ],
            add: function (e, data) {
                var $this = $(this);
                data.process(function () {
                    return $this.fileupload('process', data);
                });
                originalAdd.call(this, e, data);
            }
        },

        processActions: {
            /*
            log: function (data, options) {
                console[options.type](
                    'Processing "' + data.files[data.index].name + '"'
                );
            }
            */
        },

        _processFile: function (data) {
            var that = this,
                dfd = $.Deferred().resolveWith(that, [data]),
                chain = dfd.promise();
            this._trigger('process', null, data);
            $.each(data.processQueue, function (i, settings) {
                var func = function (data) {
                    return that.processActions[settings.action].call(
                        that,
                        data,
                        settings
                    );
                };
                chain = chain.pipe(func, settings.always && func);
            });
            chain
                .done(function () {
                    that._trigger('processdone', null, data);
                    that._trigger('processalways', null, data);
                })
                .fail(function () {
                    that._trigger('processfail', null, data);
                    that._trigger('processalways', null, data);
                });
            return chain;
        },

        // Replaces the settings of each processQueue item that
        // are strings starting with an "@", using the remaining
        // substring as key for the option map,
        // e.g. "@autoUpload" is replaced with options.autoUpload:
        _transformProcessQueue: function (options) {
            var processQueue = [];
            $.each(options.processQueue, function () {
                var settings = {},
                    action = this.action,
                    prefix = this.prefix === true ? action : this.prefix;
                $.each(this, function (key, value) {
                    if ($.type(value) === 'string' &&
                            value.charAt(0) === '@') {
                        settings[key] = options[
                            value.slice(1) || (prefix ? prefix +
                                key.charAt(0).toUpperCase() + key.slice(1) : key)
                        ];
                    } else {
                        settings[key] = value;
                    }

                });
                processQueue.push(settings);
            });
            options.processQueue = processQueue;
        },

        // Returns the number of files currently in the processsing queue:
        processing: function () {
            return this._processing;
        },

        // Processes the files given as files property of the data parameter,
        // returns a Promise object that allows to bind callbacks:
        process: function (data) {
            var that = this,
                options = $.extend({}, this.options, data);
            if (options.processQueue && options.processQueue.length) {
                this._transformProcessQueue(options);
                if (this._processing === 0) {
                    this._trigger('processstart');
                }
                $.each(data.files, function (index) {
                    var opts = index ? $.extend({}, options) : options,
                        func = function () {
                            return that._processFile(opts);
                        };
                    opts.index = index;
                    that._processing += 1;
                    that._processingQueue = that._processingQueue.pipe(func, func)
                        .always(function () {
                            that._processing -= 1;
                            if (that._processing === 0) {
                                that._trigger('processstop');
                            }
                        });
                });
            }
            return this._processingQueue;
        },

        _create: function () {
            this._super();
            this._processing = 0;
            this._processingQueue = $.Deferred().resolveWith(this)
                .promise();
        }

    });

}));

/*
 * jQuery File Upload Image Preview & Resize Plugin 1.7.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, window, Blob */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'load-image',
            'load-image-meta',
            'load-image-exif',
            'load-image-ios',
            'canvas-to-blob',
            './jquery.fileupload-process'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.loadImage
        );
    }
}(function ($, loadImage) {
    'use strict';

    // Prepend to the default processQueue:
    $.blueimp.fileupload.prototype.options.processQueue.unshift(
        {
            action: 'loadImageMetaData',
            disableImageHead: '@',
            disableExif: '@',
            disableExifThumbnail: '@',
            disableExifSub: '@',
            disableExifGps: '@',
            disabled: '@disableImageMetaDataLoad'
        },
        {
            action: 'loadImage',
            // Use the action as prefix for the "@" options:
            prefix: true,
            fileTypes: '@',
            maxFileSize: '@',
            noRevoke: '@',
            disabled: '@disableImageLoad'
        },
        {
            action: 'resizeImage',
            // Use "image" as prefix for the "@" options:
            prefix: 'image',
            maxWidth: '@',
            maxHeight: '@',
            minWidth: '@',
            minHeight: '@',
            crop: '@',
            orientation: '@',
            forceResize: '@',
            disabled: '@disableImageResize'
        },
        {
            action: 'saveImage',
            quality: '@imageQuality',
            type: '@imageType',
            disabled: '@disableImageResize'
        },
        {
            action: 'saveImageMetaData',
            disabled: '@disableImageMetaDataSave'
        },
        {
            action: 'resizeImage',
            // Use "preview" as prefix for the "@" options:
            prefix: 'preview',
            maxWidth: '@',
            maxHeight: '@',
            minWidth: '@',
            minHeight: '@',
            crop: '@',
            orientation: '@',
            thumbnail: '@',
            canvas: '@',
            disabled: '@disableImagePreview'
        },
        {
            action: 'setImage',
            name: '@imagePreviewName',
            disabled: '@disableImagePreview'
        },
        {
            action: 'deleteImageReferences',
            disabled: '@disableImageReferencesDeletion'
        }
    );

    // The File Upload Resize plugin extends the fileupload widget
    // with image resize functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // The regular expression for the types of images to load:
            // matched against the file type:
            loadImageFileTypes: /^image\/(gif|jpeg|png)$/,
            // The maximum file size of images to load:
            loadImageMaxFileSize: 10000000, // 10MB
            // The maximum width of resized images:
            imageMaxWidth: 1920,
            // The maximum height of resized images:
            imageMaxHeight: 1080,
            // Defines the image orientation (1-8) or takes the orientation
            // value from Exif data if set to true:
            imageOrientation: false,
            // Define if resized images should be cropped or only scaled:
            imageCrop: false,
            // Disable the resize image functionality by default:
            disableImageResize: true,
            // The maximum width of the preview images:
            previewMaxWidth: 80,
            // The maximum height of the preview images:
            previewMaxHeight: 80,
            // Defines the preview orientation (1-8) or takes the orientation
            // value from Exif data if set to true:
            previewOrientation: true,
            // Create the preview using the Exif data thumbnail:
            previewThumbnail: true,
            // Define if preview images should be cropped or only scaled:
            previewCrop: false,
            // Define if preview images should be resized as canvas elements:
            previewCanvas: true
        },

        processActions: {

            // Loads the image given via data.files and data.index
            // as img element, if the browser supports the File API.
            // Accepts the options fileTypes (regular expression)
            // and maxFileSize (integer) to limit the files to load:
            loadImage: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var that = this,
                    file = data.files[data.index],
                    dfd = $.Deferred();
                if (($.type(options.maxFileSize) === 'number' &&
                            file.size > options.maxFileSize) ||
                        (options.fileTypes &&
                            !options.fileTypes.test(file.type)) ||
                        !loadImage(
                            file,
                            function (img) {
                                if (img.src) {
                                    data.img = img;
                                }
                                dfd.resolveWith(that, [data]);
                            },
                            options
                        )) {
                    return data;
                }
                return dfd.promise();
            },

            // Resizes the image given as data.canvas or data.img
            // and updates data.canvas or data.img with the resized image.
            // Also stores the resized image as preview property.
            // Accepts the options maxWidth, maxHeight, minWidth,
            // minHeight, canvas and crop:
            resizeImage: function (data, options) {
                if (options.disabled || !(data.canvas || data.img)) {
                    return data;
                }
                options = $.extend({canvas: true}, options);
                var that = this,
                    dfd = $.Deferred(),
                    img = (options.canvas && data.canvas) || data.img,
                    resolve = function (newImg) {
                        if (newImg && (newImg.width !== img.width ||
                                newImg.height !== img.height ||
                                options.forceResize)) {
                            data[newImg.getContext ? 'canvas' : 'img'] = newImg;
                        }
                        data.preview = newImg;
                        dfd.resolveWith(that, [data]);
                    },
                    thumbnail;
                if (data.exif) {
                    if (options.orientation === true) {
                        options.orientation = data.exif.get('Orientation');
                    }
                    if (options.thumbnail) {
                        thumbnail = data.exif.get('Thumbnail');
                        if (thumbnail) {
                            loadImage(thumbnail, resolve, options);
                            return dfd.promise();
                        }
                    }
                }
                if (img) {
                    resolve(loadImage.scale(img, options));
                    return dfd.promise();
                }
                return data;
            },

            // Saves the processed image given as data.canvas
            // inplace at data.index of data.files:
            saveImage: function (data, options) {
                if (!data.canvas || options.disabled) {
                    return data;
                }
                var that = this,
                    file = data.files[data.index],
                    dfd = $.Deferred();
                if (data.canvas.toBlob) {
                    data.canvas.toBlob(
                        function (blob) {
                            if (!blob.name) {
                                if (file.type === blob.type) {
                                    blob.name = file.name;
                                } else if (file.name) {
                                    blob.name = file.name.replace(
                                        /\..+$/,
                                        '.' + blob.type.substr(6)
                                    );
                                }
                            }
                            // Don't restore invalid meta data:
                            if (file.type !== blob.type) {
                                delete data.imageHead;
                            }
                            // Store the created blob at the position
                            // of the original file in the files list:
                            data.files[data.index] = blob;
                            dfd.resolveWith(that, [data]);
                        },
                        options.type || file.type,
                        options.quality
                    );
                } else {
                    return data;
                }
                return dfd.promise();
            },

            loadImageMetaData: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var that = this,
                    dfd = $.Deferred();
                loadImage.parseMetaData(data.files[data.index], function (result) {
                    $.extend(data, result);
                    dfd.resolveWith(that, [data]);
                }, options);
                return dfd.promise();
            },

            saveImageMetaData: function (data, options) {
                if (!(data.imageHead && data.canvas &&
                        data.canvas.toBlob && !options.disabled)) {
                    return data;
                }
                var file = data.files[data.index],
                    blob = new Blob([
                        data.imageHead,
                        // Resized images always have a head size of 20 bytes,
                        // including the JPEG marker and a minimal JFIF header:
                        this._blobSlice.call(file, 20)
                    ], {type: file.type});
                blob.name = file.name;
                data.files[data.index] = blob;
                return data;
            },

            // Sets the resized version of the image as a property of the
            // file object, must be called after "saveImage":
            setImage: function (data, options) {
                if (data.preview && !options.disabled) {
                    data.files[data.index][options.name || 'preview'] = data.preview;
                }
                return data;
            },

            deleteImageReferences: function (data, options) {
                if (!options.disabled) {
                    delete data.img;
                    delete data.canvas;
                    delete data.preview;
                    delete data.imageHead;
                }
                return data;
            }

        }

    });

}));

/*
 * jQuery File Upload User Interface Plugin 9.5.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'tmpl',
            './jquery.fileupload-image',
            './jquery.fileupload-audio',
            './jquery.fileupload-video',
            './jquery.fileupload-validate'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.tmpl
        );
    }
}(function ($, tmpl) {
    'use strict';

    $.blueimp.fileupload.prototype._specialOptions.push(
        'filesContainer',
        'uploadTemplateId',
        'downloadTemplateId'
    );

    // The UI version extends the file upload widget
    // and adds complete user interface interaction:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // By default, files added to the widget are uploaded as soon
            // as the user clicks on the start buttons. To enable automatic
            // uploads, set the following option to true:
            autoUpload: false,
            // The ID of the upload template:
            uploadTemplateId: 'template-upload',
            // The ID of the download template:
            downloadTemplateId: 'template-download',
            // The container for the list of files. If undefined, it is set to
            // an element with class "files" inside of the widget element:
            filesContainer: undefined,
            // By default, files are appended to the files container.
            // Set the following option to true, to prepend files instead:
            prependFiles: false,
            // The expected data type of the upload response, sets the dataType
            // option of the $.ajax upload requests:
            dataType: 'json',

            // Function returning the current number of files,
            // used by the maxNumberOfFiles validation:
            getNumberOfFiles: function () {
                return this.filesContainer.children()
                    .not('.processing').length;
            },

            // Callback to retrieve the list of files from the server response:
            getFilesFromResponse: function (data) {
                if (data.result && $.isArray(data.result.files)) {
                    return data.result.files;
                }
                return [];
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop or add API call).
            // See the basic file upload widget for more information:
            add: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var $this = $(this),
                    that = $this.data('blueimp-fileupload') ||
                        $this.data('fileupload'),
                    options = that.options;
                data.context = that._renderUpload(data.files)
                    .data('data', data)
                    .addClass('processing');
                options.filesContainer[
                    options.prependFiles ? 'prepend' : 'append'
                ](data.context);
                that._forceReflow(data.context);
                $.when(
                    that._transition(data.context),
                    data.process(function () {
                        return $this.fileupload('process', data);
                    })
                ).always(function () {
                    data.context.each(function (index) {
                        $(this).find('.size').text(
                            that._formatFileSize(data.files[index].size)
                        );
                    }).removeClass('processing');
                    that._renderPreviews(data);
                }).done(function () {
                    data.context.find('.start').prop('disabled', false);
                    if ((that._trigger('added', e, data) !== false) &&
                            (options.autoUpload || data.autoUpload) &&
                            data.autoUpload !== false) {
                        data.submit();
                    }
                }).fail(function () {
                    if (data.files.error) {
                        data.context.each(function (index) {
                            var error = data.files[index].error;
                            if (error) {
                                $(this).find('.error').text(error);
                            }
                        });
                    }
                });
            },
            // Callback for the start of each file upload request:
            send: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload');
                if (data.context && data.dataType &&
                        data.dataType.substr(0, 6) === 'iframe') {
                    // Iframe Transport does not support progress events.
                    // In lack of an indeterminate progress bar, we set
                    // the progress to 100%, showing the full animated bar:
                    data.context
                        .find('.progress').addClass(
                            !$.support.transition && 'progress-animated'
                        )
                        .attr('aria-valuenow', 100)
                        .children().first().css(
                            'width',
                            '100%'
                        );
                }
                return that._trigger('sent', e, data);
            },
            // Callback for successful uploads:
            done: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload'),
                    getFilesFromResponse = data.getFilesFromResponse ||
                        that.options.getFilesFromResponse,
                    files = getFilesFromResponse(data),
                    template,
                    deferred;
                if (data.context) {
                    data.context.each(function (index) {
                        var file = files[index] ||
                                {error: 'Empty file upload result'};
                        deferred = that._addFinishedDeferreds();
                        that._transition($(this)).done(
                            function () {
                                var node = $(this);
                                template = that._renderDownload([file])
                                    .replaceAll(node);
                                that._forceReflow(template);
                                that._transition(template).done(
                                    function () {
                                        data.context = $(this);
                                        that._trigger('completed', e, data);
                                        that._trigger('finished', e, data);
                                        deferred.resolve();
                                    }
                                );
                            }
                        );
                    });
                } else {
                    template = that._renderDownload(files)[
                        that.options.prependFiles ? 'prependTo' : 'appendTo'
                    ](that.options.filesContainer);
                    that._forceReflow(template);
                    deferred = that._addFinishedDeferreds();
                    that._transition(template).done(
                        function () {
                            data.context = $(this);
                            that._trigger('completed', e, data);
                            that._trigger('finished', e, data);
                            deferred.resolve();
                        }
                    );
                }
            },
            // Callback for failed (abort or error) uploads:
            fail: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload'),
                    template,
                    deferred;
                if (data.context) {
                    data.context.each(function (index) {
                        if (data.errorThrown !== 'abort') {
                            var file = data.files[index];
                            file.error = file.error || data.errorThrown ||
                                true;
                            deferred = that._addFinishedDeferreds();
                            that._transition($(this)).done(
                                function () {
                                    var node = $(this);
                                    template = that._renderDownload([file])
                                        .replaceAll(node);
                                    that._forceReflow(template);
                                    that._transition(template).done(
                                        function () {
                                            data.context = $(this);
                                            that._trigger('failed', e, data);
                                            that._trigger('finished', e, data);
                                            deferred.resolve();
                                        }
                                    );
                                }
                            );
                        } else {
                            deferred = that._addFinishedDeferreds();
                            that._transition($(this)).done(
                                function () {
                                    $(this).remove();
                                    that._trigger('failed', e, data);
                                    that._trigger('finished', e, data);
                                    deferred.resolve();
                                }
                            );
                        }
                    });
                } else if (data.errorThrown !== 'abort') {
                    data.context = that._renderUpload(data.files)[
                        that.options.prependFiles ? 'prependTo' : 'appendTo'
                    ](that.options.filesContainer)
                        .data('data', data);
                    that._forceReflow(data.context);
                    deferred = that._addFinishedDeferreds();
                    that._transition(data.context).done(
                        function () {
                            data.context = $(this);
                            that._trigger('failed', e, data);
                            that._trigger('finished', e, data);
                            deferred.resolve();
                        }
                    );
                } else {
                    that._trigger('failed', e, data);
                    that._trigger('finished', e, data);
                    that._addFinishedDeferreds().resolve();
                }
            },
            // Callback for upload progress events:
            progress: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var progress = Math.floor(data.loaded / data.total * 100);
                if (data.context) {
                    data.context.each(function () {
                        $(this).find('.progress')
                            .attr('aria-valuenow', progress)
                            .children().first().css(
                                'width',
                                progress + '%'
                            );
                    });
                }
            },
            // Callback for global upload progress events:
            progressall: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var $this = $(this),
                    progress = Math.floor(data.loaded / data.total * 100),
                    globalProgressNode = $this.find('.fileupload-progress'),
                    extendedProgressNode = globalProgressNode
                        .find('.progress-extended');
                if (extendedProgressNode.length) {
                    extendedProgressNode.html(
                        ($this.data('blueimp-fileupload') || $this.data('fileupload'))
                            ._renderExtendedProgress(data)
                    );
                }
                globalProgressNode
                    .find('.progress')
                    .attr('aria-valuenow', progress)
                    .children().first().css(
                        'width',
                        progress + '%'
                    );
            },
            // Callback for uploads start, equivalent to the global ajaxStart event:
            start: function (e) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload');
                that._resetFinishedDeferreds();
                that._transition($(this).find('.fileupload-progress')).done(
                    function () {
                        that._trigger('started', e);
                    }
                );
            },
            // Callback for uploads stop, equivalent to the global ajaxStop event:
            stop: function (e) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload'),
                    deferred = that._addFinishedDeferreds();
                $.when.apply($, that._getFinishedDeferreds())
                    .done(function () {
                        that._trigger('stopped', e);
                    });
                that._transition($(this).find('.fileupload-progress')).done(
                    function () {
                        $(this).find('.progress')
                            .attr('aria-valuenow', '0')
                            .children().first().css('width', '0%');
                        $(this).find('.progress-extended').html('&nbsp;');
                        deferred.resolve();
                    }
                );
            },
            processstart: function (e) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                $(this).addClass('fileupload-processing');
            },
            processstop: function (e) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                $(this).removeClass('fileupload-processing');
            },
            // Callback for file deletion:
            destroy: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload'),
                    removeNode = function () {
                        that._transition(data.context).done(
                            function () {
                                $(this).remove();
                                that._trigger('destroyed', e, data);
                            }
                        );
                    };
                if (data.url) {
                    data.dataType = data.dataType || that.options.dataType;
                    $.ajax(data).done(removeNode).fail(function () {
                        that._trigger('destroyfailed', e, data);
                    });
                } else {
                    removeNode();
                }
            }
        },

        _resetFinishedDeferreds: function () {
            this._finishedUploads = [];
        },

        _addFinishedDeferreds: function (deferred) {
            if (!deferred) {
                deferred = $.Deferred();
            }
            this._finishedUploads.push(deferred);
            return deferred;
        },

        _getFinishedDeferreds: function () {
            return this._finishedUploads;
        },

        // Link handler, that allows to download files
        // by drag & drop of the links to the desktop:
        _enableDragToDesktop: function () {
            var link = $(this),
                url = link.prop('href'),
                name = link.prop('download'),
                type = 'application/octet-stream';
            link.bind('dragstart', function (e) {
                try {
                    e.originalEvent.dataTransfer.setData(
                        'DownloadURL',
                        [type, name, url].join(':')
                    );
                } catch (ignore) {}
            });
        },

        _formatFileSize: function (bytes) {
            if (typeof bytes !== 'number') {
                return '';
            }
            if (bytes >= 1000000000) {
                return (bytes / 1000000000).toFixed(2) + ' GB';
            }
            if (bytes >= 1000000) {
                return (bytes / 1000000).toFixed(2) + ' MB';
            }
            return (bytes / 1000).toFixed(2) + ' KB';
        },

        _formatBitrate: function (bits) {
            if (typeof bits !== 'number') {
                return '';
            }
            if (bits >= 1000000000) {
                return (bits / 1000000000).toFixed(2) + ' Gbit/s';
            }
            if (bits >= 1000000) {
                return (bits / 1000000).toFixed(2) + ' Mbit/s';
            }
            if (bits >= 1000) {
                return (bits / 1000).toFixed(2) + ' kbit/s';
            }
            return bits.toFixed(2) + ' bit/s';
        },

        _formatTime: function (seconds) {
            var date = new Date(seconds * 1000),
                days = Math.floor(seconds / 86400);
            days = days ? days + 'd ' : '';
            return days +
                ('0' + date.getUTCHours()).slice(-2) + ':' +
                ('0' + date.getUTCMinutes()).slice(-2) + ':' +
                ('0' + date.getUTCSeconds()).slice(-2);
        },

        _formatPercentage: function (floatValue) {
            return (floatValue * 100).toFixed(2) + ' %';
        },

        _renderExtendedProgress: function (data) {
            return this._formatBitrate(data.bitrate) + ' | ' +
                this._formatTime(
                    (data.total - data.loaded) * 8 / data.bitrate
                ) + ' | ' +
                this._formatPercentage(
                    data.loaded / data.total
                ) + ' | ' +
                this._formatFileSize(data.loaded) + ' / ' +
                this._formatFileSize(data.total);
        },

        _renderTemplate: function (func, files) {
            if (!func) {
                return $();
            }
            var result = func({
                files: files,
                formatFileSize: this._formatFileSize,
                options: this.options
            });
            if (result instanceof $) {
                return result;
            }
            return $(this.options.templatesContainer).html(result).children();
        },

        _renderPreviews: function (data) {
            data.context.find('.preview').each(function (index, elm) {
                $(elm).append(data.files[index].preview);
            });
        },

        _renderUpload: function (files) {
            return this._renderTemplate(
                this.options.uploadTemplate,
                files
            );
        },

        _renderDownload: function (files) {
            return this._renderTemplate(
                this.options.downloadTemplate,
                files
            ).find('a[download]').each(this._enableDragToDesktop).end();
        },

        _startHandler: function (e) {
            e.preventDefault();
            var button = $(e.currentTarget),
                template = button.closest('.template-upload'),
                data = template.data('data');
            button.prop('disabled', true);
            if (data && data.submit) {
                data.submit();
            }
        },

        _cancelHandler: function (e) {
            e.preventDefault(); 
            // se ingreso esta regla para mostrar de nuevo el boton de publicar sin adjuntar imagenes// revisar                   
            $(".newpost .start").toggle();                  
            var template = $(e.currentTarget)
                    .closest('.template-upload,.template-download'),
                data = template.data('data') || {};
            data.context = data.context || template;
            if (data.abort) {
                data.abort();
            } else {
                data.errorThrown = 'abort';
                this._trigger('fail', e, data);
            }
        },

        _deleteHandler: function (e) {
            e.preventDefault();
            var button = $(e.currentTarget);
            this._trigger('destroy', e, $.extend({
                context: button.closest('.template-download'),
                type: 'DELETE'
            }, button.data()));
        },

        _forceReflow: function (node) {
            return $.support.transition && node.length &&
                node[0].offsetWidth;
        },

        _transition: function (node) {
            var dfd = $.Deferred();
            if ($.support.transition && node.hasClass('fade') && node.is(':visible')) {
                node.bind(
                    $.support.transition.end,
                    function (e) {
                        // Make sure we don't respond to other transitions events
                        // in the container element, e.g. from button elements:
                        if (e.target === node[0]) {
                            node.unbind($.support.transition.end);
                            dfd.resolveWith(node);
                        }
                    }
                ).toggleClass('in');
            } else {
                node.toggleClass('in');
                dfd.resolveWith(node);
            }
            return dfd;
        },

        _initButtonBarEventHandlers: function () {
			
            var fileUploadButtonBar = this.element.find('.fileupload-buttonbar'),
                filesList = this.options.filesContainer;
            this._on(fileUploadButtonBar.find('.start'), {
                click: function (e) {
                    e.preventDefault();
                    filesList.find('.start').click();
                }
            });
            this._on(fileUploadButtonBar.find('.cancel'), {
                click: function (e) {
                    e.preventDefault();            
                    filesList.find('.cancel').click();
                }
            });
            this._on(fileUploadButtonBar.find('.delete'), {
                click: function (e) {
                    e.preventDefault();
                    filesList.find('.toggle:checked')
                        .closest('.template-download')
                        .find('.delete').click();
                    fileUploadButtonBar.find('.toggle')
                        .prop('checked', false);
                }
            });
            this._on(fileUploadButtonBar.find('.toggle'), {
                change: function (e) {
                    filesList.find('.toggle').prop(
                        'checked',
                        $(e.currentTarget).is(':checked')
                    );
                }
            });
        },

        _destroyButtonBarEventHandlers: function () {
            this._off(
                this.element.find('.fileupload-buttonbar')
                    .find('.start, .cancel, .delete'),
                'click'
            );
            this._off(
                this.element.find('.fileupload-buttonbar .toggle'),
                'change.'
            );
        },

        _initEventHandlers: function () {
            this._super();
            this._on(this.options.filesContainer, {
                'click .start': this._startHandler,
                'click .cancel': this._cancelHandler,
                'click .delete': this._deleteHandler
            });
            this._initButtonBarEventHandlers();
        },

        _destroyEventHandlers: function () {
            this._destroyButtonBarEventHandlers();
            this._off(this.options.filesContainer, 'click');
            this._super();
        },

        _enableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', false)
                .parent().removeClass('disabled');
        },

        _disableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', true)
                .parent().addClass('disabled');
        },

        _initTemplates: function () {
            var options = this.options;
            options.templatesContainer = this.document[0].createElement(
                options.filesContainer.prop('nodeName')
            );
            if (tmpl) {
                if (options.uploadTemplateId) {
                    options.uploadTemplate = tmpl(options.uploadTemplateId);
                }
                if (options.downloadTemplateId) {
                    options.downloadTemplate = tmpl(options.downloadTemplateId);
                }
            }
        },

        _initFilesContainer: function () {
            var options = this.options;
            if (options.filesContainer === undefined) {
                options.filesContainer = this.element.find('.files');
            } else if (!(options.filesContainer instanceof $)) {
                options.filesContainer = $(options.filesContainer);
            }
        },

        _initSpecialOptions: function () {
            this._super();
            this._initFilesContainer();
            this._initTemplates();
        },

        _create: function () {
            this._super();
            this._resetFinishedDeferreds();
            if (!$.support.fileInput) {
                this._disableFileInputButton();
            }
        },

        enable: function () {
            var wasDisabled = false;
            if (this.options.disabled) {
                wasDisabled = true;
            }
            this._super();
            if (wasDisabled) {
                this.element.find('input, button').prop('disabled', false);
                this._enableFileInputButton();
            }
        },

        disable: function () {
            if (!this.options.disabled) {
                this.element.find('input, button').prop('disabled', true);
                this._disableFileInputButton();
            }
            this._super();
        }

    });

}));

/*
 * jQuery File Upload Plugin Localization Example 6.5.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global window */

window.locale = {
    "fileupload": {
        "errors": {
            "maxFileSize": "File is too big",
            "minFileSize": "File is too small",
            "acceptFileTypes": "Filetype not allowed",
            "maxNumberOfFiles": "Max number of files exceeded",
            "uploadedBytes": "Uploaded bytes exceed file size",
            "emptyResult": "Empty file upload result"
        },
        "error": gettext("error"),
        "publish": gettext("publish"),
        "cancel": gettext("cancel"),
        "destroy": gettext("destroy")
    }
};
/*!
 * tn3 v1.4.0.103
 * http://tn3gallery.com/
 *
 * License
 * http://tn3gallery.com/license
 *
 * Date: 07 Nov, 2013 11:18:48 +0200
 */
(function(i){function b(g){var l=g.skinDir+"/"+g.skin,k=f[l];if(k)k.loaded?a.call(this,g,k.html):k.queue.push({c:this,s:g});else{f[l]={loaded:false,queue:[{c:this,s:g}]};i.ajax({url:l+".html",dataType:"text",success:function(m){var t=f[l];t.loaded=true;t.html=m;for(m=0;m<t.queue.length;m++)a.call(t.queue[m].c,t.queue[m].s,t.html)},dataFilter:function(m){return m=m.substring(m.indexOf("<body>")+6,m.lastIndexOf("</body>"))},error:function(){if(g.error){var m=i.Event("tn3_error");m.description="tn3 skin load error";
g.error(m)}}})}return this}function a(g,l){this.each(function(){for(var k=i(this),m,t,u=l.indexOf("<img src=");u!=-1;){u+=10;t=l.indexOf('"',u);m=g.skinDir+"/"+l.substring(u,t);l=l.substr(0,u)+m+l.substr(t);u=l.indexOf("<img src=",u)}k.append(l);k.data("tn3").init(k,g.fullOnly)})}function c(g){var l=[],k=g.children(".tn3.album"),m,t;if(k.length>0)k.each(function(u){m=i(this);l[u]={title:m.find(":header").html()};i.extend(l[u],d(m));if(t=e(m)){l[u].imgs=t;if(!l[u].thumb)l[u].thumb=l[u].imgs[0].thumb}});
else if(t=e(g))l[0]={imgs:t};return l}function e(g){var l=[],k,m;k=g.children("ol,ul").children("li");if(k.length>0)k.each(function(t){m=i(this);$firsta=m.find("a:not(.tn3 > a)").filter(":first");l[t]={title:m.find(":header").filter(":first").html()};if($firsta.length>0){l[t].img=$firsta.attr("href");l[t].thumb=$firsta.find("img").attr("src")}else l[t].img=m.find("img").filter(":first").attr("src");i.extend(l[t],d(m));l[t].alt=m.find("img").filter(":first").attr("alt")||l[t].title});else{k=g.find("img");
k.each(function(t){m=i(this);$at=m.parent("a");l[t]=$at.length==0?{title:m.attr("title"),img:m.attr("src")}:{title:m.attr("title"),img:$at.attr("href"),thumb:m.attr("src")};l[t].alt=m.attr("alt")||l[t].title})}if(l.length==0)return null;return l}function d(g){var l={};g=g.children(".tn3");var k;i.each(g,function(){k=i(this);l[k.attr("class").substr(4)]=k.html()});return l}function h(g){i('a[href^="#tn3-'+g+'"]').click(function(l){var k=n[g];l=i(l.currentTarget).attr("href");l=l.substr(l.indexOf("-",
5)+1);l=l.split("-");switch(l[0]){case "next":k.cAlbum!=null&&k.show("next",l[1]=="fs");break;case "prev":k.cAlbum!=null&&k.show("prev",l[1]=="fs");break;default:k.cAlbum!=parseInt(l[0])?k.showAlbum(parseInt(l[0]),parseInt(l[1]),l[2]=="fs"):k.show(parseInt(l[1]),l[2]=="fs")}})}function j(){if(n.length==0){var g=i(".tn3gallery");g.length>0&&g.tn3({})}}if(function(g){for(var l,k,m=i.fn.jquery,t=m.split(".");g.length<t.length;)g.push(0);for(l=0;l<g.length;l++){k=parseInt(t[l]);if(k>g[l])return true;
if(k<g[l])return false}return m===g.join(".")}([1,4,2])){var f={},n=[];i.fn.tn3=function(g){i.each(["skin","startWithAlbums","external"],function(l,k){var m=k.split(".");if(m.length>1&&g[m[0]])delete g[m[0]][m[1]];else delete g[k]});g=i.extend(true,{},i.fn.tn3.config,g);if(g.skin!=null)if(typeof g.skin=="object"){g.skinDir+="/"+g.skin[0];if(g.cssID==null)g.cssID=g.skin[0];g.skin=g.skin[1]}else g.skinDir+="/"+g.skin;else{g.skin="tn3";g.skinDir+="/tn3";i.fn.tn3.dontLoad=true}if(g.cssID==null)g.cssID=
g.skin==null?"tn3":g.skin;this.each(function(){var l=i(this);g.fullOnly?l.hide():l.css("visibility","hidden");var k=g.data?g.data:c(l);k=n.push(new i.fn.tn3.Gallery(k,g))-1;l.data("tn3",n[k]);for(var m=0;m<i.fn.tn3.plugins.length;m++)i.fn.tn3.plugins[m].init(l,g,n[k]);l.empty();h(k)});i.fn.tn3.dontLoad?a.call(this,g,g.skinDefault):b.call(this,g);return this};i.fn.tn3.plugins=[];i.fn.tn3.plugIn=function(g,l){i.fn.tn3.plugins.push({id:g,init:l})};i.fn.tn3.version="1.4.0.103";i.fn.tn3.config={data:null,
skin:null,skinDir:"skins",skinDefault:'<div class="tn3-gallery"><div class="tn3-image"><div class="tn3-text-bg"><div class="tn3-image-title"></div><div class="tn3-image-description"></div></div><div class="tn3-next tn3_v tn3_o"></div><div class="tn3-prev tn3_v tn3_o"></div><div class="tn3-preloader tn3_h tn3_v"></div><div class="tn3-timer"></div></div><div class="tn3-controls-bg tn3_rh"><div class="tn3-sep1"></div><div class="tn3-sep2"></div><div class="tn3-sep3"></div></div><div class="tn3-thumbs"></div><div class="tn3-fullscreen"></div><div class="tn3-show-albums"></div><div class="tn3-next-page"></div><div class="tn3-prev-page"></div><div class="tn3-play"></div><div class="tn3-count"></div><div class="tn3-albums"><div class="tn3-inalbums"><div class="tn3-album"></div></div><div class="tn3-albums-next"></div><div class="tn3-albums-prev"></div><div class="tn3-albums-close"></div></div></div>',
cssID:null};i.fn.tn3.translations={};i.fn.tn3.translate=function(g,l){if(l)i.fn.tn3.translations[g]=l;else{var k=i.fn.tn3.translations[g];return k?k:g}};i(function(){setTimeout(j,1)})}else alert("tn3gallery requires jQuery v1.4.2 or later!  You are using v"+i.fn.jquery)})(jQuery);
(function(i){i.fn.tn3utils=U={};U.shuffle=function(b){var a,c,e=b.length;if(e)for(;--e;){c=Math.floor(Math.random()*(e+1));a=b[c];b[c]=b[e];b[e]=a}};i.extend(i.easing,{def:"easeOutQuad",swing:function(b,a,c,e,d){return i.easing[i.easing.def](b,a,c,e,d)},linear:function(b,a,c,e,d){return e*a/d+c},easeInQuad:function(b,a,c,e,d){return e*(a/=d)*a+c},easeOutQuad:function(b,a,c,e,d){return-e*(a/=d)*(a-2)+c},easeInOutQuad:function(b,a,c,e,d){if((a/=d/2)<1)return e/2*a*a+c;return-e/2*(--a*(a-2)-1)+c},easeInCubic:function(b,
a,c,e,d){return e*(a/=d)*a*a+c},easeOutCubic:function(b,a,c,e,d){return e*((a=a/d-1)*a*a+1)+c},easeInOutCubic:function(b,a,c,e,d){if((a/=d/2)<1)return e/2*a*a*a+c;return e/2*((a-=2)*a*a+2)+c},easeInQuart:function(b,a,c,e,d){return e*(a/=d)*a*a*a+c},easeOutQuart:function(b,a,c,e,d){return-e*((a=a/d-1)*a*a*a-1)+c},easeInOutQuart:function(b,a,c,e,d){if((a/=d/2)<1)return e/2*a*a*a*a+c;return-e/2*((a-=2)*a*a*a-2)+c},easeInQuint:function(b,a,c,e,d){return e*(a/=d)*a*a*a*a+c},easeOutQuint:function(b,a,c,
e,d){return e*((a=a/d-1)*a*a*a*a+1)+c},easeInOutQuint:function(b,a,c,e,d){if((a/=d/2)<1)return e/2*a*a*a*a*a+c;return e/2*((a-=2)*a*a*a*a+2)+c},easeInSine:function(b,a,c,e,d){return-e*Math.cos(a/d*(Math.PI/2))+e+c},easeOutSine:function(b,a,c,e,d){return e*Math.sin(a/d*(Math.PI/2))+c},easeInOutSine:function(b,a,c,e,d){return-e/2*(Math.cos(Math.PI*a/d)-1)+c},easeInExpo:function(b,a,c,e,d){return a==0?c:e*Math.pow(2,10*(a/d-1))+c},easeOutExpo:function(b,a,c,e,d){return a==d?c+e:e*(-Math.pow(2,-10*a/
d)+1)+c},easeInOutExpo:function(b,a,c,e,d){if(a==0)return c;if(a==d)return c+e;if((a/=d/2)<1)return e/2*Math.pow(2,10*(a-1))+c;return e/2*(-Math.pow(2,-10*--a)+2)+c},easeInCirc:function(b,a,c,e,d){return-e*(Math.sqrt(1-(a/=d)*a)-1)+c},easeOutCirc:function(b,a,c,e,d){return e*Math.sqrt(1-(a=a/d-1)*a)+c},easeInOutCirc:function(b,a,c,e,d){if((a/=d/2)<1)return-e/2*(Math.sqrt(1-a*a)-1)+c;return e/2*(Math.sqrt(1-(a-=2)*a)+1)+c},easeInElastic:function(b,a,c,e,d){b=1.70158;var h=0,j=e;if(a==0)return c;if((a/=
d)==1)return c+e;h||(h=d*0.3);if(j<Math.abs(e)){j=e;b=h/4}else b=h/(2*Math.PI)*Math.asin(e/j);return-(j*Math.pow(2,10*(a-=1))*Math.sin((a*d-b)*2*Math.PI/h))+c},easeOutElastic:function(b,a,c,e,d){b=1.70158;var h=0,j=e;if(a==0)return c;if((a/=d)==1)return c+e;h||(h=d*0.3);if(j<Math.abs(e)){j=e;b=h/4}else b=h/(2*Math.PI)*Math.asin(e/j);return j*Math.pow(2,-10*a)*Math.sin((a*d-b)*2*Math.PI/h)+e+c},easeInOutElastic:function(b,a,c,e,d){b=1.70158;var h=0,j=e;if(a==0)return c;if((a/=d/2)==2)return c+e;h||
(h=d*0.3*1.5);if(j<Math.abs(e)){j=e;b=h/4}else b=h/(2*Math.PI)*Math.asin(e/j);if(a<1)return-0.5*j*Math.pow(2,10*(a-=1))*Math.sin((a*d-b)*2*Math.PI/h)+c;return j*Math.pow(2,-10*(a-=1))*Math.sin((a*d-b)*2*Math.PI/h)*0.5+e+c},easeInBack:function(b,a,c,e,d,h){if(h==undefined)h=1.70158;return e*(a/=d)*a*((h+1)*a-h)+c},easeOutBack:function(b,a,c,e,d,h){if(h==undefined)h=1.70158;return e*((a=a/d-1)*a*((h+1)*a+h)+1)+c},easeInOutBack:function(b,a,c,e,d,h){if(h==undefined)h=1.70158;if((a/=d/2)<1)return e/2*
a*a*(((h*=1.525)+1)*a-h)+c;return e/2*((a-=2)*a*(((h*=1.525)+1)*a+h)+2)+c},easeInBounce:function(b,a,c,e,d){return e-i.easing.easeOutBounce(b,d-a,0,e,d)+c},easeOutBounce:function(b,a,c,e,d){return(a/=d)<1/2.75?e*7.5625*a*a+c:a<2/2.75?e*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?e*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:e*(7.5625*(a-=2.625/2.75)*a+0.984375)+c},easeInOutBounce:function(b,a,c,e,d){if(a<d/2)return i.easing.easeInBounce(b,a*2,0,e,d)*0.5+c;return i.easing.easeOutBounce(b,a*2-d,0,e,d)*0.5+e*
0.5+c}})})(jQuery);
(function(i){i.fn.tn3.Gallery=function(d,h){this.data=d;this.config=i.extend(true,{},i.fn.tn3.Gallery.config,h);this.initialized=false;this.t=i.fn.tn3.translate;this.loader=new i.fn.tn3.External(h.external,this)};i.fn.tn3.Gallery.config={cssID:"tn3",active:[],inactive:[],iniAlbum:0,iniImage:0,imageClick:"next",startWithAlbums:false,autoplay:false,delay:7E3,timerMode:"bar",timerSteps:300,timerStepChar:"&#8226;",isFullScreen:false,fullOnly:false,width:null,height:null,mouseWheel:true,keyNavigation:"fullscreen",
timerOverStop:true,responsive:false,useNativeFullScreen:true,autohideControls:false,autohideOver:true,overFadeDuration:300,spinjs:null,image:{},thumbnailer:{},touch:{}};i.fn.tn3.Gallery.prototype={config:null,$c:null,$tn3:null,data:null,thumbnailer:null,imager:null,cAlbum:null,timer:null,items:null,initialized:null,n:null,albums:null,loader:null,fso:null,timerSize:null,special:null,areHidden:false,$inImage:null,isPlaying:false,cparent:null,spinner:null,showInit:false,init:function(d,h){this.$c=d;
if(!(this.loader.reqs>0||this.data.length==0||h)){this.trigger("init_start");this.config.useNativeFullScreen=this.config.useNativeFullScreen&&b.supportsFullScreen;this.config.fullOnly&&this.$c.show();this.$c.css("visibility","visible");this.$tn3=this.$c.find("."+this.config.cssID+"-gallery");var j=this.config.initValues={width:this.$tn3.width(),height:this.$tn3.height()};this.$tn3.css("float","left");j.wDif=this.$tn3.outerWidth(true)-j.width;j.hDif=this.$tn3.outerHeight(true)-j.height;this.replaceMenu("tn3gallery.com",
"http://tn3gallery.com");var f=this;this.timer=new i.fn.tn3.Timer(this.$c,this.config.delay,this.config.timerSteps);this.$c.bind("tn3_timer_end",function(){f.show("next")});this.special={rv:[],rh:[],v:[],h:[],vi:[],hi:[],o:[],x:{}};this.parseLayout();this.center();i.each(this.items,function(n,g){switch(n){case "next":g.click(function(k){f.show("next");k.stopPropagation()});g.attr("title",f.t("Next Image"));break;case "prev":g.click(function(k){f.show("prev");k.stopPropagation()});g.attr("title",f.t("Previous Image"));
break;case "next-page":g.click(function(){f.items.thumbs&&f.thumbnailer.next(true)});g.attr("title",f.t("Next Page"));break;case "prev-page":g.click(function(){f.items.thumbs&&f.thumbnailer.prev(true)});g.attr("title",f.t("Previous Page"));break;case "thumbs":f.config.thumbnailer.cssID=f.config.cssID;f.config.thumbnailer.initValues={width:g.width(),height:g.height()};f.config.thumbnailer.initValues.vertical=g.width()<=g.height();g.bind("tn_click",function(k){f.show(k.n)}).bind("tn_over",function(){f.timer.pause(true)}).bind("tn_out",
function(){f.timer.pause(false)}).bind("tn_error",function(k){f.trigger("error",k)});break;case "image":f.config.image.cssID=f.config.cssID;f.config.image.initValues={width:g.width(),height:g.height()};g.bind("img_click",function(k){switch(f.config.imageClick){case "next":f.show("next");break;case "fullscreen":f.fullscreen(true);break;case "url":if(k=f.data[f.cAlbum].imgs[k.n].url.replace(/&amp;/g,"&"))window.location=k}}).bind("img_load_start",function(){f.displayPreloader(true)}).bind("img_load_end",
function(k){f.n=k.n;f.displayPreloader(false);f.items.timer&&f.items.timer.hide();f.$inImage&&f.$inImage.hide()}).bind("img_transition",function(k){f.setTextValues(false,"image");f.items.thumbs&&f.thumbnailer.thumbClick(f.n);f.$inImage&&f.imager.cached[k.n].isImage&&f.$inImage.fadeIn(300);f.items.count&&f.items.count.text(f.n+1+"/"+f.data[f.cAlbum].imgs.length);f.isPlaying&&f.timer.start();f.special.o.length>0&&f.config.autohideOver&&f.hideElements();if(f.config.autohideControls){if(f.items.prev)f.items.prev[k.n==
0?"hide":"show"]();if(f.items.next)f.items.next[k.n==f.imager.data.length-1?"hide":"show"]()}}).bind("img_enter",function(){f.imageEnter()}).bind("img_leave",function(){f.imageLeave()}).bind("img_resize",function(k){if(f.$inImage){f.$inImage.width(k.w).height(k.h).css("left",k.left).css("top",k.top);f.center();f.imager.bindMouseEvents(f.$inImage)}}).bind("img_error",function(k){f.trigger("error",k)});break;case "preloader":f.config.spinjs&&g.find("img").remove();f.displayPreloader(false);break;case "timer":var l=
g.width()>g.height()?"width":"height";f.$c.bind("timer_tick",function(k){if(f.config.timerMode=="char"){for(var m=f.config.timerStepChar;--k.tick;)m+=f.config.timerStepChar;f.items.timer.html(m)}else f.items.timer[l](f.timerSize/k.totalTicks*k.tick);f.trigger(k.type,k)}).bind("timer_start",function(k){f.timerSize=f.$inImage[l]();f.items.timer.fadeIn(300);f.items.play&&f.items.play.addClass(f.config.cssID+"-play-active");f.trigger(k.type,k)}).bind("timer_end timer_stop",function(k){f.items.timer.hide();
k.type=="timer_end"&&f.n==f.data[f.cAlbum].imgs.length-1&&f.trigger("autoplay_finish");f.trigger(k.type,k)});g.hide();break;case "play":g.click(function(k){var m={id:"play",execute:true};f.trigger("control",m);if(f.isPlaying){if(m.execute){f.timer.stop();g.removeClass(f.config.cssID+"-play-active");g.attr("title",f.t("Start Slideshow"))}f.isPlaying=false}else{if(m.execute){f.timer.start();g.addClass(f.config.cssID+"-play-active");g.attr("title",f.t("Stop Slideshow"))}f.isPlaying=true}k.stopPropagation()});
g.attr("title",f.t("Start Slideshow"));break;case "count":break;case "albums":f.albums=new i.fn.tn3.Albums(f.data,g,f.config.cssID);g.hide();g.bind("albums_binit",function(k){f.trigger(k.type,k)}).bind("albums_click",function(k){f.showAlbum(k.n);f.trigger(k.type,k)}).bind("albums_init",function(k){f.timer.pause(true);f.trigger(k.type,k)}).bind("albums_error",function(k){f.trigger("error",k)}).bind("albums_close",function(){f.timer.pause(false)});break;case "album":break;case "albums-next":f.albums&&
f.albums.setControl("next",g);g.attr("title",f.t("Next Album Page"));break;case "albums-prev":f.albums&&f.albums.setControl("prev",g);g.attr("title",f.t("Previous Album Page"));break;case "albums-close":f.albums&&f.albums.setControl("close",g);g.attr("title",f.t("Close"));break;case "show-albums":g.click(function(k){f.items.albums&&f.albums.show(0,f.cAlbum,false,true);k.stopPropagation()});g.attr("title",f.t("Album List"));break;case "fullscreen":g.click(function(k){var m={id:"fullscreen",execute:true};
f.trigger("control",m);m.execute&&f.fullscreen(true);k.stopPropagation()});g.attr("title",f.t("Maximize"));break;default:f.special.x[n]&&g.click(function(k){var m=!f.items[f.special.x[n]].is(":visible"),t={id:n,execute:true,active:m};f.trigger("control",t);if(t.execute){m?g.addClass(f.config.cssID+"-"+n+"-active"):g.removeClass(f.config.cssID+"-"+n+"-active");f.items[f.special.x[n]].toggle()}k.stopPropagation()})}});if(this.config.width!==null||this.config.height!==null){if(this.config.width==null)this.config.width=
this.config.initValues.width;if(this.config.height==null)this.config.height=this.config.initValues.height;this.resize(this.config.width,this.config.height)}j=Math.min(this.config.iniAlbum,this.data.length-1);this.config.responsive!==false&&this.initResponsive(this.config.responsive);this.initialized=true;this.config.startWithAlbums&&this.data.length>1&&this.items.albums?this.albums.show():this.showAlbum(j,this.config.iniImage);this.config.isFullScreen&&this.onFullResize();if(this.config.autoplay)this.items.play?
this.items.play.click():this.timer.start();this.trigger("init")}},parseLayout:function(){var d=this.items={},h=this.config,j=h.active,f=h.inactive,n=h.cssID.length+1,g=this,l=/MSIE/.test(navigator.userAgent),k,m;this.$c.find("div[class^='"+h.cssID+"-']").each(function(){k=i(this);m=k.attr("class").split(" ")[0].substr(n);if(i.inArray(m,f)!=-1)k.remove();else if(j.length==0||i.inArray(m,j)!=-1)d[m]=k;else m!="gallery"&&k.remove();if(k.parent().hasClass(h.cssID+"-image")){if(!g.$inImage){g.$inImage=
i('<div class="tn3-in-image"></div>');k.parent().append(g.$inImage);if(l){var u=i("<div />");u.css("background-color","#fff").css("opacity",0).css("width","100%").css("height","100%");u.appendTo(g.$inImage)}g.$inImage.css("position","absolute").width(d.image.width()).height(d.image.height())}k.appendTo(g.$inImage)}this.className.indexOf("tn3_")!=-1&&g.addSpecial(m,this.className)});$cm=this.$c;i.each(["albums","album","album-next","album-prev","show-albums"],function(u,q){delete d[q];$cm.find("."+
h.cssID+"-"+q).remove()});var t=i('<div title="Powered by TN3 Gallery"></div>');t.css("position","absolute").css("background-image","url('"+this.config.skinDir+"/tn3.png')").css("background-position","-258px -7px").css("bottom","14px").css("right","53px").css("cursor","pointer").width(40).height(18);t.appendTo(this.$c.find("."+h.cssID+"-gallery"));t.click(function(){window.location="http://tn3gallery.com"}).hover(function(){i(this).css("background-position","-258px -45px")},function(){i(this).css("background-position",
"-258px -7px")})},addSpecial:function(d,h){for(var j=h.split(" "),f,n=0;n<j.length;n++){f=j[n].split("_");if(f[0]=="tn3")if(f[1]=="x")this.special.x[d]=f[2];else{this.special[f[1]].push(d);if(f[1]=="rh"||f[1]=="rv")this.config.initValues[d]={w:this.items[d].width(),h:this.items[d].height()}}}},initHover:function(d,h){var j=this;d.hover(function(){d.addClass(j.config.cssID+"-"+h+"-over")},function(){d.removeClass(j.config.cssID+"-"+h+"-over")})},setTextValues:function(d,h){var j,f,n,g=h+"-";for(n in this.items)if(n.indexOf(g)==
0){j=n.substr(g.length);if(j!="info"&&j!="prev"&&j!="next"){f=h=="image"?this.data[this.cAlbum].imgs[this.n]:this.data[this.cAlbum];if(!f||f[j]==undefined){f={};f[j]=""}else f[j]=i.trim(f[j]);j={field:j,text:f[j],data:f};this.trigger("set_text",j);if(d||j.text==undefined||j.text.length==0){this.items[n].html("");this.items[n].hide()}else{this.items[n].html(j.text);this.items[n].show()}}}},show:function(d,h){this.timer.stop();this.showInit=true;this.imager&&this.imager.show(d);h&&this.fullscreen()},
setAlbumData:function(d,h){if(h)this.trigger("error",{description:h});else{for(var j=0,f=d.length;j<f;j++)this.data.push(d[j]);this.$c&&this.init(this.$c,this.config.fullOnly)}},setImageData:function(d,h,j){if(j)this.trigger("error",{description:j});else{this.displayPreloader(false);d={data:d};this.trigger("image_data",d);this.data[h].imgs=d.data;if(this.cAlbum==h)this.rebuild(d.data,this.showInit?0:this.config.iniImage)}},showAlbum:function(d,h,j){if(this.initialized){if(d>this.data.length)return;
this.timer.stop();this.cAlbum=d;this.albums&&this.albums.hide();if(this.data[this.cAlbum].imgs===undefined)if(this.loader){this.loader.getImages(this.data[this.cAlbum].adata,this.cAlbum);this.displayPreloader(true)}else this.trigger("error",{description:"Wrong album id"});else this.rebuild(this.data[this.cAlbum].imgs,h)}else{this.config.iniAlbum=d;this.config.iniImage=h;this.init(this.$c,false)}j&&this.fullscreen()},rebuild:function(d,h){if(this.items.thumbs)if(this.thumbnailer)this.thumbnailer.rebuild(d);
else this.thumbnailer=new i.fn.tn3.Thumbnailer(this.items.thumbs,d,this.config.thumbnailer);if(this.items.image)if(this.imager)this.imager.rebuild(d);else this.imager=new i.fn.tn3.Imager(this.items.image,d,this.config.image);this.setTextValues(true,"image");this.setTextValues(false,"album");this.trigger("rebuild",{album:this.cAlbum});this.show(h==null?0:h)},showElements:function(d){if(this.areHidden){var h=this,j;i.each(this.special.o,function(f,n){if(h.config.autohideControls){if(n=="prev"&&h.n==
0)return true;if(n=="next"&&h.n==h.imager.data.length-1)return true}j=h.items[n];j.show();if(d&&i.support.opacity){j.stop(true);j.css("opacity",0);j.animate({opacity:1},{duration:d,queue:false})}});this.areHidden=false}},hideElements:function(d){if(!this.areHidden){var h=this,j;i.each(this.special.o,function(f,n){j=h.items[n];if(d&&i.support.opacity){j.stop(true);j.animate({opacity:0},{duration:d,complete:function(){j.hide()},queue:false})}else j.hide()});this.areHidden=true}},setData:function(d){if(this.items.thumbs)this.thumbnailer.data=
d;if(this.items.imager)this.imager.data=d},exitFullScreen:function(){!b.isFullScreen()&&this.config.isFullScreen&&this.fullscreen()},nativeFS:false,fullscreen:function(d){if(this.config.isFullScreen){if(this.config.useNativeFullScreen&&this.nativeFS){b.cancelFullScreen(this.$c);document.removeEventListener(b.fullScreenEventName,i.proxy(this.exitFullScreen,this))}else{i(window).unbind("resize",this.onFullResize);i.tn3unblock()}if(this.config.responsive!==false)this.initResponsive(this.config.responsive);
else this.config.width!==null||this.config.height!==null?this.resize(this.config.width,this.config.height):this.resize(this.config.initValues.width,this.config.initValues.height);if(this.items.fullscreen){this.items.fullscreen.removeClass(this.config.cssID+"-fullscreen-active");this.items.fullscreen.attr("title",this.t("Maximize"))}this.config.fullOnly&&this.$c.hide();this.config.isFullScreen=false;this.trigger("fullscreen",{fullscreen:false});this.config.keyNavigation=="fullscreen"&&i(document).unbind("keyup",
this.listenKeys)}else{if(this.config.useNativeFullScreen&&d){document.addEventListener(b.fullScreenEventName,i.proxy(this.exitFullScreen,this),true);b.requestFullScreen(this.$tn3);this.nativeFS=true}else{i.tn3block({message:this.$tn3,cssID:this.config.cssID});i(window).bind("resize",i.proxy(this.onFullResize,this));this.nativeFS=false}this.config.fullOnly&&this.$c.show();this.config.isFullScreen=true;if(this.items.fullscreen){this.items.fullscreen.addClass(this.config.cssID+"-fullscreen-active");
this.items.fullscreen.attr("title",this.t("Minimize"))}this.onFullResize();this.trigger("fullscreen",{fullscreen:true})}},listenKeys:function(d){if(d.keyCode==70)this.items.fullscreen.click();else if(this.items.albums&&this.albums.enabled){var h=0;switch(d.keyCode){case 27:this.albums.hide();break;case 39:h="r";break;case 37:h="l";break;case 38:h="u";break;case 40:h="d";break;case 32:h="p"}h&&this.albums.select(h)}else switch(d.keyCode){case 27:this.config.isFullScreen&&this.fullscreen(true);break;
case 39:this.show("next");break;case 37:this.show("prev");break;case 38:this.items.albums&&this.albums.show(0,this.cAlbum,false,true);break;case 32:this.items.play.click()}},onFullResize:function(){if(this.config.useNativeFullScreen&&this.nativeFS)this.resize(window.screen.width,window.screen.height);else{var d=i(window),h=d.width();d=d.height();h-=this.config.initValues.wDif;d-=this.config.initValues.hDif;this.resize(h,d)}},resize:function(d,h){this.$tn3.width(d).height(h);var j=d-this.config.initValues.width,
f=h-this.config.initValues.height,n,g,l=this;if(this.items.image){n=this.config.image.initValues.width+j;g=this.config.image.initValues.height+f;if(this.imager)this.imager.setSize(n,g);else{this.items.image.width(n).height(g);this.$inImage.width(n).height(g)}}if(this.items.thumbs){n=this.config.thumbnailer.initValues.width+j;g=this.config.thumbnailer.initValues.height+f;if(this.thumbnailer)this.thumbnailer.setSize(n,g);else this.config.thumbnailer.initValues.vertical?this.items.thumbs.height(g):this.items.thumbs.width(n)}if(this.items.albums){n=
this.albums.initValues.width+j;g=this.albums.initValues.height+f;this.albums.changeSize(j,f)}i.each(this.special.rh,function(k,m){l.items[m].width(l.config.initValues[m].w+j)});i.each(this.special.rv,function(k,m){l.items[m].height(l.config.initValues[m].h+f)});this.center()},center:function(){var d,h=this,j=h.items.image.position();i.each(this.special.v,function(f,n){d=h.items[n];d.css("top",(d.parent().height()-d.height())/2)});i.each(this.special.h,function(f,n){d=h.items[n];d.css("left",(d.parent().width()-
d.width())/2)});i.each(this.special.vi,function(f,n){d=h.items[n];d.css("top",j.top+(h.items.image.height()-d.height())/2)});i.each(this.special.hi,function(f,n){d=h.items[n];d.css("left",j.left+(h.items.image.width()-d.width())/2)});if(this.spinner){this.displayPreloader(true);this.displayPreloader(false)}},trigger:function(d,h){var j=i.Event("tn3_"+d),f;for(f in h)j[f]=h[f];if(h&&h.type!=undefined)j.type="tn3_"+d;j.source=this;this.$c.trigger(j);this.config[d]&&this.config[d].call(this,j);for(f in h)h[f]=
j[f]},initMouseWheel:function(){var d=this,h=function(j){d.show((j.originalEvent.detail?-j.originalEvent.detail:j.originalEvent.wheelDelta)>0?"prev":"next");j.preventDefault()};this.$tn3.bind("mousewheel",h);this.$tn3.bind("DOMMouseScroll",h)},initResponsive:function(d){var h;if(typeof d=="number"){var j=i(window);h=function(){var t=j.width(),u=j.height();this.resize(t*d/100,u*d/100)}}else if(i.isFunction(d))h=d;else if(d!==false){var f=this.$c.parent(),n=(this.config.width==null?this.config.initValues.width:
this.config.width)/(this.config.height==null?this.config.initValues.height:this.config.height),g=f.width(),l=f.height();h=d=="enabled"?function(){g=f.width();l=f.height();this.resize(g,l)}:d=="height"?function(){l=f.height();g=l*n;this.resize(g,l)}:function(){g=f.width();l=g/n;this.resize(g,l)}}var k=this,m=function(){if(k.config.useNativeFullScreen)b.isFullScreen()||i.proxy(h,k)();else i.proxy(h,k)()};i(window).bind("resize",m);m()},replaceMenu:function(d,h){var j='<div style="position:absolute;background-color:#fff;color: #000;padding:0px 4px 0px 4px;z-index:1010;font-family:sans-serif;font-size:12px;">&copy; <a href="'+
h+'">'+d+"</a></div>";this.$tn3.bind("contextmenu",function(f){f.preventDefault()}).bind("mousedown",function(f){if(f.which==3){var n=i(j);i("body").append(n);n.css("left",f.pageX).css("top",f.pageY);n.find("a").mouseup(function(g){window.location=h;n.unbind(g)});i("body").mouseup(function(g){n.remove();i("body").unbind(g)})}})},imageEnter:function(){this.config.timerOverStop&&this.timer.pause(true);this.special.o.length>0&&this.showElements(this.config.overFadeDuration)},imageLeave:function(){this.config.timerOverStop&&
this.timer.pause(false);this.special.o.length>0&&this.hideElements(this.config.overFadeDuration)},displayPreloader:function(d){if(this.items.preloader)if(d){this.items.preloader.show();if(this.config.spinjs)if(this.spinner)this.spinner.spin(this.items.preloader[0]);else this.spinner=(new Spinner(this.config.spinjs)).spin(this.items.preloader[0])}else{this.spinner&&this.spinner.stop();this.items.preloader.hide()}}};var b={supportsFullScreen:false,isFullScreen:function(){return false},requestFullScreen:function(){},
cancelFullScreen:function(){},fullScreenEventName:"",prefix:""},a="webkit moz o ms khtml".split(" ");if(typeof document.cancelFullScreen!="undefined")b.supportsFullScreen=true;else for(var c=0,e=a.length;c<e;c++){b.prefix=a[c];if(typeof document[b.prefix+"CancelFullScreen"]!="undefined"){b.supportsFullScreen=true;break}}if(b.supportsFullScreen){b.fullScreenEventName=b.prefix+"fullscreenchange";b.isFullScreen=function(){switch(this.prefix){case "":return document.fullScreen;case "webkit":return document.webkitIsFullScreen;
default:return document[this.prefix+"FullScreen"]}};b.requestFullScreen=function(d){this.prefix==="webkit"&&d.css("float","none");return this.prefix===""?d[0].requestFullScreen():d[0][this.prefix+"RequestFullScreen"]()};b.cancelFullScreen=function(d){this.prefix==="webkit"&&d.css("float","left");return this.prefix===""?document.cancelFullScreen():document[this.prefix+"CancelFullScreen"]()}}})(jQuery);
(function(i,b,a){function c(q,p){var r=b.createElement(q||"div"),s;for(s in p)r[s]=p[s];return r}function e(q){for(var p=1,r=arguments.length;p<r;p++)q.appendChild(arguments[p]);return q}function d(q,p,r,s){var v=["opacity",p,~~(q*100),r,s].join("-");r=0.01+r/s*100;s=Math.max(1-(1-q)/p*(100-r),q);var w=k.substring(0,k.indexOf("Animation")).toLowerCase();w=w&&"-"+w+"-"||"";return l[v]||(m.insertRule("@"+w+"keyframes "+v+"{0%{opacity:"+s+"}"+r+"%{opacity:"+q+"}"+(r+0.01)+"%{opacity:1}"+(r+p)%100+"%{opacity:"+
q+"}100%{opacity:"+s+"}}",m.cssRules.length),l[v]=1),v}function h(q,p){var r=q.style,s,v;if(r[p]!==a)return p;p=p.charAt(0).toUpperCase()+p.slice(1);for(v=0;v<g.length;v++){s=g[v]+p;if(r[s]!==a)return s}}function j(q,p){for(var r in p)q.style[h(q,r)||r]=p[r];return q}function f(q){for(var p=1;p<arguments.length;p++){var r=arguments[p],s;for(s in r)q[s]===a&&(q[s]=r[s])}return q}function n(q){for(var p={x:q.offsetLeft,y:q.offsetTop};q=q.offsetParent;){p.x+=q.offsetLeft;p.y+=q.offsetTop}return p}var g=
["webkit","Moz","ms","O"],l={},k,m=function(){var q=c("style",{type:"text/css"});return e(b.getElementsByTagName("head")[0],q),q.sheet||q.styleSheet}(),t={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",speed:1,trail:100,opacity:0.25,fps:20,zIndex:2E9,className:"spinner",top:"auto",left:"auto"},u=function q(p){if(!this.spin)return new q(p);this.opts=f(p||{},q.defaults,t)};u.defaults={};f(u.prototype,{spin:function(q){this.stop();var p=this,r=p.opts,s=p.el=j(c(0,{className:r.className}),
{position:"relative",width:0,zIndex:r.zIndex}),v=r.radius+r.length+r.width,w,y;q&&(q.insertBefore(s,q.firstChild||null),y=n(q),w=n(s),j(s,{left:(r.left=="auto"?y.x-w.x+(q.offsetWidth>>1):parseInt(r.left,10)+v)+"px",top:(r.top=="auto"?y.y-w.y+(q.offsetHeight>>1):parseInt(r.top,10)+v)+"px"}));s.setAttribute("aria-role","progressbar");p.lines(s,p.opts);if(!k){var z=0,x=r.fps,A=x/r.speed,C=(1-r.opacity)/(A*r.trail/100),D=A/r.lines;(function E(){z++;for(var B=r.lines;B;B--)p.opacity(s,r.lines-B,Math.max(1-
(z+B*D)%A*C,r.opacity),r);p.timeout=p.el&&setTimeout(E,~~(1E3/x))})()}return p},stop:function(){var q=this.el;return q&&(clearTimeout(this.timeout),q.parentNode&&q.parentNode.removeChild(q),this.el=a),this},lines:function(q,p){function r(w,y){return j(c(),{position:"absolute",width:p.length+p.width+"px",height:p.width+"px",background:w,boxShadow:y,transformOrigin:"left",transform:"rotate("+~~(360/p.lines*s+p.rotate)+"deg) translate("+p.radius+"px,0)",borderRadius:(p.corners*p.width>>1)+"px"})}for(var s=
0,v;s<p.lines;s++){v=j(c(),{position:"absolute",top:1+~(p.width/2)+"px",transform:p.hwaccel?"translate3d(0,0,0)":"",opacity:p.opacity,animation:k&&d(p.opacity,p.trail,s,p.lines)+" "+1/p.speed+"s linear infinite"});p.shadow&&e(v,j(r("#000","0 0 4px #000"),{top:"2px"}));e(q,e(v,r(p.color,"0 0 1px rgba(0,0,0,.1)")))}return q},opacity:function(q,p,r){p<q.childNodes.length&&(q.childNodes[p].style.opacity=r)}});(function(){function q(r,s){return c("<"+r+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',
s)}var p=j(c("group"),{behavior:"url(#default#VML)"});!h(p,"transform")&&p.adj?(m.addRule(".spin-vml","behavior:url(#default#VML)"),u.prototype.lines=function(r,s){function v(){return j(q("group",{coordsize:z+" "+z,coordorigin:-y+" "+-y}),{width:z,height:z})}function w(C,D,E){e(A,e(j(v(),{rotation:360/s.lines*C+"deg",left:~~D}),e(j(q("roundrect",{arcsize:s.corners}),{width:y,height:s.width,left:s.radius,top:-s.width>>1,filter:E}),q("fill",{color:s.color,opacity:s.opacity}),q("stroke",{opacity:0}))))}
var y=s.length+s.width,z=2*y,x=-(s.width+s.length)*2+"px",A=j(v(),{position:"absolute",top:x,left:x});if(s.shadow)for(x=1;x<=s.lines;x++)w(x,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(x=1;x<=s.lines;x++)w(x);return e(r,A)},u.prototype.opacity=function(r,s,v,w){r=r.firstChild;w=w.shadow&&w.lines||0;r&&s+w<r.childNodes.length&&(r=r&&r.firstChild,r&&(r.opacity=v))}):k=h(p,"animation")})();typeof define=="function"&&define.amd?define(function(){return u}):
i.Spinner=u})(window,document);
(function(i){i.fn.tn3.Imager=function(b,a,c){this.$c=b;this.data=a;c.crop=false;this.config=i.extend(true,{},i.fn.tn3.Imager.config,c);this.init()};i.fn.tn3.Imager.config={transitions:null,defaultTransition:{type:"slide"},random:false,cssID:"tn3",maxZoom:1.4,crop:false,clickEvent:"click",idleDelay:3E3,stretch:true,dif:0};i.fn.tn3.Imager.prototype={config:null,$c:false,$ins:null,data:false,cached:null,active:-1,$active:false,$buffer:false,isInTransition:false,ts:null,cDim:null,qid:null,currentlyLoading:null,
side:null,$ic:null,$binder:null,infoID:null,lastEnter:false,mouseCoor:{x:0,y:0},mouseIsOver:false,init:function(){this.$c.css("overflow","hidden");this.$c.css("position","relative");this.$ins=i('<div class="'+this.config.cssID+'-image-ins" style="position:absolute;width:100%;height:100%;"></div>');this.$c.prepend(this.$ins);this.bindMouseEvents(this.$c);this.cached=[];this.ts=new i.fn.tn3.Transitions(this.config.transitions,this.config.defaultTransition,this.config.random,this,"onTransitionEnd")},
bindMouseEvents:function(b){this.unbindMouseEvents();var a=this;b.hover(function(){a.mouseIsOver=true;a.enterLeave("enter");a.startIdle();i(document).mousemove(i.proxy(a.onMouseMove,a))},function(){a.mouseIsOver=false;a.enterLeave("leave");a.stopIdle();i(document).unbind("mousemove",a.onMouseMove)});b[this.config.clickEvent](function(c){a.active==-1||a.isInTransition||c.target.tagName.toUpperCase()!="A"&&a.trigger("click",{n:a.active})});this.$binder=b},unbindMouseEvents:function(){this.$binder&&
this.$binder.unbind("mouseenter mouseleave "+this.config.clickEvent);i(document).unbind("mousemove",this.onMouseMove);this.stopIdle()},startIdle:function(){this.stopIdle();var b=this;if(this.config.idleDelay>0)this.infoID=setTimeout(function(){b.enterLeave("leave");b.stopIdle()},this.config.idleDelay)},onMouseMove:function(b){this.mouseCoor={x:b.pageX,y:b.pageY};if(!this.isInTransition){this.infoID||this.enterLeave("enter");this.startIdle()}},stopIdle:function(){clearTimeout(this.infoID);this.infoID=
null},enterLeave:function(b){this.lastEnter!=b&&this.trigger(b);this.lastEnter=b},show:function(b){if(this.isInTransition)this.qid=b;else{this.qid=null;if(b=="next"){b=this.active+1<this.data.length?this.active+1:0;this.side="left"}else if(b=="prev"){b=this.active>0?this.active-1:this.data.length-1;this.side="right"}else this.side=this.active>b?"right":"left";if(this.data[b]){this.trigger("load_start",{n:b});this.$buffer=i('<div class="'+this.config.cssID+'-image-in" style="position:absolute;overflow:hidden;"></div>');
this.$buffer.css("visibility","hidden");this.$ins.prepend(this.$buffer);if(this.cached[this.currentlyLoading]!=undefined)this.cached[this.currentlyLoading].init=false;if(this.cached[b]!=undefined)if(this.cached[b].status=="loaded")this.initImage(b);else{this.cached[b].init=true;this.currentlyLoading=b}else this.startLoading(b,true)}}},startLoading:function(b,a){var c=typeof b=="number"?b:b=="next"?this.active+1:this.active-1;if(!(this.cached[c]!=undefined&&this.cached[c].status=="loaded"||this.data[c]==
undefined)){this.cached[c]={isImage:true,status:"loading",init:a};this.currentlyLoading=c;if(this.data[c].content!=undefined){this.cached[c].isImage=false;this.onCacheLoad(i(i.trim(this.data[c].content)),c)}else this.cached[c].loader=new i.fn.tn3.ImageLoader(this.data[c].img,this,this.onCacheLoad,[c])}},onCacheLoad:function(b,a,c){this.cached[a].status="loaded";this.cached[a].isImage&&b.attr("alt",this.data[a].alt);this.cached[a].$content=b;c&&this.trigger("error",{description:c,n:a});this.cached[a].init&&
this.initImage(a)},initImage:function(b){var a=this.cached[b].$content;this.currentlyLoading=null;this.active=b;if(!this.cDim)this.cDim={w:this.$c.width(),h:this.$c.height()};this.$buffer.width(this.cDim.w).height(this.cDim.h);var c=i('<div class="'+this.config.cssID+'-full-image" style="position:absolute"></div>');a.appendTo(c);this.$buffer.append(c);this.$buffer.data("ic",c);this.$buffer.data("img",a);this.resize(this.$buffer);c=[true];this.trigger("load_end",{n:b,content:a,isImage:this.cached[b].isImage,
doTransition:c});c[0]&&this.initTransition()},initTransition:function(){this.$buffer.css("visibility","visible");if(this.$active!=false){this.isInTransition=true;this.unbindMouseEvents();if(this.mouseIsOver)i(document).mousemove(i.proxy(this.onMouseMove,this));else this.mouseCoor={x:0,y:0};this.lastEnter="leave";this.$active.find("video").length>0&&this.config.transitions&&this.config.transitions.length>0&&this.config.transitions[0].type==="translate"?this.ts.start(this.$active,this.$buffer,this.side,
true):this.ts.start(this.$active,this.$buffer,this.side)}else{this.$active=this.$buffer;this.trigger("transition",{n:this.active})}this.startLoading(this.side=="right"?"prev":"next",false)},setSize:function(b,a){this.isInTransition&&this.ts.stop(this.$active,this.$buffer,this.ts.config);this.$c.width(b).height(a);this.cDim={w:this.$c.width(),h:this.$c.height()};if(this.$active){this.$active.width(b).height(a);this.resize(this.$active)}},resize:function(b){if(b.data("img")==undefined)this.trigger("resize",
{w:this.cDim.w,h:this.cDim.h,left:0,top:0});else this.cached[this.active].isImage?this.resizeImage(b):this.resizeContent(b)},resizeImage:function(b){$img=b.data("img");$ic=b.data("ic");$img.width("auto").height("auto");b.data("scaled",false);var a=$img.width(),c=$img.height(),e=0,d=0,h={w:a,h:c,left:0,top:0};$img.attr("width",a).attr("height",c);if($img.get(0).tagName.toUpperCase()=="IMG"&&(a!=this.cDim.w||c!=this.cDim.h)){e=this.cDim.w/a;d=this.cDim.h/c;e=this.config.crop?Math.max(e,d):Math.min(e,
d);e=Math.min(this.config.maxZoom,e);a=h.w=Math.round(a*e)-this.config.dif;c=h.h=Math.round(c*e)-this.config.dif;if(this.cDim.w>=a)e=h.left=(this.cDim.w-a)/2;else{e=-(a-this.cDim.w)*0.5;h.w=this.cDim.w}if(this.cDim.h>c)d=h.top=(this.cDim.h-c)/2;else{d=-(c-this.cDim.h)*0.5;h.h=this.cDim.h}$img.width(a).height(c);$img.attr("width",a).attr("height",c);$ic.width(a).height(c);b.data("scaled",true)}$ic.css("left",e).css("top",d);this.bindMouseEvents($ic);this.trigger("resize",h)},resizeContent:function(b){$ic=
b.data("ic");$img=b.data("img");b.data("scaled",false);var a=$img.width(),c=$img.height(),e={w:a,h:c,left:0,top:0};if(this.config.stretch){$ic.width(this.cDim.w).height(this.cDim.h);$img.width(this.cDim.w).height(this.cDim.h);b.data("scaled",true)}else{e.left=(this.cDim.w-a)*0.5;e.top=(this.cDim.h-c)*0.5;$ic.css("left",e.left).css("top",e.top)}this.bindMouseEvents($ic);this.trigger("resize",e)},onTransitionEnd:function(){this.$active.remove();this.$active=this.$buffer;this.$active.css("width","+=1");
this.isInTransition=false;this.trigger("transition",{n:this.active});this.bindMouseEvents(this.$binder);var b=this.$binder.offset();this.mouseIsOver=false;if(this.mouseCoor.x>=b.left&&this.mouseCoor.x<=b.left+this.$binder.width())if(this.mouseCoor.y>=b.top&&this.mouseCoor.y<=b.top+this.$binder.height()){this.lastEnter="leave";this.enterLeave("enter");this.startIdle();this.mouseIsOver=true;i(document).mousemove(i.proxy(this.onMouseMove,this))}this.qid!=null&&this.show(this.qid)},trigger:function(b,
a){var c=i.Event("img_"+b),e;for(e in a)c[e]=a[e];c.source=this;this.$c.trigger(c);this.config[b]&&this.config[b].call(this,c)},destroy:function(){this.isInTransition&&this.ts.stop(this.$active,this.$buffer);this.$active&&this.$active.remove();this.$buffer.remove()},rebuild:function(b){this.quid=null;this.isInTransition&&this.ts.stop(this.$active,this.$buffer);this.$buffer&&this.$buffer.remove();this.cached=[];this.data=b;this.loader&&this.loader.cancel()}}})(jQuery);
(function(i){i.fn.tn3.Thumbnailer=function(b,a,c){this.$c=b;this.data=a;this.config=i.extend({},i.fn.tn3.Thumbnailer.config,c);i(window).resize(i.proxy(this.onWinResize,this));this.init()};i.fn.tn3.Thumbnailer.config={overMove:true,buffer:20,speed:8,slowdown:50,shaderColor:"#000000",shaderOpacity:0.5,shaderDuration:300,shaderOut:300,useTitle:false,seqLoad:true,align:1,mode:"thumbs",cssID:"tn3"};i.fn.tn3.Thumbnailer.prototype={config:null,$c:null,$oc:null,$ul:null,data:null,active:-1,listSize:0,containerSize:0,
containerPadding:0,noBufSize:0,containerOffset:0,mcoor:"mouseX",edge:"left",size:"width",outerSize:"outerWidth",mouseX:0,mouseY:0,intID:false,pos:0,difference:0,cnt:1,thumbCount:-1,initialized:false,clickWhenReady:-1,loaders:null,lis:null,isVertical:null,marginDif:0,nloaded:0,firstToLoad:0,isTouch:false,init:function(){this.$c.css("position","absolute").css("cursor","progress");this.lis=[];this.loaders=[];this.initialized=false;this.$oc=i("<div />");this.$ul=i("<ul />");this.$oc.appendTo(this.$c);
this.$oc.css("position","absolute").css("overflow","hidden").width(this.$c.width()).height(this.$c.height());this.$ul.appendTo(this.$oc);this.$ul.css("position","relative").css("margin","0px").css("padding","0px").css("border-width","0px").css("width","12000px").css("list-style","none");if(this.isVertical==null){this.isVertical=this.$c.width()<this.$c.height();if(this.isVertical=false){this.mcoor="mouseY";this.edge="top";this.size="height";this.outerSize="outerHeight"}else{this.mcoor="mouseX";this.edge=
"left";this.size="width";this.outerSize="outerWidth"}this.containerSize=this.$oc[this.size]();this.noBufSize=this.containerSize-2*this.config.buffer;this.containerOffset=this.$oc.offset()[this.edge];this.containerPadding=parseInt(this.$c.css("padding-"+this.edge))}this.listSize=0;if(navigator.userAgent.indexOf("MSIE")!=-1)this.config.seqLoad=false;this.data.length>0&&this.loadNextThumb()},loadNextThumb:function(){this.thumbCount++;var b=i("<li></li>");this.$ul.append(b);if(this.config.mode=="thumbs"){var a=
this.data[this.thumbCount].thumb;if(a){this.loaders.push(new i.fn.tn3.ImageLoader(a,this,this.onLoadThumb,[b,this.thumbCount]));!this.config.seqLoad&&this.thumbCount<this.data.length-1&&this.loadNextThumb();return}else this.config.mode="bullets"}this.config.mode=="numbers"&&b.text(this.thumbCount+1);this.onLoadThumb(null,b,this.thumbCount)},onLoadThumb:function(b,a,c,e){this.lis[c]={li:a};a.addClass(this.config.cssID+"-thumb");a.css("float",this.isVertical?"none":"left");if(b){var d=this.lis[c].thumb=
i(b);a.append(d);this.lis[c].pos=a.position()[this.edge]}this.config.useTitle&&this.data[c].title&&a.attr("title",this.data[c].title.replace(/\&amp;/g,"&"));if(this.config.mode=="thumbs"&&this.config.shaderOpacity>0){this.lis[c].shade=i("<div/>");a.prepend(this.lis[c].shade);this.lis[c].shade.css("background-color",this.config.shaderColor).css("width",d.width()).css("height",d.height()).css("position","absolute")}this.initThumb(c);a.css("opacity",0);a.animate({opacity:1},1E3);this.listSize+=a[this.outerSize](true);
if(!this.initialized){this.firstToLoad=c;this.initialized=true;this.initMouse(true)}e&&this.trigger("error",{description:e,n:c});this.trigger("thumbLoad",{n:c});this.nloaded++;if(this.nloaded<this.data.length){if(this.config.seqLoad||this.config.mode!="thumbs")this.loadNextThumb()}else{if(b)this.loaders=null;if(!this.config.seqLoad)for(b=0;b<this.lis.length;b++)this.lis[b].pos=this.lis[b].li.position()[this.edge];this.thumbsLoaded()}if(this.clickWhenReady==c){this.clickWhenReady=-1;this.thumbClick(c)}},
initThumb:function(b){var a=this.lis[b];if(a.li){a.li.removeClass().addClass(this.config.cssID+"-thumb");if(a.shade){a.shade.stop();a.shade.css("opacity",this.config.shaderOpacity)}var c=this;a.li.click(function(){c.thumbClick(b);c.trigger("click",{n:b});return false});this.config.mode!="thumbs"&&a.li.hover(function(){c.mouseOver(b)},function(){c.mouseOver(-1)})}},lastOver:-1,mouseOver:function(b){if(b!=this.lastOver){if(this.lastOver!=-1&&this.lastOver!=this.active){a=this.lis[this.lastOver];a.li.removeClass(this.config.cssID+
"-thumb-over");if(a.shade){a.shade.stop();a.shade.animate({opacity:this.config.shaderOpacity},{duration:this.config.shaderOut,easing:"easeOutCubic",queue:false})}this.trigger("thumbOut",{n:b})}this.lastOver=b;if(!(b==-1||b==this.active)){var a=this.lis[b];a.li.addClass(this.config.cssID+"-thumb-over");if(a.shade){a.shade.stop();a.shade.animate({opacity:0},{duration:this.config.shaderDuration,easing:"easeOutCubic",queue:false})}this.trigger("thumbOver",{n:b})}}},next:function(b){if(b)this.listSize>
this.containerSize&&this.move(this.$ul.position()[this.edge]-this.containerSize);else{b=this.active+1;if(this.active==-1||this.active+1==this.data.length)b=0;this.thumbClick(b)}},prev:function(b){if(b)this.listSize>this.containerSize&&this.move(this.$ul.position()[this.edge]+this.containerSize);else{b=this.active-1;if(this.active==-1||this.active==0)b=this.data.length-1;this.thumbClick(b)}},move:function(b){var a={};a[this.edge]=Math.min(0,Math.max(b,-(this.listSize-this.containerSize)));this.$ul.stop();
this.$ul.animate(a,300)},thumbClick:function(b){if(this.active==-1){if(this.thumbCount<b||b>this.lis.length-1||this.lis[b]==null){this.clickWhenReady=b;return}}else if(b==this.active)return;else this.initThumb(this.active);if(b=="next")b=this.active+1<this.data.length?this.active+1:0;else if(b=="prev")b=this.active>0?this.active-1:this.data.length-1;if(this.lis[b]){var a=this.lis[b];a.li.addClass(this.config.cssID+"-thumb-selected").unbind("click mouseenter mouseleave");a.shade&&a.shade.animate({opacity:0},
this.config.shaderDuration);this.active=b;this.centerActive()}},centerActive:function(b){if(this.active!=-1){var a=this.lis[this.active].li,c=this.$ul.position()[this.edge]+a.position()[this.edge],e=a[this.outerSize]()/2;if(c+e>this.containerSize||c+e<0){a=10-a.position()[this.edge]+this.containerSize/2-e;a=Math.min(0,a);a=Math.max(a,-this.listSize+this.containerSize);c={};c[this.edge]=a;if(this.isTouch)this.$oc["scroll"+this.edge.substring(0,1).toUpperCase()+this.edge.substring(1)](-a);else b?this.$ul.css(c):
this.$ul.animate(c,200)}}},thumbsLoaded:function(){this.$c.css("cursor","auto");this.$ul.css("width",this.listSize+"px");this.centerList();this.trigger("load")},centerList:function(b){if(this.listSize<this.containerSize){var a={};a[this.edge]=this.config.align?this.config.align==1?(this.containerSize-this.listSize)/2:this.containerSize-this.listSize:0;b||this.config.mode!="thumbs"?this.$ul.css(a):this.$ul.animate(a,300)}else{this.centerActive(b);if(this.$ul.position()[this.edge]>0)this.$ul.css(this.edge,
0);else this.$ul.position()[this.edge]+this.listSize<this.containerSize&&this.$ul.css(this.edge,-(this.listSize-this.containerSize))}},initMouse:function(b){if(this.config.mode=="thumbs"){b=b?"bind":"unbind";this.$oc[b]("mouseenter",i.proxy(this.mouseenter,this));this.$oc[b]("mouseleave",i.proxy(this.mouseleave,this))}},mouseenter:function(){this.trigger("over");clearInterval(this.intID);var b=this;this.$ul.stop();this.$c.mousemove(this.mcoor=="mouseX"?function(a){b.mouseX=a.pageX-b.containerOffset}:
function(a){b.mouseY=a.pageY-b.containerOffset});this.marginDif=parseInt(this.lis[this.firstToLoad].li.css("margin-"+this.edge));if(isNaN(this.marginDif))this.marginDif=0;b.intID=this.listSize>this.containerSize&&this.config.overMove?setInterval(function(){b.slide.call(b)},10):setInterval(function(){b.mouseTrack.call(b)},10)},mouseleave:function(){this.trigger("out");this.$c.unbind("mousemove");clearInterval(this.intID);var b=this;this.intID=setInterval(function(){b.slideOut.call(b)},10);this.mouseOver(-1)},
slide:function(){this.cnt=1;var b=this[this.mcoor];if(b<=this.config.buffer)this.pos=0;else if(b>=this.containerSize-this.config.buffer)this.pos=this.containerSize-this.listSize-1;else{var a=this.containerSize*(b-this.config.buffer);a/=this.noBufSize;this.pos=a*(1-this.listSize/this.containerSize)}for(a=this.lis.length-1;a>-1;a--){var c=b-this.prevdx;if(c>=this.lis[a].pos&&c<this.lis[a].pos+this.lis[a].li[this.size]()){this.mouseOver(a);break}}b=this.prevdx-this.marginDif;this.difference=b-this.pos;
b=Math.round(b-this.difference/this.config.speed);if(this.prevdx!=b){this.$ul.css(this.edge,b);this.prevdx=b}},prevdx:0,mouseTrack:function(){for(var b=this[this.mcoor],a=this.lis.length-1;a>-1;a--){var c=b-this.$ul.position()[this.edge];if(c>=this.lis[a].pos&&c<this.lis[a].pos+this.lis[a].li[this.size]()){this.mouseOver(a);break}}},clickOn:function(b){b=b[this.edge]-this.$ul.position()[this.edge]-this.$c.offset()[this.edge];for(var a=0;a<this.lis.length;a++){lpos=this.lis[a].li.position()[this.edge];
if(b>=lpos&&b<lpos+this.lis[a].li[this.size]()){this.lis[a].li.click();break}}},slideOut:function(){if(this.config.slowdown!=0&&this.difference!=0){var b=this.$ul.position()[this.edge];this.difference=b-this.pos;this.$ul.css(this.edge,b-this.difference/(this.config.speed*this.cnt));this.cnt*=1+4/this.config.slowdown;if(this.cnt>=40){this.difference=0;this.cnt=1}}else{clearInterval(this.intID);this.intID=null}},trigger:function(b,a){var c=i.Event("tn_"+b),e;for(e in a)c[e]=a[e];c.source=this;this.$c.trigger(c);
this.config[b]&&this.config[b].call(this,c)},destroy:function(){clearInterval(this.intID);this.$c.empty()},rebuild:function(b){clearInterval(this.intID);this.$c.empty();this.data=b;this.active=this.thumbCount=-1;this.nloaded=0;this.initMouse(false);this.loaders!==null&&i.each(this.loaders,function(a,c){c.cancel()});this.init()},setSize:function(b,a){if(this.config.mode=="thumbs"){this.isVertical?this.$c.height(a):this.$c.width(b);this.$oc.width(this.$c.width()).height(this.$c.height());this.containerSize=
this.$oc[this.size]();this.noBufSize=this.containerSize-2*this.config.buffer;this.containerOffset=this.$oc.offset()[this.edge];this.initMouse(true);this.loaders===null&&this.centerList(true)}},onWinResize:function(){this.containerOffset=this.$oc.offset()[this.edge]}}})(jQuery);
(function(i){i.fn.tn3.altLink=null;i.fn.tn3.ImageLoader=function(b,a,c,e){this.$img=i(new Image);e.unshift(this.$img);this.altLink=i.fn.tn3.altLink;a={url:b,context:a,callback:c,args:e};this.$img.bind("load",a,this.load);this.$img.bind("error",a,i.proxy(this.error,this));this.$img.attr("src",b)};i.fn.tn3.ImageLoader.prototype={$img:null,altLink:null,load:function(b){b.data.callback.apply(b.data.context,b.data.args);b.data.args[0].unbind("load").unbind("error")},error:function(b){if(this.altLink){this.altLink=
null;this.$img.attr("src",i.fn.tn3.altLink+b.data.url)}else{b.data.args.push("image loading error: "+b.data.url);b.data.callback.apply(b.data.context,b.data.args);this.$img.unbind("load").unbind("error")}},cancel:function(){this.$img.unbind("load").unbind("error")}}})(jQuery);
(function(i){i.fn.tn3.Timer=function(b,a,c){this.$target=b;this.duration=a;this.tickint=c};i.fn.tn3.Timer.prototype={$target:null,duration:null,id:null,runs:false,counter:null,countDuration:null,tickid:null,ticks:null,tickint:500,start:function(){if(!this.runs){this.runs=true;this.startCount(this.duration);this.trigger("timer_start")}},startCount:function(b){this.clean();this.countDuration=b;this.counter=+new Date;var a=this;this.id=setTimeout(function(){a.clean.call(a);a.runs=false;a.trigger.call(a,
"timer_end")},b);var c=this.duration/this.tickint;this.ticks=Math.round(b/c);this.tickid=setInterval(function(){a.ticks=Math.ceil((b-new Date+a.counter)/c);a.ticks>0&&a.trigger.call(a,"timer_tick",{tick:a.ticks,totalTicks:a.tickint})},c);this.trigger("timer_start");this.trigger("timer_tick",{tick:this.ticks,totalTicks:this.tickint})},stop:function(){this.clean();this.runs=false;this.trigger("timer_stop")},clean:function(){clearTimeout(this.id);this.id=null;clearInterval(this.tickid);this.elapsed=
this.tickid=null},elapsed:null,pause:function(b){if(this.runs){if(b){this.clean();var a=this.duration/this.tickint;this.elapsed=Math.floor((+new Date-this.counter)/a)*a}else{if(this.elapsed==null)return;this.startCount(this.countDuration-this.elapsed);this.elapsed=null}this.trigger("timer_pause",{pause:b})}},trigger:function(b,a){var c=i.Event(b),e;for(e in a)c[e]=a[e];this.$target.trigger(c)}}})(jQuery);
(function(i){var b=i.fn.tn3.Transitions=function(c,e,d,h,j){this.ts=c;this.def=i.extend(true,{},this[e.type+"Config"],e);if(!c)this.ts=[this.def];for(var f in this.ts)this.ts[f]=i.extend(true,{},this[this.ts[f].type+"Config"],this.ts[f]);this.random=d;this.end=i.proxy(h,j)},a=b.prototype={ts:null,def:{type:"slide"},random:false,gs:[],end:null,ct:null,counter:-1,setTransition:function(){if(this.ts.length==1)this.ct=this.ts[0];else{this.counter++;if(this.counter==this.ts.length)this.counter=0;this.random&&
this.counter==0&&i.fn.tn3utils.shuffle(this.ts);this.ct=this.ts[this.counter]}},start:function(c,e,d,h){if(h)this.ct=this.def;else this.setTransition();if(this[this.ct.type+"Condition"]!==undefined&&!this[this.ct.type+"Condition"](c,e,this.ct))this.ct=this.def;this[this.ct.type](c,e,this.ct,d)},stop:function(c,e){this[this.ct.type+"Stop"](c,e,this.ct)},makeGrid:function(c,e,d){var h=c.width(),j=Math.round(h/e);h=h-j*e;var f=c.height(),n=Math.round(f/d);f=f-n*d;var g,l,k,m,t,u=0,q=0,p="url("+c.find("img").attr("src")+
") no-repeat scroll -";for(g=0;g<e;g++){this.gs[g]=[];m=h>g?j+1:j;for(l=0;l<d;l++){k=c.append("<div></div>").find(":last");t=f>l?n+1:n;k.width(m).height(t).css("background",p+u+"px -"+q+"px").css("left",u).css("top",q).css("position","absolute");this.gs[g].push(k);q+=t}u+=m;q=0}c.find("img").remove()},stopGrid:function(){for(var c=0;c<this.gs.length;c++)for(var e=0;e<this.gs[c].length;e++){this.gs[c][e].clearQueue();this.gs[c][e].remove()}this.gs=[]},flatSort:function(c){for(var e=[],d=0;d<this.gs.length;d++)for(var h=
0;h<this.gs[d].length;h++)e.push(this.gs[d][h]);c&&e.reverse();return e},randomSort:function(){var c=this.flatSort();i.fn.tn3utils.shuffle(c);return c},diagonalSort:function(c,e){for(var d=[],h=c>0?this.gs.length-1:0,j=e>0?0:this.gs[0].length-1;this.gs[h];){d.push(this.addDiagonal([],h,j,c,e));h-=c}h+=c;for(j+=e;this.gs[h][j];){d.push(this.addDiagonal([],h,j,c,e));j+=e}return d},addDiagonal:function(c,e,d,h,j){c.push(this.gs[e][d]);return this.gs[e+h]&&this.gs[e+h][d+j]?this.addDiagonal(c,e+h,d+j,
h,j):c},circleSort:function(c){var e=[],d=this.gs.length,h=this.gs[0].length,j=[Math.floor(d/2),Math.floor(h/2)];d=d*h;h=[[1,0],[0,1],[-1,0],[0,-1]];var f=0,n=0,g;for(e.push(this.gs[j[0]][j[1]]);e.length<d;){for(g=0;g<=f;g++)this.addGridPiece(e,j,h[n]);if(n==h.length-1)n=0;else n++;f+=0.5}c&&e.reverse();return e},addGridPiece:function(c,e,d){e[0]+=d[0];e[1]+=d[1];this.gs[e[0]]&&this.gs[e[0]][e[1]]&&c.push(this.gs[e[0]][e[1]])},getSlidePositions:function(c,e){var d={dir:e};switch(e){case "left":d.pos=
c.outerWidth(true);break;case "right":d.pos=-c.outerWidth(true);d.dir="left";break;case "top":d.pos=-c.outerHeight(true);break;case "bottom":d.pos=c.outerHeight(true);d.dir="top"}return d},animateGrid:function(c,e,d,h,j,f,n){var g={duration:h,easing:d,complete:function(){i(this).remove()}};for(d=0;d<c.length;d++){h=i.easing[j](0,d,0,f,c.length);if(d==c.length-1){var l=this;g.complete=function(){i(this).remove();n.call(l)}}if(i.isArray(c[d]))for(var k in c[d])c[d][k].delay(h).animate(e[d],g);else c[d].delay(h).animate(e[d],
g)}},getValueArray:function(c,e,d){var h=[],j=i.isArray(e),f=i.isArray(d),n;for(n=0;n<c;n++){o={};o[j?e[n%e.length]:e]=f?d[n%d.length]:d;h.push(o)}return h}};b.defined=[];b.define=function(c){for(var e in c)switch(e){case "type":b.defined.push(c.type);break;case "config":a[c.type+"Config"]=c.config;break;case "f":a[c.type]=c.f;break;case "stop":a[c.type+"Stop"]=c.stop;break;case "condition":a[c.type+"Condition"]=c.condition;break;default:a[e]=c[e]}};b.define({type:"none",config:{},f:function(){this.end()},
stop:function(){this.end()}});b.define({type:"fade",config:{duration:300,easing:"easeInQuad"},f:function(c,e,d){var h=this;c.animate({opacity:0},d.duration,d.easing,function(){h.end()})},stop:function(c){c.stop();this.end()}});b.define({type:"slide",config:{duration:300,direction:"auto",easing:"easeInOutCirc"},f:function(c,e,d,h){h=this.getSlidePositions(e,d.direction=="auto"?h:d.direction);var j={},f={};e.css(h.dir,h.pos);j[h.dir]=0;e.animate(j,d.duration,d.easing,this.end);f[h.dir]=-h.pos;c.animate(f,
d.duration,d.easing)},stop:function(c,e){e.stop();c.stop();c.css("left",0).css("top",0);e.css("left",0).css("top",0);this.end()}});b.define({type:"blinds",config:{duration:240,easing:"easeInQuad",direction:"vertical",parts:12,partDuration:100,partEasing:"easeInQuad",method:"fade",partDirection:"auto",cross:true},f:function(c,e,d,h){d.direction=="horizontal"?this.makeGrid(c,1,d.parts):this.makeGrid(c,d.parts,1);h=d.partDirection=="auto"?h:d.partDirection;c=this.flatSort(h=="left"||h=="top");var j;
switch(d.method){case "fade":j=this.getValueArray(c.length,"opacity",0);break;case "scale":j=this.getValueArray(c.length,h=="left"?"width":"height","1px");break;case "slide":e=this.getSlidePositions(e,h);j=this.getValueArray(c.length,e.dir,d.cross?[e.pos,-e.pos]:e.pos)}this.animateGrid(c,j,d.partEasing,d.partDuration,d.easing,d.duration,this.blindsStop)},stop:function(){this.stopGrid();this.end()},condition:function(c,e){return!c.data("scaled")||!e.data("scaled")}});b.define({type:"grid",config:{duration:260,
easing:"easeInQuad",gridX:7,gridY:5,sort:"diagonal",sortReverse:false,diagonalStart:"bl",method:"fade",partDuration:300,partEasing:"easeOutSine",partDirection:"left"},f:function(c,e,d,h){this.makeGrid(c,d.gridX,d.gridY);c=d.partDirection=="auto"?h:d.partDirection;var j,f;if(d.sort=="diagonal")switch(d.diagonalStart){case "tr":j=this.diagonalSort(1,1);break;case "tl":j=this.diagonalSort(-1,1);break;case "br":j=this.diagonalSort(1,-1);break;case "bl":j=this.diagonalSort(-1,-1)}else j=this[d.sort+"Sort"](d.sortReverse);
switch(d.method){case "fade":f=this.getValueArray(j.length,"opacity",0);break;case "scale":f=this.getValueArray(j.length,c=="left"?"width":"height","1px")}this.animateGrid(j,f,d.partEasing,d.partDuration,d.easing,d.duration,this.gridStop)},stop:function(){this.stopGrid();this.end()},condition:function(c,e){return!c.data("scaled")||!e.data("scaled")}})})(jQuery);
(function(i){function b(g){var l=g&&g.message!==undefined?g.message:undefined;g=i.extend({},i.tn3block.defaults,g||{});l=l===undefined?g.message:l;n&&a({});var k=g.baseZ,m=h||g.forceIframe?i('<iframe class="blockUI" style="z-index:'+k++ +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+g.iframeSrc+'"></iframe>'):i('<div class="blockUI" style="display:none"></div>'),t=i('<div class="blockUI '+g.cssID+'-overlay" style="z-index:'+k++ +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
k=i('<div class="blockUI '+g.blockMsgClass+' blockPage" style="z-index:'+k+';display:none;position:fixed"></div>');k.css("left","0px").css("top","0px");t.css(g.overlayCSS);t.css("position","fixed");if(h||g.forceIframe)m.css("opacity",0);var u=[m,t,k],q=i("body");i.each(u,function(){this.appendTo(q)});u=f&&(!i.boxModel||i("object,embed",null).length>0);if(j||u){g.allowBodyStretch&&i.boxModel&&i("html,body").css("height","100%");i.each([m,t,k],function(p,r){var s=r[0].style;s.position="absolute";if(p<
2){s.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight)- (jQuery.boxModel?0:"+g.quirksmodeOffsetHack+') + "px"');s.setExpression("width",'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')}else if(g.centerY){s.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2- (this.offsetHeight / 2)+ (blah = document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop)+ "px"');
s.marginTop=0}else g.centerY||s.setExpression("top",'(document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')})}if(l){l.data("blockUI.parent",l.parent());k.append(l);if(l.jquery||l.nodeType)i(l).show()}if((h||g.forceIframe)&&g.showOverlay)m.show();g.showOverlay&&t.show();l&&k.show();g.onBlock&&g.onBlock();e(1,g);n=l}function a(g){g=i.extend({},i.tn3block.defaults,g||{});e(0,g);var l=i("body").children().filter(".blockUI").add("body > .blockUI");
c(l,g)}function c(g,l){g.each(function(){this.parentNode&&this.parentNode.removeChild(this)});n.data("blockUI.parent").append(n);n=null;typeof l.onUnblock=="function"&&l.onUnblock.call(l.con)}function e(g,l){if(g||n)!l.bindEvents||g&&!l.showOverlay||(g?i(document).bind("mousedown mouseup keydown keypress",l,d):i(document).unbind("mousedown mouseup keydown keypress",d))}function d(g){var l=g.data;if(i(g.target).parents("div."+l.blockMsgClass).length>0)return true;return i(g.target).parents().children().filter("div.blockUI").length==
0}var h=/MSIE/.test(navigator.userAgent),j=/MSIE 6.0/.test(navigator.userAgent),f=i.isFunction(document.createElement("div").style.setExpression);i.tn3block=function(g){b(g)};i.tn3unblock=function(g){a(g)};var n=undefined;i.tn3block.defaults={message:"<h1>Please wait...</h1>",overlayCSS:{},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:false,baseZ:2147483647,allowBodyStretch:true,bindEvents:true,showOverlay:true,applyPlatformOpacityRules:true,onBlock:null,
onUnblock:null,quirksmodeOffsetHack:4,blockMsgClass:"blockMsg",cssID:"tn3"}})(jQuery);
(function(i){(i.fn.tn3.External=function(b,a){if(b){this.context=a;this.reqs=b.length;for(var c=0;c<b.length;c++)this.plugs[b[c].origin]=new i.fn.tn3.External[b[c].origin](b[c],this)}}).prototype={context:null,reqs:0,plugs:{},getImages:function(b,a){this.plugs[b.origin].getImages(b,a)},setAlbumData:function(b,a){this.reqs--;this.context.setAlbumData.call(this.context,b,a)},setImageData:function(b,a,c){this.context.setImageData.call(this.context,b,a,c)},getAlbumData:function(b){return this.context.data[b]}}})(jQuery);



/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */
;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
}}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
}function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n,t,e){if(!n||!V[typeof n])return n;
t=t&&typeof e=="undefined"?t:tt(t,e,3);for(var r=-1,u=V[typeof n]&&Fe(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function g(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:tt(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function _(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Fe(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
return o}function U(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=tt(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Fe(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function H(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function J(n){return n&&typeof n=="object"&&!Te(n)&&me.call(n,"__wrapped__")?n:new Q(n)
}function Q(n,t){this.__chain__=!!t,this.__wrapped__=n}function X(n){function t(){if(r){var n=p(r);be.apply(n,arguments)}if(this instanceof t){var o=nt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return $e(t,n),t}function Z(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Ae[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
}if(i=Te(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):U({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:h)(n,function(n,i){o[i]=Z(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function nt(n){return wt(n)?ke(n):{}}function tt(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(De.funcNames&&(r=!n.name),r=r||!De.funcDecomp,!r)){var u=ge.call(n);
De.funcNames||(r=!O.test(u)),r||(r=E.test(u),$e(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function et(n){function t(){var n=f?i:this;if(u){var h=p(u);be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,et([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=nt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
}var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return $e(t,n),t}function rt(e,r){var u=-1,i=st(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ut(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&(Te(i)||yt(i))){t||(i=ut(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
}function ot(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return ot(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(f=!u,u||(u=a()),o||(o=a()),p=u.length;p--;)if(u[p]==n)return o[p]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(p=n.length,v=t.length,(i=v==p)||r)for(;v--;)if(c=p,s=t[v],r)for(;c--&&!(i=ot(n[c],s,e,r,u,o)););else if(!(i=ot(n[v],s,e,r,u,o)))break}else g(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&ot(n[a],t,e,r,u,o)):void 0}),i&&!r&&g(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0
});return u.pop(),o.pop(),f&&(l(u),l(o)),i}function it(n,t,e,r,u){(Te(t)?St:h)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=Te(t))||Pe(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?Te(l)?l:[]:Pe(l)?l:{}),r.push(t),u.push(l),c||it(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function at(n,t){return n+he(Re()*(t-n+1))}function ft(e,r,u){var i=-1,f=st(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
for(v&&(h=o(h),f=t);++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function lt(n){return function(t,e,r){var u={};e=J.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else h(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function ct(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
var c=n&&n.__bindData__;return c&&true!==c?(c=p(c),c[2]&&(c[2]=p(c[2])),c[3]&&(c[3]=p(c[3])),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&we.apply(c[3]||(c[3]=[]),r),c[1]|=t,ct.apply(null,c)):(1==t||17===t?X:et)([n,t,e,r,u,o])}function pt(n){return Be[n]}function st(){var t=(t=J.indexOf)===Wt?n:t;return t}function vt(n){return typeof n=="function"&&pe.test(n)}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(g(n,function(n,t){e=t
}),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return We[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false}function mt(n,t,e){var r=Fe(n),u=r.length;for(t=tt(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return g(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Fe(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])
}function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false}function xt(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=st(),o=n?n.length:0,i=false;return e=(0>e?Ie(0,o+e):e)||0,Te(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):h(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=J.createCallback(t,e,3),e=-1;
var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else h(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else h(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=J.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return h(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];
if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else h(n,t);return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Fe(n),r=u.length;h(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=J.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);
else o=[],h(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=J.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else h(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
});return e}function $t(n,t,e,r){var u=3>arguments.length;return t=J.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=at(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else h(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;
for(t=J.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Se(Ie(0,r),u))}function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ie(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=J.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ie(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?J.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;
return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=J.createCallback(e,r,3)),ft(n,t,e)}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Ve(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Ve(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||Te(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?ct(n,17,p(arguments,2),null,t):ct(n,1,null,null,t)
}function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Ue()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null)))}var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ie(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ie(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Ue(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;
m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);t&&(e||u.length)||(null==e&&(e=t),o=Q,t=n,n=J,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;
i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=vt(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=ae.unshift,je=function(){try{var n={},t=vt(t=re.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),ke=vt(ke=re.create)&&ke,xe=vt(xe=Xt.isArray)&&xe,Ce=e.isFinite,Oe=e.isNaN,Ne=vt(Ne=re.keys)&&Ne,Ie=te.max,Se=te.min,Ee=e.parseInt,Re=te.random,Ae={};Ae[$]=Xt,Ae[T]=Yt,Ae[F]=Zt,Ae[B]=ne,Ae[q]=re,Ae[W]=ee,Ae[z]=ue,Ae[P]=oe,Q.prototype=J.prototype;var De=J.support={};De.funcDecomp=!vt(e.a)&&E.test(s),De.funcNames=typeof ne.name=="string",J.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:J}},ke||(nt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
var r=new n;n.prototype=null}return r||e.Object()}}());var $e=je?function(n,t){M.value=t,je(n,"__bindData__",M)}:Ht,Te=xe||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Fe=Ne?function(n){return wt(n)?Ne(n):[]}:H,Be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},We=_t(Be),qe=ue("("+Fe(We).join("|")+")","g"),ze=ue("["+Fe(Be).join("")+"]","g"),Pe=ye?function(n){if(!n||ce.call(n)!=q)return false;var t=n.valueOf,e=vt(t)&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)
}:ht,Ke=lt(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Le=lt(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)}),Me=lt(function(n,t,e){n[e]=t}),Ve=Rt,Ue=vt(Ue=Zt.now)&&Ue||function(){return(new Zt).getTime()},Ge=8==Ee(d+"08")?Ee:function(n,t){return Ee(kt(n)?n.replace(I,""):n,t||0)};return J.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},J.assign=U,J.at=function(n){for(var t=arguments,e=-1,r=ut(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];
return u},J.bind=Mt,J.bindAll=function(n){for(var t=1<arguments.length?ut(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=ct(n[u],1,null,null,n)}return n},J.bindKey=function(n,t){return 2<arguments.length?ct(t,19,p(arguments,2),null,n):ct(t,3,null,null,n)},J.chain=function(n){return n=new Q(n),n.__chain__=true,n},J.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},J.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;
return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},J.constant=function(n){return function(){return n}},J.countBy=Ke,J.create=function(n,t){var e=nt(n);return t?U(e,t):e},J.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return tt(n,t,e);if("object"!=r)return Jt(n);var u=Fe(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=ot(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)
}},J.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,ct(n,4,null,null,null,t)},J.debounce=Vt,J.defaults=_,J.defer=function(n){if(!dt(n))throw new ie;var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},J.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},J.difference=function(n){return rt(n,ut(arguments,true,true,1))},J.filter=Nt,J.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ut(n,t)
},J.forEach=St,J.forEachRight=Et,J.forIn=g,J.forInRight=function(n,t,e){var r=[];g(n,function(n,t){r.push(t,n)});var u=r.length;for(t=tt(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},J.forOwn=h,J.forOwnRight=mt,J.functions=bt,J.groupBy=Le,J.indexBy=Me,J.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Se(Ie(0,u-r),u))},J.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=st(),p=f===n,s=a();++r<u;){var v=arguments[r];
(Te(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))}var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},J.invert=_t,J.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},J.keys=Fe,J.map=Rt,J.mapValues=function(n,t,e){var r={};
return t=J.createCallback(t,e,3),h(n,function(n,e,u){r[e]=t(n,e,u)}),r},J.max=At,J.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},J.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=tt(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)it(n,t[u],r,o,i);
return l(o),l(i),n},J.min=function(n,t,e){var u=1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},J.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];g(n,function(n,t){u.push(t)});for(var u=rt(u,ut(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)||(r[e]=n)
});return r},J.once=function(n){var t,e;if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},J.pairs=function(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},J.partial=function(n){return ct(n,16,p(arguments,1))},J.partialRight=function(n){return ct(n,32,null,p(arguments,1))},J.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ut(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])
}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r},J.pluck=Ve,J.property=Jt,J.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},J.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ie(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},J.reject=function(n,t,e){return t=J.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)
})},J.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=J.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);return o},J.rest=qt,J.shuffle=Tt,J.sortBy=function(n,t,e){var r=-1,o=Te(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=J.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},J.tap=function(n,t){return t(n),n
},J.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)},J.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=tt(t,e,1);++r<n;)u[r]=t(r);return u},J.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},J.transform=function(n,t,e,r){var u=Te(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=nt(o&&o.prototype)}return t&&(t=J.createCallback(t,r,4),(u?St:h)(n,function(n,r,u){return t(e,n,r,u)
})),e},J.union=function(){return ft(ut(arguments,true,true))},J.uniq=Pt,J.values=xt,J.where=Nt,J.without=function(n){return rt(n,p(arguments,1))},J.wrap=function(n,t){return ct(t,16,[n])},J.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(Te(e)||yt(e))var r=r?ft(rt(r,e).concat(rt(e,r))):e}return r||[]},J.zip=Kt,J.zipObject=Lt,J.collect=Rt,J.drop=qt,J.each=St,J.eachRight=Et,J.extend=U,J.methods=bt,J.object=Lt,J.select=Nt,J.tail=qt,J.unique=Pt,J.unzip=Kt,Gt(J),J.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),Z(n,t,typeof e=="function"&&tt(e,r,1))
},J.cloneDeep=function(n,t,e){return Z(n,true,typeof t=="function"&&tt(t,e,1))},J.contains=Ct,J.escape=function(n){return null==n?"":oe(n).replace(ze,pt)},J.every=Ot,J.find=It,J.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=J.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},J.findKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),h(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.findLast=function(n,t,e){var r;return t=J.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0
}),r},J.findLastIndex=function(n,t,e){var r=n?n.length:0;for(t=J.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},J.findLastKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.has=function(n,t){return n?me.call(n,t):false},J.identity=Ut,J.indexOf=Wt,J.isArguments=yt,J.isArray=Te,J.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},J.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false
},J.isElement=function(n){return n&&1===n.nodeType||false},J.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(h(n,function(){return t=false}),t)},J.isEqual=function(n,t,e,r){return ot(n,t,typeof e=="function"&&tt(e,r,2))},J.isFinite=function(n){return Ce(n)&&!Oe(parseFloat(n))},J.isFunction=dt,J.isNaN=function(n){return jt(n)&&n!=+n},J.isNull=function(n){return null===n},J.isNumber=jt,J.isObject=wt,J.isPlainObject=Pe,J.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
},J.isString=kt,J.isUndefined=function(n){return typeof n=="undefined"},J.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ie(0,r+e):Se(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},J.mixin=Gt,J.noConflict=function(){return e._=le,this},J.noop=Ht,J.now=Ue,J.parseInt=Ge,J.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Re(),Se(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):at(n,t)
},J.reduce=Dt,J.reduceRight=$t,J.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},J.runInContext=s,J.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Fe(n).length},J.some=Ft,J.sortedIndex=zt,J.template=function(n,t,e){var r=J.templateSettings;n=oe(n||""),e=_({},e,r);var u,o=_({},e.imports,r.imports),r=Fe(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
}),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},J.unescape=function(n){return null==n?"":oe(n).replace(qe,gt)},J.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
},J.all=Ot,J.any=Ft,J.detect=It,J.findWhere=It,J.foldl=Dt,J.foldr=$t,J.include=Ct,J.inject=Dt,Gt(function(){var n={};return h(J,function(t,e){J.prototype[e]||(n[e]=t)}),n}(),false),J.first=Bt,J.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ie(0,u-r))},J.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[at(0,n.length-1)]:v:(n=Tt(n),n.length=Se(Ie(0,t),n.length),n)
},J.take=Bt,J.head=Bt,h(J,function(n,t){var e="sample"!==t;J.prototype[t]||(J.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new Q(o,u):o})}),J.VERSION="2.4.1",J.prototype.chain=function(){return this.__chain__=true,this},J.prototype.toString=function(){return oe(this.__wrapped__)},J.prototype.value=Qt,J.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];J.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
return n?new Q(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];J.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];J.prototype[n]=function(){return new Q(t.apply(this.__wrapped__,arguments),this.__chain__)}}),J}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define(function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);


