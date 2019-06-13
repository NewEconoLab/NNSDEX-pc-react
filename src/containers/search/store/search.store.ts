import { observable, action } from 'mobx';
import * as Api from '../api/search.api';
import {stardomain} from '@/containers/bourse/api/bourse.api';
import { ISearchStore, ISearchInfo, ILikeList } from '../interface/search.interface';

class SearchPage implements ISearchStore
{
    @observable public searchInfo:ISearchInfo[] = [];
    @observable public likeCount: number = 0; 
    @observable public likeList: ILikeList[] = []; 
    @observable public searchStar:boolean = false;

    /**
     * 查询该域名详情
     * @param domain 域名
     */
    @action public async getSearchInfo(domain:string)
    {
        let result: any = null;
        try
        {
            result = await Api.searchInfo(domain);
        } catch (error)
        {
            this.searchInfo = [];
            return false;
        }
        this.searchInfo = result||[];
        // console.log(result[0])
        return true; 
    }
    /**
     * 获取该域名的其他相似域名
     * @param domain 域名
     */
    @action public async getLikeList(addr:string,domain:string,page:number,size:number)
    {
        let result: any = null;
        try
        {
            result = await Api.searchLikeList(addr,domain,page,size);
        } catch (error)
        {
            this.likeCount = 0;
            this.likeList = [];
            return false;
        }
        this.likeCount = result[0].count || 0;
        this.likeList =  result[0].list || [];
        // console.log(result[0].list)
        return true; 
    }

    /**
     * 关注与取消关注的发送
     * @param addr 当前地址
     * @param asktype 关注类型，0表示出售类型的，1表示求购类型的
     * @param orderid 订单
     * @param type 关注状态 0为取消，1为关注
     */
    @action public async setSearchStar(addr: string, asktype: number, orderid: string, startype: number)
    {
        let result: any = null;
        try
        {
            result = await stardomain(addr, asktype, orderid, startype);
        } catch (error)
        {
            this.searchStar = false;
            return false;
        }
        this.searchStar = result[0].res || false;
        return true;
    }
}
export default new SearchPage();