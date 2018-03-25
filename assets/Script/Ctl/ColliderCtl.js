
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
        this.node.setPosition(0,-213);
        this._Target.touchOff();
    },
});
