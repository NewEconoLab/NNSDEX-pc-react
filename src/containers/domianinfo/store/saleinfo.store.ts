import { observable, action } from 'mobx';
import * as Api from '../api/domaininfo.api'
import { ISaleInfoStore, ISaleInfo, ISaleOtherList } from '../interface/saleinfo.interface';

class SaleInfo implements ISaleInfoStore
{
    @observable public saleDomain:string = ''; // 出售的域名
    @observable public saleData: ISaleInfo|null = null; // 出售详情
    @observable public saleOtherList: ISaleOtherList[] = []; // 出售详情页中其他挂单

    /**
     * 查询该域名出售详情
     * @param domain 域名
     */
    @action public async getSaleInfo(domain:string)
    {
        let result: any = null;
        try
        {
            result = await Api.getselldetail(domain);
        } catch (error)
        {
            this.saleData = null;
            return false;
        }
        this.saleData = result[0]||null;
        // console.log(result[0])
        return true; 
    }
    /**
     * 出售详情页，获取该域名的其他挂单
     * @param domain 域名
     */
    @action public async getSaleOtherList(domain:string)
    {
        let result: any = null;
        try
        {
            result = await Api.getsellother(domain);
        } catch (error)
        {
            this.saleOtherList = [];
            return false;
        }
        this.saleOtherList = result ? result[0].list : [];
        // console.log(result[0].list)
        return true; 
    }
}
export default new SaleInfo();