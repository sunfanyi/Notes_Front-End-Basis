// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    shopList: [],
    isShopListLoading: false,
    page: 1,
    pageSize: 10,
    total: 0
  },

  getShopList(cb) {
    this.setData({
        isShopListLoading: true
    })

    wx.showLoading({
      title: '数据加载中。。。',
    })
    wx.request({
        url: `https://applet-base-api-t.itheima.net/categories/${this.data.query.id}/shops`,
        method: "GET",
        data: {
            _page: this.data.page,
            _limit: this.data.pageSize
        },
        success: (res) => {
            this.setData({
                shopList: [...this.data.shopList, ...res.data], // ... 用于转换成数组
                total: res.header['X-Total-Count'] - 0,  // - 0 用于转换成数值
            })
        },
        complete: () => {
            wx.hideLoading()
            this.setData({
                isShopListLoading: false
            })
            cb && cb() // 如果传入了cb函数则调用
        }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
        query: options
    }),
    this.getShopList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.title
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
        shopList: [],
        page: 1,
        total: 0
    })
    this.getShopList(() => {
        wx.stopPullDownRefresh() // 传递回调函数
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.page * this.data.pageSize >= this.data.total) { // 是否有下一页数据
        return wx.showToast({
          title: '数据加载完毕',
          icon: 'none'
        })
    }
    if (this.data.isShopListLoading) return
    this.setData({
        page: this.data.page + 1
    })
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})