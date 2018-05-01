
cc.Class({
    extends: cc.Component,

    properties: {
        ndContent       :   cc.Node,
        lbMes           :   cc.Label,
        nd1             :   cc.Node,
        ndClose         :   cc.Node,
        ndOpen          :   cc.Node,
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
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
        let local = cc.sys.localStorage.getItem("arr", this.Arr);
        this.arrPic = JSON.parse(local);
        this.Audiofunc();
        this.upPic();
    },
    upPic:function(){
        if(this.arrPic == undefined){
            this.lbMes.string = "你还没有制作出什么东西";
        }else{
            this.objArrNum = Object.keys(this.arrPic);
            cc.log('【对象长度数组】',this.objArrNum);
            _.times(this.objArrNum.length , (i)=>{
                cc.log('【对象长度数组】',this.objArrNum);
                let node = cc.instantiate(this.nd1);
                node.active = true;
                let picArr = this.arrPic[i];
                node.getChildByName("pan").getComponent(cc.Sprite).spriteFrame   = this.picFram[picArr[0]];
                node.getChildByName("bread").getComponent(cc.Sprite).spriteFrame = this.picBreadFram[picArr[1]];
                node.getChildByName("vege").getComponent(cc.Sprite).spriteFrame  = this.picVegetableFram[picArr[2]];
                node.getChildByName("met").getComponent(cc.Sprite).spriteFrame   = this.picMetFram[picArr[3]];
                node.getChildByName("upbread").getComponent(cc.Sprite).spriteFrame  = node.getChildByName("bread").getComponent(cc.Sprite).spriteFrame;
                this.ndContent.addChild(node);
            })
            // cc.log("【图片数组】",this.arrPic);


        }
    },
    Audiofunc:function(){
        this.audio = cc.sys.localStorage.getItem("GameAudio", this.audio);
        cc.log("this.audio",this.audio)
        if(this.audio == "true"){
            this.ndOpen.active  = true;
            this.ndClose.active = false;
            this.play();
        }else{
            this.ndOpen.active  = false;
            this.ndClose.active = true;
            this.pause();
            // JSON.
        }
    },
    play: function () {
        this.audioSource.play();
    },
    pause: function () {
        this.audioSource.pause();
    },
    upAudio:function(){
        this.audio = cc.sys.localStorage.getItem("GameAudio", this.audio);
        if(this.audio == "true"){
            this.ndOpen.active  = false;
            this.ndClose.active = true;
            this.play();
        }else{
            this.ndOpen.active  = true;
            this.ndClose.active = false;
            this.pause();
        }
    },
    backButton:function(){
        cc.director.loadScene("Main");
    },
    onButtonClik:function(event, cb){
        switch(cb){
            case "stop":
                    this.ndClose.active = true;
                    this.ndOpen.active  = false;
                    this.pause();
                    this.audio = false;
                    cc.sys.localStorage.setItem("GameAudio", this.audio);
                    break;
                case "continue":
                    this.ndClose.active = false;
                    this.ndOpen.active  = true;
                    this.play();
                    this.audio = true;
                    cc.sys.localStorage.setItem("GameAudio", this.audio);
                    break;
        }
    }
});
