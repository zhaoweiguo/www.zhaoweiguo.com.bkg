var Loader = {
    onLoad : function(name){},
    onReady : function(){},
    init : function(container) {
    },
    handlerError : function(e) {
        alert(e);
    },
    on : function(evt, handler) {
        switch ( evt.toLowerCase() ) {
            case 'load' :
                this.onLoad = handler;
            break;
            case 'ready' :
                this.onReady = handler;
            break;
            default :
            break;
        }
        return true;
     },
    _load : function(path, callback) {
        try {
            var img = new Image();

			if( img.addEventListener ) {
                img.addEventListener("load", callback, false);
                img.addEventListener("error", function(){
					//alert("err:"+path);
					callback();
				}, false);
            } else if(img.attachEvent) {
                img.attachEvent("onreadystatechange", function(){
                        if(img.readyState == 4
                            || img.readyState == 'complete'
                            || img.readyState == 'loaded') {
                            callback();
						}
                });
                img.attachEvent("onerror", function(){
					alert("err:"+path);
                    callback();
                });
            }
			img.src = path;
        } catch(e) {
            this.handlerError(e);
               callback();
        }
    },
	total:0,
	indicator:0,
    load : function(imgs) {
        var total = imgs.length;
        var _self  = this;
        var indicator = arguments[1] || 0;
		this.indicator = indicator;
		this.total = total;
        if ( indicator >= total ) {
            _self.onReady();
            return true;
          }
 
        var callee = arguments.callee;
        var img = imgs[indicator];
        this._load(img, function() {
            _self.onLoad(img);
            callee.apply(_self, [imgs, ++indicator]);
        });
        return true;
    }
	,
	imgs:new Array()
	,
	addimg:function(url){
		for(var i=0;i<this.imgs.length;i++){
			if(this.imgs[i]==url)return;
		}
		this.imgs[this.imgs.length]=url;
	}
	,
	per:function(){
		return parseInt(this.indicator*100/this.total);
	}
}