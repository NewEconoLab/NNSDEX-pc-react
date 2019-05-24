import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface IAskBuyInfoStore{
    askbuyDomain:string,
    askbuyData:IAskbuyInfo|null,
    askbuyOtherList:IAskbuyOtherList[],
    ownerInfo:IOwnerInfo|null,
    getAskbuyInfo:(domain:string,addr:string)=>Promise<boolean>,
    getAskbuyOtherList:(domain:string,addr:string)=>Promise<boolean>,
    getDomainOwner:(domain:string,addr:string)=>Promise<boolean>
}
export interface IAskbuyInfoProps extends RouteComponentProps{
    askbuyinfo:IAskBuyInfoStore,
    common:ICommonStore,
    intl:any
}
export interface IAskbuyInfo{
    fullDomain:string, // 域名    
    ttl:number, // 到期时间
    buyer:string, // 求购人
    price:string, // 求购价格
    time:number, // 上架时间
    assetName:string, // 资产类型
}
export interface IAskbuyOtherList{
    assetHash:string,
    assetName:string,
    time:number,
    address:string,
    price:string,
    orderType:string,
    sellType:number
}
export interface IOwnerInfo{
    domain:string,
    isOwn:boolean,
    isLaunch:boolean
}