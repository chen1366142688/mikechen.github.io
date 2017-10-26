// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    car: ['2017款 1.8T 手动两驱都市进取型', '2017款 1.8T 手动两驱都市精英型', '2017款 1.8T 手动两驱都市精英型', '2017款 1.8T 都市精英型', '2017款 1.8T 都市进取型', '2017款 1.8T 都市进取型', '2017款 1.8T 手动两驱都市进取型', '2017款 1.8T 手动两驱都市进取型','2017款 1.8T 都市精英型']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //这里应该获取到用户选择的当前车型，然后是本地查找还是请求后端接口获取当前车系
  },
  carItem:function(e){
    console.log(e.currentTarget.dataset.value);
    //获取到当前车系后带着参数跳转到主页
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