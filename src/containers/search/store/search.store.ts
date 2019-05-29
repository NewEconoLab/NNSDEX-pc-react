import { observable, action } from 'mobx';
import * as Api from '../api/search.api'
import { ISearchStore, ISearchInfo, ILikeList } from '../interface/search.interface';

class SearchPage implements ISearchStore
{
    @observable public searchInfo:ISearchInfo|null = null;
    @observable public likeCount: number = 0; 
    @observable public likeList: ILikeList[] = []; 

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
            this.searchInfo = null;
            return false;
        }
        this.searchInfo = result[0]||null;
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
}
export default new SearchPage();