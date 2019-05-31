import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface ISaleInfoStore{
    saleDomain:string, // 出售的域名
    saleData:ISaleInfo|null, // 出售域名的详情
    saleOtherList:ISaleOtherList[], // 其他挂单
    getSaleInfo:(orderid:string)=>Promise<boolean>,
    getSaleOtherList:(domain:string)=>Promise<boolean>,
}
export interface ISaleInfoProps extends RouteComponentProps{
    saleinfo:ISaleInfoStore,
    common:ICommonStore,
    intl:any
}
export interface ISaleInfo{
    orderid:string, // 订单号
    fullDomain:string, // 域名
    sellType:number, // 出售方式，0表示降价出售，1表示一口价
    seller:string, // 出售人
    startTimeStamp:number, // 上架时间
    ttl:number, // 到期时间
    nowPrice:string, // 出售价格
    salePrice:string // 下降幅度
    assetName:string, // 资产类型
    endPrice:string, // 最低价
}
export interface ISaleOtherList{
    orderid:string, // 订单号
    assetHash:string,
    assetName:string,
    time:number,
    address:string,
    price:string,
    orderType:string,
    sellType:number
}