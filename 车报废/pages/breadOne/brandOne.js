// pages/breadOne/brandOne.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carTwo:['昂科雷','昂科拉','昂科威','君越','君威','特斯拉']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    //获取到上一页传过来的参数，然后请求当前品牌的车型二级菜单或者是一次请求然后直接重缓存取在分类
  },
  carClick:function(e){
    console.log(e.currentTarget.dataset.value);
    var carInfo = e.currentTarget.dataset.value;
    //这里看到点击的是什么车，然后带参数跳转到车系页面
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