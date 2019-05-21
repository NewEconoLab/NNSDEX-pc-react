import { RouteComponentProps } from "react-router";

export interface IAskBuyMarketStore{
    askbuyList:IAskBuyList[],
    askbuyListCount:number,
    getAskBuyList:(page:number,size:number,orderby:string,asset:string,star:string)=>Promise<boolean>,
}
export interface IAskBuyMarketProps extends RouteComponentProps{
    askbuymarket:IAskBuyMarketStore,
    intl:any
}
export interface IAskBuyList{
    fullDomain:string, // 域名
    assetName:string, // 资产名称
    buyer:string, // 求购人
    price:string, // 资产价格
    isNewly:boolean, // 是否最新（3天内）
    canSell:boolean, // 是否可以出售给他
    isStar:boolean // 是否标记关注
}