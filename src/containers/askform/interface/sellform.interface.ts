import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface ISellFormStore{
    stepNumber:number, // 普通挂单步骤
    sellDomainCount:number, // 可出售域名数量
    sellDomainList:ISellDomainList[], // 可出售域名列表
    pageIndex:number, // 当前页码
    pageSize: number, // 条数
    isLast:boolean, // 是否数据全部加载完了
    isLoading:boolean, // 是否正在加载
    readySellDomainName:string, // 准备出售的域名
    readySellItem:ISellDomainList|null, // 准备出售的域名详情
    sellStartPrice:number,// 出售的初始价格
    sellEndPrice:number,// 出售最低价格
    sellReducePrice:number,// 出售降价
    sellAssetName:string,// 出售的币种
    orderRank:number, // 排名
    endNNCPrice:number, // 最后抵押的nnc总数
    getSellDomainList: (addr: string, str: string, isFirst?: boolean)=>Promise<boolean>, // 获取可出售域名列表
    getOrderRank:(num:number)=>Promise<boolean>// 获取排队状况
}

export interface ISellFormProps extends RouteComponentProps{
    sellform:ISellFormStore,
    common:ICommonStore,
    intl: any,
}

export interface ISellDomainList {
    fulldomain:string,
    TTL:number
}