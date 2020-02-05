(function () {
	var a = a || {},
	b = window,
	c = document;
	a.hostName = "www.zhaoweiguo.com";
	a.main = "diehua";
	document[a.main] = document[a.main] || {};
	a.ui = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><div id="PREFIX_Header"><a class="PREFIX_pinLogo" href="http://www.diehua.com:8000">碟花网</a><a href="javascript:void(0)" id="PREFIX_ClosePinWindow">关闭</a><h6 id="PREFIX_pinTitle">还能选择<span>20</span>张</h6></div><div id="PREFIX_contentBox"><ul id="PREFIX_PinImglist"></ul></div><div id="PREFIX_Footer"><label id="PREFIX_selectAllBtn"><input type="checkbox" id="全选"  />全选</label><a href="javascript:void(0)" id="PREFIX_PinNextBtn">采回家</a><select id="PREFIX_Pinfilter"><option value="300" selected="selected">图片宽度>300</option><option value="500">图片宽度>500</option><option value="800">图片宽度>800</option></select></div>'.replace(/PREFIX/g, a.main);
	a.base = {
		domain : "http://" + a.hostName,
		imgUrl : "http://s11.libmibo.com/images/module/pin/",
		bookmarkletUrl : "http://" + a.hostName+"/capture",
		locationHost : encodeURIComponent(window.location),
		pinBtn : null,
		hidePinBtnTimer : null,
		currentImage : null,
		showingImage : false,
		lastScrollY : 0,
		isShowedBtn : false,
		picWidth : 200,
		picHeight : 200,
		gifWidth : 100,
		gifHeight : 100,
		imgCount : 0,
		pinImagesBtn : null,
		popWindowWidth : 875,
		imgCountShowBox : null,
		maxPinNumber : 20,
		selectdPinNumber : 0,
		selected : []
	};
	a.browse = {
		isIE : navigator.userAgent.indexOf("MSIE") > 0,
		isIE6 : navigator.userAgent.indexOf("MSIE 6") > 0,
		isIE7 : navigator.userAgent.indexOf("MSIE 7") > 0,
		isIE8 : navigator.userAgent.indexOf("MSIE 8") > 0,
		isIE9 : navigator.userAgent.indexOf("MSIE 9") > 0,
		isFireFox : navigator.userAgent.indexOf("Firefox") > 0,
		isSafari : (navigator.userAgent.indexOf("Safari") > 0 && navigator.userAgent.indexOf("Chrome")) < 0,
		isChrome : (navigator.userAgent.indexOf("Safari") > 0 && navigator.userAgent.indexOf("Chrome")) > 0,
		isOpera : navigator.userAgent.indexOf("Opera") > -1,
		isSaAndChr : navigator.userAgent.indexOf("Safari") > 0,
		isMaxthon : navigator.userAgent.toLowerCase().indexOf("maxthon") > 0,
		isSogou : navigator.userAgent.toLowerCase().indexOf("mozilla") > -1 && navigator.userAgent.toLowerCase().indexOf("metasr") > -1,
		isOther : navigator.userAgent.toLowerCase().indexOf("mozilla") > -1 && navigator.userAgent.indexOf("MSIE") > 0
	};
	a.creatStyleElement = function () {
		var cssId = a.main + "_style";
		if (a.$(cssId)) {
			return
		}
		var styleContnet = "#PREFIX_Overlay{position:fixed;z-index:1000000001; top:0; right:0; left:0; bottom:0;background:black; opacity:.8}#PREFIX_pinItButton{display:block;position:absolute;z-index:999999999;color:#211922;background:#FFF; text-shadow:0 1px #eaeaea; border-radius:5px; box-shadow:0 0 2px #555}#PREFIX_pinBtn { display: block; position: absolute; z-index: 999999999; color: #211922; background: #fff; text-shadow: 0 1px #eaeaea; border-radius: 5px; box-shadow: 0 0 2px #555; font: 12px/1 'Helvetica Neue',Helvetica,Arial,Sans-serif; text-align: center; padding: 5px 8px; cursor: pointer; }#PREFIX_pinBtn:hover { background-image: -webkit-linear-gradient(top, #fefeff, #efefef); background-image: -moz-linear-gradient(top, #fefeff, #efefef); }#PREFIX_Container a,#PREFIX_Container a:active,#PREFIX_Container a:hover{text-decoration:none}#PREFIX_Container {float:none;padding:20px;font-size:12px;font-family: 'helvetica neue', arial, sans-serif; position: fixed;  z-index: 1000000002;background-color: #EEE; opacity: 1;hasLayout:-1;box-shadow: 0 0 15px #000000;border-radius:4px}#PREFIX_Header{position:relative;height:45px;line-height:45px;padding-right:40px;float:none}#PREFIX_contentBox{float:none;height:338px;width:810px;background:#FFF;overflow-y:auto;overflow-x: hidden;position:relative}#PREFIX_PinImglist{padding:0;margin:0;border:solid #CCC;border-width:0 0 0 1px;background:#FFF;overflow: hidden;padding-top:1px;width:805px}#PREFIX_Footer{float:none;height:50px; padding:25px 15px 0; position:relative}.PREFIX_pinLogo{width:190px;height:35px;overflow:hidden;position:absolute;top:0; left:0;text-indent:-99em; background:url(http://s11.libmibo.com/images/pinIconv2.png) no-repeat -35px 0}#PREFIX_ClosePinWindow{width:35px; height:35px;position:absolute;top:-5px; right:-5px;text-indent:-99em; overflow:hidden; background:url(http://s11.libmibo.com/images/module/pin/pinIconv2.png) no-repeat 0 0}#PREFIX_PinImglist li{float:left;width:158px;height:158px;margin-top:-1px;margin-left:-1px;overflow:hidden;border:solid #CCC;border-width:1px;text-align:center;position:relative;vertical-align: middle}#PREFIX_PinImglist li a.PREFIX_ItemImg{display:block;width: 158px;height: 158px;font-size: 0;overflow: hidden;text-align: center;position: relative;vertical-align: middle}#PREFIX_PinImglist li a:hover{text-decoration: none}#PREFIX_PinImglist li a.PREFIX_ItemImg::after {display: inline-block;width: 0;height: 100%;content: \".\";vertical-align: middle;overflow: hidden;}#PREFIX_PinImglist li img{max-width:158px; max-height:158px;vertical-align: middle;margin:auto;display:inline; z-index:10002}.PREFIX_Dimensions{background:white;border-radius: 4px;color: #000000;display:block;font-size: 10px;padding: 0 2px;position:absolute;left:55px;top:125px;text-align: center;z-index: 10003;}.PREFIX_MaskLayer{background:rgba(73, 246, 243, 0.2);display: none;position: absolute;z-index:10004;cursor: pointer;left: 0;top: 0;width: 158px;height: 158px;}#PREFIX_PinImglist li a:hover .PREFIX_MaskLayer{display:block}#PREFIX_PinImglist li.PREFIX_selected .PREFIX_MaskLayer{display:block}#PREFIX_PinImglist .PREFIX_SelectdIcon{display:none;width:112px; height:47px;position:absolute;top:50px;left:25px;z-index:10005;background:url(http://s11.libmibo.com/images/module/pin/icaitu_bookmarklet_icon_v2.png) no-repeat 0 0}#PREFIX_PinImglist .PREFIX_SelectdIcon:hover{background-position:0 -61px}#PREFIX_PinImglist li a:hover{font-weight:100} #PREFIX_PinImglist li a:hover .PREFIX_SelectdIcon{display:block}#PREFIX_pinTitle{height:100%; width:100%; margin:0; padding:0; text-align:right;font-size:14px;font-weight:100}#PREFIX_pinTitle span{font-size:16px; padding:0 5px}#PREFIX_PinImglist li.PREFIX_selected .PREFIX_SelectdIcon{background-position:0 -124px;display:block}#PREFIX_pinTitle:active{cursor:move}#PREFIX_PinNextBtn{width:181px; height:39px; line-height:39px; text-align:center; font-size:20px; color:#888; margin:0 auto;display: block; background:url(http://s11.libmibo.com/images/module/pin/pinIconv2.png) no-repeat 0 -36px;cursor: default;}#PREFIX_PinNextBtn.PREFIX_enable{background-position:0 -76px;color:#FFF;cursor: pointer;}#PREFIX_PinNextBtn:hover{text-decoration:none;color:#888}#PREFIX_PinNextBtn.PREFIX_enable:hover{text-decoration:none;color:#FFF}#PREFIX_selectAllBtn{display:block;width:50px;height:20px; position:absolute; left:255px;top:40px}#PREFIX_selectAllBtn input{vertical-align: middle;}#PREFIX_Pinfilter{display:block;position: absolute;right:190px;top:40px}.PREFIX_showMiddle .PREFIX_small,.PREFIX_showBig .PREFIX_small,.PREFIX_showBig .PREFIX_middle{display:none}.PREFIX_close{width:18px;height:18px; display:block;position:absolute; top:10px; right:10px; background:url(http://s11.libmibo.com/images/module/pin/uploadClose.png) no-repeat 0 0; text-indent:-99em;z-index:10010}PREFIX_close:hover{background-position:0 -18px}".replace(/PREFIX/g, a.main).replace(/ASSETS_URL/g, a.base.imgUrl);
		var styleHack = {
			ie : "#PREFIX_Overlay{filter:alpha(opacity=80); _position:absolute}#PREFIX_Container{width:814px}.PREFIX_MaskLayer{background:#49F6F3;filter: alpha(opacity=20)}#PREFIX_PinImglist li a{zoom:1}#PREFIX_PinImglist .PREFIX_SelectdIcon{_background:url(http://s11.libmibo.com/images/module/pin/icaitu_bookmarklet_icon_v2_ie6.png) no-repeat 0 0}.PREFIX_close{_background:url(http://s11.libmibo.com/images/module/pin/uploadClose.png) no-repeat 0 0".replace(/PREFIX/g, a.main),
			w3c : ""
		};
		a.browse.isIE6 && (styleHack.ie += " #PREFIX_Overlay{width:1000px;height:600px}".replace(/PREFIX/g, a.main));
		var styleObj = document.createElement("style");
		styleObj.id = cssId,
		styleObj.type = "text/css",
		styleObj.media = "screen";
		try {
			styleObj.appendChild(document.createTextNode(styleContnet + styleHack.w3c))
		} catch (err) {
			styleObj.styleSheet.cssText = (styleContnet + styleHack.ie)
		}
		(document.getElementsByTagName("head")[0] || document.body).appendChild(styleObj)
	};
	a.isPinable = function () {
		var host = location.hostname,
		b = true,
		c = false;
		if (/^(?:about|chrome)/.test(location.protocol)) {
			location.href = "http://" + a.hostName;
			b = false
		} else {
			if (a.hostName == host) {
				(alert("你就在本站呢，不能采集本站图片。"), b = false)
			} else {
				if (/^127.0.0.1(?::\d+)?/.test(host) || /^localhost(?::\d+)?/.test(host) || /^10\./.test(host) || /^192\.168\./.test(host)) {
					c = true
				} else {
					if (/^(?:\d+\.){3}\d+$/.test(host)) {
						var f = host.split("."),
						g = parseInt(f[0], 10),
						f = parseInt(f[1], 10)
					}
				}
			}
		}
		return c && (alert("\u4f60\u73b0\u5728\u8bbf\u95ee\u7684\u662f\u5185\u90e8\u7f51\u7edc\uff0c\u4e0d\u80fd\u91c7\u96c6\u5185\u7f51\u56fe\u7247"), b = false),
		b
	};
	a.getViewSize = function () {
		var _vHeight = document.documentElement.clientHeight || document.body.clientHeight;
		var _vWidth = document.documentElement.clientWidth || document.body.clientWidth;
		return {
			w : _vWidth,
			h : _vHeight
		}
	};
	a.flashFix = {
		hideFlash : function () {
			var elem = a.main + "_FixFlashStyle";
			if (!document.getElementById(elem)) {
				var b = "object, embed {visibility: hidden}",
				c = document.createElement("style");
				c.id = elem,
				(document.getElementsByTagName("head")[0] || document.body).appendChild(c),
				c.styleSheet ? c.styleSheet.cssText = b : c.appendChild(document.createTextNode(b))
			}
		},
		showFlash : function () {
			var elem = document.getElementById(a.main + "_FixFlashStyle");
			elem && (document.getElementsByTagName("head")[0] || document.body).removeChild(elem)
		}
	};
	a.attr = function (element, attr, value) {
		if (arguments.length == 2) {
			return element.attributes[attr] ? element.attributes[attr].nodeValue : undefined
		} else {
			if (arguments.length == 3) {
				element.setAttribute(attr, value)
			}
		}
	};
	a.getClass = function (element) {
		return a.attr(element, "class")
	};
	a.hasClass = function (element, className) {
		var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
		return element.className.match(reg)
	};
	a.addClass = function (element, className) {
		if (!a.hasClass(element, className)) {
			element.className += " " + className
		}
	};
	a.removeClass = function (element, className) {
		if (a.hasClass(element, className)) {
			var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
			element.className = element.className.replace(reg, " ")
		}
	};
	a.getTagName = function (elem) {
		return (elem && elem.tagName || "").toLowerCase()
	};
	a.$ = function (id) {
		return typeof id === "object" ? id : c.getElementById(id)
	};
	a.$$ = function (tagName, oParent) {
		return (oParent || document).getElementsByTagName(tagName)
	};
	a.$$$ = function (className, tagName, oParent) {
		var reg = new RegExp("(^|\\s)" + className + "(\\s|$)"),
		aEl = a.$$(tagName || "*", oParent),
		len = aEl.length,
		aClass = [],
		i = 0;
		for (; i < len; i++) {
			reg.test(aEl[i].className) && aClass.push(aEl[i])
		}
		return aClass
	};
	a.$c = function (id, type) {
		var element = document.createElement(type || "div");
		element.id = a.main + "_" + id;
		return element
	};
	a.bind = function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false)
		} else {
			if (element.attachEvent) {
				element.attachEvent("on" + type, handler)
			} else {
				element["on" + type] = handler
			}
		}
	};
	a.unbind = function (element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler)
		} else {
			if (element.detachEvent) {
				element.detachEvent("on" + type, handler)
			} else {
				element["on" + type] = null
			}
		}
	};
	a.filters = {
		"^http(s)?://(\\w+.)?diandian.com" : function (img) {
			var _img = img.img,
			c = null,
			d = null,
			e = null;
			if (a.getTagName(_img) == "img") {
				var _parent = _img.parentNode,
				f = false;
				while (_parent && _parent.nodeName.toLower() != "body") {
					var _className = $.attr(_parent);
					if (_className == "feed-content-holder pop") {}
					
				}
			}
		}
	};
	var pin = function () {
		this.imgCount = 0;
		this.init()
	};
	pin.prototype = {
		isValidImage : function (img) {
			return img.style.display == "none" || img.className == "ImageToPin" || img.width < 300 || img.height < 300 ? false : true
		},
		encapsulateImage : function (img) {
			var _img = new Image();
			_img.src = img.src;
			var _imgInfo = {
				w : img.width,
				h : img.height,
				src : img.src,
				img : img,
				alt : "",
				imgs : _img
			};
			return _imgInfo
		},
		calculateMarginTop : function (img) {
			return Math.max(img.h, img.w) > 199 ? img.h < img.w ? "margin-top:" + parseInt(100 - 100 * (img.h / img.w)) + "px;" : "" : "margin-top:" + parseInt(100 - a.h / 2) + "px;"
		},
		getAllimages : function (doc, imgs, opts) {
			var _document = doc || document,
			allImages = imgs || [],
			options = opts || {},
			imgs = _document.images,
			_this = this,
			_fn = arguments.callee,
			imgLength = imgs.length;
			for (var i = 0; i < imgLength; i++) {
				var img = imgs[i];
				_this.isValidImage(img) && (img = _this.encapsulateImage(img), options && (img._parentNode = options.parentNode || null), allImages.push(img))
			}
			try {
				var iframes = _document.getElementsByTagName("iframe");
				if (iframes.length > 0) {
					for (var i = 0, l = iframes.length; i < l; i++) {
						var d = iframes[i].contentDocument;
						if (d) {
							var parentNode = iframes[i].parentNode;
							allImages = _this.getAllimages(d, allImages, {
									parentNode : parentNode
								})
						}
					}
				}
			} catch (err) {}
			
			return allImages
		},
		registerImagesForPinBtn : function (arr) {
			var len = arr.length,
			_this = this;
			for (i = 0; i < len; i++) {
				_this.registerImageForPinBtn(arr[i])
			}
		},
		registerImageForPinBtn : function (img) {
			var _img = img.container || img.img,
			_this = this;
			if (!!_img && !_img.getAttribute("data-pinit")) {
				_img.setAttribute("data-pinit", "registered");
				a.bind(_img, "mouseover", function () {
					if (!_img) {
						return
					}
					if (a.base.isShowedBtn) {
						return
					}
					a.base.isShowedBtn = true;
					_this.showPinBtn(img)
				});
				a.bind(_img, "mouseout", function () {
					_this.hidePinBtn();
					a.base.isShowedBtn = false
				})
			}
		},
		creatPinBtn : function () {
			var btnId = a.main + "pinBtn",
			_this = this,
			pinBtn;
			if (a.$(btnId)) {
				pinBtn = a.$(btnId)
			} else {
				pinBtn = a.$c("pinBtn", "pinit");
				pinBtn.innerHTML = "\u91c7\u96c6\u5230\u8776\u82b1\u7f51";
				pinBtn.style.display = "none";
				pinBtn.onmouseover = function () {
					_this.showPinBtn()
				};
				pinBtn.onmouseout = function () {
					_this.hidePinBtn()
				};
				pinBtn.onclick = function () {
					a.base.currentImage && _this.pinOneImage(a.base.currentImage);
					return false
				};
				document.body.appendChild(pinBtn);
				a.base.pinBtn = pinBtn
			}
		},
		showPinBtn : function (img) {
			clearTimeout(a.base.hidePinBtnTimer);
			var pinBtn = a.base.pinBtn;
			if (img) {
				var b = img.container || img.img,
				c,
				d,
				d = c = 0,
				_currentImg = a.base.currentImage = img;
				if (b.getBoundingClientRect) {
					var e = document.documentElement,
					b = b.getBoundingClientRect(),
					f = e.clientTop || document.body.clientTop || 0,
					g = window.pageYOffset || document.body.scrollTop,
					h = 0,
					i = 0;
					_currentImg._parentNode && (h = _currentImg._parentNode.offsetTop || 0, i = _currentImg._parentNode.offsetLeft || 0),
					c = b.left + (window.pageXOffset || document.body.scrollLeft) - (e.clientLeft || document.body.clientLeft || 0) + i,
					d = b.top + g - f + h
				}
				d -= 9,
				c -= 9,
				pinBtn.style.top = (d > 0 ? d : 0) + "px",
				pinBtn.style.left = (c > 0 ? c : 0) + "px"
			}
			pinBtn.style.display = "block"
		},
		hidePinBtn : function () {
			a.base.hidePinBtnTimer = setTimeout(function () {
					a.base.pinBtn.style.display = "none",
					a.base.currentImage = null
				}, 100)
		},
		pinOneImage : function (img) {
			var _url = img.src;
			this.pinImage(_url)
		},
		pinGoHome : function () {
			var _li = a.$(a.main + "_PinImglist").childNodes,
			_liLen = _li.length,
			_imgList = [];
			for (var i = 0; i < _liLen; i++) {
				var _item = _li[i];
				if (a.hasClass(_item, a.main + "_selected")) {
					_imgList.push(_item.childNodes[0].childNodes[0].src)
				}
			}
			this.pinImage(_imgList)
		},
		pinImage : function (img) {
			var _srouceUrl = a.url || (a.src == location.href ? document.referrer || location.href : location.href),
			_data = {};
			if (typeof img == "object") {
				_data.imgs = img
			} else {
				if (typeof img == "string") {
					_data.imgs = img
				} else {
					var _img = img;
					_data.imgs = _img.bigImg ? a.bigImg.src : _img.src
				}
			}
			_data.srouce = _srouceUrl;
			_data.title = document.title;
            _data.host = window.location.host;
			this.openWindow(_data)
		},
		openWindow : function (data) {
			var _url = [];
			_url.push(a.base.bookmarkletUrl);
			_url.push("?");
			var _imgs = typeof data.imgs == "object" ? data.imgs.join("{---}") : data.imgs;
			var title = data.title;
			var _pinData = {
				media : _imgs,
				url : data.srouce,
				title : data.title,
                host:data.host
			};
			for (var i in _pinData) {
				if (i == "title") {
					_url.push(encodeURIComponent(i));
					_url.push("=");
					var _title = encodeURIComponent(_pinData[i]);
					try {
						decodeURIComponent(_title)
					} catch (e) {
						_title = ""
					}
					_url.push(_title);
					_url.push("&");
					continue
				}
				_url.push(encodeURIComponent(i));
				_url.push("=");
				_url.push(encodeURIComponent(_pinData[i]));
				_url.push("&")
			}
			_url = _url.join("");
			var windowSetting = "status=no,resizable=no,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=632,height=470,left=0,top=0";
			window.open(_url, "pin" + (new Date).getTime(), windowSetting)
		},
		selectImg : function (obj) {
			if (a.hasClass(obj, a.main + "_selected")) {
				a.removeClass(obj, a.main + "_selected");
				a.base.selectdPinNumber--;
				this.setStatus();
				var check = a.$(a.main + "_selectAllBtn").childNodes[0];
				check.checked ? check.checked = false : ""
			} else {
				if (a.base.selectdPinNumber >= a.base.maxPinNumber) {
					alert("\u4e00\u6b21\u53ea\u80fd\u91c7\u96c620\u5f20!");
					return
				}
				a.addClass(obj, a.main + "_selected");
				a.base.selectdPinNumber++;
				this.setStatus()
			}
		},
		allSelectImg : function (obj) {
			if (!a.hasClass(obj, a.main + "_selected") && (((a.hasClass(obj, a.main + "_middle") || (a.hasClass(obj, a.main + "_big"))) && (a.hasClass(obj.parentNode, a.main + "_showMiddle"))) || ((a.hasClass(obj, a.main + "_big")) && (a.hasClass(obj.parentNode, a.main + "_showBig"))) || (obj.parentNode.className == ""))) {
				if (a.base.selectdPinNumber >= a.base.maxPinNumber) {
					alert("\u4e00\u6b21\u53ea\u80fd\u91c7\u96c620\u5f20!");
					return
				}
				a.addClass(obj, a.main + "_selected");
				a.base.selectdPinNumber++;
				this.setStatus()
			}
		},
		cancelHandler : function (obj) {
			if (a.hasClass(obj, a.main + "_selected")) {
				a.removeClass(obj, a.main + "_selected");
				a.base.selectdPinNumber--;
				this.setStatus()
			}
		},
		selectAllHander : function (isCancel) {
			var _li = a.$(a.main + "_PinImglist").childNodes,
			_this = this,
			_liLen = _li.length;
			if (isCancel) {
				for (var i = 0; i < _liLen; i++) {
					_this.cancelHandler(_li[i])
				}
			} else {
				for (var i = 0; i < _liLen; i++) {
					a.base.selectdPinNumber < 20 ? _this.allSelectImg(_li[i]) : ""
				}
				if (_liLen == 1) {
					a.attr(a.$(a.main + "_selectAllBtn").childNodes[0], "checked", "checked")
				}
			}
		},
		pinfilter : function (val) {
			var _box = a.$(a.main + "_PinImglist"),
			_li = _box.childNodes,
			_this = this,
			_liLen = _li.length;
			_box.className = "";
			if (val == 500) {
				a.addClass(_box, a.main + "_showMiddle");
				for (var i = 0; i < _liLen; i++) {
					if (a.hasClass(_li[i], a.main + "_small")) {
						_this.cancelHandler(_li[i])
					}
				}
				for (var j = 0; j < _liLen; j++) {
					if (a.hasClass(_li[j], a.main + "_middle") || a.hasClass(_li[j], a.main + "_big")) {
						a.$(a.main + "_selectAllBtn").childNodes[0].disabled = false;
						break
					} else {
						a.$(a.main + "_selectAllBtn").childNodes[0].disabled = true
					}
				}
			} else {
				if (val == 800) {
					a.addClass(_box, a.main + "_showBig");
					for (var i = 0; i < _liLen; i++) {
						if (a.hasClass(_li[i], a.main + "_small") || a.hasClass(_li[i], a.main + "_middle")) {
							_this.cancelHandler(_li[i])
						}
					}
					for (var j = 0; j < _liLen; j++) {
						if (a.hasClass(_li[j], a.main + "_big")) {
							a.$(a.main + "_selectAllBtn").childNodes[0].disabled = false;
							break
						} else {
							a.$(a.main + "_selectAllBtn").childNodes[0].disabled = true
						}
					}
				} else {
					for (var i = 0; i < _liLen; i++) {
						if (a.hasClass(_li[i], a.main + "_small") || a.hasClass(_li[i], a.main + "_middle") || a.hasClass(_li[i], a.main + "_big")) {
							a.$(a.main + "_selectAllBtn").childNodes[0].disabled = false;
							break
						} else {
							a.$(a.main + "_selectAllBtn").childNodes[0].disabled = true;
							break
						}
					}
				}
			}
		},
		setStatus : function () {
			var _b = !!a.base.imgCountShowBox ? a.base.imgCountShowBox : a.$(a.main + "_pinTitle");
			var _e = !!a.base.pinImagesBtn ? a.base.pinImagesBtn : a.$(a.main + "_PinNextBtn");
			var _m = parseInt(a.base.maxPinNumber - a.base.selectdPinNumber);
			_b.innerHTML = "还可以选择<span>" + _m + "</span>张";
			if (_m == 20) {
				a.removeClass(_e, a.main + "_enable");
				a.$(a.main + "_selectAllBtn").childNodes[0].checked = false
			} else {
				a.addClass(_e, a.main + "_enable")
			}
		},
		showImages : function (imgs) {
			if (a.base.showingImage) {
				return
			}
			a.flashFix.hideFlash();
			a.base.lastScrollY = window.pageYOffset || document.body.scrollTop;
			var overLay = a.$c("Overlay");
			document.body.appendChild(overLay);
			a.browse.isIE6 && (overLay.style.width = document.body.scrollWidth + "px", overLay.style.height = document.body.scrollHeight + "px");
			var container = a.$c("Container");
			var _this = this;
			a.base.selectdPinNumber = 0;
			container.innerHTML = a.ui;
			var _viewSize = a.getViewSize();
			container.style.position = a.browse.isIE6 ? "absolute" : "fixed";
			container.style.left = Math.abs(_viewSize.w - a.base.popWindowWidth) / 2 + "px";
			container.style.top = "60px";
			document.body.appendChild(container);
			var canclePin = function () {
				overLay.parentNode.removeChild(overLay);
				container.parentNode.removeChild(container);
				a.base.showingImage = false;
				a.flashFix.showFlash();
				a.base.selectdPinNumber = 0;
				window.scroll(0, a.base.lastScrollY);
				return false
			};
			var _posX,
			_posY;
			var dragHandler = function (event) {
				var event = event || window.event;
				container.style.left = (event.clientX - _posX) + "px";
				container.style.top = (event.clientY - _posY) + "px"
			};
			var selectHandler = function () {
				var _parentNode = this.parentNode;
				_this.selectImg(_parentNode);
				return false
			};
			var selectAll = function () {
				var _checkBox = a.$(a.main + "_selectAllBtn").childNodes[0];
				_checkBox.checked ? _this.selectAllHander(false) : _this.selectAllHander(true)
			};
			a.$(a.main + "_pinTitle").onmousedown = function (event) {
				var event = event || window.event;
				_posX = event.clientX - parseInt(container.style.left);
				_posY = event.clientY - parseInt(container.style.top);
				document.onmousemove = dragHandler
			};
			document.onmouseup = function () {
				document.onmousemove = null
			};
			a.$(a.main + "_ClosePinWindow").onclick = canclePin;
			a.bind(a.$(a.main + "_selectAllBtn").childNodes[0], "click", selectAll);
			a.$(a.main + "_Pinfilter").onchange = function () {
				var _val = this.options[this.selectedIndex].value;
				_this.pinfilter(_val)
			};
			var _size = "_big";
			for (var i = 0; i < imgs.length; i++) {
				if (imgs[i].src == "") {
					continue
				}
				(function (img) {
					if (img.w < 500) {
						_size = "_small"
					} else {
						if (img.w < 800) {
							_size = "_middle"
						} else {
							_size = "_big"
						}
					}
					var imgItem = document.createElement("li");
					imgItem.className = a.main + _size;
					var imgItemContent = '<a href="javascript:void(0)" class="' + a.main + '_ItemImg"><img src="' + img.src + '" alt="" /><span class="' + a.main + '_Dimensions">' + img.w + "X" + img.h + '</span><span class="' + a.main + '_MaskLayer"></span><span class="' + a.main + '_SelectdIcon"></span><span class="' + a.main + '_close">关闭</span></a>';
					imgItem.innerHTML = imgItemContent;
					var _itemBtn = imgItem.childNodes[0];
					var _closeBtn = _itemBtn.lastChild;
					_closeBtn.onclick = function (event) {
						var e = event || window.event;
						imgItem.parentNode.removeChild(imgItem);
						e.stopPropagation();
						return false
					};
					_itemBtn.onclick = selectHandler;
					a.$(a.main + "_PinImglist").appendChild(imgItem)
				})(imgs[i])
			}
			imgs.length == 1 ? _this.selectAllHander(false) : "";
			a.bind(a.$(a.main + "_PinNextBtn"), "click", function () {
				if (!a.hasClass(a.$(a.main + "_PinNextBtn"), a.main + "_enable")) {
					return
				}
				_this.pinGoHome();
				canclePin();
				return false
			});
			a.base.showingImage = true
		},
		pinBtnInit : function (imgs) {
			if (!(a.base.pinBtn == null)) {
				return
			}
			this.creatPinBtn();
			this.registerImagesForPinBtn(imgs)
		},
		showImagesAndInitPinBtn : function () {
			if (!a.isPinable()) {
				return
			}
			var imgs = this.getAllimages();
			a.base.imgCount = imgs.length;
			if (imgs.length == 0) {
				try {
					window.top === window.self && alert("\u62b1\u6b49\uff0c\u9875\u9762\u4e0a\u6ca1\u6709\u8db3\u591f\u5927\u7684\u56fe\u7247\u3002")
				} catch (err) {}
				
			} else {
				this.showImages(imgs)
			}
			this.pinBtnInit(imgs)
		},
		init : function () {
			this.showImagesAndInitPinBtn()
		}
	};
	a.init = function () {
		document[a.main].pinTool ? (document[a.main].pinTool.init()) : (document[a.main].pinTool = new pin());
		if (document[a.main]._loaded) {
			return
		}
		a.creatStyleElement();
		document[a.main].showValidImages = a.init;
		document[a.main]._loaded = true
	};
	a.init()
})();
