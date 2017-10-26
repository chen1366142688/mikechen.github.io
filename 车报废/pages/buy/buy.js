// pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:[
      {
        "imgSrc": '../../images/car.png',
        "money": '5000'
      }
      ],
    buy: [
      { 
        'carBuy':'别克 昂科雷 2017款 1.8T 手动两驱都是豪华版',
        'manufacturer':'北京北汽有限公司',
        'time':'2017.01.01-2017.10.10',
        'Guide':'29.9'}
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收参数，然后请求当前车型的图片和详细信息
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