import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface IMydomainStore{
    domainListCount:number,
    domainList:IDomainList[],
    getDomainList:(addr:string,str:string,fillter:string,orderby:string,page:number,size:number)=>Promise<boolean>
}
export interface IMydomainProps extends RouteComponentProps{
    mydomain:IMydomainStore,
    common:ICommonStore,
    intl:any
}
export interface IDomainList{
    fulldomain:string,  // 域名
    ttl:number, // 过期时间
    data:string,// 映射地址
    isUsing:boolean, // 是否正在使用
    isSelling:boolean, // 是否正在出售
    isBind:boolean, // 是否绑定
    isTTL:boolean // 是否过期
    active:boolean // 是否展开
}