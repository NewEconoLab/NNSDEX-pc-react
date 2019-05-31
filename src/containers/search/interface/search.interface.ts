import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface ISearchStore{
    searchInfo:ISearchInfo|null, // 搜索详情
    likeCount:number,// 相似列表总数
    likeList:ILikeList[],// 相似列表
    searchStar:boolean, // 关注与取消关注结果
    getSearchInfo:(domain:string) => Promise<boolean>,
    getLikeList:(addr:string,domain:string,page:number,size:number)=> Promise<boolean>,
    setSearchStar:(addr:string,asktype:number,orderid:string,startype:number)=>Promise<boolean>
}
export interface ISearchProps extends RouteComponentProps{
    search:ISearchStore,
    common:ICommonStore,
    intl:any
}
export interface ISearchInfo{
    orderid:string,
    assetName:string,
    fulldomain:string,
    state:string,
    price:string
}
export interface ILikeList{
    orderid:string,
    fullDomain:string,
    sellType:number,
    assetName:string,
    nowPrice:string,
    saleRate:string,
    isStar:boolean,
    isMine:boolean
}