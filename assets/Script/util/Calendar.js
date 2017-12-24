cc.Class({
    extends: cc.Component,

    properties: {
    
    },

    // use this for initialization
    onLoad: function () {
        var date = new Date()
        var year = date.getFullYear();
        var mouth = date.getMonth();
        var day = date.getDate();
        this.freshViewByDate(year, mouth, day)
       
    },

    freshViewByDate(year, mouth, day){
        this.currentYear = year;
        this.currentMouth = mouth;
        this.currentDay = day;
        // 获取这月有多少天
        var currentDay = this.getMonthsDay(year, mouth);

        // 获取当月第一天星期几
        var firstDay = this.getMonthFirst(year, mouth);
        

        var lastMonth = (mouth - 1) >= 0 ? (mouth - 1) : 12;
        
        this.node.getChildByName('data').getChildByName(`year`).getComponent(cc.Label).string = year + " 年";
        this.node.getChildByName('data').getChildByName(`month`).getComponent(cc.Label).string = (mouth + 1) + " 月";

        var lastDay = this.getMonthsDay(year, lastMonth);
        var newlastDay = lastDay;
        for(var i = firstDay - 1; i >= 0; i--) {
             this.node.getChildByName('title1').getChildByName(`item${i}`).color = new cc.Color(192,192,192);
             this.node.getChildByName('title1').getChildByName(`item${i}`).getComponent(cc.Label).string = newlastDay--;
        }

        cc.log(`lastMonth:${lastMonth} newmonth:${mouth} firstDay:${firstDay} currentDay:${currentDay} lastDay:${lastDay} `);

        var newCurrentDay = 1;
        for (var i = firstDay; i <= 6; i++) {
            if (newCurrentDay == day) {
                this.node.getChildByName('title1').getChildByName(`item${i}`).color = new cc.Color(65,205,225);
            }
            this.node.getChildByName('title1').getChildByName(`item${i}`).getComponent(cc.Label).string = newCurrentDay++;
        }

        var num = 1;
        var number = 0;
        for(var i = newCurrentDay; i <= currentDay; i++) {
            if ((i - newCurrentDay) % 7 === 0) {
                num++;
                number = 0;
            }

            if (i == day) {
                this.node.getChildByName(`title${num}`).getChildByName(`item${number}`).color = new cc.Color(65,205,225);
            }
            this.node.getChildByName(`title${num}`).getChildByName(`item${number++}`).getComponent(cc.Label).string = i;
        }

        if (number <= 6) {
            var index = 1;
            for (var i = number; i <=6; i++) {
                this.node.getChildByName(`title${num}`).getChildByName(`item${number}`).color = new cc.Color(192,192,192);
                this.node.getChildByName(`title${num}`).getChildByName(`item${number++}`).getComponent(cc.Label).string = index++;
                
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
