import { observable, action } from 'mobx';
import * as Api from '../api/bourse.api'
import { ISaleMarketStore, ISaleList } from '../interface/salemarket.interface';

class Salemarket implements ISaleMarketStore
{
    @observable public salePage: number = 1;
    @observable public saleSize: number = 15;
    @observable public saleOrderBy: string = 'MortgagePayments_High';// 筛选排序方式
    @observable public saleAsset: string = 'All';// 筛选币种
    @observable public saleStar: string = 'All'; // 是否只看关注
    @observable public saleList: ISaleList[] = []; // 所有交易列表
    @observable public saleListCount: number = 0; // 所有交易总数
    @observable public resStar: boolean = false;

    /**
     * 获取Nep5交易列表（默认获取所有交易）
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getSaleList(addr: string)
    {
        let result: any = null;
        try
        {
            result = await Api.getselllist(addr, this.salePage, this.saleSize, this.saleOrderBy, this.saleAsset, this.saleStar);
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
    /**
     * 关注与取消关注的发送
     * @param addr 当前地址
     * @param asktype 关注类型，0表示出售类型的，1表示求购类型的
     * @param orderid 订单
     * @param type 关注状态 0为取消，1为关注
     */
    @action public async setStarDomain(addr: string, asktype: number, orderid: string, startype: number)
    {
        let result: any = null;
        try
        {
            result = await Api.stardomain(addr, asktype, orderid, startype);
        } catch (error)
        {
            this.resStar = false;
            return false;
        }
        this.resStar = result[0].res || false;
        return true;
    }
}
export default new Salemarket();