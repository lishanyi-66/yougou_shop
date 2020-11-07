export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result)=>{
                resolve(result)
            },
            fail:(err)=>{err}
        });
    })
}
    
// promise 形式的chooseAddress
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{err},
            
        });
    })
}
// promise 形式的openSetting
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{err},
            complete: ()=>{}
        });
    })
}