//Page Object
//引入用来发送请求的方法
import {request} from "../../request/index.js";
Page({
  data: {
    //轮播图数组
    swiperList:[],
    //金刚区数据存储
    cateList:[],
    //分类商品数据存储
    classGoodList:[]
  },
  //options(Object)
  onLoad: function(options) {
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({ 
    //       swiperList:result.data.message
    //     })
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    this.getSwiperList();
    this.getCateList();
    this.getClassGoodList();
  },
  //获取轮播图的数据
  getSwiperList(){
    request({
      url:'/home/swiperdata'})
      .then(result=>{
        this.setData({
          swiperList:result.data.message
        
      })
    })
  },
  //获取金刚区的数据
  getCateList(){
    request({
      url:'/home/catitems'})
      .then(result=>{
        this.setData({
          cateList:result.data.message
        
      })
    })
  },
  //分类商品数据
getClassGoodList(){
  request({
    url:'/home/floordata'})
    .then(result=>{
      this.setData({
        classGoodList:result.data.message
      
    })
  })
},
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  