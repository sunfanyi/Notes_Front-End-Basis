
Page({

    /**
     * 页面的初始数据
     */
    data: {
        colorList: [],
        isColorListLoading: false
    },

    getColors() {
        this.setData({
            isColorListLoading: true
        })

        wx.showLoading({
          title: '数据加载中。。。',
        })

        wx.request({
            url: 'https://applet-base-api-t.itheima.net/api/color',
            method: 'get',
            success: ({data: res}) => {
                this.setData({
                    colorList: [...this.data.colorList, ...res.data] // ... 用于转换成数组
                })
            },
            complete: () => {
                wx.hideLoading()
            }
        })

        this.setData({
            isColorListLoading: false
        })
    },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad(options) {
        this.getColors()
        this.getColors()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

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
            colorList: []
        })
        this.onLoad()
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (this.data.isColorListLoading) return
        this.getColors()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})