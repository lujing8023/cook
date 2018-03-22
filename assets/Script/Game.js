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
    onLoad: function() {
        this.upUi();
        this.ndP.active = false;
    },
    onButtonClick: function(event, cb) {
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
                this.checkPic()
                break;
        }
    },
    checkPic: function() {
        let ndName = this.ndChoose.getChildByName(this.numChoose)
        let ndSpri = ndName.getComponent(cc.Sprite).spriteFrame;
        if (this.numChoose == ndName.name) {
            if (ndSpri == null) {
                cc.log("..............")
            } else {
                this.changeList();
                this.numChoose = this.numChoose - 0 + 1 + "";
                cc.log("numChoose", this.numChoose);
            }
        }
    },
    changeList: function() {
        if (this.numRem == 1) {
            this.numRem = 2;
            this.destroyFunc();
            this.ndListPar.active = false;
            this.ndListParTwo.active = true;
        } else {
            this.numRem = 1;
            this.ndListPar.active = true;
            this.ndListParTwo.active = false;
        }
    },
    upUi: function() {
        this.numRem = 1;
        _.times(this.picFram.length, (i) => {
            let node = cc.instantiate(this.ndP);
            node.active = true;
            node.getComponent(cc.Sprite).spriteFrame = this.picFram[i];
            node.name = i + " ";
            this.ndList.addChild(node);
        })
    },
    upDataPic: function() {
        let numBread = this.picBreadFram.length
        _.times(this.picFram.length, (i) => {
            let node = cc.instantiate(this.nd_P);
            node.active = true;
            node.getComponent(cc.Sprite).spriteFrame = this.picFram[i];
            node.name = i + " ";
            this.ndList.addChild(node);
        })
    },
    destroyFunc: function() {
        while (this.ndList.children.length > 0) {
            this.ndList.children[0].removeFromParent();
        }
    },
    eventTarget: function(event) {
        let ndTarget = event.target.parent;
        this.addPicture(ndTarget);
    },
    addPicture: function(ndTarget) {
        this.ndChoose.getChildByName(this.numChoose).getComponent(cc.Sprite).spriteFrame = ndTarget.getComponent(cc.Sprite).spriteFrame;
    }

});