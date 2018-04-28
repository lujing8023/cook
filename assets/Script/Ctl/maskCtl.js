cc.Class({
    extends: cc.Component,

    properties: {
        rsultLabel:cc.Label,
        mask:cc.Mask,
        promptLabel:cc.Label,
    },
    initCom:function(comMain){
        this._targetCom = comMain;
        return this;
    },
    beginTouch:function(){
        // this.node.scale = 0.5
       this.minPercent = 0.15 ;
       this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
       this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
       this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
       this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
       this.init();
    },
    onDestroy:function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    },

    _onTouchBegin:function (event) {

        cc.log('touchBegin');

        let point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    },

    _onTouchMoved:function (event) {
        let point = event.touch.getLocation();
        cc.log(point);
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    },

    _onTouchEnd:function (event) {
        let point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    },

    _onTouchCancel:function (event) {
        // let point = event.touch.getLocation();
        // point = this.node.convertToNodeSpaceAR(point);
        // this._addCircle(point);
    },

    _addCircle:function (point) {
        let stencil = this.mask._clippingStencil;
        let color = cc.color(255, 255, 255, 0);
        stencil.drawPoly(this.mask._calculateCircle(point,cc.p(25,25), 64), color, 0, color);
        if (!CC_JSB) {
            cc.renderer.childrenOrderDirty = true;
        }
        let _point = cc.v2(point.x + this.startSizeW / 2, point.y + this.startSizeH / 2 );
        this._updateCheckOver(_point ,()=>{
            // this.mask.node.active = false;
            this._targetCom.lbtixong.string = "涂得差不多了，点击下一步吧！"
            let actionBy  = cc.rotateTo(0.1, -45);
            let actionBy2 = cc.rotateTo(0.1, 0);
            let plan3 = cc.repeat(cc.sequence(actionBy, actionBy2), 8);
            this._targetCom.ndMes.runAction(plan3);
            this._targetCom.ndNextBtn2.active = false;
            this._targetCom.ndNextBtn.getComponent(cc.Button).interactable = true;
        })
    },

    init : function () {
        this.startSizeW = this.node.getContentSize().width * this.node.scaleX;
        this.startSizeH = this.node.getContentSize().height * this.node.scaleY;
        this.n = 10 ; // 行
        this.m = 10 ; // 列
        this.BoxSizeW = this.startSizeW / this.n ;
        this.BoxSizeH = this.startSizeH / this.m ;
        this.BoxArr = [];
        for (let i = 0; i < this.n * this.m; i++) {
            this.BoxArr.push( false );  
        }

    },

    _updateCheckOver : function ( point  , cb = null){
        let bReturn = false; 
        let _m = parseInt( point.x / (this.startSizeW / this.m ) ) ; 
        let _n = parseInt( point.y / (this.startSizeH / this.n ) ); 
        let index = _n * this.m  + _m 
        if(!this.BoxArr[index]) {
            this.BoxArr[index] = true ;
            let count = 0 ;
            for (let i = 0; i < this.BoxArr.length; i++) {
                if(this.BoxArr[i])count ++ ;     
            }

            if(count / this.BoxArr.length  > this.minPercent)bReturn = true;
        }
        if(bReturn){
            if(cb)cb();
        }
    },
    
});
