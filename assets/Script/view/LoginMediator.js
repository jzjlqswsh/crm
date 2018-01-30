cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this._lableName = this.node.getChildByName("editbox_name").getComponent("cc.EditBox");
        this._lablePsw = this.node.getChildByName("editbox_password").getComponent("cc.EditBox");
        var user_name = cc.sys.localStorage.getItem("user_name");
        if(user_name){
            this._lableName.string = user_name;
        }
    },

    start () {

    },

    clickLogin(){
        var servers = require("Servers");
        var params = {};
        params.user_name = this._lableName.string
        params.psw = this._lablePsw.string
        var self = this;
        servers.requestLogin(params,function(data){
            data.nick = params.user_name;
            cc.sys.localStorage.setItem("user_name", params.user_name)
            var user = ModelManager.creatModel("UserModel",data);
            ModelManager.user = user;
            self.node.dispatchEvent( new cc.Event.EventCustom('loginSucceed', true));
        });

        // var data = productConfig.productName;
        // for (var i = 0; i < data.length; i++) {
        //     var params = {};
        //     params.tbName = "the_projectName";
        //     params.conent = data[i];
        //     servers.requestAddData(params);
        // }

        // var data = productConfig.productContent;
        // for (var i = 0; i < data.length; i++) {
        //     var params = {};
        //     params.tbName = "the_content";
        //     params.conent = data[i];
        //     servers.requestAddData(params);
        // }

        // data = productConfig.productReason;
        // for (var i = 0; i < data.length; i++) {
        //     var params = {};
        //     params.tbName = "the_reason";
        //     params.conent = data[i];
        //     servers.requestAddData(params);
        // }

        // var typeArr = ['good', 'normal', 'bad'];
        // for (var i = 0; i < 40; i++) {
        //     var params = {};
        //     params.tbName = "bad_record";
        //     var content = {};
        //     content.productType = "类型1";
        //     content.carType = "车型1";
        //     content.name = "品名";
        //     content.pinfang = "品番";
        //     content.line = "生产线2";
        //     content.projectName = "工程名称1";
        //     content.fangNum = "机番号1";
        //     content.partName = "部件1";
        //     content.quFen = typeArr[Math.floor(Math.random() * 3)];
        //     content.content = "测试内容";
        //     content.reason = "测试原因";
        //     content.destroyNum = 10;

        //     var date = new Date();
        //     var year = Math.ceil(Math.random() * 2) + 2015; 
        //     date.setFullYear(Number(year));
        //     var month = Math.ceil(Math.random() * 12); 
        //     date.setMonth(Number(month));
        //     var day = Math.ceil(Math.random() * 29);
        //     date.setDate(Number(day));
        //     content.prduct_time = Math.floor(date.valueOf()/1000);
        //     params.conent = content;
        //     Servers.requestAddData(params);
        // }
        // params = {};
        // params.tbName = "bad_record";
        // params.id_from = 0;
        // params.num_display = 10;
        // servers.requestGetTable(params,function(data){
        //     // var user = ModelManager.creatModel("UserModel",data);
        //     // ModelManager.user = user;
        // });

        // params = {};
        // params.tbName = "the_content";
        // params.id = 41;
        // var content = {};
        // content.content = "aaaaaaaaaaa";
        // params.conent = JSON.stringify(content);
        // servers.requestChangeData(params,function(data){
        //     // var user = ModelManager.creatModel("UserModel",data);
        //     // ModelManager.user = user;
        // });

        // params = {};
        // params.line = "生产线1";
        // params.time_from = "1451577600";
        // params.time_to = "1514563200";
        // params.time_type = 'month';
        // servers.requestGetStatistic(params,function(data){
        //     // var user = ModelManager.creatModel("UserModel",data);
        //     // ModelManager.user = user;
        // });

        // params = {};
        // params.tbName = "bad_record";
        // params.time_from = "1451577600";
        // params.time_to = "1514563200";
        // servers.requestExport(params,function(data){
        //     // var user = ModelManager.creatModel("UserModel",data);
        //     // ModelManager.user = user;
        // });

        // var params = {};
        // params.tbName = "table_desc";
        // var content = {};
        // params.conent = content;
        // content.tableName = "bad_record";
        // content.desc = {
        //     productType: "产品类型",
        //     carType    : "车型",
        //     name       : "品名",
        //     pinfang    : "品番",
        //     line       : "生产线",
        //     projectName: "工程名称",
        //     fangNum    : "机番号",
        //     partName   : "部位",
        //     quFen      : "区分",
        //     content    : "内容",
        //     reason     : "原因",
        //     destroyNum : "废却数量",
        //     prduct_time : "生产日期",
        //     edit_time  : "修改日期",
        // };
        // content.desc = JSON.stringify(content.desc);
        // Servers.requestAddData(params);
    }
    // update (dt) {},
});
