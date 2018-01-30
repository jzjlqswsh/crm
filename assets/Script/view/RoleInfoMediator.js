// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        labelName: {
            default: null,
            type: cc.Label
        },
        labelTarget: {
            default: null,
            type: cc.Label
        },
        currentContent: {
            default: "bad_data",
        },
        currentLable: {
            default: null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        var config = window.productConfig.operation;
        var posX = -84;
        var posY = 140;
        var textHeight = 30;
        for (var i = 0; i < config.length; i++) {
            var text = cc.instantiate(this.labelTarget.node);
            text.active = true;
            this.node.addChild(text,0);
            text.x = posX;
            text.y = posY;
            posY -= textHeight;
            text.getComponent(cc.Label).string = "+" + config[i].name;
            text.on('mousedown', function ( event ) {
              this.clickTitle(event,i);
            },this);
            var sonArr = config[i].son;
            if(sonArr){
                for (var j = 0; j < sonArr.length; j++) {
                    var text = cc.instantiate(this.labelTarget.node);
                    text.active = true;
                    this.node.addChild(text,0);
                    text.x = posX + 20;
                    text.y = posY;
                    posY -= textHeight;
                    text.getComponent(cc.Label).string = "-" + sonArr[j].name;
                    text.tag = sonArr[j].type;
                    text.on('mousedown', this.clickContent, this);
                    if(this.currentContent == sonArr[j].type){
                        text.color = new cc.Color(50,50,255);
                        this.currentLable = text;
                    }
                }
            }
        }
    },

    clickTitle(event, index){

    },

    clickContent(event){
        if(this.currentContent == event.currentTarget.tag){
            return;
        }
        this.currentContent = event.currentTarget.tag;
        if(this.currentLable){
            this.currentLable.color = new cc.Color(0, 0, 0);
        }
        this.currentLable = event.currentTarget;
        this.currentLable.color = new cc.Color(50,50,255);
        var event = new cc.Event.EventCustom('changeTable', true);
        event.setUserData(this.currentContent);
        this.node.dispatchEvent(event);
    },

    updateView(data){
        this.labelName.string = ModelManager.user.nickName;
    },

    // update (dt) {},
});
