// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
// import { getSetting,chooseAddress,openSetting } from "../../utils/asyncWx.js";
import {getSetting,chooseAddress,openSetting} from "../../utils/asyncWx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
address:{},
cart:[],
allChecked:false,
totalPrice:0,
totalNum:0
  },
  // handleChooseAddress(){
  //   // 获取权限
  //   wx.getSetting({
  //     success: (result)=>{
  //       // 获取权限状态，
  //       const scopeAddress=result.authSetting["scope.address"]
  //       if(scopeAddress===true||scopeAddress===underfined){
  //         wx.chooseAddress({
  //           success: (result)=>{
  //             console.log(result)
  //           },
            
  //         });
  //       }else{
  //         wx.openSetting({
  //           success: (result2)=>{
  //             wx.chooseAddress({
  //               success: (result3)=>{
  //                 console.log(result3)
  //               },
                
  //             });
  //           },
            
  //         });
  //       }
  //     },
      
  //   });
  // },
  async handleChooseAddress(){

    try{
      const res1=await getSetting();
      console.log(res1)
      const scopeAddress=res1.authSetting["scope.address"];
      // 判断权限状态
      if(scopeAddress===false){
        await openSetting()
      }
      // 调用获取地址的api
      const address=await chooseAddress()
      // 将数据存在缓存中
      wx.setStorageSync("address", address);

    }catch(error){
      console.log(error)
    }
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const address=wx.getStorageSync("address");
    const cart=wx.getStorageSync('cart')
    // 购物车全选设置逻辑
    // 1.onshow 中获取缓存中的购物车数据
    // 2.根据购物车中的商品数据所有的商品都被选中checked=true,
    // every()方法 空数组调用every 调用的就是true
    const allChecked=cart.length?cart.every(v=>v.checked):false
    console.log(allChecked)
    // 商品总价格
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice+=v.num * v.data.message.goods_price;
        totalNum+=v.num;
      }
    })
    // 给data赋值
    this.setData({
      address,
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
    // 
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