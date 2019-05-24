import { observable, action } from 'mobx';
import * as Api from '../api/domaininfo.api'
import { IAskBuyInfoStore, IAskbuyInfo, IAskbuyOtherList, IOwnerInfo } from '../interface/askbuyinfo.interface';

class AskbuyInfo implements IAskBuyInfoStore
{
    @observable public askbuyDomain: string = '';
    @observable public askbuyData: IAskbuyInfo|null = null; // 求购详情
    @observable public askbuyOtherList: IAskbuyOtherList[] = []; // 求购详情页中其他挂单
    @observable public ownerInfo:IOwnerInfo|null = null; // 域名拥有详情
    /**
     * 查询该域名求购详情
     * @param domain 域名
     */
    @action public async getAskbuyInfo(domain:string,addr:string)
    {
        let result: any = null;
        try
        {
            result = await Api.getaskbuydetail(domain,addr);
        } catch (error)
        {
            this.askbuyData = null;
            return false;
        }
        this.askbuyData = result[0]||null;
        console.log(result[0])
        return true; 
    }
    /**
     * 求购详情页，获取该域名的其他挂单
     * @param domain 域名
     */
    @action public async getAskbuyOtherList(domain:string,addr:string)
    {
        let result: any = null;
        try
        {
            result = await Api.getaskbuyother(domain,addr);
        } catch (error)
        {
            this.askbuyOtherList = [];
            return false;
        }
        this.askbuyOtherList = result ? result[0].list : [];
        console.log(result[0].list)
        return true; 
    }
    @action public async getDomainOwner(domain:string,addr:string)
    {
        let result: any = null;
        try
        {
            result = await Api.getdomainowner(domain,addr);
        } catch (error)
        {
            this.ownerInfo = null;
            return false;
        }
        this.ownerInfo = result[0] || null;
        console.log(result[0])
        return true; 
    }
}
export default new AskbuyInfo();