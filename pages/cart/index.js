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
  // 
  handleItemChange(e){
    // 获取点击事件对象的id
    const goods_id=e.currentTarget.dataset.id;
    console.log(goods_id)
    // 获取购物车中的对象
    let {cart}=this.data
    console.log(cart)
    // 找到要被修改的商品对象
    let index=cart.findIndex(v=>v.data.message.goods_id===goods_id)
    // 选中取反
    cart[index].checked=!cart[index].checked
    // 把购物车中的数据重新设置回data中和缓存中
    
    wx.setStorageSync('cart',cart)
    // // 计算总数量和总价
    // let allChecked=true;
    // let totalPrice=0;
    // let totalNum=0;
    // cart.forEach(v => {
    //   if(v.checked){
    //     totalPrice+=v.num * v.data.message.goods_price;
    //     totalNum+=v.num;
    //   }else{
    //     allChecked=false;
    //   }
    // })
    // // 判断下数组是否为空
    // allChecked=cart.length!=0?allChecked:false
    // // 给data赋值
    // this.setData({
    //   cart,
    //   allChecked,
    //   totalNum,
    //   totalPrice
    // })

  },
  // 设置购物车状态的同时，重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cart){
    let allChecked=true;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.data.message.goods_price
      }else{
        allChecked=false
      }
    })
    // 判断数组是否为空
    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      cart,
      totalPrice,totalNum,allChecked
    });
    wx.setStorageSync('cart',cart)
  },
  handleItemAllCheck(){
    // 获取data中的数据
    let {cart,allChecked}=this.data;
    // 修改值
    allChecked=!allChecked;
    // 循环修该cart数组中的商品选中状态
    cart.forEach(v=>v.checked=allChecked);
    // 修改后的值填充到data缓存中
    this.setCart(cart)
  },
  handleItemNumEdit(e){
    // 商品传递过来的参数
    const {operation,id}=e.currentTarget.dataset;
    let {cart}=this.data;
    const index=cart.findIndex(v=>v.goods_id===id);
    // 判断是否要执行删除
    if(cart[index].num===1&&operation===-1){
      // 弹窗设置
      wx.showModal({
        title: '提示',
        content: '您是否删除',
        success (res) {
          if (res.confirm) {
            cart.splice(index,1);
            this.setCart(cart);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
      
    }else{
      cart[index].num+=operation
    // 设置会缓存和data
    this.setCart(cart)
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
    // const allChecked=cart.length?cart.every(v=>v.checked):false
    // console.log(allChecked)
    // // 商品总价格
    let allChecked=true;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice+=v.num * v.data.message.goods_price;
        totalNum+=v.num;
      }else{
        allChecked=false;
      }
    })
    // 判断下数组是否为空
    allChecked=cart.length!=0?allChecked:false
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