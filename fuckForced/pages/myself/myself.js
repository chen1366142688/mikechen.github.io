// myself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:[
      { 
        'one':true,
        'gray':'',
        'tit': '[骚客之家]怎么玩？',
        'src':'../../images/bottom.png',
        'itemsInfo':'这是一个生成模糊照片的娱乐工具，好友发红包后才能快拿到清晰的照片'
      },
      {
        'one': true,
        'gray': '',
        'tit': '如何分享生成的模糊照片',
        'src': '../../images/bottom.png',
        'itemsInfo': '这是一个生成模糊照片的娱乐工具，好友发红包后才能快拿到清晰的照片'
      },
      {
        'one': true,
        'gray': '',
        'tit': '如何查看我发出的模糊照片',
        'src': '../../images/bottom.png',
        'itemsInfo': '这是一个生成模糊照片的娱乐工具，好友发红包后才能快拿到清晰的照片'
      },
      {
        'one': true,
        'gray': '',
        'tit': '如何删除我发出的照片或者浏览记录',
        'src': '../../images/bottom.png',
        'itemsInfo': '这是一个生成模糊照片的娱乐工具，好友发红包后才能快拿到清晰的照片'
      },
      {
        'one': true,
        'gray': '',
        'tit': '无法正常使用[骚客之家]或提示异常',
        'src': '../../images/bottom.png',
        'itemsInfo': '这是一个生成模糊照片的娱乐工具，好友发红包后才能快拿到清晰的照片'
      },
      {
        'one': true,
        'gray': '',
        'tit': '收到的打赏在哪，如何提现',
        'src': '../../images/bottom.png',
        'itemsInfo': '这是一个生成模糊照片的娱乐工具，好友发红包后才能快拿到清晰的照片'
      },
      {
        'one': true,
        'gray': '',
        'tit': '体现多久到账，会收取服务费吗',
        'src': '../../images/bottom.png',
        'itemsInfo': '这是一个生成模糊照片的娱乐工具，好友发红包后才能快拿到清晰的照片'
      },
      {
        'one': true,
        'gray': '',
        'tit': '注意事项',
        'src': '../../images/bottom.png',
        'itemsInfo': '这是一个生成模糊照片的娱乐工具，好友发红包后才能快拿到清晰的照片'
      },
      {
        'one': true,
        'gray': '',
        'tit': '如何联系客服',
        'src': '../../images/bottom.png',
        'itemsInfo': '这是一个生成模糊照片的娱乐工具，好友发红包后才能快拿到清晰的照片'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  btn:function(e){
    console.log(e)
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN',
      method:'POST',
      data:{
        touser:'openid',
        msgtype:'text/link',
        content:'hello',
        media_id:'id',
        title:'mike',
        description:'',
        url:'',
        picurl:'',
        pagepath:'',
        thumb_media_id:''
      },
      success:function(res){
        console.log("请求发消息成功");
        console.log(res)
      },
      fail:function(res){
        console.log("发消息失败了")
        console.log(res)
      }
    })
  },
  show:function(e){
    var index=e.target.dataset.value;
    var that=this;
    var logins=that.data.login
    if (logins[index].one== false){
        logins[index].one = true;
        logins[index].gray = '';
        that.setData({
          login: logins
        })
    }else{
      for (var i in logins) {
        if (index == i) {
          console.log(i)
          logins[i].one = false;
          logins[i].gray = 'gray';
          that.setData({
            login: logins
          })
        } else {
          logins[i].one = true;
          logins[index].gray = '';
          that.setData({
            login: logins
          })
        }

      }
      
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