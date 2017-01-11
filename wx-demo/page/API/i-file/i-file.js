// page/API/i-file/i-file.js
Page({
  data:{
    tempFilePath: '',
    savedFilePaths: [],
    realSavedFilePaths: [],
    dialog: {
      hidden: true
    }
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          tempFilePath: res.tempFilePaths[0],
          dialog: {
            title: '选择成功',
            content: '点击保存图片，保存图片到本地',
            hidden: false
          }
        })
      }
    })
  },
  saveFile: function () {
    if (this.data.tempFilePath.length > 0) {
      var that = this
      wx.saveFile({
        tempFilePath: this.data.tempFilePath,
        success: function (res) {
          var temp_savedFilePaths = that.data.savedFilePaths;
          temp_savedFilePaths.push({path: res.savedFilePath});
          that.setData({
            savedFilePaths: temp_savedFilePaths
          })
          that.setData({
            tempFilePath: '',
            dialog: {
              title: '保存成功',
              content: '下次进入应用时，此文件仍可用',
              hidden: false
            }
          })
        },
        fail: function (res) {
          that.setData({
            dialog: {
              title: '保存失败',
              content: '应该是有 bug 吧',
              hidden: false
            }
          })
        }
      })
    }
  },
  getFileList: function () {
    var that = this;
    wx.getSavedFileList({
      success: function(res){
        console.dir(res);
        that.setData({
          realSavedFilePaths: res.fileList
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  getSavedFileInfo: function (e) {
    var opt = e.target.dataset, filePath = opt.value;
    var that = this;
    wx.getSavedFileInfo({
      filePath: filePath,
      success: function(res){
        console.log(res)
        that.setData({
          dialog: {
              title: filePath,
              content: 'size:'+res.size+'B '+'createTime:'+res.createTime,
              hidden: false
            }
        })
      },
      fail: function() {
        console.log('fail')
      },
      complete: function() {
        // complete
      }
    })
  },
  removeSavedFile: function (e) {
    var opt = e.target.dataset, filePath = opt.value;
    var that = this;
    wx.removeSavedFile({
      filePath: filePath,
      success: function(res){
        console.log(res)
        that.getFileList();
      },
      fail: function() {
        console.log('fail')
      },
      complete: function() {
        // complete
      }
    })
  },
  openDocument: function () {

    wx.downloadFile({
      url: 'http://localhost:88/document/test.txt',
      // type: 'image', // 下载资源的类型，用于客户端识别处理，有效值：image/audio/video
      // header: {}, // 设置请求的 header
      success: function(res){
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function(res){
            console.log(res)
          },
          fail: function() {
            console.log('fail')
          },
          complete: function() {
            console.log('complete')
          }
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  confirm: function () {
    this.setData({
      'dialog.hidden': true
    })
  }
})