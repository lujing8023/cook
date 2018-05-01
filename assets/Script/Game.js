cc.Class({
    extends: cc.Component,

    properties: {
        ndNextBtn2      :   cc.Node,
        lbtixong        :   cc.Label,
        ndPeople        :   cc.Node,
        ndMes           :   cc.Node,
        ndLastMes       :   cc.Node,
        ndCancel        :   cc.Node,
        ndSure          :   cc.Node,
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
        ndClose         :   cc.Node,
        ndOpen          :   cc.Node,
        picJamOne       :   cc.spriteFrame,
        ndBreadUp       :   cc.Node,
        ndNextBtn       :   cc.Node,
        ndBackBtn       :   cc.Node,
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
        lbMes           :   cc.Label,
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
        picJamPic:{
            type: cc.SpriteFrame,
            default: [],
        },
        //添加类型
        addType      : 1,
        //刀移动
        numStep      : 1,
        // arrName      :-1,
        // this.obj = {};
    },
    //音乐
    play: function () {
        this.audioSource.play();
    },
    pause: function () {
        this.audioSource.pause();
    },
    upAudio:function(){
        this.audio = cc.sys.localStorage.getItem("GameAudio", this.audio);
        if(this.audio == "true"){
            this.ndOpen.active  = false;
            this.ndClose.active = true;
            this.play();
        }else{
            this.ndOpen.active  = true;
            this.ndClose.active = false;
            this.pause();
        }
    },
    onLoad: function () {
        this.arrName = cc.sys.localStorage.getItem("arrNum");
        if(this.arrName == undefined){
            this.arrName = -1;
            this.obj = {};
        }else{
            this.objarr = cc.sys.localStorage.getItem("arr");
            this.obj = JSON.parse(this.objarr);
        }
        //记录数组名字数字
        //创建存储数组对象
        //创建保存的数组
        this.Arr = [ null , null , null , null];
        this.panNum   = 1;
        this.breadNum = 1;
        this.jamNum   = 1;
        this.vegeNum  = 1;
        this.MetNum   = 1;
        //mask脚本引进
        this._comMaskCtl = this.ndBread.getComponent("maskCtl").initCom(this);
        cc.director.preloadScene("Main", function () {
            cc.log("Next scene preloaded");
        });
        //音乐
        this.upAudio();
        //引入预设的类
        this._compbFun = this.node.addComponent("pbCtl");
        //关闭面包节点和刮刮乐按钮
        this.ndBread.active = false;
        // this.rsultLabel.node.active = false;
        this.mask.node.active = false;
        this.colliderCtl = this.ndBread.getComponent("ColliderCtl").init(this);
        //picFramCtl
        this.picArr = [this.picFram, this.picBreadFram ,null , null , null , null , this.picVegetableFram , null , this.picMetFram , null , null];
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
                // cc.log("选第一种果酱")
                this.ndJameBottle.active = true;
                this.ndJame.active       = false;
                this.mask.node.children[0].getComponent(cc.Sprite).spriteFrame = this.picJamPic[0];
                this.ndNextBtn.getComponent(cc.Button).interactable = true;
                this.lbtixong.string = "再点击下一步，进行涂抹果酱吧！"
                this.ndNextBtn2.active = false;
                break;
            case "jam2":
                // cc.log("选第二种果酱")
                this.ndJameBottle.active = true;
                this.ndJame.active       = false;
                this.mask.node.children[0].getComponent(cc.Sprite).spriteFrame = this.picJamPic[1];
                this.ndNextBtn.getComponent(cc.Button).interactable = true;
                this.lbtixong.string = "再点击下一步，进行涂抹果酱吧！"
                this.ndNextBtn2.active = false;
                break;
            case "next":
                this.checkPic();
                break;
            case "next2":
                let actionBy  = cc.rotateTo(0.1, -45);
                let actionBy2 = cc.rotateTo(0.1, 0);
                let plan3 = cc.repeat(cc.sequence(actionBy, actionBy2), 2);
                this.ndMes.runAction(plan3);
                break;    
            case "stop":
                this.ndClose.active = false;
                this.ndOpen.active  = true;
                this.pause();
                this.audio = false;
                cc.sys.localStorage.setItem("GameAudio", this.audio);
                break;
            case "continue":
                this.ndClose.active = true;
                this.ndOpen.active  = false;
                this.play();
                this.audio = true;
                cc.sys.localStorage.setItem("GameAudio", this.audio);
                break;
        }
    },
    checkPic: function () {
        //放置盘子的空节点
        let ndName = this.ndChoose.getChildByName(this.numChoose);
        //获取盘子空节点的图片渲染
        let ndSpri = ndName.getComponent(cc.Sprite).spriteFrame;
        if (ndSpri == null) {
            let actionBy  = cc.rotateTo(0.1, -45);
            let actionBy2 = cc.rotateTo(0.1, 0);
            let plan3 = cc.repeat(cc.sequence(actionBy, actionBy2), 2);
            this.ndMes.runAction(plan3);
            // this.ndMes.rotation = 0;
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
            this.lbtixong.string = "点击选一块你喜欢的面包呀（*^_^*）"
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
                    this.lbtixong.string = "烤面包咯~试着拖动面包到面包机里吧！"
                    }else{
                        // if(this.ndJame.active == false){
                            this.lbtixong.string = "选一个喜欢的果酱吧！"
                            // this.numRem += 1;
                            this.ndHotBread.active = false;
                            this.ndBread.setPosition(0 , 0)
                            this.ndJame.active = true;
                            if(this.ndJame.active == true){
                                this.ndNextBtn.getComponent(cc.Button).interactable = false;
                                this.ndNextBtn2.active = true;
                                this.ndNextBtn2.active = true;

                            }
                            this.touchOff();
                            cc.log("现在是选果酱阶段");//果酱已经出来
                            cc.log("【看一下两个数据】",this.numChoose , this.numRem)
                        // }

                }
                }else{
                    this.lbtixong.string = "开始涂抹面包吧！（记得涂满呦~）"
                    this.ndNextBtn2.active = true;
                    this.ndNextBtn.getComponent(cc.Button).interactable = false;
                    this._comMaskCtl.beginTouch();
                    // this.touchBegin()
                    this.ndBread.active = true;
                    // this.rsultLabel.node.active = true;
                    this.mask.node.active = true;
                    //this.numRem == 5
                    //进行涂抹面包阶段
                    this.ndJame.active = false;
                    this.numRem += 1;
                }
            }else{//步骤6
                if (this.numRem % 2 == 1) {
                    if(this.numRem == 9){
                        this.lbtixong.string = "选择一个喜欢的小肉吧！"
                        this.ndKnife.active = false;
                        this.ndNextBtn2.active = true;
                        this.ndNextBtn.getComponent(cc.Button).interactable = false;
                        
                        this.touchOff();
                        this.upKnife();
                        // this.ndZhenban.off(cc.Node.EventType.TOUCH_START, function (event) {
                        //     cc.log("【触摸开始】")
                        //     this.cutMove();
                        // }, this);
                        //变换第二种类型
                        this.addType = 2
                        cc.log("this.numRem什么阶段",this.numRem);
                        this.ndListPar.active = false;
                        this.ndListParTwo.active = true;
                        while (this.ndListTwo.children.length>0){
                            this.ndListTwo.children[0].removeFromParent()
                        }
                        this.upDataPic();
                    }else{
                        this.lbtixong.string = "请选一个你喜欢的蔬菜吧！"
                            this.ndNextBtn.getComponent(cc.Button).interactable = false;
                            this.ndNextBtn2.active = true;
                            this.touchOff();
                            this.upKnife();
                            this.ndZhenban.off(cc.Node.EventType.TOUCH_START, function (event) {
                                cc.log("【触摸开始】")
                                this.cutMove();
                            }, this);
                            this.addType = 2;
                            cc.log("this.numRem什么阶段",this.numRem);//this.nuRem == 7
                            this.ndListPar.active = true;
                            this.destroyFunc();
                            this.ndListParTwo.active = false;
                            this.upDataPic();
                    }
               
                }else{
                // this.numRem += 1;
                    if(this.numRem == 10){
                        this.ndZhenban.off(cc.Node.EventType.TOUCH_START, function (event) {
                            cc.log("【触摸开始】")
                            this.cutMove();
                        }, this);
                        //变换第二种类型
                        let name = this.arrName - 0 + 1 + "";
                        this.arrName = name - 0;
                        cc.sys.localStorage.setItem("arrNum", this.arrName);
                        this.obj[name] = this.Arr;
                        let saveArr = JSON.stringify(this.obj)
                        cc.sys.localStorage.setItem("arr", saveArr);
                        this.lbtixong.string = "好像有点丑，再接再厉！（*^_^*）"
                        this.ndChoose.getChildByName("1").active = true;
                        this.ndBread.active = true;
                        this.ndZhenban.active = false;
                        this.ndKnife.active = false;
                        this.ndListParTwo.active = false;
                        let metIns = cc.instantiate(this.ndChoose.getChildByName("6").children[0]);
                        // this.ndChoose.getChildByName("6").children[1].removeFromParent();
                        this.ndChoose.getChildByName("6").children[0].removeFromParent();
                        metIns.scale = 0.5;
                        this.ndBread.addChild(metIns);
                        let ndBreadUPIns = cc.instantiate(this.ndBreadUp);
                        ndBreadUPIns.children[0].getComponent(cc.Sprite).spriteFrame = this.ndBread.getComponent(cc.Sprite).spriteFrame
                        this.ndBread.addChild(ndBreadUPIns);
                        ndBreadUPIns.setPosition(0 , 50);
                        //最后显示完成
                        this.ndBread.setPosition(0 , 0);
                        this.ndChoose.children[0].setPosition(0 , 0);
                        this.ndLastMes.active = true;
                        this.ndPeople.active = true;
                        this.ndMes.active = true;
                        // this.ndBox.active = true;
                        // this.lbMes.string = "完成！";
                        // this.ndBox.setPosition(150 , 0);
                        this.ndNextBtn.active = false;
                        this.ndBackBtn.active = false;
                        this.ndCancel.active = false;
                        this.ndSure.setPosition( 0 , -120);
                    }else{
                        if(this.numRem == 8){
                        this.vegetableToham();
                        }else{
                            this.ndListParTwo.active = true;
                            this.destroyFunc();
                            this.ndListPar.active = false;
                            cc.log("active", this.ndListParTwo.active);
                            this.upDataPic();
                    }
                }

            }
            cc.log("【记录步骤的数字】",this.numRem)
        }
    },
    //最后按钮
    buttonLast:function(){
        cc.director.loadScene("Main")
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
        if(this.numRem == 7){
            this.ndZhenban.on(cc.Node.EventType.TOUCH_START, function (event) {
                cc.log("【触摸开始】")
                this.cutMove();
            }, this);
        }
    },
    //把切好的放入汉堡
    vegetableToham:function(){
        this.lbtixong.string = "我已经把蔬菜放好咯~请点击下一步吧！"
        this._comMaskCtl.onDestroy()
        this.mask.inverted = true;
        this.ndChoose.getChildByName("1").active = true;
        this.ndBread.active = true;
        this.ndZhenban.active = false;
        this.ndKnife.active = false;
        this.ndListPar.active = false;
        let vegetabalIns = cc.instantiate(this.ndChoose.getChildByName("6").children[0]);
        this.ndChoose.getChildByName("6").children[0].removeFromParent();
        vegetabalIns.scale = 0.5;
        this.ndBread.addChild(vegetabalIns);
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
    },
    eventTarget: function (event) {
        if(this.numRem == 1){
            cc.log("【进入选盘子记录盘子】")
            this.lbtixong.string = "选好了，就点击下一步吧！"
            let ndTarget = event.target.parent;
            let nam2 = ndTarget.name
            this.addPicture(ndTarget);
            this.panNum = nam2-0;
            cc.log("【选了第几个】",this.panNum);
            this.Arr[0] = this.panNum;
            cc.log("【数组】",this.Arr)
        }else{
            cc.log("【进入选面包记录面包】")
            this.lbtixong.string = "选好了，就点击下一步吧！"
            let ndTarget = event.target.parent;
            let nam2 = ndTarget.name
            this.addPicture(ndTarget);
            this.breadNum = nam2-0;
            this.Arr[1] = this.breadNum;
            cc.log("【数组】",this.Arr)
            cc.log("【选了第几个】",this.breadNum)
        }
    },
    eventTargetTwo:function(event){
        this.ndNextBtn2.active = false;
        this.lbtixong.string = "试着把小刀往下拉吧！有惊喜哦~"
        let ndName = event.target.parent.name - 0;
        this.ndNextBtn.getComponent(cc.Button).interactable = true;
        cc.log("【点击按钮后的获取按钮名字】",ndName);
        if(this.ndListParTwo.active == false){
            this.preNode = cc.instantiate(this.PbListCtl[ndName]);
            this.Arr[2] = ndName;
            cc.log("【数组】",this.Arr);
        }else{
            this.preNode = cc.instantiate(this.PbListMet[ndName]);
            this.Arr[3] = ndName;
            cc.log("【数组】",this.Arr);
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
    upTouch: function () {
        this.node.on('touchmove', (touch) => {
            let location = touch.getLocation();
            let post = this.ndChoose.convertToNodeSpaceAR(location)
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
    //刮刮卡
    
    //到移动画线
    fromClick:function(){
        this.ndKnife.active = true;
        this.numStep = 1;
        this.moveFun = this.preNode.getComponent("pbCtl");
        // moveFun.moveFun();
        this.objPosition = this.moveFun.getPosition(this.numStep);
        // this.ndcutLine.x   = moveFun.getPosition();
        this.ndKnife.setPosition(this.objPosition.posX, this.objPosition.posY);
    },
    
    cutMove: function () {
        var self = this;
        this.cutFunc = function (event) {
            self.knifeX = self.objPosition.posX;
            self.knifeY = self.ndKnife.y;
            self.firstPosition = self.objPosition.posY;
            var locationY = event.getDeltaY() < 0 ? event.getDeltaY() : 0; 
            self.knifeY += locationY;
            self.ndKnife.setPosition(self.knifeX, self.knifeY);
            let maxY = self.objPosition.posY
            if (self.ndKnife.y < -maxY) {                                   
                if (this.numStep == 1) {
                    self.moveFun.moveFun(this.numStep);
                    this.numStep += 1;
                    this.objPosition = this.moveFun.getPosition(this.numStep);                             
                    let actionBy = cc.moveTo(0.2, cc.p(self.objPosition.posX, self.objPosition.posY));
                    self.ndZhenban.off(cc.Node.EventType.TOUCH_MOVE, this.cutFunc, this)
                    self.ndKnife.runAction(actionBy);                 
                    // knifeLine.clear(true);                                     
                } else {
                    if(this.numStep == 2){
                        self.moveFun.moveFun(this.numStep);                                     
                        this.numStep += 1;
                        this.objPosition = this.moveFun.getPosition(this.numStep);                             
                        let actionBy = cc.moveTo(0.2, cc.p(self.objPosition.posX, self.objPosition.posY));
                        self.ndZhenban.off(cc.Node.EventType.TOUCH_MOVE, this.cutFunc, this)
                        self.ndKnife.runAction(actionBy);                  
                        this.ndKnife.active = false;
                    }else{
                        this.ndZhenban.off(cc.Node.EventType.TOUCH_START, function (event) {
                            cc.log("【触摸开始】")
                            this.cutMove();
                        }, this);  
                        // this.ndZhenban.off(cc.Node.EventType.TOUCH_START, function (event) {
                        //     cc.log("【触摸开始】")
                        //     this.cutMove();
                        // }, this); 
                    }
                }
            }
        }
        self.ndZhenban.on(cc.Node.EventType.TOUCH_MOVE, this.cutFunc, this)
    },
});
