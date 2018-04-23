
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
        let actionBy = cc.moveTo(1, cc.p(0, -300));
        this.node.runAction(actionBy);
        this.scheduleOnce(function() {
            // 这里的 this 指向 component
            this.node.runAction(cc.moveTo(1, cc.p(0, -100)));
        }, 2);
    },
});
