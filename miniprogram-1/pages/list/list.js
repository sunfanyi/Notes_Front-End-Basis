// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: 'hello world',
        imgSrc: '/images/profile_pic.jpg',
        randNum1: Math.random() * 10,
        randNum2: Math.random().toFixed(2),
        count: 0,
        inputMsg: '请输入：',
        type: 1,
        flag: true,
        arr1: ['苹果', '华为', '小米'],
        userList: [
            { id: 1, name: 'name_a' },
            { id: 2, name: 'name_b' },
            { id: 3, name: 'name_c' },
        ],
        apiData: ""
    },

    btnGoToMessage() {
        wx.switchTab({
          url: '/pages/message/message',
        })
    },

    btnGoToInfo() {
        wx.navigateTo({
        //   url: '/pages/info/info',
          url: '/pages/info/info?name=zs&age=20', // 传参
        })
    },

    btnApiGet() {
        wx.request({
            url: 'https://www.escook.cn/api/get',
            method: "GET",
            data: {
                name: "zs",
                age: 20,
            },
            success: (res) => {
                console.log(res.data)
            }
        })
    },

    btnApiPost() {
        wx.request({
            url: 'https://www.escook.cn/api/post',
            method: "POST",
            data: {
                name: "zs",
                age: 20,
            },
            success: (res) => {
                console.log(res.data)
            }
        })
    },

    btnChangeType() {
        var a = [1, 2, 3];
        this.setData({
            type: this.data.type = a[this.data.type % 3]
        })
    },

    btnConsoleLog(e) {
        console.log(e)
    },

    btnChangeCount() {
        this.setData({
            count: this.data.count + 1
        })
    },

    btnPassParameter(e) {
        console.log('value to add:', e.target.dataset.val_to_add)
        this.setData({
            count: this.data.count + e.target.dataset.val_to_add
        })
        console.log('result:', this.data.count)
    },

    inputConsoleLog(e) {
        console.log(e.detail.value)
    },

    inputUpdateData(e) {
        this.setData({
            inputMsg: e.detail.value
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // this.btnApiGet()
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
        console.log('下拉刷新')
        this.setData({
            count: 0
        })
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        console.log('上拉触底')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})