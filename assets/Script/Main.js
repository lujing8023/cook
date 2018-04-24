cc.Class({
    extends: cc.Component,

    properties: {
        ndBox   :   cc.Node,
        lbMes   :   cc.Label,
        ndClose :   cc.Node,
        ndOpen  :   cc.Node,
    },


    onLoad: function () {
        cc.director.preloadScene("Game", function () {
            cc.log("Next scene preloaded");
        });
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
                break;
            case "continue":
                this.ndOpen.active  = true;
                this.ndClose.active = false;
                break;
            // case "next":

        }
    }
});