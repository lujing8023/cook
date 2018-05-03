

cc.Class({
    extends: cc.Component,

    properties: {
        ndList  :   cc.Node,
        ndItem  :   cc.Node,
        ndBox   :   cc.Node,
        ndSp1   :   cc.Node,
        ndSp2   :   cc.Node,
        ndSp3   :   cc.Node,
        ndBoxBg :   cc.Node,
        lbMes   :   cc.Label,
        picFram: {
            type: cc.SpriteFrame,
            default: [],
        },

        picBreadFram: {
            type: cc.SpriteFrame,
            default: [],
        },
        picVegetableFram:{
            type: cc.SpriteFrame,
            default: [],
        },
        picMetFram:{
            type: cc.SpriteFrame,
            default: [],
        },
    },
    onLoad:function(){
        cc.director.preloadScene("Game", function () {
            cc.log("Next scene preloaded");
        });
        this.dataObj()
    },
    onButtonClick:function(event, cb){
        switch( cb ){
            case "guan":
            this.ndBox.active = true;
            this.ndBoxBg.active = true;
            this.task = event.target.name - 0;
            cc.log("【数组】",this.dataGuan[this.task])
            this.upTask(this.task);
            this.lbMes.string = "这是本关的目标哦~"
            break;
            case "sure":
            this.ndBox.active = false;
            this.ndBoxBg.active = false;
            let saveArr = this.dataGuan[this.task]
            cc.log("【是否有效】",saveArr)
            let savetask = JSON.stringify(saveArr);
            cc.sys.localStorage.setItem("task", savetask);
            cc.director.loadScene("Game");
            case "cancel":
            this.ndBox.active = false;
            this.ndBoxBg.active = false;
            this.lbMes.string = "请选择一个关卡吧！"
        }
    },
    upTask:function(task){
        let task1 = this.dataGuan[task];
        this.ndSp1.getComponent(cc.Sprite).spriteFrame = this.picFram[task1[0]];
        this.ndSp2.getComponent(cc.Sprite).spriteFrame = this.picBreadFram[task1[1]];
        this.ndSp3.getComponent(cc.Sprite).spriteFrame = this.picVegetableFram[task1[2]];
    },
    dataObj:function(){
        this.dataGuan = {
            "1":[1,1,1,1],
            "2":[2,1,3,5],
            "3":[3,5,6,2],
            "4":[2,4,10,5],
            "5":[5,3,4,1],
            "6":[6,5,2,5],
            "7":[2,3,7,9],
            "8":[1,6,1,0],
            "9":[4,7,4,1],
            "10":[5,1,7,0],
            "11":[6,5,0,7],
            "12":[7,9,1,0],
            "13":[6,1,3,4],
            "14":[1,8,9,0],
            "15":[3,9,1,5],
        }
    }
});
