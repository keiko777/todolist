//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '添加自己的代办事项',
    userInfo: {},
    hasUserInfo: false,
    showModalStatus: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    areaIndex: 0,
    area: ['工作', '学习', '休息', '娱乐']
  },
  //获取用户输入的事项的值
  getUserEvent: function (e) {
    this.setData({
      userEvent: e.detail.value
    })
  },
  //获取用户输入的时间的值
  getUserTime: function (e) {
    this.setData({
      userTime: e.detail.value
    })
  },
  //获取用户输入事件类型
  getUserType: function (e) {
    this.setData({
      userType: e.detail.value.instrument
    })
  },
  //点击确定返回数据
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
  },
  submit:function(e){
    if (this.data.userEvent == undefined || this.data.userTime == undefined) {
      this.setData({
        tip: '提示：事项和时间不能为空！'
      })
    } else {
      //关闭弹框
      var currentStatu = e.currentTarget.dataset.statu;
      this.util(currentStatu);
      //获取数据
      var event = this.data.userEvent;
      var utime = this.data.userTime;
      var etype = this.data.area[this.data.areaIndex]    
      console.log(this.data.userEvent);
      console.log(this.data.userTime);
      console.log(this.data.area[this.data.areaIndex]);
      // wx.navigateTo({
      //   url: ''
      // })
      wx.reLaunch({
        url: '../event/event?event=' + event + '&time=' + utime + '&type=' + etype
      })
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //获取picker改变的值
  bindPickerChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  }
})
