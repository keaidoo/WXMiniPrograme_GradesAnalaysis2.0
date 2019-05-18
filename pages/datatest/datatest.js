Page({
  data: {
  },
  onLoad: function() {
    var that = this
    wx.request({
      url: getApp().globalData.baseUrl+'/stu/teacher/courses/1',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        //console.log(res.data)
        that.setData({
          list: res.data,
          //res代表success函数的事件对，data是固定的，list是数组
        })
      }
    })
  },
  /**
     * 点击跳转到参与会员/音乐列表/相关评论
     */

  Jump: function (e) {
    // 获取点击选项卡的下标
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      wx.navigateTo({
        url: '../xiangqing1/xiangqing1'
      })
    }  else {
      wx.navigateTo({
        url: '../xiangqing3/xiangqing3'
      })
    }
  },

})