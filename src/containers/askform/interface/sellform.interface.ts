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
    getSellDomainList: (addr: string, str: string, isTime?: boolean, isFirst?: boolean)=>Promise<boolean>
}

export interface ISellFormProps extends RouteComponentProps{
    sellform:ISellFormStore,
    common:ICommonStore,
    intl: any,
}

export interface ISellDomainList {
    fulldomain:string,
    ttl:number,
    data:string,
    isUsing:boolean,
    isSelling:boolean,
    isBind:boolean,
    isTTL:boolean
}