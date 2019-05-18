// pages/login/login.js
Page({
  data: {
    username: '',
    password: ''
  },

  // 获取输入账号
  phoneInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 获取输入密码
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  login: function() {
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {

      // // 这里修改成跳转的页面
      // wx.showToast({
      //   title: '登录成功',
      //   icon: 'success',
      //   duration: 2000,
      //   success:function(){
      //     wx.switchTab({ 
      //    url: '../index/index'
      //     })
      //   }
      // })
      wx.request({
        url: getApp().globalData.baseUrl+'/stu/login',
        method:'POST',
        data:{
          username:this.data.username,
          password:this.data.password
        },
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          if(res.data==="failed"){
            wx.showToast({
              title: '用户名或密码错误',
              icon: 'none',
              duration: 2000
            })
          }else{
            var appInstance = getApp()
            appInstance.globalData.userInfo = res.data
            wx.switchTab({ 
              url: '../index/index'
            })
          }
        }
      })
    }
  }
})