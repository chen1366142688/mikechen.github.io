//index.js
//获取应用实例
const amapFile = require('../../utils/amap-wx.js');
const app = getApp();

Page({

    data: {
        tabNum:0, //切换btn默认
        isLimit:true,//当前是否可以跳转限行规则
        isTextlocal:false,//是否为文字
        singlelocal:false,//是否为单个数字
        isTextnon:false,//是否为文字
        singlenon:false,//是否为单个数字
        DateObj:{},//日期星期
        todayNum:{},//今日限行
        todayNumnon:{},//今日限行
        weatherData:{},//天气数据
        cityName:"", //本页的城市名称
        numberText:[],//星期文字
        local:{}, //本页面用的本地车辆数据
        nonlocal:{}, //本页面用的外地车辆数据
        allcars:{},//本地及外地
        localList:[], //限行规则页面用的本地车辆数据
        nonlocalList:[], //限行规则本页面用的外地车辆数据
        locationErrorInfo:true,
        locationErrorItem:false,
        diss:true,
        cityErrorName:'',
    },
    //当页面刚加载的时候执行以下操作：
    onLoad: function (options) {
        //8.11改版开始

        //获取天气及位置
        //判断是否由选择城市页面进入
        if(!options.cityName || options.cityName==="undefined"){
            //正常打开 无选择城市操作
            this._getWeatherAndLocal();
        }else{
            //选择城市页面进入
            this.setData({
                cityName:options.cityName
            });
            //请求天气
            this._getWeather(options.cityName);
            this._getLimitData(options.cityCode);
            //请求限行数据
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // var str = "2017-08-16";
        // if(!this._checkCurrentDay(str)){
        //     this._getWeatherAndLocal();
        // };
    },

    //获取位置
    _getWeatherAndLocal:function(){
      wx.showLoading({
        title: "玩命加载中.."
      });

        //获取位置
        var that = this;

        var myAmapFun = new amapFile.AMapWX({key:'e79c251401541143d70a239e53759df1'});


        //请求地理位置
        myAmapFun.getRegeo({
            success: function(data){
                //成功回调
                //城市名称 区分 直辖市 非直辖市

                if((typeof data[0].regeocodeData.addressComponent.city) == "string"){
                    //非直辖市
                    var len = data[0].regeocodeData.addressComponent.city.length;
                    var city = data[0].regeocodeData.addressComponent.city.substring(0,len-1);
                }else{
                    //直辖市
                    var len = data[0].regeocodeData.addressComponent.province.length;
                    var city = data[0].regeocodeData.addressComponent.province.substring(0,len-1);
                }


                //根据城市名称 确定城市编码adcode
                wx.request({
                    url: 'https://traffictrls.chetuobang.com/traffic_control/cities/searchAllCities',
                    method: 'POST',
                    data:{},
                    success:function(res){

                        //判断字符串是否为json格式 屏蔽js报错
                        if(app._isJSON(res.data.results)){
                            var cityList = JSON.parse(res.data.results).data;
                            var len = cityList.length;
                            var cityAdCode = "";
                            var cityStr = city+"市";
                            var isInCityList = false;
                            //去除市字
                            for(var i = 0;i<len;i++){
                                if(cityList[i].cityname == cityStr){
                                    cityAdCode = cityList[i].city;
                                    isInCityList = true;
                                    break;
                                }
                            }

                            if(isInCityList){
                                //根据 定位的城市 异步获取天气
                                that._getWeather(city);
                                //获取本页面限行数据
                                that._getLimitData(cityAdCode);
                            }else{
                                //根据 定位的城市 异步获取天气
                                that._getWeather("北京");
                                //获取本页面限行数据
                                that._getLimitData("110000");
                                city="北京"
                            }

                            //设置 对本页的数据
                            that.setData({
                                cityName:city
                            });

                        }



                    },
                    fail:function(info){
                        console.log("请求后端接口失败了");
                        console.log(info)
                    }
                });




            },
            fail: function(info){
                // console.log(info);
                //设置 对本页的数据
                var locationError="未知";
                that.setData({
                    cityName:'',
                    cityErrorName:'未知',
                    locationError:locationError,
                    locationErrorInfo:false,
                    locationErrorItem:true,
                    diss:false
                });
                wx.hideLoading();
                return false;
            }
        });

        //8.11改版结束
    },

    //获取限行数据
    _getLimitData:function(citycode){

       
        var that = this;
        var tmplocal;
        var tmpnonlocal;
        wx.request({
            url:"https://traffictrls.chetuobang.com/traffic_control/rule/searchRule?citycode="+citycode,
            method:"GET",
            success:function(res){
                // console.log(res)
                if(!app._isJSON(res.data.results)){
                    console.log("接口返回数据错误"+res.data.results);
                    return false;
                }

                var dataObj = JSON.parse(res.data.results);

                // console.log(dataObj);
                //都没有数据无法跳转限行规则

                if(dataObj.localcar.length==0 &&  dataObj.foreigncar.length==0 && dataObj.allcars.length==0){
                    that.setData({
                        isLimit:false
                    });
                }
                //本地有数据
                if(dataObj.localcar.length!=0 && dataObj.allcars.length==0){
                    //获取转换后的 周*
                    let weekList = app._weekTextTransform(dataObj.localcar[0].week);
                    let len = weekList.length;
                    //分割 本地限行号码
                    let localnumberList = app._splitStr(dataObj.localcar[0].number);

                    //页面渲染本地 List
                    var  localDataList = [];

                    for(let i = 0;i<len ;i++){
                        localDataList.push({
                            text:weekList[i],
                            number:localnumberList[i]
                        });
                    }
                    tmplocal = dataObj.localcar;
                    //今日限行
                    let reg = /\d/g;
                    if(reg.test(localnumberList[0])){
                        let today = localnumberList[0].split(",");

                        //如果为单个限号
                        if(localnumberList[0].length===1){
                            var todayNum = {
                                left:today,
                                right:""
                            };
                            that.setData({
                                singlelocal:true
                            });
                        }else{
                            var todayNum = {
                                left:today[0],
                                right:today[1]
                            };
                        }


                    }else{
                        let today = localnumberList[0];
                        var todayNum = {
                            left:today,
                            right:""
                        };
                        that.setData({
                            isTextlocal:true
                        });
                    }



                }else if((dataObj.localcar.length==0 || dataObj.localcar.length!=0) && dataObj.allcars.length!=0){
                    //本地没数据 本地及外地有数据 取 本地及外地数据
                    //获取转换后的 周*
                    let weekList = app._weekTextTransform(dataObj.allcars[0].week);
                    let len = weekList.length;
                    //分割 本地限行号码
                    let localnumberList = app._splitStr(dataObj.allcars[0].number);

                    //页面渲染本地 List
                    var localDataList = [];

                    for(let i = 0;i<len ;i++){
                        localDataList.push({
                            text:weekList[i],
                            number:localnumberList[i]
                        });
                    }
                    //今日限行
                    let reg = /\d/g;
                    if(reg.test(localnumberList[0])){
                        let today = localnumberList[0].split(",");

                        //如果为单个限号
                        if(localnumberList[0].length===1){
                            var todayNum = {
                                left:today,
                                right:""
                            };
                            that.setData({
                                singlelocal:true
                            });
                        }else{
                            var todayNum = {
                                left:today[0],
                                right:today[1]
                            };
                        }

                    }else{
                        let today = localnumberList[0];
                        var todayNum = {
                            left:today,
                            right:""
                        };
                        that.setData({
                            isTextlocal:true
                        });
                    }


                    //如果本地无数据 拿到本地及外地数据后 设置传给现行规则页面的数据为 本地及外地
                    tmplocal = dataObj.allcars;

                }if((dataObj.localcar.length==0 || dataObj.localcar.length!=0) && dataObj.allcars.length!=0){
                    //本地没数据 本地及外地有数据 取 本地及外地数据
                    //获取转换后的 周*
                    let weekList = app._weekTextTransform(dataObj.allcars[0].week);
                    let len = weekList.length;
                    //分割 本地限行号码
                    let localnumberList = app._splitStr(dataObj.allcars[0].number);

                    //页面渲染本地 List
                    var localDataList = [];

                    for(let i = 0;i<len ;i++){
                        localDataList.push({
                            text:weekList[i],
                            number:localnumberList[i]
                        });
                    }
                    //今日限行
                    let reg = /\d/g;
                    if(reg.test(localnumberList[0])){
                        let today = localnumberList[0].split(",");

                        //如果为单个限号
                        if(localnumberList[0].length===1){
                            var todayNum = {
                                left:today,
                                right:""
                            };
                            that.setData({
                                singlelocal:true
                            });
                        }else{
                            var todayNum = {
                                left:today[0],
                                right:today[1]
                            };
                        }

                    }else{
                        let today = localnumberList[0];
                        var todayNum = {
                            left:today,
                            right:""
                        };
                        that.setData({
                            isTextlocal:true
                        });
                    }

                    if(dataObj.localcar.length!=0){
                        tmplocal = dataObj.localcar;
                    }else if(dataObj.localcar.length==0){
                        tmplocal = dataObj.allcars;
                    }
                    //如果本地无数据 拿到本地及外地数据后 设置传给现行规则页面的数据为 本地及外地


                }else if(dataObj.localcar.length==0 && dataObj.allcars.length==0){
                    //本地无数据  本地及外地无数据 则默认显示 本地不限行
                    //并使 限行规则 跳转失效
                    //获取转换后的 周*
                    let weekList = app._weekTextTransform("星期五");
                    let len = weekList.length;
                    //分割 本地限行号码
                    let localnumberList = ["不限行","不限行","不限行","不限行","不限行","不限行","不限行"];



                    //页面渲染本地 List
                    var localDataList = [];

                    for(let i = 0;i<len ;i++){
                        localDataList.push({
                            text:weekList[i],
                            number:localnumberList[i]
                        });
                    }
                    tmplocal=[];
                    //今日限行
                    var todayNum = {
                        left:"本地车辆不限行",
                        right:""
                    };
                    that.setData({
                        isTextlocal:true
                    });
                };





                //外地有数据
                if(dataObj.foreigncar.length!=0 && dataObj.allcars.length==0){
                    //分割 外地限行号码
                    let nonlocalnumberList = app._splitStr(dataObj.foreigncar[0].number);
                    let weekList = app._weekTextTransform(dataObj.foreigncar[0].week);
                    let len = weekList.length;
                    //页面渲染 外地List


                    var nonlocalDataList = [];

                    for(let i = 0;i<len ;i++){
                        nonlocalDataList.push({
                            text:weekList[i],
                            number:nonlocalnumberList[i]
                        });
                    }

                    //今日限行
                    let reg = /\d/g;
                    if(reg.test(nonlocalnumberList[0])){
                        let today = nonlocalnumberList[0].split(",");

                        //如果为单个限号
                        if(nonlocalnumberList[0].length===1){
                            var todayNumnon = {
                                left:today,
                                right:""
                            };
                            that.setData({
                                singlenon:true
                            });
                        }else{
                            var todayNumnon = {
                                left:today[0],
                                right:today[1]
                            };
                        }


                    }else{
                        let today = nonlocalnumberList[0];
                        var todayNumnon = {
                            left:today,
                            right:""
                        };
                        that.setData({
                            isTextnon:true
                        });
                    }

                    tmpnonlocal=dataObj.foreigncar;

                }else if((dataObj.foreigncar.length==0 || dataObj.foreigncar.length!=0) && dataObj.allcars.length!=0){
                    //外地没数据 本地及外地有数据 取 本地及外地数据
                    //获取转换后的 周*
                    let weekList = app._weekTextTransform(dataObj.allcars[0].week);
                    let len = weekList.length;
                    //分割 本地限行号码
                    let nonlocalnumberList = app._splitStr(dataObj.allcars[0].number);

                    //页面渲染本地 List
                    var nonlocalDataList = [];

                    for(let i = 0;i<len ;i++){
                        nonlocalDataList.push({
                            text:weekList[i],
                            number:nonlocalnumberList[i]
                        });
                    }


                    //今日限行
                    let reg = /\d/g;
                    if(reg.test(nonlocalnumberList[0])){
                        let today = nonlocalnumberList[0].split(",");

                        //如果为单个限号
                        if(nonlocalnumberList[0].length===1){
                            var todayNumnon = {
                                left:today,
                                right:""
                            };
                            that.setData({
                                singlenon:true
                            });
                        }else{
                            var todayNumnon = {
                                left:today[0],
                                right:today[1]
                            };
                        }


                    }else{
                        let today = nonlocalnumberList[0];
                        var todayNumnon = {
                            left:today,
                            right:""
                        };
                        that.setData({
                            isTextnon:true
                        });
                    }


                    //如果外地无数据 拿到本地及外地数据后 设置传给现行规则页面的数据为 本地及外地
                    if(dataObj.foreigncar.length!=0){
                        tmpnonlocal = dataObj.foreigncar;
                    }else if(dataObj.foreigncar.length==0){
                        tmpnonlocal = dataObj.allcars;
                    }

                }else if(dataObj.foreigncar.length==0 && dataObj.allcars.length==0){
                    //外地无数据  本地及外地无数据 则默认显示 不限行
                    //并使 限行规则 跳转失效
                    //获取转换后的 周*
                    let weekList = app._weekTextTransform("星期五");
                    let len = weekList.length;
                    //分割 本地限行号码
                    let nonlocalnumberList = ["不限行","不限行","不限行","不限行","不限行","不限行","不限行"];


                    //页面渲染本地 List
                    var nonlocalDataList = [];

                    for(let i = 0;i<len ;i++){
                        nonlocalDataList.push({
                            text:weekList[i],
                            number:nonlocalnumberList[i]
                        });
                    }
                    var todayNumnon = {
                        left:"本地车辆不限行",
                        right:""
                    };
                    tmpnonlocal=[];
                    that.setData({
                        isTextnon:true//为true时表示今日限行的显示为 文字  改变字体大小
                    });
                }


                if(dataObj.foreigncar.length==0 && dataObj.allcars.length==0 && dataObj.localcar.length==0){
                    var todayNum = {
                      left: "本市不限行",
                      right: ""
                    };
                    var todayNumnon = {
                        left:"本市不限行",
                        right:""
                    };
                }
                //设置首页数据 及其 限行规则数据
                that.setData({
                    //设置首页数据
                    todayNum:todayNum,//今日限行尾号
                    todayNumnon:todayNumnon,//今日限行尾号
                    local:localDataList,//首页本地数据
                    nonlocal:nonlocalDataList, //首页外地数据
                    localList:tmplocal, //需要传给限行规则页面本地车的数据 如若修改 请修改 value : dataObj.localcar 别修改 key : localList
                    nonlocalList:tmpnonlocal, // 需要传给限行规则页面外地车的数据 其他同上
                    allcars:dataObj.allcars,
                    locallen:dataObj.localcar.length,
                    nonlocallen:dataObj.foreigncar.length
                });
                wx.hideLoading();
            },
            fail:function(){
                wx.showLoading({
                    title:"数据加载失败"
                });
                wx.hideLoading();
            }
        });
    },
    //判断当前日期是否为接口返回的日期
    _checkCurrentDay:function(targetDate){
        var d = new Date(targetDate.replace(/-/g,"/"));
        var todaysDate = new Date();
        if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
            return true;
        } else {
            return false;
        }
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
    //把日期转换格式
    _splitDate:function(dateStr){
        if(typeof dateStr === "string"){
            var arr =  dateStr.split("-");

            return parseInt(arr[1])+"月"+parseInt(arr[2])+"日";

        }else{
            return dateStr;
        }
    },
    //获取天气
    _getWeather:function(city){
        console.log(city);
        var that = this;
        var url=encodeURI("https://traffictrls.chetuobang.com/traffic_control/weather?city="+city);
        wx.request({
            url:url,
            method:"GET",
            success:function(data){
                for(let i in data.data.results){
                    if(i ==0){
                        var weatherObj = {};
                        var weather = data.data.results[i].weather;
                        var temperature = data.data.results[i].temperature;
                        weatherObj.weather = weather;
                        weatherObj.temperature = temperature;
                    }
                }


                var  Datestr = data.data.date;

                var DateObj = {};
                for(let j in Datestr.split(" ")){
                    if( j == 0){
                        DateObj.date = that._splitDate(Datestr.split(" ")[j])
                    }else if( j == 1){
                        DateObj.week = Datestr.split(" ")[j];
                    }
                }
                    //日期

                    console.log(weatherObj.weather);
                    that.setData({
                        weatherData:weatherObj,
                        DateObj:DateObj
                    });
                    console.log(DateObj.week);
                

            }
        });
    },
    //城市选择页面跳转
    bindChoseLocation:function(){
        var cityName = this.data.cityName;
        wx.navigateTo({
            url: '../city/city?cityName='+cityName
        })
    },

    //tab切换
    bindReSetTab:function(e){
        var curNum = e.currentTarget.dataset.index;
        this.setData({
            tabNum:curNum
        });
    },
    //限行规则跳转
    bindJumpRule:function(){

        var ruleObj = {
            cityName:this.data.cityName,
            curweek:this.data.DateObj.week,
            localList:this.data.localList,
            nonlocalList:this.data.nonlocalList,
            allcars:this.data.allcars,
            locallen:this.data.locallen,
            nonlocallen:this.data.nonlocallen
        };
        var ruleStr = JSON.stringify(ruleObj);
        wx.navigateTo({
            url: '../rule/rule?ruleData='+ruleStr
        })
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })

    },
    onShareAppMessage: function () {
        return {
            title: '车托帮限行查询',
            path: '/pages/index/index',
            success: function (res) {
                // 转发成功
                console.log("转发成功")
            },
            fail: function (res) {
                // 转发失败
                console.log("转发失败")
            }
        }
    },

})
