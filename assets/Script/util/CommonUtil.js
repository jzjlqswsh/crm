var CommonUtil = {};
window.CommonUtil = CommonUtil;

CommonUtil.getFloltStr = function (num, pointNum){
    var str = "" + num;
    var arr = str.split(".");
    if(arr.length == 1){
        str = str + '.';
        for (var i = 0; i < pointNum; i++) {
            str = str + '0';
        }
    }else{
        if(arr[1].length < pointNum){
            for (var i = arr[1].length; i < pointNum; i++) {
                str = str + '0';
            }
        }
    }
    return str;
}

// 获取那年那月有多少天
CommonUtil.getMonthsDay = function(year, month) {
        var year = year;
        var month = month;
        if (arguments.length == 0) {
            var date = new Date();
            year = date.getFullYear();
            month = data.getMonth();
        }

        if (arguments.length == 1) {
            var date = new Date();
            month = data.getMonth();
        }
        
        var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
            monthDays[1] = 29;
        }
        return monthDays[month];
    },


module.exports = CommonUtil;