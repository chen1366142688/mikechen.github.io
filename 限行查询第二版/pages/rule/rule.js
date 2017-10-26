// pages/rule/rule.js
const app = getApp();
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var ruleStr = options.ruleData;
      if(ruleStr){
        if(!app._isJSON(ruleStr)){
          console.log("接口返回数据错误"+res.data.results);
          return false;
        }
        var ruleObj = JSON.parse(ruleStr);
        // console.log(ruleObj)
        //本地及外地限行规则
        var allcaruleloacl="";
        var allcarulenonloacl ="";


        //本地限行规则
        var localLimitRuleData = ruleObj.localList;
        var localLen = localLimitRuleData.length;
        var localLimitRule = [];
        var localDataList = [];
        //本地限行规则
        var nonlocalLimitRuleData = ruleObj.nonlocalList;
        var nonlocalLen = nonlocalLimitRuleData.length;
        var nonlocalLimitRule = [];
        var nonlocalDataList = [];
        if(ruleObj.allcars.length!=0 && ruleObj.locallen==0){
            allcaruleloacl="";
        }else if(ruleObj.allcars.length!=0 && ruleObj.locallen!=0){
            for(let i =0;i<ruleObj.allcars.length;i++) {
                for (var j = 0; j < 7; j++) {
                    let battle = app._splitStr(ruleObj.allcars[i].number)[j];
                    var reg =/^\d{1}$/;
                    if (reg.test(battle)){
                        this.setData({
                            battle:'battle'
                        })
                    }else{
                        this.setData({
                            battle: ''
                        })
                    }



                    localDataList.push({
                        numberList: {
                            top: (app._splitStr(ruleObj.allcars[i].number)[j].split(",")[0]),
                            bottom: app._splitStr(ruleObj.allcars[i].number)[j].split(",")[1],
                            battle:this.data.battle
                        },
                        weekList: app._weekTextTransformRule(ruleObj.curweek)[j]
                    });
                }
                if (ruleObj.allcars[i].time === "") {
                    ruleObj.allcars[i].time = "00:00-24:00";
                }
                localLimitRule.push({
                    localDataList: localDataList,
                    time: ruleObj.allcars[i].time,
                    area: ruleObj.allcars[i].area,
                    rule: this._isUndefined(ruleObj.allcars[i].summary)
                });

                //判断单双号
                for (let i in localDataList){
                    if (localDataList[i].numberList.top == '单号'){
                        var top = localDataList[i].numberList.top.slice(0, 1);
                        var bottom = localDataList[i].numberList.top.slice(1, 2);
                        localDataList[i].numberList.top=top;
                        localDataList[i].numberList.bottom = bottom;
                    } else if (localDataList[i].numberList.top == '双号'){
                        var top2 = localDataList[i].numberList.top.slice(0, 1);
                        var bottom2 = localDataList[i].numberList.top.slice(1, 2);
                        localDataList[i].numberList.top = top2;
                        localDataList[i].numberList.bottom = bottom2;
                    }
                }

                localDataList = [];
            }
        }
        if(ruleObj.allcars.length!=0 && ruleObj.nonlocallen==0){
            allcarulenonloacl = "";
        }else if(ruleObj.allcars.length!=0 && ruleObj.nonlocallen!=0){
            for(let i =0;i<ruleObj.allcars.length;i++) {
                for (var j = 0; j < 7; j++) {

                    let battle = app._splitStr(ruleObj.allcars[i].number)[j];
                    var reg =/^\d{1}$/;
                    if (reg.test(battle)){
                        this.setData({
                            battle:'battle'
                        })
                    }else{
                        this.setData({
                            battle: ''
                        })
                    }
                    nonlocalDataList.push({
                        numberList: {
                            top: (app._splitStr(ruleObj.allcars[i].number)[j].split(",")[0]),
                            bottom: app._splitStr(ruleObj.allcars[i].number)[j].split(",")[1],
                            battle:this.data.battle
                        },
                        weekList: app._weekTextTransformRule(ruleObj.curweek)[j]
                    });
                }
                if (ruleObj.allcars[i].time === "") {

                    ruleObj.allcars[i].time = "00:00-24:00";
                }
                nonlocalLimitRule.push({
                    localDataList: nonlocalDataList,
                    time: ruleObj.allcars[i].time,
                    area: ruleObj.allcars[i].area,
                    rule: this._isUndefined(ruleObj.allcars[i].summary)
                });

                //判断单双号
                for (let i in nonlocalDataList){
                    if (nonlocalDataList[i].numberList.top == '单号'){
                        var top2 = nonlocalDataList[i].numberList.top.slice(0, 1);
                        var bottom2 = nonlocalDataList[i].numberList.top.slice(1, 2);
                        nonlocalDataList[i].numberList.top=top2;
                        nonlocalDataList[i].numberList.bottom = bottom2;
                    } else if (nonlocalDataList[i].numberList.top == '双号'){
                        var top2 = nonlocalDataList[i].numberList.top.slice(0, 1);
                        var bottom2 = nonlocalDataList[i].numberList.top.slice(1, 2);
                        nonlocalDataList[i].numberList.top = top2;
                        nonlocalDataList[i].numberList.bottom = bottom2;
                    }
                }
                nonlocalDataList = [];
            }
        }

        if(ruleObj.allcars.length==0 && ruleObj.locallen==0 && ruleObj.nonlocallen==0){
            allcaruleloacl="";
            allcarulenonloacl="";
        }

        if(localLimitRuleData.length==0){
            this.setData({
                localnull:true,
                len1:0
            });
        }
        if(nonlocalLimitRuleData.length==0){
            this.setData({
                nonlocalnull:true,
                len2:0
            });
        }


         for(let i =0;i<localLen;i++){

             for(var j=0;j<7;j++){
                 let battle = app._splitStr(localLimitRuleData[i].number)[j];
                 var reg =/^\d{1}$/;
                 if (reg.test(battle)){
                     this.setData({
                         battle:'battle'
                     })
                 }else{
                     this.setData({
                         battle: ''
                     })
                 }
                 localDataList.push({
                     numberList:{
                         top:(app._splitStr(localLimitRuleData[i].number)[j].split(",")[0]),
                         bottom:app._splitStr(localLimitRuleData[i].number)[j].split(",")[1],
                         battle:this.data.battle
                     },
                     weekList:app._weekTextTransformRule(ruleObj.curweek)[j]
                 });
             }

             if(localLimitRuleData[i].time===""){
                 localLimitRuleData[i].time ="00:00-24:00";
             }

             localLimitRule.push({
                localDataList:localDataList,
                time:localLimitRuleData[i].time,
                area:localLimitRuleData[i].area,
                rule:this._isUndefined(localLimitRuleData[i].summary)
             });

             //判断单双号
             for (let i in localDataList){
                 if (localDataList[i].numberList.top == '单号'){
                     var top = localDataList[i].numberList.top.slice(0, 1);
                     var bottom = localDataList[i].numberList.top.slice(1, 2);
                     localDataList[i].numberList.top=top;
                     localDataList[i].numberList.bottom = bottom;
                 } else if (localDataList[i].numberList.top == '双号'){
                     var top2 = localDataList[i].numberList.top.slice(0, 1);
                     var bottom2 = localDataList[i].numberList.top.slice(1, 2);
                     localDataList[i].numberList.top = top2;
                     localDataList[i].numberList.bottom = bottom2;
                 }
             }

             localDataList=[];
         }

            // console.log(nonlocalLen)
          for(let i =0;i<nonlocalLen;i++){

              for(var j=0;j<7;j++){
                  let battle = app._splitStr(nonlocalLimitRuleData[i].number)[j];
                  var reg =/^\d{1}$/;

                  if (reg.test(battle)){
                      this.setData({
                          battle:'battle'
                      })

                  }else{
                      this.setData({
                          battle: ''
                      })
                  }
                  nonlocalDataList.push({
                      numberList:{
                          top:(app._splitStr(nonlocalLimitRuleData[i].number)[j].split(",")[0]),
                          bottom:app._splitStr(nonlocalLimitRuleData[i].number)[j].split(",")[1],
                          battle:this.data.battle
                      },
                      weekList:app._weekTextTransformRule(ruleObj.curweek)[j]
                  });
              }
              if(nonlocalLimitRuleData[i].time===""){
                  nonlocalLimitRuleData[i].time ="00:00-24:00";
              }
              nonlocalLimitRule.push({
                  localDataList:nonlocalDataList,
                  time:nonlocalLimitRuleData[i].time,
                  area:nonlocalLimitRuleData[i].area,
                  rule:this._isUndefined(nonlocalLimitRuleData[i].summary)
              });
              // console.log(nonlocalDataList)
              //判断单双号
              for (let i in nonlocalDataList){
                  if (nonlocalDataList[i].numberList.top == '单号'){
                      var top2 = nonlocalDataList[i].numberList.top.slice(0, 1);
                      var bottom2 = nonlocalDataList[i].numberList.top.slice(1, 2);
                      nonlocalDataList[i].numberList.top=top2;
                      nonlocalDataList[i].numberList.bottom = bottom2;
                  } else if (nonlocalDataList[i].numberList.top == '双号'){
                      var top2 = nonlocalDataList[i].numberList.top.slice(0, 1);
                      var bottom2 = nonlocalDataList[i].numberList.top.slice(1, 2);
                      nonlocalDataList[i].numberList.top = top2;
                      nonlocalDataList[i].numberList.bottom = bottom2;
                  }
              }
              nonlocalDataList=[];
          }

         this.setData({
            city:ruleObj.cityName,
            local:localLimitRule,
            nonlocal:nonlocalLimitRule
         });
      }
  },
    /**
     * 页面的初始数据
     */
    data: {
        tabNum:0,
        localnull:false,
        nonlocalnull:false,
        len1:1,
        len2:1,
        battle:""
    },
    /**
     * 定义方法，切换本地和外地车辆的信息，默认请求用户的当前城市的本地车辆限行信息，
     * 点击外地车辆的时候请求用户当前城市的外地车辆的限行规则
     *
     */
    checkoutAuto:function(e){

        var curNum = e.currentTarget.dataset.value;
        this.setData({
            tabNum:curNum
        });

    },
    _isUndefined:function(obj){
        return obj?obj:"";
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})