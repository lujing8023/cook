cc.Class({
    extends: cc.Component,

    properties: {


    },


    onLoad: function () {

    },

    onButtonClick: function (event, cb) {
        switch (cb) {
            case "sand":
                cc.director.loadScene("Game");
                break;
            case "ham":
                cc.director.loadScene("Game");
                break;
            case "hot":
                cc.director.loadScene("Game");
                break;
            // case "next":

        }
    }
});