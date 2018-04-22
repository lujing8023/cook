

cc.Class({
    extends: cc.Component,

    properties: {
        nd1         :       cc.Node,
        nd2         :       cc.Node,
        nd3         :       cc.Node,
    },
    moveFun:function(numStep){
        // this.getPosition();
        if(numStep == 1){
            let action = cc.moveBy(0.6,cc.p(-100, 0));
            this.nd1.runAction(action);
        }else{
            if(numStep == 2){
                let action = cc.moveBy(0.6,cc.p(-50, 0));
                this.nd2.runAction(action);
            }else{
                // let action = cc.moveBy(0.6,cc.p(-100, 0));
                // this.nd3.runAction
            }
        }

    },

    getPosition:function(numStep){
        if(numStep == 1){
            let nd1PosX = this.nd1.getPosition().x + this.nd1.width/2;
            let nd1PosY = this.nd1.getPosition().y + this.nd1.height/2;
            cc.log("nd1PosX",nd1PosX);
            cc.log("nd1PosY",nd1PosY);
            this.objPosition.posX = nd1PosX;
            this.objPosition.posY = nd1PosY;
            return this.objPosition;
        }else{
            if(numStep == 2){
                let nd2PosX = this.nd2.getPosition().x + this.nd2.width/2;
                let nd2PosY = this.nd2.getPosition().y + this.nd2.height/2;
                cc.log("nd1Pos",nd2PosX);
                this.objPosition.posX = nd2PosX;
                this.objPosition.posY = nd2PosY;
                return this.objPosition;
            }else{
                let nd3PosX = this.nd3.getPosition().x + this.nd3.width/2;
                let nd3PosY = this.nd3.getPosition().y + this.nd3.height/2;
                cc.log("nd1Pos",nd3PosX);
                this.objPosition.posX = nd3PosX;
                this.objPosition.posY = nd3PosY;
                return this.objPosition;
            }
        }
        
    },
    
});
