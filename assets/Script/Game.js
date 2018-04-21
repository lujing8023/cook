cc.Class({
    extends: cc.Component,

    properties: {
        ndHotBread      :   cc.Node,
        ndJameBottle    :   cc.Node,
        ndJame          :   cc.Node,
        ndJam1          :   cc.Node,
        ndJam2          :   cc.Node,
        ndChoose        :   cc.Node,
        ndBread         :   cc.Node,
        nd_P            :   cc.Node,
        ndP             :   cc.Node,
        ndBox           :   cc.Node,
        ndListPar       :   cc.Node,
        ndList          :   cc.Node,
        ndListParTwo    :   cc.Node,
        ndListTwo       :   cc.Node,
        numRem          :   0,
        numChoose       :   "1",


        /////////////////////////////(刮刮卡)
        rsultLabel      :   cc.Label,
        mask            :   cc.Mask,
        promptLabel     :   cc.Label,
        ///////////////////////////
        picFram: {
            type: cc.SpriteFrame,
            default: [],
        },

        picBreadFram: {
            type: cc.SpriteFrame,
            default: [],
        },
        picVegetableFram:{
            type: cc.SpriteFrame,
            default: [],
        }

    },
    onLoad: function () {
        /////////////关闭面包节点和刮刮乐按钮
        this.ndBread.active = false;
        this.rsultLabel.node.active = false;
        this.mask.node.active = false;
        
        this.colliderCtl = this.addComponent("ColliderCtl").init(this);
        //picFramCtl
        this.picArr = [this.picFram, this.picBreadFram ,null , null , null , null , this.picVegetableFram];
        this.upUi();
        this.colliderFunc();
        this.ndP.active = false;
        this.nd_P.active = false;
    },
    upUi: function () {
        this.numRem = 1;
        _.times(this.picFram.length, (i) => {
            let node = cc.instantiate(this.ndP);
            node.active = true;
            node.getComponent(cc.Sprite).spriteFrame = this.picFram[i];
            node.name = i + " ";
            this.ndList.addChild(node);
        })
    },
    onButtonClick: function (event, cb) {
        switch (cb) {
            case "back":
                this.ndBox.active = true;
                break;
            case "cancel":
                this.ndBox.active = false;
                break;
            case "sure":
                cc.director.loadScene("Main");
                break;
            case "jam1":
                // this.ndJame.active = true;
                // let jam1Spri = this.ndJam1.getComponent(cc.Sprite).spriteFrame;
                // cc.log("选第一种果酱")
                this.ndJameBottle.active = true;
                this.ndJame.active       = false;
                break;
            case "jam2":
                // this.nsdJame.active = true;
                // let jam2Spri = this.ndJam2.getComponent(cc.Sprite).spriteFrame;
                // cc.log("选第二种果酱")
                // this.ndChoose.getChildByName("4").getComponent(cc.Sprite).spriteFrame = jam2Spri;
                this.ndJameBottle.active = true;
                this.ndJame.active       = false;
                break;
            case "next":
                this.checkPic();
                break;
        }
    },
    checkPic: function () {
        //放置盘子的空节点
        let ndName = this.ndChoose.getChildByName(this.numChoose);
        //获取盘子空节点的图片渲染
        let ndSpri = ndName.getComponent(cc.Sprite).spriteFrame;
        if (ndSpri == null) {
            cc.log("..............");
        } else {
            this.changeList();
            this.numChoose = this.numChoose - 0 + 1 + "";
            cc.log("numChoose", this.numChoose);
        }
    },
    changeList: function () {
        this.numRem += 1;
        if(this.numRem == 2){
            this.ndBread.active = true;
        }
        if(this.numRem == 3 || this.numRem == 4 || this.numRem == 5){
            if(this.numRem == 3 || this.numRem == 4){
                if(this.numRem == 3){
                    this.ndListParTwo.active = false;
                    this.destroyFunc();
                    this.ndHotBread.active = true;
                    this.upTouch();
                    cc.log("现在是烤面包阶段");
                }else{
                    this.ndHotBread.active = false;
                    this.ndJame.active = true;
                    this.touchOff();
                    cc.log("现在是选果酱阶段");
                }
            }else{
                this.touchBegin()
                /////////////
                this.ndBread.active = true;
                this.rsultLabel.node.active = true;
                this.mask.node.active = true;
                /////////////
                //this.numRem == 5
                //进行涂抹面包阶段
                this.ndJame.active = false;
                
                this.numRem += 1;
            }
        }else{//步骤6
            if (this.numRem % 2 == 1) {
                cc.log("this.numRem什么阶段",this.numRem);
                this.ndListPar.active = true;
                this.destroyFunc();
                this.ndListParTwo.active = false;
                this.upDataPic();
            } else {
                // this.numRem += 1;
                this.ndListParTwo.active = true;
                this.destroyFunc();
                this.ndListPar.active = false;
                cc.log("active", this.ndListParTwo.active);
                this.upDataPic();
            }
            cc.log("【记录步骤的数字】",this.numRem)
        }
    },
    upDataPic: function () {
        let picFram = this.picArr[this.numRem - 1]
        _.times(picFram.length, (i) => {
            if (this.numRem % 2 == 0) {
                let node = cc.instantiate(this.nd_P);
                node.active = true;
                node.getComponent(cc.Sprite).spriteFrame = picFram[i];
                node.name = i + " ";
                if (this.numRem % 2 == 0) {
                    this.ndListTwo.addChild(node);
                } else {
                    this.ndList.addChild(node);
                }
            }
        })
    },
    destroyFunc: function () {
        if (this.numRem % 2 == 1) {
            this.ndList.removeChild();
        } else {
            this.ndListTwo.removeChild();
            
        }
        // while (this.ndList.children.length > 0) {
        //     this.ndList.children[0].removeFromParent();
        // }
    },
    eventTarget: function (event) {
        let ndTarget = event.target.parent;
        this.addPicture(ndTarget);
    },
    addPicture: function (ndTarget) {
        this.ndChoose.getChildByName(this.numChoose).getComponent(cc.Sprite).spriteFrame = ndTarget.getComponent(cc.Sprite).spriteFrame;
    },
    //Bread Follow
    //跟随问题没解决
    upTouch: function () {
        this.node.on('touchmove', (touch) => {
            let location = touch.getLocation();
            let post = this.node.convertToNodeSpaceAR(location)
            // cc.log("世界坐标",post)
            this.ndBread.setPosition(post.x, post.y);
        })
    },
    touchOff:function(){
        this.node.off('touchmove');
    },
    colliderFunc:function(){
        var manager = cc.director.getCollisionManager();
            manager.enabled = true;
    },
    ////////////////////////////
    //刮刮卡
    touchBegin:function(){
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    },

    onDestroy:function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    },

    _onTouchBegin:function (event) {

        cc.log('touchBegin');

        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    },

    _onTouchMoved:function (event) {
        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    },

    _onTouchEnd:function (event) {
        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    },

    _onTouchCancel:function (event) {
        // var point = event.touch.getLocation();
        // point = this.node.convertToNodeSpaceAR(point);
        // this._addCircle(point);
    },

    _addCircle:function (point) {
        var stencil = this.mask._clippingStencil;
        var color = cc.color(255, 255, 255, 0);
        stencil.drawPoly(this.mask._calculateCircle(point,cc.p(50,50), 64), color, 0, color);
        if (!CC_JSB) {
            cc.renderer.childrenOrderDirty = true;
        }
    },

});