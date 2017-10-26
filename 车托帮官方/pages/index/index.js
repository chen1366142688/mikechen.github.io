//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  gotoRoad: function () {
      wx.navigateToMiniProgram({
          appId: 'wxcd893ba9afa67947',
          path: '',
          extraData: {},
          envVersion: '',
          success: function (res) {
              console.log('成功啦')
          },
          fail: function (res) { },
          complete: function (res) { },
      })
  },
  gotoRecharge: function () {
      wx.navigateToMiniProgram({
          appId: 'wx6032c87272aa3a12',
          path: '',
          extraData: {},
          envVersion: '',
          success: function (res) {
              console.log('成功啦')
          },
          fail: function (res) { },
          complete: function (res) { },
      })
  },
  gotoOilPrice: function () {
      wx.navigateToMiniProgram({
          appId: 'wx1b4229589f41a9b5',
          path: '',
          extraData: {},
          envVersion: '',
          success: function (res) {
              console.log('成功啦')
          },
          fail: function (res) { },
          complete: function (res) { },
      })
  },
   gotoCarQuery:function () {
      wx.navigateToMiniProgram({
          appId: 'wxaa15f2f75792c60b',
          path: '',
          extraData: {},
          envVersion: '',
          success: function (res) {
              console.log('成功啦')
          },
          fail: function (res) { },
          complete: function (res) { },
      })
  },
   /**
   * 用户点击右上角分享
   */
   onShareAppMessage: function () {

   },
  onLoad: function () {
    /**console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })**/
  }
})
