

export interface ICommonStore {
  language: string,
  message: any,
  network: string,
  isLoadTeemo:boolean,// 检测是否有Teemo钱包
  isLoginFlag:number,// 默认不显示,1表示未检查到teemo钱包,2为未登录钱包
  address: string, // 当前地址
  isSetedAddress:boolean; // 已经set 过address （有没有值不一定， 只是做过这个操作了）
  balances: IAccountBalanceStore,  // 账户余额的信息
  login: () => void,   // 显示登陆入口
  initAccountBalance: () => Promise<boolean>,  // 初始化账户余额
  initLanguage:()=>void;// 初始化语言
  setLanguage:(msg: string)=>void;// 设置语言
  getContract:() => Promise<boolean>, // 获取注册器资产
  getSessionAddress:()=>void // 获取登陆态
  refreshCurrentPage:()=>void
}
export interface ICommonProps{
  common:ICommonStore
}
export interface ILoginParam{
  address:string,
  label:string
}

export interface IAccountBalanceStore {
  contractnnc: number;  // 合约账户NNC余额
  contractcgas: number; // 合约账户CGAS余额
  nnc: number;  // 当前账户NNC余额
  cgas: number; // 当前账户CGAS余额
}
