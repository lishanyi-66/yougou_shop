// pages/goods_list/index.js
import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,
        value:"综合",
        isActive:true,
      },
      {id:1,
        value:"销量",
        isActive:false,
      },
      {id:2,
        value:"价格",
        isActive:false,
      },
      
    ],
   //数据存储
   goodsList:[],
    },
    
    
    // 接口要的数据
     QueryParams:{
      query:'',
      cid:'',
      pagenum:1,
      pagesize:10,
  },
  //总的页数
  totalPage:1,

  hangleTabsItemChange(e){
    // console.log(e)
    const {index}=e.detail
    //修改原数组
    let {tabs}=this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.QueryParams.cid=options.cid
    this.getGoodsList();
  },

  // 获取商品列表数据
   async getGoodsList(){
    const res=await request({url:'/goods/search',data:this.QueryParams})
    console.log(res)
    // 获取总条数
    const total=res.data.message.toatal
    // 计算得到总页数
    this.totalPage=Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      goodsList:[...this.data.goodsList,...res.data.message.goods]
    })
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
  /* 
  下拉刷新
  1.触发下拉刷新事件，需要在页面的json文件中开启一个配置选项
  找到下拉刷新的事件
  2.重置数据 数组
  3.重置页面，设置为一
  4.重新发送请求
  */
  onPullDownRefresh: function () {
// 重置数据数组
this.setData({
  goodsList:[],

})
// 重置页码
this.QueryParams.pagenum=1,
// 发送请求
this.getGoodsList()
// 关闭下拉刷新动画
wx.stopPullDownRefresh()
  
  },

  /**
   * 页面上拉触底事件的处理函数
  //  */
  // 
  /* 用户上滑页面，滚动条触底，加载下一页数据 
  1.找到滚动条触底事件，
  2.判断还有没下一页数据
    （1）获取总页数  
    （2）总页数=Math.ceil(23/10)=3
    (3) 获取当前页吗
    （4）判断下，当前的页码是否大于等于总页数
        没有， 表示没有下一页数据
  3.假如没有下一页数据，弹出提示
  4.假如还有下一页数据，加载下一页数据
     1.当前的页面++
     2.重新发送请求
     3.数据请求回来， 要对DATA中的数组进行拼接  ，而不是全部替换！！！
  
  */
  onReachBottom: function () {
    if(this.QueryParams.pagenum>=this.totalPage){
      // wx.showToast({
      //   title: '没有数据了',
        
      // });
      console.log("没有数据了")
        
    }else{
      console.log("还有数据")
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})