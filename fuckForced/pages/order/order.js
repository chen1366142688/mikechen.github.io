// order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbars: [{ 'ac': '我发出的', 'active': 'active' }, { 'ac': '我看过的', 'active': '' }, { 'ac': '最近浏览', 'active': ''}],
    userInfo: {},
    count:3,
    money:1.9,
    zuiJin:false,
    users: [
      {
        'imgSrc': '../../images/nickImg.jpg',
        'title': '猜猜这是谁呀',
        'num': '6人看过，共10:00元',
        'date': '10月1日 10:20'
      },
      {
        'imgSrc': '../../images/nickImg2.jpg',
        'title': '难道是鬼！',
        'num': '6人看过，共10:00元',
        'date': '10月1日 10:20'
      },
      {
        'imgSrc': '../../images/nickImg3.jpg',
        'title': '不想看啊',
        'num': '6人看过，共10:00元',
        'date': '10月1日 10:20'
      },
      {
        'imgSrc': '../../images/nickImg4.jpg',
        'title': '到底是什么啊',
        'num': '6人看过，共10:00元',
        'date': '10月1日 10:20'
      },
      {
        'imgSrc': '../../images/nickImg5.jpg',
        'title': '不知道是什么啊',
        'num': '6人看过，共10:00元',
        'date': '10月2日 10:21'
      }
    ],
    userItem: [
      { 
        'imgSrc':'../../images/nickImg.jpg',
        'title':'猜猜这是谁呀',
        'num': '6人看过，共10:00元',
        'date':'10月1日 10:20'
        },
      {
        'imgSrc': '../../images/nickImg2.jpg',
        'title': '难道是鬼！',
        'num': '6人看过，共10:00元',
        'date': '10月1日 10:20'
      },
      { 
        'imgSrc': '../../images/nickImg3.jpg',
        'title': '不想看啊', 
        'num': '6人看过，共10:00元',
        'date': '10月1日 10:20'
      },
      {
        'imgSrc': '../../images/nickImg4.jpg',
        'title': '到底是什么啊',
        'num': '6人看过，共10:00元',
        'date': '10月1日 10:20'
      },
      {
        'imgSrc': '../../images/nickImg5.jpg',
        'title': '不知道是什么啊',
        'num': '6人看过，共10:00元',
        'date': '10月2日 10:21'
      }
      ],
    userItemInfo: [
      {
        'imgSrc': '../../images/nickImg5.jpg',
        'title': 'MikeChen',
        'num': '猜猜这是谁呀',
        'date': '10月1日 10:20'
      },
      {
        'imgSrc': '../../images/nickImg4.jpg',
        'title': 'tissst',
        'num': '难道是鬼！',
        'date': '10月1日 10:20'
      },
      {
        'imgSrc': '../../images/nickImg3.jpg',
        'title': 'roset',
        'num': '不想看啊',
        'date': '10月1日 10:20'
      },
      {
        'imgSrc': '../../images/nickImg2.jpg',
        'title': 'bugTop',
        'num': '到底是什么啊',
        'date': '10月1日 10:20'
      },
      {
        'imgSrc': '../../images/nickImg.jpg',
        'title': 'postGet',
        'num': '不知道是什么啊',
        'date': '10月2日 10:21'
      }
    ],
      renshu:'看过人数(个)',
      shoudao:'收到打赏(元)',
      yous:false,
      prompt: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    } else if (this.data.canIUse) {
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
  active:function(e){
    console.log(e.target.dataset.value)
    var index = e.target.dataset.value;
    var that=this;
    var navs=that.data.navbars;
    if(index == 1){
        that.setData({
          renshu:'看过照片(张)',
          shoudao:'打赏金额(元)',
          yous:true,
          zuiJin: false,
          prompt: true,
          count: 2,
          money: 0.11,
          userItem: that.data.userItemInfo
        })
    }else if(index == 2){
        that.setData({
          zuiJin:true,
          userItem: that.data.userItemInfo,
          prompt:false
        })
    }else{
      that.setData({
        renshu: '看过人数(个)',
        shoudao: '收到打赏(元)',
        yous: false,
        zuiJin: false,
        prompt: true,
        count:3,
        money:1.9,
        userItem: that.data.users
      })
    }
      for (var i in navs) {
        if (index == i) {
          navs[i].active = 'active';
        }else{
          navs[i].active = '';
        }
        that.setData({
          navbars: navs
        })
      }
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