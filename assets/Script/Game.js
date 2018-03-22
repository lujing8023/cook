cc.Class({
    extends: cc.Component,

    properties: {
        ndChoose        : cc.Node,
        ndbread         : cc.Node,
        ndP             : cc.Node,
        ndBox           : cc.Node,
        ndListPar       : cc.Node,
        ndList          : cc.Node,
        ndListParTwo    : cc.Node,
        ndListTwo       : cc.Node,
        numRem          : 0,
        numChoose       : "1",
        picFram: {
            type: cc.SpriteFrame,
            default: [],
        }
    },
    onLoad: function () {
        this.upUi();
        this.ndP.active = false;
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
                this.checkPic()
                
                break;
        }
    },
    checkPic: function () {
        switch (this.numChoose) {
            case "1":
                let bread      = this.ndChoose.getChildByName("bread");
                let breadFrame = bread.getComponent(cc.Sprite).spriteFrame;
                if(breadFrame == null){
                    cc.log("..............")
                }else{
                    this.changeList();
                }
                break;
        }
    },
    changeList: function () {
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
    upUi: function () {
        this.numRem = 1;
        cc.log(this.picFram.length)
        _.times(this.picFram.length, (i) => {
            let node = cc.instantiate(this.ndP);
            node.active = true;
            node.getComponent(cc.Sprite).spriteFrame = this.picFram[i];
            node.name = i + " ";
            this.ndList.addChild(node);
        })
    },
    destroyFunc: function () {
        while (this.ndList.children.length > 0) {
            this.ndList.children[0].removeFromParent()
        }
    },
    eventTarget: function (event) {
        let eventName = event.target.parent
        this.addPicture(eventName)

    },
    addPicture:function(eventName){
        this.ndChoose.getChildByName("bread").getComponent(cc.Sprite).spriteFrame = eventName.getComponent(cc.Sprite).spriteFrame
        
    }

});