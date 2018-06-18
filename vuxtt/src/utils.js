


import {AlertModule} from 'vux';

export async function showModuleAlert(content,title='提示'){
  return new Promise(resolve=>{
    AlertModule.show({
      title: title,
      content: content,
      onShow () {
       // console.log('Module alert: I\'m showing ')
      },
      onHide () {
       // console.log('Module: I\'m hiding now');
        resolve();
      }
    })
  })
}



