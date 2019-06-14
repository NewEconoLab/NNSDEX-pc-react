import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface IMydomainStore
{
    inputSearchValue: string,
    fillterType: string,// 过滤条件
    orderbyType: string, // 排序条件
    mydomainPage: number, // 页码
    mydomainSize: number, // 条数
    domainListCount: number,
    domainList: IDomainList[],
    editDomain:IDomainList|null,// 转让的域名
    mapDomain:IDomainList|null, // 映射的域名
    showEditNum:number,// 默认为0 不显示，1为转让域名，2为映射地址
    getDomainList: (addr: string) => Promise<boolean>
}
export interface IMydomainProps extends RouteComponentProps
{
    mydomain: IMydomainStore,
    common: ICommonStore,
    intl: any
}
export interface IDomainList
{
    orderid: string, // 订单号
    fulldomain: string,  // 域名
    ttl: number, // 过期时间
    data: string,// 映射地址
    isUsing: boolean, // 是否正在使用
    isSelling: boolean, // 是否正在出售
    isBind: boolean, // 是否绑定
    isTTL: boolean // 是否过期
    active: boolean // 是否展开
}