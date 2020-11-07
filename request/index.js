// 同时发送异步代码的次数
let ajaxtimes=0;
export const request=(params)=>{
    ajaxtimes++
    // 显示加载效果
    wx.showLoading({
        title:"加载中" ,
        mask: true,
        
    });
      
    //定义公共样式的url
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
           ...params,
           url:baseUrl+params.url,
           success:(result)=>{
               resolve(result)
           },
           fail:(err)=>{
               reject(err);
           },
           complete:()=>{
            //    关闭正在等待的图标
            ajaxtimes--;
            if(ajaxtimes===0){
                wx.hideLoading();
            }
            
              
           }
        });
    })
}