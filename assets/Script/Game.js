cc.Class({
    extends: cc.Component,

    properties: {
        ndP: cc.Node,
        ndBox: cc.Node,
        ndListPar: cc.Node,
        ndList: cc.Node,
        ndListParTwo: cc.Node,
        ndListTwo: cc.Node,
        numRem: 0,
        // //盘子图片资源
        picFram: {
            type: cc.SpriteFrame,
            default: [],
        }
    },
    onLoad: function() {
        this.upUi();
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
                if (this.numRem == 1) {
                    this.ndListPar.active = false;
                    this.ndListParTwo.active = true;
                    this.numRem = 2;
                    this.destroyFunc();
                } else {
                    this.ndListPar.active = true;
                    this.ndListParTwo.active = false;
                    this.numRem = 1;
                }
                break;
        }
    },
    upUi: function() {
        this.numRem = 1;
        _.times(this.picFram.length, (i) => {
            let node = cc.instantiate(this.ndP);
            node.SpriteFrame = i;
            // node.name = i
            this.ndList.addChild(node);
        })
    },
    destroyFunc: function() {
        if (this.numRem == 2) {
            while (this.ndListPar.children.length > 0) {
                this.ndList.children[0].removeFromParent()
            }
        } else {
            // _.times(this.ndListTwo.children.length,()=>{
            //     let node = cc.find("P",node)
            //     node.destroy();
            // })
        }
    },
});