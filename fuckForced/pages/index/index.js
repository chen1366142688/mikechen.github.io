//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    imgSrc:'',
    imgOpacity:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(app.globalData.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(app.globalData.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  pushImg:function(e){
    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'https://aimage-point.chetuobang.com/image-point/uploadFile', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = JSON.parse(res.data);
            wx.navigateTo({
              url: '../photoCreat/photoCreat?imgPath=' + data.results,
            })
          },
          fail:function(res){
            console.log('--------后端返回错了，我什么都不知道----------')
            console.log(res)
          }
        })
        that.setData({
          imgSrc: tempFilePaths
        })
      }
    })
  },
  opacity:function(e){
    var that=this;
    console.log(e)
    that.setData({
      imgOpacity:e.detail.value+'px'
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  record:function(e){
    wx.redirectTo({
      url: '../../pages/order/order',
    })
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   *  1.需要的接口：获取用户unionid
   *  2.上传照片，描述，金额，
   *  3.我的记录（我发出的：看过人数，收到金额，图片，名称，几人看过，总共金额）
   *           （我看过的：看过几张照片，打赏金额，图片，图片发送人，图片详情，金额）
   *  4.账户余额
   *  5。提现到钱包
   *  6.
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
