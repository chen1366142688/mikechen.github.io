//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        imgUrls: [
            '../../images/11.jpeg',
            '../../images/22.jpeg',
            '../../images/33.jpeg',
            '../../images/44.jpeg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000
    },
    onLoad: function () {
    },
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function () {

    },
    btnForm:function () {
        wx.navigateTo({
            url: '../form/form'
        })
    },
});
