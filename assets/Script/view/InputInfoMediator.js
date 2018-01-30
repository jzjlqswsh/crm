
cc.Class({
    extends: cc.Component,

    properties: {
        timeEditboxViewArr:{
            default: {},
        },
        currentEditBox: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        display.addCloseShiled(this.node,function(){
            self.node.active = false;
        });
        this.cleanView(true);
    },

    start () {
        
    },

    clickClose(){
        this.node.active = false;
    },

    cleanView(isInit){
        var self = this;
        for (var i = 1; i <= 12; i++) {
            var name = "node_topInofBox_" + i;
            var baseNode = this.node.getChildByName(name);
            var label = baseNode.getChildByName("label").getComponent(cc.Label);
            label.string = productConfig.propertyList[i-1].name
            var editBox = baseNode.getChildByName("editbox").getComponent(cc.EditBox);
            editBox.string = "";
            var id = productConfig.propertyList[i-1].id;
            editBox.tag = i-1;
            if(isInit){
                display.addChooseText(editBox, id);  
            }
        }   
        var timeEditboxArr = ["editbox_from_year","editbox_from_month","editbox_from_day"]       
        if(Object.keys(this.timeEditboxViewArr).length > 0){
            for(var editBoxName in this.timeEditboxViewArr){
                this.timeEditboxViewArr[editBoxName].string = "";
            }
        }else{
            var timeNode = this.node.getChildByName("node_time");
            for (var i = 0; i < timeEditboxArr.length; i++) {
                var name = timeEditboxArr[i];
                this.timeEditboxViewArr[name] = timeNode.getChildByName(name).getComponent(cc.EditBox);
                this.timeEditboxViewArr[name].string = "";
                this.timeEditboxViewArr[name].node.on("editing-did-began",this.beginEditFromTime, this);
            }
        }  
    },

    clickSave(){
        var params = {};
        params.tbName = "bad_record";
        params.conent = {};
        for (var i = 1; i <= 12; i++) {
            var name = "node_topInofBox_" + i;
            var baseNode = this.node.getChildByName(name);
            var editBox = baseNode.getChildByName("editbox").getComponent(cc.EditBox);
            params.conent[window.productConfig.propertyList[i-1].id] = editBox.string;
            if(window.productConfig.propertyList[i-1].id == "quFen"){
                var str = productConfig.quFenDesc[editBox.string];
                if(!str){
                    cc.log("区分填写错误!");
                    return;
                }
                params.conent[window.productConfig.propertyList[i-1].id] = str;   
            }
        }
        // 生产日期
        var date = new Date();
        date.setFullYear(Number(this.timeEditboxViewArr["editbox_from_year"].string));
        date.setMonth(Number(this.timeEditboxViewArr["editbox_from_month"].string) - 1);
        date.setDate(Number(this.timeEditboxViewArr["editbox_from_day"].string));
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        params.conent.prduct_time = Math.floor(date.valueOf()/1000);
        var self = this;
        Servers.requestAddData(params,function(){
            display.showTips("数据添加成功！");
            self.node.active = false;
        });
    },

    clickReset(){
        this.cleanView();
    },

    clickAddContent(){
        var tag = 10;
        var name = "node_topInofBox_" + tag;
        var baseNode = this.node.getChildByName(name);
        var editBox = baseNode.getChildByName("editbox").getComponent(cc.EditBox);
        var str = editBox.string;
        if(str.length == 0){
            return;
        }
        var params = {};
        params.tbName = tableNames.the_content;
        params.conent = {};
        params.conent["content"] = str;
        Servers.requestAddData(params,function(){
            productConfig.addSelectInfoByName("content", str);
        });
    },

    clickAddReason(){
        var tag = 11;
        var name = "node_topInofBox_" + tag;
        var baseNode = this.node.getChildByName(name);
        var editBox = baseNode.getChildByName("editbox").getComponent(cc.EditBox);
        var str = editBox.string;
        if(str.length == 0){
            return;
        }
        var params = {};
        params.tbName = tableNames.the_reason;
        params.conent = {};
        params.conent["content"] = str;
        Servers.requestAddData(params,function(){
            productConfig.addSelectInfoByName("reason", str);
        });
    },

    beginEditFromTime(event){
        //弹出日历
        var self = this;
        function chooseTime(time){
            self.chooseFromTime(time)
        }
        this.createCalendar(chooseTime)
    },

    chooseFromTime(time){
        var date = new Date();
        date.setTime(time * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        this.timeEditboxViewArr["editbox_from_year"].string = year;
        this.timeEditboxViewArr["editbox_from_month"].string = month;
        this.timeEditboxViewArr["editbox_from_day"].string = day;
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

});
