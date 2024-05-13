// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  onShow() {  // 启动或后台切换到前台
      console.log('onShow')
  },
  onHide() {  // 切换到后台
      console.log('onHide')
  },
  globalData: {
    userInfo: null
  }
})
