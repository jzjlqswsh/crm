cc.Class({
    extends: cc.Component,

    properties: {
        lineSprite: {
            default: null,
            type: cc.Sprite
        },
        textDate: {
          default: null,
          type: cc.Label
        },
        textRate: {
          default: null,
          type: cc.Label
        },
        textNode: {
          default: null,
          type: cc.Label
        },
        dateNum : 12,
        rateNum : 7,
        rateSpace: 0.5,

        beginX : 0,
        beginY : 0,
        oneWidth: 32,
        oneHeight: 26,
    },

    onLoad () {},

    start () {
        this._badText = this.node.getChildByName("node_show").getChildByName("lable_bad").getComponent(cc.Label);
        this._normalText = this.node.getChildByName("node_show").getChildByName("lable_biyao").getComponent(cc.Label);
        this._badText.string = "0.00%";
        this._normalText.string = "0.00%";
        // cc.log(this._badText);
        this._showNode = new cc.Node('showNode');
        this.node.addChild(this._showNode);
        this.creatTitle();
        // this.creatLine();
        // this.creatInfo("bad");
        var baseNode = this.node.getChildByName("node_topInofBox")
        var editBox = baseNode.getChildByName("editbox").getComponent(cc.EditBox);
        this._lineEditBox = editBox;
        display.addChooseText(editBox, "line");

        this._fromTimeLabel = this.node.getChildByName("node_time").getChildByName("editbox_from").getComponent(cc.EditBox);
        this._toTimeLabel = this.node.getChildByName("node_time").getChildByName("editbox_to").getComponent(cc.EditBox);
        this._fromTimeLabel.node.on("editing-did-began",this.beginEditFromTime, this);
        this._toTimeLabel.node.on("editing-did-began",this.beginEditToTime, this);

    },

    beginEditFromTime(event){
        //弹出日历
        var self = this;
        function chooseTime(time){
            self.chooseFromTime(time)
        }
        this.createCalendar(chooseTime)
    },

    beginEditToTime(event){
        var self = this;
        function chooseTime(time){
            self.chooseToTime(time)
        }
        this.createCalendar(chooseTime)
    },

    createCalendar(fun){
        var self = this;
        cc.loader.loadRes("calendarNode", function (err, prefab) {
            var node = cc.instantiate(prefab);
            self.node.parent.addChild(node);
            var calendar = node.getChildByName(`calendar`).getComponent(require("Calendar"));
            calendar.setCallBackFun(fun)
            var display = require("display");
            display.addCloseShiled(node,function(){
                node.destroy();
            });
        });
    },

    chooseFromTime(time){
        var date = new Date();
        date.setTime(time * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        this._fromYear = year;
        this._fromMonth = date.getMonth();
        if(month < 10){month = "0" + month;}
        this._fromTimeLabel.string = year + '' + month;
        this._fromTime = time;
    },

    chooseToTime(time){
        var date = new Date();
        date.setTime(time * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        this._toYear = year;
        this._toMonth = date.getMonth();
        if(month < 10){month = "0" + month;}
        this._toTimeLabel.string = year + '' + month;
        this._toTime = time;

    },

    cleanView(){
        this._badText.string = "";
        this._normalText.string = "";
        this._showNode.removeAllChild();
    },

    initWithData(data){
        this.creatInfo(data);
    },

    getPosByData(num, dayIndex){
        var posX = this.beginX + dayIndex * this.oneWidth
        var posY = this.beginY + num/this.rateSpace * this.oneHeight
        return cc.p(posX, posY);
    },

    creatTitle(){
        var beginX = this.textRate.node.width + 20;
        var beginY = this.textDate.node.height + 10;
        this.beginX = beginX + this.textDate.node.width/2;
        this.beginY = beginY + this.textRate.node.height/2;

        for (var i = 0; i < this.rateNum; i++) {
            var text = cc.instantiate(this.textRate.node);
            text.active = true;
            text.y = beginY + text.height/2 + i * this.oneHeight;
            this._showNode.addChild(text);
            var str = CommonUtil.getFloltStr(i * this.rateSpace, 2) + '%'
            text.getComponent(cc.Label).string = str;
        }
        for (var i = 0; i < this.dateNum; i++) {
            var text = cc.instantiate(this.textDate.node);
            text.active = true;
            text.x = beginX + text.width/2 + i * this.oneWidth;
            this._showNode.addChild(text);
            text.getComponent(cc.Label).string = i+1;
        }
        var line = cc.instantiate(this.lineSprite.node);
        line.scaleY = 0.5;
        line.active = true;
        line.opacity = 50;
        line.color = new cc.Color(0,0,0);
        line.height = 1;
        this._showNode.addChild(line);
        line.y = this.beginY;
        line.x = this.beginX;
        line.rotation = -90;
        line.width = this.oneHeight * (this.rateNum -1);
        for (var i = 0; i < this.rateNum; i++) {
            var line = cc.instantiate(this.lineSprite.node);
            line.scaleY = 0.5;
            line.active = true;
            line.opacity = 50;
            line.color = new cc.Color(0,0,0);
            this._showNode.addChild(line);
            line.y = this.beginY + i * this.oneHeight;
            line.x = this.beginX;
            line.width = this.oneWidth * (this.dateNum -1);
        }
    },

    creatInfo(type, data){
        var color = new cc.Color(52,135,238);
        if(type == 'bad'){
            color = new cc.Color(255,50,50);
        }
        var data = [
            0.5,0.1,0.12,2.2,1.9,1.3,0.2,0.1,0.12,2.2,1.9,1.3
        ]
        var beforePos = null;
        for (var i = 0; i < data.length; i++) {
            var pos = this.getPosByData(data[i], i);

            var text = cc.instantiate(this.textNode.node);
            text.active = true;
            text.x = pos.x;
            text.y = pos.y + 10;
            this._showNode.addChild(text);
            var str = CommonUtil.getFloltStr(data[i], 2) + '%'
            text.getComponent(cc.Label).string = str;

            if(beforePos){
                var line = cc.instantiate(this.lineSprite.node);
                line.color = color;
                line.scaleY = 0.5;
                line.active = true;
                this._showNode.addChild(line);
                var xdiff = pos.x - beforePos.x;
                var ydiff = pos.y - beforePos.y;
                var ang = Math.atan2(ydiff, xdiff);
                var rotation = -1 * ang/Math.PI * 180;
                cc.log(rotation);
                // rotation = -30;
                line.rotation = rotation;
                line.setPosition(beforePos);
                line.width = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
            }
            beforePos = pos;
        }
    },

    updateByData(data){
        var info = data.info.data;
        if(info.length > 0){

        }
        var normalNum = 0;
        var goodNum = 0;
        var badNum = 0;
        for (var i = 0; i < info.length; i++) {
            if(info[i].quFen == "normal"){
                normalNum += Number(info[i].total);
            }else if(info[i].quFen == "good"){
                goodNum += Number(info[i].total);
            }else if(info[i].quFen == "bad"){
                badNum += Number(info[i].total);
            }
        }
        this._badText.string = "0.00%";
        this._normalText.string = "0.00%";
    },

    findDada(){
        //获取统计
        if(this._lineEditBox.string.length <= 0){
            return;
        }
        if(!this._fromTime || !this._toTime){
            return;
        }
        var params = {};
        params.line = this._lineEditBox.string;
        if(this._fromYear == this._toYear && this._fromMonth == this._toMonth){
            params.time_type = "day";
            var date = new Date();
            date.setFullYear(Number(this._fromYear));
            date.setMonth(Number(this._fromMonth));
            date.setDate(Number(1));
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            params.time_from = Math.floor(date.valueOf()/1000);
            var endDay = CommonUtil.getMonthsDay(this._fromYear,this._fromMonth);
            date.setDate(Number(endDay));
            params.time_to = Math.floor(date.valueOf()/1000);
        }else{
            params.time_type = "month";
            var date = new Date();
            date.setFullYear(Number(this._fromYear));
            date.setMonth(Number(this._fromMonth));
            date.setDate(Number(1));
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            params.time_from = Math.floor(date.valueOf()/1000);
            var endDay = CommonUtil.getMonthsDay(this._toYear,this._toMonth);
            date.setFullYear(Number(this._toYear));
            date.setMonth(Number(this._toMonth));
            date.setDate(Number(endDay));
            params.time_to = Math.floor(date.valueOf()/1000);
        }
        var self = this;
        Servers.requestGetStatistic(params,function(data){
            self.updateByData(data);
        });
    },

    // update (dt) {},
});
