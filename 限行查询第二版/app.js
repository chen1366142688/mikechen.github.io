//app.js
var aldstat = require("./utils/ald-stat.js");
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);
    },
    //把星期* 转换为 周*

    _weekTextTransform:function(curWeek){
        var WeekTextList = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
        var curWeekTextList = ["周一","周二","周三","周四","周五","周六","周日"];
        var nextWeekTextList = ["下周一","下周二","下周三","下周四","下周五","下周六"];
        var weekList = [];
        var len = curWeekTextList.length;
        //dataObj.localcar[0].week
        var curIndex = WeekTextList.indexOf(curWeek);

        for(let i=curIndex;i<len;i++){
            weekList.push(curWeekTextList[i]);
        }
        var j = 0;
        while (weekList.length<7){
            weekList.push(nextWeekTextList[j]);
            j++;
        }
        return weekList;
    },
    ////把星期* 转换为 周* 不带 "下周"
    _weekTextTransformRule:function(curWeek){
        var WeekTextList = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
        var curWeekTextList = ["周一","周二","周三","周四","周五","周六","周日"];
        var nextWeekTextList = ["周一","周二","周三","周四","周五","周六","周日"];
        var weekList = [];
        var len = curWeekTextList.length;
        //dataObj.localcar[0].week
        var curIndex = WeekTextList.indexOf(curWeek);

        for(let i=curIndex;i<len;i++){
            weekList.push(curWeekTextList[i]);
        }
        var j = 0;
        while (weekList.length<7){
            weekList.push(nextWeekTextList[j]);
            j++;
        }
        return weekList;
    },
    //把一周的限行号码字符串分割
    _splitStr:function(str){
        if(typeof str === "string"){
            return str.split(";")
        }else{
            return str;
        }

    },
    _isJSON:function (str) {
      console.log(str)
    if (typeof str == 'string') {
        try {
                JSON.parse(str);
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        }
        console.log('It is not a string!')
    },
    globalData:{
        userInfo:null,
        limitInfo:null
    }
});