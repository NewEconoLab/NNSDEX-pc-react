import { RouteComponentProps } from "react-router";

export interface IMyDeityStore{
    mydeityList:IMyDeityList[],
    mydeityListCount:number,
    getMyDeityList:(type:number,page:number,size:number)=>Promise<boolean>,
}
export interface IMyDeityProps extends RouteComponentProps{
    mydeity:IMyDeityStore,
    intl:any
}
export interface IMyDeityList{
    orderType:string, // 类型
    fullDomain:string, // 域名
    nowPrice:string, // 资产价格
    saleRate:number, // 降价幅度
    assetName:string, // 资产名称
    isDeal:boolean // 是否成交
}