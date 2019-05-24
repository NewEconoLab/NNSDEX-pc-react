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
    @observable public readySellDomainName:string = ''

    @action public async getSellDomainList(addr: string, str: string, isTime?: boolean, isFirst?: boolean)
    {
        // 如果是last 或者 上一条还在加载中 就 return
        if (!isTime && (this.isLast || this.isLoading))
        {
            return true;
        }
        // 设置正在加载中
        this.isLoading = true;
        let result: any = null;

        // 对定时刷新作处理
        let pageIndex = this.pageIndex;
        let pageSize = this.pageSize;

        if (isTime)
        {
            pageIndex = 1;
            pageSize = this.pageIndex * this.pageSize;
        } else if (!isFirst)
        {
            this.pageIndex++;
            pageIndex = this.pageIndex;
        }
        try
        {
            result = await Api.getcanselldomain(addr, str, 'NotSell', 'NotBind', pageIndex, pageSize);
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
        if (list.length !== 15)
        {
            this.isLast = true;
        }
        this.sellDomainCount = result[0].count || 0;
        if (isTime)
        {
            this.sellDomainList = list;
            return true;
        }
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

}
export default new SellFormTable();