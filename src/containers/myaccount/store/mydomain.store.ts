import { observable, action } from 'mobx';
import * as Api from '../api/myaccount.api'
import { IMydomainStore, IDomainList } from '../interface/mydomain.interface';

class Mydomain implements IMydomainStore
{
    @observable public domainListCount:number = 0;
    @observable public domainList:IDomainList[] = []; // 出售的域名
    

    /**
     * 查询该域名出售详情
     * @param domain 域名
     */
    @action public async getDomainList(addr:string,str:string,fillter:string,orderby:string,page:number,size:number)
    {
        let result: any = null;
        try
        {
            result = await Api.getdomainlist(addr,str,fillter,orderby,page,size);
        } catch (error)
        {
            this.domainListCount = 0;
            this.domainList = []
            return false;
        }
        this.domainListCount = result[0].count || 0;
        this.domainList = result[0].list || [];
        this.domainList = this.domainList.map((item:IDomainList) => {
            return {
                ...item,
                active:false
            }
        })
        console.log(result[0])
        return true; 
    }
}
export default new Mydomain();