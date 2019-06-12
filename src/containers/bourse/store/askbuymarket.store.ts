import { observable, action } from 'mobx';
import * as Api from '../api/bourse.api'
import { IAskBuyMarketStore, IAskBuyList } from '../interface/askbuymarket.interface';

class AskBuyMarket implements IAskBuyMarketStore
{
    @observable public askbuyPage: number = 1;
    @observable public askbuySize: number = 15;
    @observable public askbuyOrderBy: string = 'MortgagePayments_High';// 筛选排序方式
    @observable public askbuyAsset: string = 'All';  // 筛选币种
    @observable public askbuyStar: string = 'All'; // 是否只看关注
    @observable public askbuyList: IAskBuyList[] = []; // 所有交易列表
    @observable public askbuyListCount: number = 0; // 所有交易总数
    @observable public isAskbuyStar: boolean = false;

    /**
     * 获取Nep5交易列表（默认获取所有交易）
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getAskBuyList(addr: string)
    {
        let result: any = null;
        try
        {
            result = await Api.getakybuylist(addr, this.askbuyPage, this.askbuySize, this.askbuyOrderBy, this.askbuyAsset, this.askbuyStar);
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
    /**
     * 关注与取消关注的发送
     * @param addr 当前地址
     * @param asktype 关注类型，0表示出售类型的，1表示求购类型的
     * @param orderid 订单
     * @param type 关注状态 0为取消，1为关注
     */
    @action public async setAskbuyStarDomain(addr: string, asktype: number, orderid: string, startype: number)
    {
        let result: any = null;
        try
        {
            result = await Api.stardomain(addr, asktype, orderid, startype);
        } catch (error)
        {
            this.isAskbuyStar = false;
            return false;
        }
        console.log(result)
        this.isAskbuyStar = result[0].res || false;
        return true;
    }
}
export default new AskBuyMarket();