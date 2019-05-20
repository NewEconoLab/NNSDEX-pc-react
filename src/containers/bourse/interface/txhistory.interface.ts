import { RouteComponentProps } from "react-router";

export interface ITxHistoryStore{
    txhistoryList:ITxHistoryList[],
    txhistoryListCount:number,
    getTxHistoryList:(page:number,size:number,orderby:string,asset:string)=>Promise<boolean>,
}
export interface ITxHistoryProps extends RouteComponentProps{
    txhistory:ITxHistoryStore,
    intl:any
}
export interface ITxHistoryList{
    fullDomain:string, // 域名
    assetName:string, // 资产名称
    price:string, // 资产价格
}