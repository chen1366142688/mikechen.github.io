// pages/photoCreat/photoCreat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc:'',
    start:0,
    end:10
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this;
    that.setData({
      imgSrc: options.imgPath
    })
  },
  btn:function(e){
    var that=this;
    wx.request({
      url: '',
      method:'POST',
      data:{
        iconPath:that.data.imgSrc,
        unionid:'uid'
      },
      success:function(res){
        console.log("上传到后端成功");
        console.log(res.data)
      },
      fail:function(res){
        console.log("上传失败了");
        console.log(res.data)
      }

    })
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
