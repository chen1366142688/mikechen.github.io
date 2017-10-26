var app = getApp()
Page({
  data:{
    name:'',
    phone:'',
  },
  onload:function(){

  },
  name:function(e){
    let that=this;
    let name = e.detail.value
    that.setData({
      name:name
    })
    console.log(e.detail.value)
  },
  phone:function(e){
    let that=this;
    let phone = e.detail.value
    that.setData({
      phone: phone
    })
    console.log(e.detail.value)
  },
  beautyProgrammer:function(e){
    let that=this;
    console.log(that.data.name+that.data.phone)
    wx.request({
      url: 'https://scrap.chetuobang.com/ctb_test/user/' + that.data.name + '/' + that.data.phone,
      method:'POST',
      
      success:function(res){
        wx.showModal({
          title: '提示',
          content: '您已报名成功',
        })
      },
      fail:function(res){
        wx.showModal({
          title: '提示',
          content: '报名失败！',
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})