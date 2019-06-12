// 存储全局变量
import { observable, action, computed } from 'mobx';
import { en_US, zh_CN } from '@/language';
import * as Wallet from '@/utils/wallet';
import * as Api from './api/common.api'
import { IAccountBalanceStore, ICommonStore } from './interface/common.interface';
import hashConfig from '@/config/hash.config';
import salemarketStore from '@/containers/bourse/store/salemarket.store';
import askbuymarketStore from '@/containers/bourse/store/askbuymarket.store';
import txhistoryStore from '@/containers/bourse/store/txhistory.store';
import mydeityStore from '@/containers/bourse/store/mydeity.store';
import mydomainStore from '@/containers/myaccount/store/mydomain.store';
import settingStore from '@/containers/myaccount/store/setting.store';

let lang = navigator.language;
lang = lang.substr(0, 2);
class Common implements ICommonStore
{
  @observable public isLoadTeemo: boolean = false; // 检测是否有Teemo钱包
  @observable public language: string = lang;  // 当前语言
  @observable public message: any | null = null;// 当前显示内容
  @observable public network: 'TestNet'|'MainNet' = process.env.REACT_APP_SERVER_ENV === 'DEV' ? 'TestNet':'MainNet';  // 当前网络
  @observable public address:string = ''; // 当前地址
  @observable public isSetedAddress:boolean = false;
  @observable public balances: IAccountBalanceStore =
  { contractnnc: 0, contractcgas: 0, cgas: 0, nnc: 0 };  // 初始化账户余额的信息
  @observable public fee: Neo.Fixed8 = Neo.Fixed8.Zero;
  @observable public isLoginFlag:number = 0;// 默认不显示,1表示未检查到teemo钱包,2为未登录钱包
  @observable public socket: any; // websoket
  
  @computed get webSocketURL()
  {
    if (this.network === 'MainNet')
    {
      return 'wss://testws.nel.group/ws/mainnet'
    }
    else
    {
      return 'wss://testws.nel.group/ws/testnet'
    }
  }

  // 初始化语言
  @action public initLanguage = () =>
  {
    const sessionLanguage = sessionStorage.getItem('language');
    if (sessionLanguage)
    {
      this.language = sessionLanguage;
    }
    if (this.language === 'zh')
    {
      this.message = zh_CN;
      return;
    }
    this.message = en_US;
  }
  // 设置语言
  @action public setLanguage = (msg: string) =>
  {
    if (msg === 'zh')
    {
      this.message = zh_CN;
      this.language = 'zh'
    } else
    {
      this.message = en_US;
      this.language = 'en'
    }
  }
  // 获取登陆态
  @action public getSessionAddress = () =>
  {
    const addr = sessionStorage.getItem('dexLogin');
    if (addr && addr !== '' && this.isLoadTeemo)
    {
      this.address = addr;
      this.initAccountBalance();
    }
  }

  // 初始化资产
  @action public initAccountBalance = async () =>
  {
    this.getContract();
    const result: any = await Wallet.getBalance();
    if (!result)
    {
      this.balances.nnc = 0;
      this.balances.cgas = 0;
      return false
    }
    this.balances.nnc = result[this.address][0].amount;
    this.balances.cgas = result[this.address][1].amount;
    console.log(JSON.stringify(this.balances))
    return true
  }
  /**
   * 获取注册器内资产
   */
  @action public getContract = async () =>
  {
    let result: any = null;
    try
    {
      result = await Api.getBalanceFromDex(this.address);      
    } catch (error)
    {
      this.balances.contractcgas = 0;
      this.balances.contractnnc = 0;
      return false;
    }
    if (result && result[0] && result[0].list.length > 0)
    {
      result[0].list.forEach(element =>
      {
        const id = element.assetHash as string;
        if (id.includes(hashConfig.ID_CGAS.toString()))
        {
          this.balances.contractcgas = element.balance;
        }
        else if (id.includes(hashConfig.ID_NNC.toString()))
        {
          this.balances.contractnnc = element.balance;
        }
      });
    }
    return true;
  }
  // 登陆
  @action public login = async () =>
  {
    if (this.isLoadTeemo)
    {
      const loginFlag: any = await Wallet.getAccount();
      console.log(loginFlag);
      if (!loginFlag)
      {
        this.address = '';
        this.isLoginFlag = 2;
        return
      }
      this.address = loginFlag.address;
      sessionStorage.setItem('dexLogin', this.address);
      this.initAccountBalance();      
    } else
    {
      this.address = '';
      this.isLoginFlag = 1;
      return
    }
    // this.login.show();
  }
  // 登出
  // @action public loginOut = () =>
  // {  
  //   alert("测试：已登出")
  //   // WalletApi.LoginInfo.info = null;
  //   this.address = '';
  //   sessionStorage.removeItem('dexLogin');
  // }
  @action public refreshCurrentPage = () => {
    console.log()
    if (this.socket)
    {
      this.socket.close()
    }
    console.log(this.network)
    console.log(this.webSocketURL)
    this.socket = new WebSocket(this.webSocketURL);

    this.socket.onclose = (event: any) =>
    {
      console.log(event);
      // notification.warning({ message: 'websocket', description: 'close' })
    };
    this.socket.onerror = (event: any) =>
    {
      console.log(event);
      // notification.error({ message: 'websocket', description: 'error' })
    };
    this.socket.onopen = (event: any) =>
    {
      console.log(event);
      this.socket.send('Hello Server!');
      // notification.success({ message: 'websocket', description: 'open on ' + this.webSocketURL })
    }
    this.socket.onmessage = (event: any) =>
    {
      const data = JSON.parse(event.data);
      console.log(data.data.blockHeight)
      // 初次链接
      if(data.type === 'LogIn'){
        return
      }
      // 更新首页
      if (window.location.pathname === '/bourse/salemarket' || window.location.pathname === '/test/bourse/salemarket')
      {
        // 出售市场
        salemarketStore.getSaleList(this.address)
      }else if(window.location.pathname === '/bourse/askbuymarket' || window.location.pathname === '/test/bourse/askbuymarket'){
        // 求购市场
        askbuymarketStore.getAskBuyList(this.address);
      }else if(window.location.pathname === '/bourse/txhistory' || window.location.pathname === '/test/bourse/txhistory'){
        // 成交历史
        txhistoryStore.getTxHistoryList(this.address);
      }else if(window.location.pathname === '/bourse/mydeity' || window.location.pathname === '/test/bourse/mydeity'){
        // 我的挂单
        mydeityStore.getMyDeityList(this.address);
      }else if(window.location.pathname === '/myaccount/balance' || window.location.pathname === '/test/myaccount/balance'){
        // 我的账户
        this.initAccountBalance();
      }else if(window.location.pathname === '/myaccount/mydomain' || window.location.pathname === '/test/myaccount/mydomain'){
        // 我的域名
        mydomainStore.getDomainList(this.address);
      }else if(window.location.pathname === '/myaccount/setting' || window.location.pathname === '/test/myaccount/setting'){
        // 账户设置
        settingStore.getEmailState(this.address);
      }
    }
  }
}

// 外部使用require
export default new Common();
