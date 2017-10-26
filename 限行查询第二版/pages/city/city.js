// pages/city/city.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:'',
    citys:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var cityName = options.cityName;
    // console.log(options.cityName);
    if(cityName && cityName !==""){
      this.setData({
          city:cityName
      });
    }else{
      this.setData({
          city:"北京"
      });
    }
    wx.request({
      url: 'https://traffictrls.chetuobang.com/traffic_control/cities/searchAllCities',
      method: 'POST',
      data:{},
      success:function(res){
        if(!app._isJSON(res.data.results)){
            console.log("接口返回数据错误"+res.data.results);
            return false;
        }
        var cityList = JSON.parse(res.data.results).data;
        var len = cityList.length;
        //去除市字
        for(var i = 0;i<len;i++){
            var str = cityList[i].cityname.replace(/市/g,'');
            cityList[i].cityname = str;
        }
        console.log("请求城市列表成功");
        that.setData({
          citys:cityList
        })
      },
      fail:function(info){
        console.log("请求后端接口失败了");
        console.log(info)
      }
    })
  },
  /**
   * 定义用户选择事件
  */
  select:function(e){
    var that=this;
    var cityCode=e.target.dataset.value;
    var cityName = e.target.dataset.key;
    wx.reLaunch({
      url: '../index/index?cityCode=' + cityCode+'&cityName='+cityName
    });
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
      wx.hideLoading();
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