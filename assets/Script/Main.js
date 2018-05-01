cc.Class({
    extends: cc.Component,

    properties: {
        ndSand  :   cc.Node,
        ndHam   :   cc.Node,
        ndHot   :   cc.Node,
        ndBin   :   cc.Node,
        ndBox   :   cc.Node,
        lbMes   :   cc.Label,
        ndClose :   cc.Node,
        ndOpen  :   cc.Node,
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
    },


    onLoad: function () {
        cc.director.preloadScene("Game", function () {
            cc.log("Next scene preloaded");
        });
        this.donghua();
        this.audio = cc.sys.localStorage.getItem("GameAudio", this.audio);
        if(this.audio == "true" || this.audio==null){
            this.ndOpen.active  = true;
            this.ndClose.active = false;
            this.play();
        }else{
            this.ndOpen.active  = false;
            this.ndClose.active = true;
            this.pause();
        }
    },
    play: function () {
        this.audioSource.play();
    },
    pause: function () {
        this.audioSource.pause();
    },
    onButtonClick: function (event, cb) {
        switch (cb) {
            case "sand":
                cc.director.loadScene("Game");
                break;
            case "ham":
                this.ndBox.active = true;
                break;
            case "hot":
                this.ndBox.active = true;
                break;
            case "sure":
                this.ndBox.active = false;
                break;
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
            // case "next":
            case "bin":
            cc.director.loadScene("Bin");
            break;

        }
    },
    donghua:function(){
        let actionBy  = cc.rotateTo(2, -20);
        let actionBy2 = cc.rotateTo(2, 20);
        let plan3 = cc.repeat(cc.sequence(actionBy, actionBy2), 10000);
        this.ndSand.runAction(plan3);
        let actionBy3  = cc.scaleTo(2, 1.1);
        let actionBy4 = cc.scaleTo(2, 1);
        let plan4 = cc.repeat(cc.sequence(actionBy3, actionBy4), 10000);
        this.ndBin.runAction(plan4);
    }
});