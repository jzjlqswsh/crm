cc.Class({
    extends: cc.Component,

    properties: {
        lineSprite: {
            default: null,
            type: cc.Sprite
        },
        bgSprite: {
            default: null,
            type: cc.Sprite
        },
        textTarget: {
          default: null,
          type: cc.Label
        },
        guidWidth: {
          default: 80
        },
        guidHeight: {
          default: 30
        },
        guidNum: {
          default: 10
        },
        label_all: {
          default: null,
          type: cc.Label
        },
        label_before: {
          default: null,
          type: cc.Label
        },
        label_next: {
          default: null,
          type: cc.Label
        },
        label_page: {
          default: null,
          type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {
        this._showNode = new cc.Node('showNode');
        this.node.addChild(this._showNode);
        this.creatTitle();
        this.creatLine();

        this.label_before.node.on('touchend', this.clickBeforePage,this);
        this.label_next.node.on('touchend', this.clickNextPage,this);
    },

    initWithData(data){
        this._showNode.removeAllChildren()
        this.creatInfo(data);
    },

    clickBeforePage(){
        if(!this._nowPage){
            return;
        }
        if(this._nowPage <= 1){
            return;
        }
        this.getDataByPage(this._nowPage - 1);
    },

    clickNextPage(){
        if(!this._nowPage){
            return;
        }
        if(this._nowPage >= this._maxPage){
            return;
        }
        this.getDataByPage(this._nowPage + 1);
    },

    getDataByPage(page){
        var params = this._params;
        params.tbName = tableNames.bad_record;
        if(this._fromTime && this._toTime){
            params.time_from = this._fromTime;
            params.time_to = this._toTime;
        }
        params.orderby = "prduct_time";
        params.id_from = (page - 1) * this.guidNum;
        params.num_display = this.guidNum;
        var info = params.condition;
        var self = this;
        Servers.requestGetTable(params, function(data){
            data.params = params;
            data.params.condition = info;
            self.initWithData(data);
        });
    },

    creatTitle(){
        var titleList = window.productConfig.titleList_bad
        this.guidWidth = this.node.width/titleList.length;
        var bg = this.bgSprite.node;
        bg.active = true;
        bg.x = 0;
        bg.y = 0;
        bg.width = titleList.length * this.guidWidth;
        bg.height = this.guidHeight;
        for (var i = 0; i < titleList.length; i++) {
            var text = cc.instantiate(this.textTarget.node);
            text.active = true;
            this.node.addChild(text,0);
            text.x = i * this.guidWidth + 5;
            text.y = - this.guidHeight/2;
            text.getComponent(cc.Label).string = titleList[i].name;
        }
    },

    creatLine(){
        var titleList = window.productConfig.titleList_bad
        for (var i = 0; i <= titleList.length; i++) {
            var line = cc.instantiate(this.lineSprite.node);
            line.scaleY = 0.5;
            line.active = true;
            line.opacity = 100;
            line.color = new cc.Color(0,0,0);
            line.height = 1;
            this.node.addChild(line,1);
            line.y = 0;
            line.x = i * this.guidWidth;
            line.rotation = 90;
            line.width = this.guidHeight * (this.guidNum + 1);
        }

        for (var i = 0; i <= (this.guidNum + 1); i++) {
            var line = cc.instantiate(this.lineSprite.node);
            line.scaleY = 0.5;
            line.active = true;
            line.color = new cc.Color(0,0,0);
            line.opacity = 100;
            line.height = 1;
            this.node.addChild(line,1);
            line.y = - i * this.guidHeight;
            line.x = 0;
            line.width = this.guidWidth * titleList.length;
        }
    },

    creatInfo(data){
        this._params = data.params;
        var info = data.info.data;
        this.label_all.string = "共"+data.count + "条";
        this._maxPage = Math.ceil(Number(data.count)/this.guidNum);
        cc.log(data.params,"data.params");
        if(!data.params.id_from){
            this._nowPage = 1;
        }else{
            this._nowPage = Math.ceil(data.params.id_from/this.guidNum) + 1;
        }
        this.label_page.string = this._nowPage + "/" + this._maxPage + "页";
        var titleList = window.productConfig.titleList_bad
        for (var i = 0; i < info.length; i++) {
            for (var j = 0; j < titleList.length; j++) {
                var proName = titleList[j].id
                if(info[i][proName]){
                    var text = cc.instantiate(this.textTarget.node);
                    text.active = true;
                    this._showNode.addChild(text,0);
                    text.x = j * this.guidWidth + 5;
                    text.y = - this.guidHeight/2 - this.guidHeight * (i + 1);
                    var showText = info[i][proName];
                    if(proName == 'prduct_time' || proName == 'edit_time'){
                        var newDate = new Date();
                        newDate.setTime(Number(showText) * 1000);
                        showText = newDate.toLocaleDateString();
                    }
                    text.getComponent(cc.Label).string = showText;
                }
            }
        }
    },
    // update (dt) {},
});
