declare var module: any

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './reset.less';
import { unregister } from './registerServiceWorker';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
import storeCommon from '@/store/common';
import Intl from 'intl';
import common from '@/store/common'; 

global.Intl = Intl;
window['Intl'] = Intl;
// common.setTimeGetBlock();
window.addEventListener('Teemo.NEO.READY',()=>{
  common.isLoadTeemo = true;
  common.getSessionAddress();
  // common.initAccountBalance();
});

// 网络切换
window.addEventListener('Teemo.NEO.NETWORK_CHANGED',(data:CustomEvent)=>{
  console.log("inject NETWORK_CHANGED ");
  console.log(data.detail.networks[0]);
  const base = data.detail.networks[0]==='MainNet'?'':'/test';
  const locations = window.location;
  // console.log(`${location.origin}${base || ''}${locations.pathname}${locations.search}${locations.hash}`)

  window.location.href = `${location.origin}${base || ''}${locations.pathname}${locations.search}${locations.hash}`
  // window.location.reload();
})
// 账户变更
window.addEventListener('Teemo.NEO.ACCOUNT_CHANGED',(data:CustomEvent)=>{
  console.log("inject ACCOUNT_CHANGED ");
  console.log(data.detail);
})
// 链接
window.addEventListener('Teemo.NEO.CONNECTED',(data:CustomEvent)=>{
  console.log("inject CONNECTED ");
  console.log(data.detail);
})
// 断开链接
window.addEventListener('Teemo.NEO.DISCONNECTED',(data:CustomEvent)=>{
  console.log("inject DISCONNECTED ");
  console.log(data.detail);
})

if (process.env.NODE_ENV === "development") {    
    // common.initLoginInfo(document.getElementById("test")as HTMLElement);
    ReactDOM.render(
      <AppContainer>
        <LocaleProvider locale={storeCommon.language === 'en' ? en_US : zh_CN}>
          <App />
        </LocaleProvider>
      </AppContainer>,
      document.getElementById('root') as HTMLElement
    );
    if (module.hot) {
      module.hot.accept();
    }
}

// 初始化鼠标随机方法
// Neo.Cryptography.RandomNumberGenerator.startCollectors();

if (process.env.NODE_ENV === "production") {
    // common.getSessionAddress();
    // common.initLoginInfo(document.getElementById("root")as HTMLElement);
    ReactDOM.render(
      <LocaleProvider locale={zh_CN}>
        <App />
      </LocaleProvider>,
      document.getElementById('root') as HTMLElement
    );
}

unregister();
