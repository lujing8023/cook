cc.Class({
    extends: cc.Component,

    properties: {
        ndChoose: cc.Node,
        ndbread: cc.Node,
        nd_P: cc.Node,
        ndP: cc.Node,
        ndBox: cc.Node,
        ndListPar: cc.Node,
        ndList: cc.Node,
        ndListParTwo: cc.Node,
        ndListTwo: cc.Node,
        numRem: 0,
        numChoose: "1",

        picFram: {
            type: cc.SpriteFrame,
            default: [],
        },

        picBreadFram: {
            type: cc.SpriteFrame,
            default: [],
        },
    },
    onLoad: function () {
        //picFramCtl
        this.picArr = [this.picFram, this.picBreadFram];
        this.upUi();
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
        if(this.numRem == 3 || this.numRem == 4){
            if(this.numRem == 3){
                this.ndListParTwo.active = false;
                this.destroyFunc();
                // let ndHotBread = 
                cc.log("现在是烤面包阶段")

            }else{

                cc.log("现在是选果酱阶段")

            }
        }else{
            if (this.numRem % 2 == 1) {
                this.destroyFunc();
                this.ndListPar.active = true;
                this.ndListParTwo.active = false;
                this.upDataPic();
            } else {
                // this.numRem += 1;
                this.destroyFunc();
                this.ndListPar.active = false;
                this.ndListParTwo.active = true;
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
    }

});