import { RouteComponentProps } from "react-router";

export interface ISaleMarketStore{
    saleList:ISaleList[],
    saleListCount:number,
    getSaleList:(page:number,size:number,orderby:string,asset:string,star:string)=>Promise<boolean>,
}
export interface ISaleMarketProps extends RouteComponentProps{
    salemarket:ISaleMarketStore,
    intl:any
}
export interface ISaleList{
    fullDomain:string, // 域名
    sellType:number, // 出售类型：0表示降价出售，1表示一口价
    assetName:string, // 资产名称
    ttl:string, // 到期事件
    nowPrice:string, // 当前价格
    saleRate:string, // 降价比例
    isMine:boolean, // 是否是自己的
    isStar:boolean // 是否标记关注
}