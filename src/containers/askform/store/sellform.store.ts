import { observable, action } from 'mobx';
import { ISellFormStore, ISellDomainList } from '../interface/sellform.interface';
import * as Api from '../api/askform.api'

class SellFormTable implements ISellFormStore
{
    @observable public stepNumber: number = 1;  // 步骤显示
    @observable public sellDomainCount: number = 0;
    @observable public sellDomainList: ISellDomainList[] = [];
    @observable public pageIndex: number = 1;// 当前页面
    @observable public pageSize: number = 15;// 每页条数
    @observable public isLast: boolean = false;
    @observable public isLoading: boolean = false;
    @observable public readySellDomainName:string = ''; // 记录准备出售的域名
    @observable public readySellItem:ISellDomainList|null = null; // 记录准备出售的域名
    @observable public sellPrice:number = 0;
    @observable public sellAssetName:string = 'cgas';
    @observable public orderRank: number = 0;
    @observable public endNNCPrice:number = 0;

    @action public async getSellDomainList(addr: string, str: string, isFirst?: boolean)
    {
        console.log(addr+'---'+str+'---'+ isFirst+'---'+this.isLoading+'---'+this.isLast)
        // 如果是last 或者 上一条还在加载中 就 return
        if (this.isLast || this.isLoading)
        {
            return true;
        }
        console.log(2)
        // 设置正在加载中
        this.isLoading = true;
        let result: any = null;

        // 对定时刷新作处理
        let pageIndex = this.pageIndex;
        const pageSize = this.pageSize;

        if (!isFirst)
        {
            this.pageIndex++;
            pageIndex = this.pageIndex;
        }
        try
        {
            result = await Api.getcanselldomain(addr, str, pageIndex, pageSize);
            console.log(result)
        } catch (error)
        {
            // 报错 了统一认为到底部了
            this.isLast = true;
            return false;
        } finally
        {
            // 加载完成 后 把 值设置成 false
            this.isLoading = false;
        }
        const list = result ? result[0].list : [];
        // 如果加载到的没结果了，认为是 last 最后一页了
        if (list.length !== this.pageSize)
        {
            this.isLast = true;
        }
        this.sellDomainCount = result[0].count || 0;
        
        if (isFirst)
        {
            this.sellDomainList = list;
            return true;
        }
        this.sellDomainList.push(...list);
        this.sellDomainCount = result[0].count || 0;
        console.log(result[0].list)
        return true;
    }
     
    @action public async getOrderRank(num:number){
        let result: any = null;
        try
        {
            result = await Api.getorderrange(num);
            console.log(result)
        } catch (error)
        {
            this.orderRank = 0;
            return false;
        }
        this.orderRank = result[0].orderRange || 0;
        return true;
    }

}
export default new SellFormTable();