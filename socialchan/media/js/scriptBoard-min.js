(function(e,t,n){"use strict";function a(e){return e instanceof jQuery}function f(e){this.textarea=t(e)[0]}function l(e){return parseInt(e.attr("data-id"),10)}function c(e){return parseInt(e.attr("data-id"),10)}function h(e){return parseInt(a(e)?e.attr("data-pid"):e["data-pid"],10)}function p(e){return e.text().match(/>>(\/\w+\/)?(\d+)/)[2]}function d(e){return e.text()}function v(e){return e.attr("id").replace("file","")}function m(e,n){if(!a(e)){e=t(e)}var r=u.type==="posts";this.span=e;this.post=n?!a(n)?n:t(n):e.closest(".post");if(u.type==="thread"){this.thread=u.cache.thread;this.first=u.cache.first}else{this.thread=this.span.closest(".thread");this.first=this.thread.find(".post:first-child");}this.id=c(this.post);this.text_data={section:u.section,first:h(this.first),pid:h(this.post)}}function g(e){function t(){var e=Math.floor(Math.random()*62);if(e<10){return e}else if(e<36){return String.fromCharCode(e+55)}else{return String.fromCharCode(e+61)}}var n="";while(n.length<e){n+=t()}return n}function y(){return(new Date).getTime().toString().slice(0,10)}function b(){var n=t(e).height();var r=t("#sidebar");var i=r.height();if(i>n){r.height(parseInt(n,10)).css("overflow-y","scroll")}}function w(e){for(var n=0;n<e.length;n++){var r=e[n];var i=t('label[for="'+r+'"]').text();var s=t("."+r+"-d").find("dt").hide();var o=t(".newpost  #"+r);o.attr("placeholder",i);o.placeholder(i)}}function E(e){var n={after:function(e,n){t(e).remove().insertAfter(n)},before:function(e,n){t(e).remove().insertBefore(n)}};for(var r in e){for(var i=0,s=e[r].length;i<s;i++){n[r](e[r][i][0],e[r][i][1])}}}function S(){var e=location.href.split("?").pop().split("&");var t={};var n;for(var r=0,i=e.length;r<i;r++){n=e[r].split("=");t[n[0]]=n[1]}return t}function x(e){if(typeof e!=="object"){e=t(e)}e.slideUp(600,function(){t(this).remove()})}function T(e){var n=jQuery.parseJSON(e.responseText).field-n||jQuery.parseJSON(e.responseText).detail;var r="";var i=[];var s,o;if(typeof n==="string"){r=n}else{for(var u in n){s="";o=t('label[for="'+u+'"]');if(o.length){s+=o.text()+": "}s+=n[u].join(", ");i.push(s)}r=i.join("<br/>")}t.notification(r,"error")}var r={};t.extend({settings:function(e,n){var r=t("body");if(typeof e==="undefined"){return r.attr("class").split(" ")}else if(typeof n==="undefined"){if(e==="style"){return t("html").attr("id")}else{return r.hasClass(e)}}else{if(e==="style"){t("html").attr("id",n)}else{r.toggleClass(e)}switch(e){case"style":t("html").attr("id",n);break;default:r.toggleClass(e);break}var i="post";var s="setting/";var o={key:e,value:n};if(n==="false"||n===false||n===""||n==="on"){n="";i="del";s+=o.key}i=i.toLowerCase();t.api[i](s,o).error(function(e){t.notification("error",gettext("Settings error"))})}}});t.fn.hasScrollBar=function(){return this.get(0).scrollHeight-1>this.height()};var i=["Reason","Reply","Message is too long.","Full text","Thread","Post","hidden","hide","Replies","New message in thread ","Post not found"];for(var s=0,o=i.length;s<o;s++){gettext(i[s])}if(typeof Recaptcha!=="undefined"){Recaptcha.focus_response_field=function(){}}var u=function(){var n={type:t("#container").attr("role"),cache:{}};switch(n.type){case"page":n.section=e.location.href.split("/")[3];case"posts":case"threads":n.section=e.location.href.split("/")[3];break;case"thread":n.section=e.location.href.split("/")[3];n.type="thread";n.cache.thread=t(".thread");n.cache.first=t(".post:first");n.thread=l(n.cache.thread);n.first=h(n.cache.first);break;default:break}return n}();t.extend(f.prototype,{insert:function(e){var t=this.textarea;if(t){if(t.createTextRange&&t.caretPos){var n=t.caretPos;if(n.text.charAt(n.text.length-1)==" "){caretPost.text=e+" "}else{n.text=e}}else if(t.setSelectionRange){var r=t.selectionStart;var i=t.selectionEnd;t.value=t.value.substr(0,r)+e+t.value.substr(i);t.setSelectionRange(r+e.length,r+e.length)}else{t.value+=e+" "}t.focus()}},wrap:function(e,n,r){var i=this.textarea;var s=(e+n).length;if(typeof i.selectionStart!="undefined"){var o=i.value;var u=o.substr(0,i.selectionStart);var a=o.substr(i.selectionStart,i.selectionEnd-i.selectionStart);var f=o.substr(i.selectionEnd);i.selectionEnd=i.selectionEnd+s;if(r){a=a.split("\n");a=t.map(a,function(t){return e+t}).join("\n");i.value=u+a+f}else{i.value=u+e+a+n+f}}i.focus()}});t.extend(r,{board:{queryString:S(),postButtons:{},init:function(){function p(e){e=a(e)?e:t(e);e.remove()}function g(){t(".threads").delegate(".postlink","mouseover",function(n){function E(e,n,r,i,s){var o="tree"+n+r;var u=t('<div class="post-previews-tree"/>').attr("id",o);var a=t("#"+o);var f=t(e).clone();var l=t(f.get(0));var c=t("<article/>").addClass("post post-preview").attr("id",h).css({top:m+11+"px",left:g+"px"});var p;f.find(".post-icon, .is_closed, .is_pinned").remove();if(l.hasClass("post")){f=l.children()}if(i){f.find(".number a").attr("href","/"+n+"/"+r)}if(!t("#"+c.attr("id")).length){c.append(f);if(s){c.appendTo(s)}else{u.appendTo(".threads").append(c)}}}function S(n,r){var i=t("#"+r);var s;n=n.add(i);n.mouseout(function(){s=e.setTimeout(function(){p(i)},300)}).mouseover(function(){e.clearTimeout(s)})}var r=t(this);var i=r.attr("href").match(/(?:\/(\w+)\/)?(\d+)/);var s=!!i[1]||!t("#post"+i[2]).length;var o=i[1]||u.section;var a=i[2];var f=r.closest(".post");var l=f.hasClass("post-preview")?f.parent():false;var c=y();var h="preview-"+a+"-"+c;var d=document.documentElement;var v=document.body;var m=n.clientY+(d.scrollTop||v.scrollTop);var g=n.clientX+(d.scrollLeft||v.scrollLeft)-d.clientLeft+1;if(s){var b=t('.post[data-pid="'+a+'"]');if(b.length){return b}var w="post/"+o+"/"+a+"?html=1";t.api.get(w).success(function(e){E(e.html,o,a,true,l)}).error(function(e){t.notification(gettext("Post not found"),"error")})}else{E(t("#post"+a).html(),o,a,false,l)}e.setTimeout(function(){S(r,h)},200)})}var n=new f("#message");var i=t.settings("hideSectGroup");var s=t.cookie("password");var o={feed:{storeText:true},hidden:{onInit:function(e){if(e.span.hasClass("remove")){this.onAdd(e)}},onAdd:function(e){var n=false;var r;var i="hidden";if(e.id===c(e.first)){e.thread.addClass(i);r=e.first;n=true}else{r=e.post}r.addClass(i);var s=n?gettext("Thread"):gettext("Post");var o=t("<span/>").addClass("hide-msg").text(s+" #"+h(r)+" "+gettext("hidden")+".").appendTo(r);var u=r.find(".post-icon").appendTo(o)},onRemove:function(e){var t;var n;if(e.id===c(e.first)){e.thread.removeClass("hidden");n=e.first}else{n=e.post}n.find(".post-icon").appendTo(n.find("header"));n.find(".hide-msg").remove();n.removeClass("hidden")}}};if(s){t(".password-d #password").val(s)}t("#container").delegate(".password-d #password","change",function(e){t.cookie("password",this.value);t.settings("password",this.value)});for(var d in o){var v=o[d];if(t.settings("disable"+d)){continue}r.board.postButtons[d]=v;t(".threads").addClass("with"+d)}t(".bbcodes a").click(function(e){e.preventDefault();var r=t(this);var i=r.data("tag");var s=r.data("tagEnd");var o=r.attr("class")==="code";if(typeof s==="undefined"){s=i}n.wrap(i,s,o)});t(".threads").delegate(".post-icon","click",function(e){e.preventDefault();var n=t(this);var i=new m(n,n.closest(".post"));var s=i.span;var o=i.post;var u=i.id;var a=n.attr("data-storage");var f=r.board.postButtons[a];var l=a+"/";if(s.hasClass("add")){s.removeClass("add").addClass("remove");t.api.post(l,{value:u}).error(T);if(f.onAdd){f.onAdd(i)}}else{s.removeClass("remove").addClass("add");t.api.del(l+u).error(T);if(f.onRemove){f.onRemove(i)}}});t('#container[role="storage"]').delegate(".post-icon","click",function(){event.preventDefault();var e=t(this);var n=c(e.closest("tr"));var r=e.attr("data-storage");var i=r+"/";if(e.hasClass("add")){e.removeClass("add").addClass("remove");t.api.post(i,{value:n}).error(T)}else{e.removeClass("remove").addClass("add");t.api.del(i+n).error(T)}});t(".storage-clear-icon").click(function(e){t.api.del(t(this).attr("data-storage"))});if(!t.settings("disablePostsPreview")){g()}t("#ban_ip").click(function(e){var n=t(this);var r=t('<input type="text" id="ban_reason" name="ban_reason"/>').attr("placeholder",gettext("Reason"));if(n.attr("checked")){r.insertAfter('label[for="ban_ip"]')}else{t("#ban_reason").remove()}});t(".threads").on("click",".delPostButton",function(n){var r=t("[data-id='"+t(this).attr("target-post-id")+"']");var i;var s=!!t("#only_files").attr("checked");var o=!!t("#ban_ip").attr("checked");var a=!!t("#delete_all").attr("checked");var f=t("#gallery"+r.data("id"));var l=!s?"post/"+r.data("id"):"file/"+r.data("id");i=t(".password-d #password").val();l+="?password="+i;l+="&"+t(".removePosts").serialize();if(s){f.addClass("deleted")}else{r.addClass("deleted")}t.api.del(l).error(function(e){t.notification(t.parseJSON(e.responseText)["detail"],"error");r.removeClass("deleted")}).success(function(n){if(s){x(f);return true}if(a){var i=r.find(".ip").text();t(".ip").filter(function(){return t(this).text()===i}).each(function(){var e=t(this).closest(".post");e.addClass("deleted");x(e)})}if(r.prev().length!==0){x(r.add(r.find("img")))}else{if(u.type==="thread"){e.location.href="./"}var o=r.parent();o.children().addClass("deleted");x(o)}})});t(".threads").delegate(".number > a","click",function(e){if(u.type==="page"||u.type==="thread"){if(!t.settings("disableQuickReply")){var i=t("#post"+t(this).text());t(".newpost").insertAfter(i.selector);if(u.type==="page"){var s=l(i.parent());var o='<input type="hidden" value="'+s+'" id="thread" name="thread" />';t(".newpost form").append(o);r.ajaxBoard.quickReplied=true}}n.insert(">>"+e.target.innerHTML+" ");return false}else{return true}});if(!i){return false}i=i.split(",");for(var b=0,w=i.length;b<w;b++){t("#list-group"+i[b]).slideToggle(0)}}},settings:{init:function(){function f(e){return/^(GET|HEAD|OPTIONS|TRACE)$/.test(e)}function l(e){var t=document.location.host;var n=document.location.protocol;var r="//"+t;var i=n+r;return e==i||e.slice(0,i.length+1)==i+"/"||e==r||e.slice(0,r.length+1)==r+"/"||!/^(\/\/|http:|https:).*/.test(e)}var r=t("body");var i=S();var s=t('#container[role="settings"]').find('input[type="checkbox"], select');var o=t("html").attr("id");var u=t("#enableDesktopNotifications").click(function(){t.notification.request()});if(!t.notification.checkSupport()||t.notification.check()){u.closest("dl").hide()}t("#style").val(o);s.each(function(){var e=t(this);if(r.hasClass(e.attr("id"))){e.attr("checked",true)}});s.change(function(e){var r=t(this);var i=r.val();var s=r.attr("id");if(r.attr("checked")!==n){i=r.attr("checked")?true:""}t.settings(s,i)});t("#sidebar .hide").click(function(e){e.preventDefault();var n="hideSidebar";var r=!t.settings(k);t.settings(n,r);changes[n](r)});t("#sidebar h3").click(function(e){var n=t(this);var r=n.attr("id").split("group").pop();var i="hideSectGroup";var s=t.cookie(i);var o=t("#list-group"+r);var u=ul.css("display")==="none";s=s?s.split(","):[];if(u){var a=s.indexOf(r);if(a!==-1){s.splice(a,1)}}else{s.push(r)}t.cookie(i,s);o.slideToggle(500,b)});t(".go-back").on("click",function(t){e.history.back()});t("iframe").each(function(){var e=t(this).attr("src");t(this).attr("src",e+"?wmode=transparent")});var a=t.cookie("csrftoken");t.ajaxSetup({beforeSend:function(e,t){if(!f(t.type)&&l(t.url)){e.setRequestHeader("X-CSRFToken",a)}}})}},style:{init:function(){var n=t.settings("style");b();t('.tripcode:contains("!")').addClass("staff");t(document).scroll(function(){var n=e.pageXOffset;var r=typeof n==="number"?n:document.body.scrollLeft;t(".sidebar").css("left","-"+r+"px")});if(t.settings("newForm")){var i={after:[['.newpost input[type="submit"]',".file-d"],[".password-d",".topic-d"],[".file-d",".message-d"]]};w(["username","email","topic","message","captcha"]);t(".newpost").addClass("new-style");t(".empty").remove();E(i)}t(".section .post:first-child").each(function(e){var n=n;var r=n.find(".number a").attr("href");var i=t("<span/>").addClass("answer").html('[<a href="'+r+'">'+gettext("Reply")+"</a>]");if(n.find(".is_closed").length==0){i.insertBefore(n.find(".number"))}});t("#main").delegate("#recaptcha_response_field","keypress",function(e){var t;if(e.which<1040||e.which>1279){return true}e.preventDefault();switch(e.which){case 1081:t="q";break;case 1094:t="w";break;case 1091:t="e";break;case 1082:t="r";break;case 1077:t="t";break;case 1085:t="y";break;case 1075:t="u";break;case 1096:t="i";break;case 1097:t="o";break;case 1079:t="p";break;case 1092:t="a";break;case 1099:t="s";break;case 1074:t="d";break;case 1072:t="f";break;case 1087:t="g";break;case 1088:t="h";break;case 1086:t="j";break;case 1083:t="k";break;case 1076:t="l";break;case 1103:t="z";break;case 1095:t="x";break;case 1089:t="c";break;case 1084:t="v";break;case 1080:t="b";break;case 1090:t="n";break;case 1100:t="m";break;default:return true}e.target.value=e.target.value+t});t(".button").click(function(e){t(this).toggleClass("active")});t(".expandImages").click(function(e){e.preventDefault();t(".file").trigger("click")});t(".filterPosts .button").click(function(e){var n=t(this).hasClass("active");t(".post").show();if(n){var r=t(".filterPosts #filterImages");if(r.attr("checked")){r.trigger("change")}t(".filterPosts .slider").trigger("slidechange")}t(".filterParams, .sliderInfo").toggle();t(".filterPosts .slider").toggle()});t(".filterPosts .slider").slider({max:15}).hide().bind("slidechange",function(){var e=t(".post");var n=t(".filterPosts .slider");var i=n.slider("value");var s=e.filter(function(){var t=h(this);if(i===0){e.show();return false}if(!(t in r.posts.map)){return true}return r.posts.map[t].length<i});console.log(r.posts.map);console.log("Filtered posts with %s answers.",i);console.log(s);s.hide()});t(".filterPosts #filterImages").change(function(){var e=t(".post").filter(function(){return!t(this).find(".file").length});var n=this.checked;if(n){e.hide()}else{e.show()}});t(".post .message").each(function(){var e=t(this);if(e.hasScrollBar()){e.css("overflow","hidden");var n=t("<span/>").addClass("skipped").text(gettext("Message is too long.")).appendTo(e.parent());var r=t('<a href="#showFullComment" class="skipped"/>').text(gettext("Full text")).click(function(n){n.preventDefault();e.css("overflow","auto");t(this).parent().remove()}).appendTo(n)}});t(".ip").each(function(e){var n=t(this);n.insertBefore(n.prev().find(".number"))});if(!n){return false}t("html").attr("id",n);if(n==="klipton"){t(".thread").click(function(e){var n=t(this);t(".postlist").remove();t(".selected").removeClass("selected");if(n.hasClass("selected")){return false}n.addClass("selected");var r=t("<section/>").addClass("postlist").appendTo("#main");var i=t(this).find(".post").clone();i.appendTo(r);return false})}t(".kTabs").tabs()}},posts:{map:{},data:{},cache:{},init:function(e){var n=e&&typeof e!=="function"?a(e)?e:t(e):t(".post");var r={};this.cache={};for(var i=0,s=n.length;i<s;i++){var o=n[i];var f=t(o);var l=f.find(".postlink").map(function(){return t(this)});var c=h(f);for(var d=0,v=l.length;d<v;d++){var m=p(l[d]);var g="#post"+m;var y=t(g);if(m in r){if(r[m].indexOf(c)!==0){r[m].push(c)}}else{r[m]=[c]}this.cache[m]=y;if(u.type==="thread"&&y.length!==0){y.attr("href",g)}}}this.initButtons();this.buildAnswersMap(r,true)},initButtons:function(){var n=t(".thread .post:first-child");var i=r.board.postButtons;n.each(function(){var n=t(this);var r=c(n);for(var s in i){var o=i[s];var u=n.find('.post-icon[data-storage="'+s+'"]');var a=e.session[s].indexOf(r);if(a!==null&&a>=0){u.removeClass("add").addClass("remove")}if(o.onInit){o.onInit(new m(u,n))}}})},buildAnswersMap:function(e,n){if(t.settings("disableAnswersMap")){return false}for(var r in e){var i=[];var s=this.cache[r].find(".answer-map");var o=!!s.length;var u=o?s:t('<div class="answer-map"/>');var a=t("#post"+r);var f=a.find(".skipped");for(var l=0,c=e[r].length;l<c;l++){var h=e[r][l];i.push('<a class="postlink" href="#post'+h+'">&gt;&gt;'+h+"</a>")}if(!o){u.html(gettext("Replies")+":"+i.join(","))}else{u.html(u.html()+","+i.join(","))}if(f.length){u.insertBefore(f)}else{a.append(u)}u.insertBefore(+".skipped");t("#post"+r).append()}if(n){for(var p in e){this.map[p]=e[p]}}}},hotkeys:{init:function(){}},share:{init:function(){function e(e){FB.api("/me/feed","post",{message:e,link:"www.socialchan.net",picture:"https://s3-us-west-2.amazonaws.com/filesocialchan1/media/images/logo2.png",height:55,width:55},function(e){if(!e||e.error){}else{t.notification(gettext("was successfully shared"),"success")}})}t(".FbButton, .FbButtonShare").on("click",function(t){var n=t.target.getAttribute("data-post");FB.getLoginStatus(function(t){if(t.status==="connected"){console.log("Logged in.");e(n)}else{FB.login(function(t){e(n)},{scope:"publish_actions"})}})})}},emoticons:{init:function(){t("#btn-emoticons").on("click",function(e){e.preventDefault();t("#menu-emoticons").fadeToggle("slow")});t(".newpost #menu-emoticons .css-emoticon").on("click",function(e){var n=e.target.getAttribute("data-tag");t("#message").focus().val(t("#message").val()+" "+n+" ")})}},classified:{init:function(){function e(e,t,n){var r=new ol.Map({layers:[e],target:t,view:n});return r}jQuery(function(t){t("#popup-map-select-classified").show(1e3,function(){function h(e){r=e.coordinate;var n=o.getView();t(c).popover("destroy");l.setPosition(r);t(c).popover({placement:"center",animation:false,html:true,content:'<img src="'+STATIC_URL+'images/blank2.png" style="width:28px; height:48px;" >'});t(c).popover("show");t("#accept-location").show()}function d(e,t,n,r,i){var s=new OpenLayers.Projection("EPSG:4326");var u=new OpenLayers.Projection("EPSG:900913");var a=(new OpenLayers.LonLat(t,e)).transform(s,u);var l=(new OpenLayers.LonLat(r,n)).transform(s,u);var c=[a[0],l[0],a[1],l[1]];if(p){o.removeLayer(p)}if(i=="node"){var h=o.getView();h.setZoom(18);h.setCenter([a.lon,a.lat]);var d=new ol.source.Vector;d.addFeature(new ol.Feature(new ol.geom.Circle([a.lon,a.lat],25)));p=new ol.layer.Vector({source:d,style:f});o.addLayer(p)}else{var h=o.getView();h.setZoom(18);h.fitExtent([a.lon,a.lat,l.lon,l.lat],o.getSize());var v=[[a.lon,a.lat],[a.lon,l.lat],[l.lon,l.lat],[l.lon,a.lat]];var m=new ol.geom.Polygon([v]);var d=new ol.source.Vector;d.addFeature(new ol.Feature(m));p=new ol.layer.Vector({source:d,style:f});o.addLayer(p)}}function v(){var e=document.getElementById("addr");t.getJSON("http://nominatim.openstreetmap.org/search?format=json&limit=7&&Email=hvar90@gmail.com&q="+e.value,function(e){var n=[];t.each(e,function(e,t){var r=t.boundingbox;n.push("<li><a class='chooseAddr' lat1="+r[0]+" lng1="+r[2]+" lat2="+r[1]+" lng2="+r[3]+" osm_type="+t.osm_type+" href='#' >"+t.display_name+"</a></li>")});t("#resultsPlaces").empty();if(n.length!=0){t("<p>",{html:gettext("  Search results:")}).appendTo("#resultsPlaces");t("<ul/>",{"class":"list_places",html:n.join("")}).appendTo("#resultsPlaces")}else{t("<p>",{html:gettext("  No results found")}).appendTo("#resultsPlaces")}})}t("#accept-location").hide();var n=ol.proj.transform([-76.5194,3.4327],"EPSG:4326","EPSG:900913");var r;var i=new ol.layer.Tile({source:new ol.source.OSM});var s=new ol.View2D({center:[0,0],zoom:4});var o=e(i,"map-select",s);var u=new ol.style.Circle({radius:5,fill:null,stroke:new ol.style.Stroke({color:"red",width:1})});var a={Point:[new ol.style.Style({image:u})],LineString:[new ol.style.Style({stroke:new ol.style.Stroke({color:"green",width:1})})],MultiLineString:[new ol.style.Style({stroke:new ol.style.Stroke({color:"green",width:1})})],MultiPoint:[new ol.style.Style({image:u})],MultiPolygon:[new ol.style.Style({stroke:new ol.style.Stroke({color:"yellow",width:1}),fill:new ol.style.Fill({color:"rgba(255, 255, 0, 0.1)"})})],Polygon:[new ol.style.Style({stroke:new ol.style.Stroke({color:"blue",lineDash:[4],width:3}),fill:new ol.style.Fill({color:"rgba(0, 0, 255, 0.1)"})})],GeometryCollection:[new ol.style.Style({stroke:new ol.style.Stroke({color:"magenta",width:2}),fill:new ol.style.Fill({color:"magenta"}),image:new ol.style.Circle({radius:10,fill:null,stroke:new ol.style.Stroke({color:"magenta"})})})],Circle:[new ol.style.Style({stroke:new ol.style.Stroke({color:"red",width:2}),fill:new ol.style.Fill({color:"rgba(255,0,0,0.2)"})})]};var f=function(e,t){return a[e.getGeometry().getType()]};var l=new ol.Overlay({element:document.createElement("div")});var c=l.getElement();o.addOverlay(l);o.addControl(new ol.control.ZoomSlider);o.on("click",h);t("#accept-location").on("click",function(){t("#location").val('{"location": {"lon": "'+r[0]+'", "lat": "'+r[1]+'", "zoom": "'+s.getZoom()+'"}}')});t("#clear-location-classi").on("click",function(){t("#accept-location").hide();t(c).popover("destroy");t("#location").val("")});var p;t("#searchPlaces").submit(function(){v();return false});t("#resultsPlaces").on("click",".chooseAddr",function(){d(t(this).attr("lat1"),t(this).attr("lng1"),t(this).attr("lat2"),t(this).attr("lng2"),t(this).attr("osm_type"))})})});jQuery(function(t){t("#popup-map-show-classified ").show(1e3,function(){var n=new ol.View2D({zoom:16});var r=new ol.layer.Tile({source:new ol.source.OSM});var i=new ol.Overlay({element:document.createElement("div"),positioning:"center-center"});var s=i.getElement();var o=e(r,"map-show",n);o.addOverlay(i);o.addControl(new ol.control.ZoomSlider);var u=new ol.style.Circle({radius:5,fill:null,stroke:new ol.style.Stroke({color:"red",width:1})});var a={Circle:[new ol.style.Style({stroke:new ol.style.Stroke({color:"red",width:2}),fill:new ol.style.Fill({color:"rgba(255,0,0,0.2)"})})]};var f=function(e,t){return a[e.getGeometry().getType()]};var l;t(s).popover({placement:"center",animation:false,html:true,content:'<img src="'+STATIC_URL+'images/blank2.png" style="width:28px; height:48px;" >'});t(s).popover("show");t(".popup-show-classified-button").on("click",function(e){var t=Number(e.target.getAttribute("lon"));var r=Number(e.target.getAttribute("lat"));var s=Number(e.target.getAttribute("zoom"));if(l){o.removeLayer(l)}var u=new ol.source.Vector;u.addFeature(new ol.Feature(new ol.geom.Circle([t,r],25)));l=new ol.layer.Vector({source:u,style:f});n=o.getView();n.setCenter([t,r]);n.setZoom(s);o.addLayer(l);i.setPosition([t,r])})})})}},popups:{init:function(){(function(e){e(function(){e(".no-logged").on("click",function(t){t.preventDefault();e("#window-login-register").bPopup({easing:"easeOutBack",speed:450,transition:"slideDown"})})});e(function(){e("#popup-select-classified-button").on("click",function(t){t.preventDefault();e("#popup-map-select-classified").bPopup({closeClass:"bpopup-close",easing:"easeOutBack",speed:450,transition:"slideDown"})})});e(function(){e(".popup-show-classified-button").on("click",function(t){t.preventDefault();e("#popup-map-show-classified").bPopup({easing:"easeOutBack",speed:450,transition:"slideDown"})})})})(jQuery)}},ajaxUsers:{init:function(){t("#register").submit(function(){var e=t(this).serializeArray();t.api.post("user/",e).success(function(e){location.href="/newsection/"}).error(function(e){T(e)});return false});t("#login").submit(function(){var n=t(this).serializeArray();t.api.post("user/login",n).success(function(t){e.location.reload()}).error(function(e){T(e)});return false});t("#logout").click(function(){t.api.post("user/logout").success(function(t){e.location.reload()}).error(function(e){T(e)});return false})}},ajaxBoard:{validCaptchas:0,quickReplied:false,activatedPusub:true,init:function(){var e=t(".password-d #password");if(!e.val()){e.val(g(8))}t(function(){"use strict";t(".newpost form").addClass("fileupload-processing");t(".newpost form").fileupload({singleFileUploads:false,beforeSend:function(e,n){t("#overlay_loading img").show();r.ajaxBoard.activatedPusub=false},success:function(e){if(typeof e==="string"){e=t.parseJSON(e)}if(e["field-errors"]||e["errors"]||e["detail"]){T(e)}else{r.ajaxBoard.success(e)}t("#overlay_loading img").hide()},error:T,always:function(){t(".newpost form .table tr").remove();t(".newpost .start").toggle()},dataType:"json",url:t.api.url+"post/?html=1&_accept=application/json"})});t(".newpost  #files").on("change",function(){t(".newpost form .table tr").remove();t(".newpost .start").toggle()});t(".newpost .start").click(function(){t.ajax({success:function(e){if(typeof e==="string"){e=t.parseJSON(e)}if(e["field-errors"]||e["errors"]||e["detail"]){T(e)}else{r.ajaxBoard.success(e)}t("#overlay_loading img").hide()},beforeSend:function(e,n){t("#overlay_loading img").show();r.ajaxBoard.activatedPusub=false},error:T,url:t.api.url+"post/?html=1&_accept=application/json",dataType:"json",data:t(".newpost form").serializeArray(),type:"POST"})})},success:function(n){if(u.type!=="thread"&&!r.ajaxBoard.quickReplied){e.location.href="./"+n.pid+"#post"+n.pid;return true}console.log(n);if(u.type!=="thread"){var i=t("section[data-id='"+n.thread+"']")}else{var i=t("section[data-id='"+u.thread+"']")}var s=t(n.html);var s=t([s[0],s[2]]);var o=s.hide().appendTo(i).fadeIn(500);o.find('.tripcode:contains("!")').addClass("staff");r.posts.init(o);if(r.ajaxBoard.quickReplied){t('input[name="thread"]').remove();r.ajaxBoard.quickReplied=false}if(++this.validCaptchas>2){t(".captcha-d").remove()}var a=t(".newpost");if(a.parent().hasClass("thread")){var f=t.settings("bottomForm")&&u.type==="thread"?".actions":"#main";a.insertBefore(f)}try{e.location.hash="#post"+n.pid}catch(l){}t(".captcha-img").trigger("click");a.find("textarea").val("");a.find(":input").each(function(){var e=t(this);switch(e.attr("type")){case"email":case"file":case"select-multiple":case"select-one":case"text":case"textarea":e.val("");break;case"checkbox":case"radio":e.attr("checked",false);break}})}},pubsub:{sleepTime:500,maxSleepTime:1e3*60*15,cursor:null,newMsgs:0,init:function(){if(t.settings("disablePubSub")){return false}this.poll()},showNewPostNotification:function(e,n,i){var s=t("title").text().split("] ").pop();var o=gettext("New message in thread ")+"/"+n+"/"+i;t("title").text("["+ ++this.newMsgs+"] "+s);t(document).mousemove(function(e){t("title").text(s);t(document).unbind("mousemove");r.pubsub.newMsgs=0});if(true){t.notification(e,3e3,o)}},poll:function(){var n={};if(r.pubsub.cursor){n.cursor=r.pubsub.cursor}t.api.post("stream/"+u.section).error(function(){if(r.pubsub.sleepTime<r.pubsub.maxSleepTime){r.pubsub.sleepTime*=2}else{r.pubsub.sleepTime=r.pubsub.maxSleepTime}e.setTimeout(r.pubsub.poll,r.pubsub.sleepTime)}).success(function(n){if(!n.posts){return false}r.pubsub.cursor=n.cursor;var i=n.posts;r.pubsub.cursor=i[i.length-1].id;if(u.type!=="thread"){var s=t("section[data-id='"+n.idThread+"']")}else{var s=t("section[data-id='"+u.thread+"']")}if(r.ajaxBoard.activatedPusub){for(var o=0,a=i.length;o<a;o++){var f=t(i[o]);var l=t([f[0],f[2]]).hide().appendTo(s).fadeIn(500,function(e){t(this).attr("style","")});l.find('.tripcode:contains("!")').addClass("staff");r.posts.init(l)}var c=l.find(".message").text();r.pubsub.showNewPostNotification(c,u.section,u.first)}r.ajaxBoard.activatedPusub=true;e.setTimeout(r.pubsub.poll,0)})}}});t(function(){var e=["board","emoticons","settings","style","posts","hotkeys","popups","ajaxBoard","ajaxUsers","classified","pubsub","share"];t.each(e,function(e,t){r[t].init()})});e.app=r})(window,jQuery)