
import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左边的菜单数据
      leftMenuList:[],
      //右侧的商品数据
      rightContent:[],
      //接口数据
      Cates:[],
      currentIndex:0,
      scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取分类
    //先判断本地是否存储旧数据
    // {time:Data.now(),data:[...]}
    // 没有旧数据直接发起请求
    // 有旧数据，判断旧数据是否过期，根据过期与否判断是重新发起请求还是使用旧数据

    // （2）获取本地存储的数据，
    // cates key 关键帧
    const Cates=wx.getStorageSync("cates");
    //（3）判断
    if(!Cates){
      this.getCatsList()//发起请求
    }else{
      if(Date.now()-Cates.time>1000*600){
        this.getCatsList()//发起请求
      }else{
        this.Cates=Cates.data;
        let leftMenuList =this.Cates.map(v=>v.cat_name);
      //构造右侧商品
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
      }
    }
      
  },
  async getCatsList(){
    // request({
    //   url:'/categories'
    // })
    // .then(res=>{
    //   this.Cates=res.data.message;

    //   // （1）把接口的数据存入到本地存储中
    //   wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
        
    //   //构造左侧的大菜单数据
    //   let leftMenuList =this.Cates.map(v=>v.cat_name);
    //   //构造右侧商品
    //   let rightContent=this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent,
    //     scrollTop:0
    //   })
    // })
    const res=await request({url:'/categories'})
    
        this.Cates=res.data.message;
  
        // （1）把接口的数据存入到本地存储中
        wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
          
        //构造左侧的大菜单数据
        let leftMenuList =this.Cates.map(v=>v.cat_name);
        //构造右侧商品
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent,
          scrollTop:0
        })
      

  },
  // 右侧菜单点击事件
  handleItmeTap(e){
    console.log(e)
    //获得索引，给data中的currentIndex赋值
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
     
    this.setData({
      currentIndex:index,
      rightContent
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