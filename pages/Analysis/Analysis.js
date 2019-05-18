// pages/Analysis/Analysis.js
var Promise = require('../../utils/es6-promise.auto.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectorItems:  null,
    selectorIds:null
  },
  // selectorChange选择课程函数
  selectorChange: function(e) {
    let i = e.detail.value; //获得选项的数组下标
    let value = this.data.selectorItems[i]; //获得选项的值
    let id = this.data.selectorIds[i];
    var that=this;
    wx.request({
      url: getApp().globalData.baseUrl+'/stu/paper/analysis/' + id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        res.data.percentage = res.data.percentage.toFixed(2)
        wx.request({
          url: getApp().globalData.baseUrl +'/stu/grade/analysis/' + id,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res1) {
            console.log(res1.data)
            that.setData({
              paper_name: value,
              paper_id: id,
              selector: value,
              analysis: res.data,
              gradeAnalysis: res1.data
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取数据
    var appInstance = getApp()
    var userId = appInstance.globalData.userInfo.id
    var that = this
   
      wx.request({
        url: getApp().globalData.baseUrl + '/stu/paper/list/' + userId,
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (dat) {
          console.log(dat.data)
          var papers = dat.data
          var paperNames = Array()
          var paperIds = Array()
          for (var i = 0; i < papers.length; i++) {
            paperNames.push(papers[i].paperName)
            paperIds.push(papers[i].id)
          }
          appInstance.globalData.paperIds = paperIds
          appInstance.globalData.paperNames = paperNames
          wx.request({
            url: getApp().globalData.baseUrl + '/stu/paper/analysis/' + paperIds[0],
            headers: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              res.data.percentage = res.data.percentage.toFixed(2)
              wx.request({
                url: getApp().globalData.baseUrl + '/stu/grade/analysis/' + paperIds[0],
                headers: {
                  'Content-Type': 'application/json'
                },
                success: function (res1) {
                  console.log(res1.data)
                  that.setData({
                    paper_name: paperNames[0],
                    paper_id: paperIds[0],
                    selector: paperNames[0],
                    selectorItems: paperNames,
                    selectorIds: paperIds,
                    analysis: res.data,
                    gradeAnalysis: res1.data
                  })
                }
              })
            }
          })
        }
      })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    var paperIds = getApp().globalData.paperIds
    if(paperIds==undefined){
      return;
    }
    var paperNames = getApp().globalData.paperNames
    wx.request({
      url: getApp().globalData.baseUrl + '/stu/paper/analysis/' + paperIds[0],
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        res.data.percentage = res.data.percentage.toFixed(2)
        wx.request({
          url: getApp().globalData.baseUrl + '/stu/grade/analysis/' + paperIds[0],
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res1) {
            console.log(res1.data)
            that.setData({
              paper_name: paperNames[0],
              paper_id: paperIds[0],
              selector: paperNames[0],
              selectorItems: paperNames,
              selectorIds: paperIds,
              analysis: res.data,
              gradeAnalysis: res1.data
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})