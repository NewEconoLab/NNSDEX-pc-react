

export interface ICommonStore {
  language: string,
  message: any,
  network: string,
  isLoadTeemo:boolean,// 检测是否有Teemo钱包
  // recordtype: number,// 记录序号
  // alertNumber: number,// 弹窗序号
  // setFeeFlag: boolean, // 设置手续费
  // // login: WalletApi.App, // 登陆页插件
  address: string, // 当前地址
  isSetedAddress:boolean; // 已经set 过address （有没有值不一定， 只是做过这个操作了）
  // pubkey: Uint8Array; // 当前公钥
  balances: IAccountBalanceStore,  // 账户余额的信息
  // diceConfig: IDiceConfig,
  // queryLoginInfo: () => WalletApi.LoginInfo,  // 获得登陆信息的接口
  // initLoginInfo: (content: HTMLElement) => void,  // 初始化登陆方法
  login: () => void,   // 显示登陆入口
  initAccountBalance: () => Promise<boolean>,  // 初始化账户余额
  // loginOut: () => void, // 登出
  initLanguage:()=>void;// 初始化语言
  setLanguage:(msg: string)=>void;// 设置语言
  // getNNCBalance: () => Promise<boolean>, // 获取nnc资产
  // getCGASBalance: () => Promise<boolean>, // 获取cgas资产
  getContract:() => Promise<boolean>, // 获取注册器资产
  // getBlockHeight:()=>Promise<boolean>, // 获取区块高度
  // updateAllData:()=>Promise<boolean>, // 更新所有
  // setTimeGetBlock:()=>Promise<boolean>, // 定时请求高度
  getSessionAddress:()=>void // 获取登陆态
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

/**
 * @param {number} state 0代表暂无权限 ；1代表有权限
 * @param {number} minBet 最小下注单位
 * @param {number} maxWinValue 每次最多能赢的钱
 * @param {number} deadLine 合约拥有得资产少于这个不准下注
 * @param {number} commission 下注抽成率
 * @param {string} transferBackMethod 资产的转账方法 
 */
export interface IDiceConfig {
  state: number; // 0代表暂无权限 ；1代表有权限
  minBet: number;// 最小下注单位
  maxWinValue: number;// 每次最多能赢的钱
  deadLine: number;// 合约拥有得资产少于这个不准下注
  commission: number;// 下注抽成率
  transferBackMethod: string;// 资产的转账方法 
}

export class AccountBalance {
  public contractnnc: number;  // 合约账户NNC余额
  public contractcgas: number; // 合约账户CGAS余额
  public nnc: number;  // 当前账户NNC余额
  public cgas: number; // 当前账户CGAS余额
  constructor() {
    this.contractcgas = 0;
    this.contractnnc = 0;
    this.nnc = 0;
    this.cgas = 0;
  }
}

export enum AlertType {
  no, // 默认不弹
  qa, // 问题与回答
  chest,  // 每日宝箱
  invatation, // 邀请有奖
  bonus, // 分红池
  exchange, // cgas兑换
  topup, // 充值筹码
  withdraw, // 提取筹码
  setfee, // 设置手续费
  lucky, // 幸运99
  rank, // 排行榜说明
  mlucky,// 移动版的幸运99
  mrank,// 移动版的排行榜
  rlucky,// 移动版的幸运99记录
}
export enum RecordType {
  allbet, // 全部投注记录
  mybet, // 我的投注记录
  exchange, // 筹码兑换记录
  lucky, // 幸运99记录
  invitation, // 邀请记录
  reward // 邀请奖励记录
}
export enum BetBalanceType {
  cgas, // Cgas资金
  nnc // nnc资金
}