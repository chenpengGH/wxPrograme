Page({
    data: {
        text: ''
    },
    testRequest: function () {
        const that = this;
        wx.request({
          url: 'http://localhost:3000/nodeLessons',
          data: {q: new Date().getTime()},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            console.log(res.data)
            that.setData({
                text: res.data
            })
          },
          fail: function() {
            console.log('fail')
          },
          complete: function() {
            console.log('complete')
          }
        })
    }
})
