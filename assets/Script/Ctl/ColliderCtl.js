
cc.Class({
    extends: cc.Component,

    properties: {

    },
    init:function(comGame){
        this._Target = comGame;
        cc.log("脚本",this._Target)
        return this;
    },
    onLoad:function(){
    },
    onCollisionEnter: function (other, self) {
        cc.log("碰撞")
        this._Target.touchOff();
        let moveToButton = cc.moveTo(0.3, cc.p(110, -43))
        let actionBy = cc.moveTo(0.3, cc.p(0, -300));
        this._Target.ndBreadButton.runAction(moveToButton);
        this.node.runAction(actionBy);
        this.scheduleOnce(function() {
            this._Target.ndBreadButton.runAction(cc.moveTo(0.1, cc.p(110, 62)));
            this.node.runAction(cc.moveTo(0.1, cc.p(0, -100)));
            this._Target.lbtixong.string = "面包烤好了，请进行下一步吧！"
            this._Target.ndChoose.children[2].getComponent(cc.Sprite).spriteFrame = this._Target.picFram[0];
        }, 2);
    },
});
