cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },

        loginView: {
            default: null,
            type: require("LoginMediator")
        },

        roleInfo: {
            default: null,
            type: require("RoleInfoMediator")
        },

        topInfo: {
            default: null,
            type: require("TopInfoMediator")
        },

        contentInfo: {
            default: null,
            type: require("ContentInfoMediator")
        },

        inputInfo: {
            default: null,
            type: require("InputInfoMediator")
        },

        report: {
            default: null,
            type: require("ReportMediator")
        },

        selectListPrefab: {
            default: null,
            type: cc.Prefab
        },

        currentDataName: "bad_data",
    },

    // use this for initialization
    onLoad: function () {
        window.mainView = this;
        // 添加侦听
        this.addEventMap()
        this.loginView.node.active = true;
        this.roleInfo.node.active = false;
        this.topInfo.node.active = false;
        this.contentInfo.node.active = false;
        this.inputInfo.node.active = false;
        this.report.node.active = false;
    },

    addEventMap(){
        this.node.on('loginSucceed', this.loginSucceed, this);
        this.node.on('findData', this.contentInfo.findDataSucceed, this.contentInfo);
        this.node.on('changeTable', this.changeTable, this);
        this.node.on('inputData', this.inputDataEvent, this);
    },

    loginSucceed(event){
        this.loginView.node.active = false;
        this.roleInfo.node.active = true;
        this.roleInfo.updateView()
        this.topInfo.node.active = true;
        this.contentInfo.node.active = true;
        // 获取一些数据
        this.getSomeData();
    },

    getSomeData(){
        // 产品信息
        var params = {};
        params.tbName = tableNames.the_projectName;
        params.id_from = 0;
        params.num_display = 100;
        Servers.requestGetTable(params,function(data){
            // cc.log(data);
            productConfig.updataSelectData(tableNames.the_projectName, data);
        });
        // 内容信息
        params.tbName = tableNames.the_content;
        Servers.requestGetTable(params,function(data){
            // cc.log(data);
            productConfig.updataSelectData(tableNames.the_projectName, data);
        });
        // 原因信息
        params.tbName = tableNames.the_reason;
        Servers.requestGetTable(params,function(data){
            // cc.log(data);
            productConfig.updataSelectData(tableNames.the_reason, data);
        });
    },

    // 切换标签
    changeTable(event){
        var tableName = event.detail;
        if(this.currentDataName == tableName){
            return;
        }
        this.changeDataByName(tableName);
    },

    changeDataByName(dataName){
        this.currentDataName = dataName;
        if(this.currentDataName == "bad_data"){
            this.topInfo.node.active = true;
            this.contentInfo.node.active = true;
            this.report.node.active = false;
        }else if(this.currentDataName == "ECU_report"){
            this.topInfo.node.active = false;
            this.contentInfo.node.active = false;
            this.report.node.active = true;
        }
    },

    inputDataEvent(event){
        this.inputInfo.node.active = true;
    },

    chooseTime(time){
        cc.log("chooseTime:", time)
    },

    showSelectList(dataList, pos, width, callBack){
        cc.log(cc.instantiate(this.selectListPrefab));
        var selectList = cc.instantiate(this.selectListPrefab).getComponent(cc.ScrollView).content.getComponent('SelectList');
        selectList.init(dataList,width,callBack);
        selectList.scrollView.node.x = pos.x;
        selectList.scrollView.node.y = pos.y;
        this.node.addChild(selectList.scrollView.node,1);
    },

    // called every frame
    update: function (dt) {

    },
 
    onTouch: function () {
        this.label.string = "test";
    },
});
