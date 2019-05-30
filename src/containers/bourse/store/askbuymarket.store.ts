import { observable, action } from 'mobx';
import * as Api from '../api/bourse.api'
import { IAskBuyMarketStore, IAskBuyList } from '../interface/askbuymarket.interface';

class AskBuyMarket implements IAskBuyMarketStore
{
    @observable public askbuyList: IAskBuyList[] = []; // 所有交易列表
    @observable public askbuyListCount: number = 0; // 所有交易总数

    /**
     * 获取Nep5交易列表（默认获取所有交易）
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getAskBuyList(addr:string,page: number, size: number, orderby: string, asset: string, star: string)
    {
        let result: any = null;
        try
        {
            result = await Api.getakybuylist(addr, page, size, orderby, asset, star);
        } catch (error)
        {
            this.askbuyListCount = 0;
            this.askbuyList = [];
            return false;
        }
        this.askbuyListCount = result[0].count || 0;
        this.askbuyList = result ? result[0].list : [];
        console.log(result[0].list)
        return true; 
    }
}
export default new AskBuyMarket();