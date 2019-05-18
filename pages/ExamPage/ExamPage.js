// pages/ExamPage/ExamPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    getApp().globalData.paper_id = options.paper_id
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
    var that = this
    var paperId = getApp().globalData.paper_id
    wx.request({
      url: getApp().globalData.baseUrl+'/stu/paper/info/' + paperId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        for (var i = 0; i < res.data.questions.length; i++) {
          var s = ''
          for (var j = 0; j < res.data.questions[i].knowledgePoints.length; j++) {
            s += res.data.questions[i].knowledgePoints[j].name + ' '
          }
          res.data.questions[i].points = s
        }
        console.log(res.data)
        that.setData({
          paperInfo: res.data,
        })
      }
    })
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