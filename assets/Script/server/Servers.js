// Returns a random integer between min (included) and max (excluded)

var Servers = {};
var HttpUtil = require("HttpUtil");
Servers.serverUrl = "http://120.79.95.183/index.php?s=Api/";
Servers.sessid = '';
window.Servers = Servers;

window.tableNames = {};
tableNames.bad_record = "bad_record";
tableNames.the_content = "the_content";
tableNames.the_reason = "the_reason";
tableNames.the_projectName = "the_projectName";

var port = {};
port.login = "User/login";
port.register = "User/reg";
port.getTable = "Table/getData";
port.addData = "Table/addData";
port.changeData = "Table/changeData";
port.deleteData = "Table/deleteData";
port.getStatistic = "Table/getStatistic";
port.export = "Table/download";

// 用户登录
// user_name
// psd
Servers.requestLogin = function (params, fun) {
    var url = Servers.serverUrl + port.login;
    HttpUtil.sendUrl(url, params, fun);
}

// 用户注册
// user_name
// psd
Servers.requestRegister = function (params, fun) {
    var url = Servers.serverUrl + port.register;
    params.sms_code = 888888;
    HttpUtil.sendUrl(url, params, fun);
}

//获取表数据
// tbName
// id_from  
// num_display
Servers.requestGetTable = function (params, fun) {
    var url = Servers.serverUrl + port.getTable;
    if(params.condition){
        params.condition = JSON.stringify(params.condition);    
    }
    HttpUtil.sendUrl(url, params, fun);
}

//添加数据
// tbName
// conent
Servers.requestAddData = function (params, fun) {
    var url = Servers.serverUrl + port.addData;
    params.conent = JSON.stringify(params.conent);
    HttpUtil.sendUrl(url, params, fun);
}

//修改数据
// tbName
// id
// content
Servers.requestChangeData = function (params, fun) {
    var url = Servers.serverUrl + port.changeData;
    HttpUtil.sendUrl(url, params, fun);
}


//删除数据
// tbName
// id
Servers.requestDeleteData = function (params, fun) {
    var url = Servers.serverUrl + port.deleteData;
    HttpUtil.sendUrl(url, params, fun);
}

//获取统计
// params.line = "生产线1";
// params.time_from = "1451577600";
// params.time_to = "1514563200";
// params.time_type = 'month';
Servers.requestGetStatistic = function (params, fun) {
    var url = Servers.serverUrl + port.getStatistic;
    HttpUtil.sendUrl(url, params, fun);
}

// 导出报表
// params.tbName = "bad_record";
// params.time_from = "1451577600";
// params.time_to = "1514563200";
Servers.requestExport = function (params, fun) {
    var url = Servers.serverUrl + port.export;
    if(params.condition){
        params.condition = JSON.stringify(params.condition);    
    }
    HttpUtil.sendUrl(url, params, fun, "GET", true);
}

module.exports = Servers;
