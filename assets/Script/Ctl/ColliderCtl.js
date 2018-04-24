
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
        let actionBy = cc.moveTo(0.3, cc.p(0, -300));
        this.node.runAction(actionBy);
        this.scheduleOnce(function() {
            
            this.node.runAction(cc.moveTo(0.4, cc.p(0, -100)));
            this._Target.ndChoose.children[2].getComponent(cc.Sprite).spriteFrame = this._Target.picFram[0];
        }, 2);
    },
});
