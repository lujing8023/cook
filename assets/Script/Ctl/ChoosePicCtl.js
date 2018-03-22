
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    init : function( comGame ){
        this.target = comGame;
        return this ;
    },
    addPicture:function(node){
        this.target.ndChoose.getChildByName("panzi").getComponent(cc.Sprite).spriteFrame = node.getComponent(cc.Sprite).spriteFrame
        
    }
    
});
