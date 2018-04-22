cc.Class({
    extends: cc.Component,

    properties: {
        ndZhenban       :   cc.Node,
        ndKnife         :   cc.Node,
        ndLine          :   cc.Node,
        ndHotBread      :   cc.Node,
        ndJameBottle    :   cc.Node,
        ndJame          :   cc.Node,
        ndJam1          :   cc.Node,
        ndJam2          :   cc.Node,
        ndChoose        :   cc.Node,
        ndBread         :   cc.Node,
        nd_P            :   cc.Node,
        nd_Pre          :   cc.Node,
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
        },
        picMetFram:{
            type: cc.SpriteFrame,
            default: [],
        },
        PbListCtl: {
            type: cc.Prefab,
            default: []
        },
        PbListMet: {
            type: cc.Prefab,
            default: []
        },
        //添加类型
        addType      : 1,

        //刀移动
        numStep      : 1,

    },
    onLoad: function () {
        //引入预设的类
        this._compbFun = this.node.addComponent("pbCtl")
        //关闭面包节点和刮刮乐按钮
        this.ndBread.active = false;
        this.rsultLabel.node.active = false;
        this.mask.node.active = false;
        
        this.colliderCtl = this.addComponent("ColliderCtl").init(this);
        //picFramCtl
        this.picArr = [this.picFram, this.picBreadFram ,null , null , null , null , this.picVegetableFram , this.picMetFram];
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
                 //关闭所有的果酱汉堡盘子（显示刀和砧板）
                }
            }else{//步骤6
                if (this.numRem % 2 == 1) {
                this.onDestroy()
                this.touchOff();
                this.upKnife();
                //变换第二种类型
                this.addType = 2
                cc.log("this.numRem什么阶段",this.numRem);//this.nuRem == 7选蔬菜
                this.ndListPar.active = true;
                this.destroyFunc();
                this.ndListParTwo.active = false;
                this.upDataPic();
               
                }else{
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
        if(this.addType == 1){
            _.times(picFram.length, (i) => {
                    let node = cc.instantiate(this.nd_P);
                    node.active = true;
                    node.getComponent(cc.Sprite).spriteFrame = picFram[i];
                    node.name = i + " ";
                    if (this.numRem % 2 == 0) {
                        this.ndListTwo.addChild(node);
                    } else {
                        this.ndList.addChild(node);
                    }
            })
        }else{
            _.times(picFram.length, (i) => {
                this.nodePre = cc.instantiate(this.nd_Pre);
                this.nodePre.active = true;
                this.nodePre.getComponent(cc.Sprite).spriteFrame = picFram[i];
                this.nodePre.name = i + " ";
                if (this.numRem == 7) {
                    this.ndList.addChild(this.nodePre);
                } else {
                    this.ndListTwo.addChild(this.nodePre);
                }
        })
        }
    },
    //关闭所有的果酱汉堡盘子（显示刀和砧板）
    upKnife:function(){
        this.ndChoose.getChildByName("1").active = false;
        this.ndBread.active = false;
        this.ndJameBottle.active = false;
        this.ndChoose.getChildByName("6").active = true;
        this.ndZhenban.active = true;
        this.ndKnife.active = true;
        this.ndLine.active = true;

        //开启触摸
        this.ndZhenban.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.log("【触摸开始】")
            this.cutMove();
        }, this);
    },
    destroyFunc: function () {
        if (this.numRem % 2 == 1) {
            while (this.ndList.children.length>0){
                this.ndList.children[0].removeFromParent()
            }
            // this.ndList.removeChild();
        } else {
            while (this.ndListTwo.children.length>0){
                this.ndListTwo.children[0].removeFromParent()
            }
        }
        // while (this.ndList.children.length > 0) {
        //     this.ndList.children[0].removeFromParent();
        // }
    },
    eventTarget: function (event) {
        let ndTarget = event.target.parent;
        this.addPicture(ndTarget);
    },
    eventTargetTwo:function(event){
        let ndName = event.target.parent.name - 0;
        cc.log("【点击按钮后的获取按钮名字】",ndName);
        if(this.ndListParTwo.active == false){
            this.preNode = cc.instantiate(this.PbListCtl[ndName]);
        }else{
            this.preNode = cc.instantiate(this.PbListMet[ndName]);
        }
        if(this.ndChoose.getChildByName("6").children.length == 1){
            this.ndChoose.getChildByName("6").children[0].removeFromParent();
            this.ndChoose.getChildByName("6").addChild(this.preNode);
            this.fromClick();
        }else{
            this.ndChoose.getChildByName("6").addChild(this.preNode);
            this.fromClick();
        }
        // this.addPicture(ndTarget);
    },
    addPicture: function (ndTarget) {
        this.ndChoose.getChildByName(this.numChoose).getComponent(cc.Sprite).spriteFrame = ndTarget.getComponent(cc.Sprite).spriteFrame;
    },
    addPre:function(){
        
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
    //到移动画线
    fromClick:function(){
        this.numStep = 1;
        this.moveFun = this.preNode.getComponent("pbCtl");
        // moveFun.moveFun();
        //初始化knife位置
        this.objPosition = this.moveFun.getPosition(this.numStep);
        // this.ndcutLine.x   = moveFun.getPosition();
        this.ndKnife.setPosition(this.objPosition.posX, this.objPosition.posY);
        // this.cutstar();
    },
    // cutstar: function () {
    //     this.ndZhenban.on(cc.Node.EventType.TOUCH_START, function (event) {
    //         cc.log("【触摸开始】")
    //         this.cutMove();
    //     }, this);
    // },
    
    cutMove: function () {
        //this.knife
        //this.cut
        var self = this;
        this.cutFunc = function (event) {
            self.knifeX = self.objPosition.posX;                                   //knife纹理的x
            self.knifeY = self.ndKnife.y;                                   //knife纹理的y
            self.firstPosition = self.objPosition.posY;                            //设置knif的初始位置
            var locationY = event.getDeltaY() < 0 ? event.getDeltaY() : 0;  //获取鼠标移动的距离
            self.knifeY += locationY;
            self.ndKnife.setPosition(self.knifeX, self.knifeY);             //knife实时的位置赋值
            var knifeLine = self.ndLine.getComponent(cc.Graphics);       //绘画接口
            knifeLine.moveTo(self.knifeX, self.firstPosition);              //移动
            knifeLine.lineTo(self.knifeX, self.knifeY);                     //开始画线
            knifeLine.stroke();
            let maxY = self.objPosition.posY
            if (self.ndKnife.y < -maxY) {                                    //判断y进行knife的换位置
                // if (self.knifeX >= 200) {
                //     self.ndcut.active = false;
                // }
                if (this.numStep == 1) {
                    self.moveFun.moveFun(this.numStep);                                     ////////////////////////////////切完移动
                    this.numStep += 1;
                    this.objPosition = this.moveFun.getPosition(this.numStep);                             //位置变化位置
                    let actionBy = cc.moveTo(1, cc.p(self.objPosition.posX, self.objPosition.posY));
                    self.ndZhenban.off(cc.Node.EventType.TOUCH_MOVE, this.cutFunc, this)
                    self.ndKnife.runAction(actionBy);                 //位置赋值
                    knifeLine.clear(true);                                      //清除线条
                } else {
                    if(this.numStep == 2){
                        self.moveFun.moveFun(this.numStep);                                     ////////////////////////////////切完移动
                        this.numStep += 1;
                        this.objPosition = this.moveFun.getPosition(this.numStep);                             //位置变化位置
                        let actionBy = cc.moveTo(1, cc.p(self.objPosition.posX, self.objPosition.posY));
                        self.ndZhenban.off(cc.Node.EventType.TOUCH_MOVE, this.cutFunc, this)
                        self.ndKnife.runAction(actionBy);                 //位置赋值
                        knifeLine.clear(true);
                        
                    }else{
                        this.ndZhenban.off(cc.Node.EventType.TOUCH_START, function (event) {
                            cc.log("【触摸开始】")
                            this.cutMove();
                        }, this);  
                    }
                }
            }
        }
        self.ndZhenban.on(cc.Node.EventType.TOUCH_MOVE, this.cutFunc, this)
    },
});


// cc.Class({
//     extends: cc.Component,

//     properties: {
//         ndknife      : cc.Node,
//         ndcut        : cc.Node,
//         ndcutLine    : cc.Node,
//         ndPbNode     : cc.Node,
//         PbList: {
//             type: cc.Prefab,
//             default: []
//         },
//         lbTest       : cc.Label,
//         numStep      : 1,
//     },
//     onLoad: function () {
//         // this._compbFun = this.node.addComponent("pbFun");
//     },
//     onButtonClick: function () {
//         this.ndPb = cc.instantiate(this.PbList[0]);
//         this.ndPbNode.addChild(this.ndPb);
//         this.moveFun = this.ndPb.getComponent("pbFun");
//         // moveFun.moveFun();
//         //初始化knife位置
//         this.objPosition = this.moveFun.getPosition(this.numStep);
//         // this.ndcutLine.x   = moveFun.getPosition();
//         this.ndknife.setPosition(this.objPosition.posX, this.objPosition.posY);
//         this.lbTest.node.active = false;
//         this.cutstar();

//     },
//     cutstar: function () {
//         this.ndcut.on(cc.Node.EventType.TOUCH_START, function (event) {
//             cc.log("【触摸开始】")
//             this.cutMove();
//         }, this);
//     },
//     cutMove: function () {
//         //this.knife
//         //this.cut
//         var self = this;
//         this.cutFunc = function (event) {
//             self.knifeX = self.objPosition.posX;                                   //knife纹理的x
//             self.knifeY = self.ndknife.y;                                   //knife纹理的y
//             self.firstPosition = self.objPosition.posY;                            //设置knif的初始位置
//             var locationY = event.getDeltaY() < 0 ? event.getDeltaY() : 0;  //获取鼠标移动的距离
//             self.knifeY += locationY;
//             self.ndknife.setPosition(self.knifeX, self.knifeY);             //knife实时的位置赋值
//             var knifeLine = self.ndcutLine.getComponent(cc.Graphics);       //绘画接口
//             knifeLine.moveTo(self.knifeX, self.firstPosition);              //移动
//             knifeLine.lineTo(self.knifeX, self.knifeY);                     //开始画线
//             knifeLine.stroke();
//             let maxY = self.objPosition.posY
//             if (self.ndknife.y < -maxY) {                                    //判断y进行knife的换位置
//                 // if (self.knifeX >= 200) {
//                 //     self.ndcut.active = false;
//                 // }
//                 if (this.numStep == 1) {
//                     self.moveFun.moveFun(this.numStep);                                     ////////////////////////////////切完移动
//                     this.numStep += 1;
//                     this.objPosition = this.moveFun.getPosition(this.numStep);                             //位置变化位置
//                     let actionBy = cc.moveTo(1, cc.p(self.objPosition.posX, self.objPosition.posY));
//                     self.ndcut.off(cc.Node.EventType.TOUCH_MOVE, this.cutFunc, this)
//                     self.ndknife.runAction(actionBy);                 //位置赋值
//                     knifeLine.clear(true);                                      //清除线条
//                 } else {
//                     if(this.numStep == 2){
//                         self.moveFun.moveFun(this.numStep);                                     ////////////////////////////////切完移动
//                         this.numStep += 1;
//                         this.objPosition = this.moveFun.getPosition(this.numStep);                             //位置变化位置
//                         let actionBy = cc.moveTo(1, cc.p(self.objPosition.posX, self.objPosition.posY));
//                         self.ndcut.off(cc.Node.EventType.TOUCH_MOVE, this.cutFunc, this)
//                         self.ndknife.runAction(actionBy);                 //位置赋值
//                         knifeLine.clear(true);
                        
//                     }else{
//                         this.ndcut.off(cc.Node.EventType.TOUCH_START, function (event) {
//                             cc.log("【触摸开始】")
//                             this.cutMove();
//                         }, this);  
//                     }
//                 }
//             }
//         }
//         self.ndcut.on(cc.Node.EventType.TOUCH_MOVE, this.cutFunc, this)
//     },

// });