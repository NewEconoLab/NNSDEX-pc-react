import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface IAskBuyStore{
    askBuyStep:number, // 求购挂单步骤
    askBuyDomain:string,// 求购的域名
    assetName:string, // 支付的资产名
    askBuyPrice:number, // 支付的金额
}

export interface IAskBuyProps extends RouteComponentProps{
    askbuy:IAskBuyStore,
    common:ICommonStore,
    intl: any,
}