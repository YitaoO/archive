Page({ 
    data: { 
        isChecked:''
    }, 
    onLoad: function() { 
        this.setData({
            num:"1"
         })
    },
    isChecked(e){
        this.setData({
            num:e.target.dataset.num
         })
    },
    inspemx(){
        wx.navigateTo({
            url: '/pages/workBench/inspectioninfo/inspectioninfo',
          })
    }
})