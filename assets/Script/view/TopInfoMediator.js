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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        timeEditboxViewArr:{
            default: {},
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        var product = require("productConfig");
        for (var i = 1; i <= 7; i++) {
            var name = "node_topInofBox_" + i;
            var baseNode = this.node.getChildByName(name);
            var label = baseNode.getChildByName("label").getComponent(cc.Label);
            label.string = product.propertyList[i-1].name

            var editbox = baseNode.getChildByName("editbox").getComponent(cc.EditBox);
            display.addChooseText(editbox, product.propertyList[i-1].id);
        }               
        var timeNode = this.node.getChildByName("node_time");
        var timeEditboxArr = ["editbox_from_year","editbox_from_month","editbox_from_day",
                                "editbox_to_year","editbox_to_month","editbox_to_day",
                            ]
        // this.timeEditboxViewArr = {};
        for (var i = 0; i < timeEditboxArr.length; i++) {
            var name = timeEditboxArr[i];
            this.timeEditboxViewArr[name] = timeNode.getChildByName(name).getComponent(cc.EditBox);
            if(i < 3){
                this.timeEditboxViewArr[name].node.on("editing-did-began",this.beginEditFromTime, this);
                // this.timeEditboxViewArr[name].node.on("editing-did-ended",this.endEditFromTime, this);    
            }else{
                this.timeEditboxViewArr[name].node.on("editing-did-began",this.beginEditToTime, this);
                // this.timeEditboxViewArr[name].node.on("editing-did-ended",this.endEditToTime, this);
            }
            
        }

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
        var day = date.getDate();
        cc.log(this.timeEditboxViewArr);
        cc.log(this);
        this.timeEditboxViewArr["editbox_from_year"].string = year;
        this.timeEditboxViewArr["editbox_from_month"].string = month;
        this.timeEditboxViewArr["editbox_from_day"].string = day;
        this._fromTime = time;
    },

    chooseToTime(time){
        var date = new Date();
        date.setTime(time * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        this.timeEditboxViewArr["editbox_to_year"].string = year;
        this.timeEditboxViewArr["editbox_to_month"].string = month;
        this.timeEditboxViewArr["editbox_to_day"].string = day;
        this._toTime = time;
    },

    //获取数据
    getInfo(){
        var params = {};
        for (var i = 1; i <= 7; i++) {
            var name = "node_topInofBox_" + i;
            var baseNode = this.node.getChildByName(name);
            var label = baseNode.getChildByName("editbox").getComponent(cc.EditBox);
            if(label.string.length > 0){
                params[productConfig.propertyList[i-1].id] = label.string;
            }
        }
        return params;
    },

    // 查询
    clickFind(){
        var params = {};
        params.tbName = tableNames.bad_record;
        if(this._fromTime && this._toTime){
            params.time_from = this._fromTime;
            params.time_to = this._toTime;
        }
        params.orderby = "prduct_time";
        params.id_from = 0;
        params.num_display = 10;
        var info = this.getInfo();
        params.condition = info;
        var self = this;
        Servers.requestGetTable(params, function(data){
            var event = new cc.Event.EventCustom('findData', true);
            data.params = params;
            data.params.condition = info;
            cc.log(data.params,"data.params");
            event.setUserData(data);
            self.node.dispatchEvent(event);
        });
    },
    // 写入
    clickWrite(){
        var event = new cc.Event.EventCustom('inputData', true);
        this.node.dispatchEvent(event);
    },

    // 导出
    clickExport(){
        var params = {};
        params.tbName = tableNames.bad_record;
        if(this._fromTime && this._toTime){
            params.time_from = this._fromTime;
            params.time_to = this._toTime;
        }
        params.orderby = "prduct_time";
        params.condition = this.getInfo();
        Servers.requestExport(params);
    },
    // update (dt) {},
});
