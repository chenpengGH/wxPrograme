//app.js
App({
  onLaunch: function () {
    console.log('--- app.onlaunch ---');
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    console.log('--- app.getUserInfo ---');
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      console.log('--- wx.login ---');
      wx.login({
        success: function () {
          console.log('--- wx.login.success ---');
          console.log('--- wx.getUserInfo ---');
          wx.getUserInfo({
            success: function (res) {
              console.log('--- wx.getUserInfo.success ---');
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})