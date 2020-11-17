// pages/goods_detail/index.js
// 发起请求
import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    goodsInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options
    console.log(goods_id);
    // 调用特定参数
    this.getGoodsDetail(goods_id)
    
  },
  // 请求详情数据
  async getGoodsDetail(goods_id){
    const goodsObj=await request({url:'/goods/detail', data:{
      goods_id
    }})
    this.goodsInfo=goodsObj
    console.log(goodsObj)
    this.setData({
      goodsObj
    })
    
  },
  handlePreviewImg(e){
    // console.log("图片展示")
    const urls=this.goodsInfo.data.message.pics.map(v=>v.pics_mid);
    // 接收传递过来的图片url
    const current=e.currentTarget.dataset.url
    wx.previewImage({
      current,// 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  /* 
  点击加入购物车
  1.先绑定点击事件
  2.获取缓存中的购物车数据，数组格式
  3.先判断，当前的商品是否已经存在购物车
  4.已经存在 修改商品数据 执行购物车数量++ 重新购物车数组缓存中

  */
  addCart(){
    // 获取缓存数据
    let cart=wx.getStorageSync("cart")||[];//空数组
    //判断缓存数据中是否存在数据
    let index=cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id)
    console.log(index)
    if(index===-1){
      //不存在 第一次添加
      this.goodsInfo.num=1
      // 选中框默认勾选
      this.goodsInfo.checked=true
      // 添加到cart数据中
      cart.push(this.goodsInfo)
      console.log(cart)
    }else{
      //已经存在购物车数据
      cart[index].num++;

    }
    console.log(cart[index])
    // 把购物车重新加回缓存中
    wx.setStorageSync("cart", cart);
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // 防止用户疯狂点击
      mask: true,
      
    });
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