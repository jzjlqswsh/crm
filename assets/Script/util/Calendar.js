cc.Class({
    extends: cc.Component,

    properties: {
    
    },

    // use this for initialization
    onLoad: function () {
        var date = new Date()
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        this.freshViewByDate(year, month, day);
        
        var hang = 6;
        var day = 7;
        for (var i = 1; i <= hang; i++) {
            for (var j = 0; j < day; j++) {
                var item = this.node.getChildByName(`title${i}`).getChildByName(`item${j}`)
                item.timeNum = i + "_" + j;
                item.on('mousedown', function ( event ) {
                  this.chooseTimeByClick(event);
                },this);
            }
        }
    },

    setCallBackFun(fun){
        self._callBackFun = fun;
    },

    chooseTimeByClick(event){
        var time = event.target.timeData;
        cc.log(time);
        var date = new Date();
        date.setFullYear(Number(time.year));
        date.setMonth(Number(time.month));
        date.setDate(Number(time.day));
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        var timestamp = Math.floor(date.valueOf()/1000);
        if(self._callBackFun){
            cc.log(timestamp);    
            self._callBackFun(timestamp);
        }
        this.node.parent.destroy();
    },

    freshViewByDate(year, month, day){
        this.currentYear = year;
        this.currentMouth = month;
        this.currentDay = day;
        // 获取这月有多少天
        var currentDay = this.getMonthsDay(year, month);

        // 获取当月第一天星期几
        var firstDay = this.getMonthFirst(year, month);
        var lastMonth = (month - 1) >= 0 ? (month - 1) : 11;
        var lastYear = month == 11 ? (year - 1) : year;
        
        this.node.getChildByName('data').getChildByName(`year`).getComponent(cc.Label).string = year + " 年";
        this.node.getChildByName('data').getChildByName(`month`).getComponent(cc.Label).string = (month + 1) + " 月";

        var item;
        var color = new cc.Color(0,0,0);
        var grayColor = new cc.Color(150,150,150);
        var currentColor = new cc.Color(65,205,225);
        var lastDay = this.getMonthsDay(lastYear, lastMonth);
        var newlastDay = lastDay;
        for(var i = firstDay - 1; i >= 0; i--) {
            item = this.node.getChildByName('title1').getChildByName(`item${i}`)
            item.timeData = {};
            item.timeData.year = lastYear;
            item.timeData.month = lastMonth;
            item.timeData.day = newlastDay--;
            item.color = grayColor;
            item.getComponent(cc.Label).string = item.timeData.day;
        }

        cc.log(`lastMonth:${lastMonth} newmonth:${month} firstDay:${firstDay} currentDay:${currentDay} lastDay:${lastDay} `);
        var newCurrentDay = 1;
        for (var i = firstDay; i <= 6; i++) {
            item = this.node.getChildByName('title1').getChildByName(`item${i}`)
            if (newCurrentDay == day) {
                item.color = currentColor;
            }else{
                item.color = color;
            }
            item.timeData = {};
            item.timeData.year = year;
            item.timeData.month = month;
            item.timeData.day = newCurrentDay++;
            item.getComponent(cc.Label).string = item.timeData.day;
        }
        var num = 1;
        var number = 0;
        for(var i = newCurrentDay; i <= currentDay; i++) {
            if ((i - newCurrentDay) % 7 === 0) {
                num++;
                number = 0;
            }
            item = this.node.getChildByName(`title${num}`).getChildByName(`item${number}`)
            number++;
            if (i == day) {
                item.color = currentColor;
            }else{
                item.color = color;
            }
            item.timeData = {};
            item.timeData.year = year;
            item.timeData.month = month;
            item.timeData.day = i;
            item.getComponent(cc.Label).string = i;
        }
        var nextMonth = (month + 1) <= 11 ? (month + 1) : 0;
        var nextYear = month == 0 ? (year + 1) : year;
        var index = 1;
        if (number <= 6) {
            for (var i = number; i <=6; i++) {
                item = this.node.getChildByName(`title${num}`).getChildByName(`item${i}`)
                item.color = grayColor;
                item.getComponent(cc.Label).string = index;
                item.timeData = {};
                item.timeData.year = nextYear;
                item.timeData.month = nextMonth;
                item.timeData.day = index;
                index++; 
            }
        }
        num++;
        if (num <= 6){
            for (var i = num; i <=6; i++) {
                for (var j = 0; j <=6; j++) {
                    item = this.node.getChildByName(`title${i}`).getChildByName(`item${j}`)
                    item.color = grayColor;
                    item.getComponent(cc.Label).string = index; 
                    item.timeData = {};
                    item.timeData.year = nextYear;
                    item.timeData.month = nextMonth;
                    item.timeData.day = index;
                    index++; 
                }
            }
        }
    },

    // 获取那年那月有多少天
    getMonthsDay(year, month) {
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

    // 获取这个月第一天星期几 
    getMonthFirst(year, month) {
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
        
        var newDate = new Date(year, month, 1);
        return newDate.getDay();
    },


    beforMonth() {
        var month = this.currentMouth - 1;
        var year = this.currentYear;
        if(month < 0){
            month = 11;
            year = year -1;
        }
        this.freshViewByDate(year, month)
    },

    nextMonth() {
        var month = this.currentMouth + 1;
        var year = this.currentYear;
        if(month > 11){
            month = 0;
            year = year + 1;
        }
        this.freshViewByDate(year, month)
    },


});
