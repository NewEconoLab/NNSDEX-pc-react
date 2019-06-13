import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface IAskBuyMarketStore
{
    askbuyPage: number,
    askbuySize: number,
    askbuyOrderBy: string,// 筛选排序方式
    askbuyAsset: string,   // 筛选币种
    askbuyStar: string, // 是否只看关注
    askbuyList: IAskBuyList[],
    askbuyListCount: number,
    isAskbuyStar: boolean, // 关注与取消关注结果
    getAskBuyList: (addr: string) => Promise<boolean>,
    setAskbuyStarDomain: (addr: string, asktype: number, orderid: string, startype: number) => Promise<boolean>
}
export interface IAskBuyMarketProps extends RouteComponentProps
{
    askbuymarket: IAskBuyMarketStore,
    common: ICommonStore
    intl: any
}
export interface IAskBuyList
{
    orderid: string, // 订单号
    fullDomain: string, // 域名
    assetName: string, // 资产名称
    buyer: string, // 求购人
    price: string, // 资产价格
    isNewly: boolean, // 是否最新（3天内）
    canSell: boolean, // 是否可以出售给他
    isStar: boolean, // 是否标记关注
    isMineOrder:boolean // 是否是自己的求购挂单
}