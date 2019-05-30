import { observable, action } from 'mobx';
import * as Api from '../api/bourse.api'
import { ISaleMarketStore, ISaleList } from '../interface/salemarket.interface';

class Salemarket implements ISaleMarketStore
{
    @observable public saleList: ISaleList[] = []; // 所有交易列表
    @observable public saleListCount: number = 0; // 所有交易总数

    /**
     * 获取Nep5交易列表（默认获取所有交易）
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getSaleList(addr:string,page: number, size: number, orderby: string, asset: string, star: string)
    {
        let result: any = null;
        try
        {
            result = await Api.getselllist(addr, page, size, orderby, asset, star);
        } catch (error)
        {
            this.saleListCount = 0;
            this.saleList = [];
            return false;
        }
        this.saleListCount = result[0].count || 0;
        this.saleList = result ? result[0].list : [];
        console.log(result[0].list)
        return true; 
    }
}
export default new Salemarket();