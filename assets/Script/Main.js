cc.Class({
    extends: cc.Component,

    properties: {
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

        }
    }
});