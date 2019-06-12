import { observable, action } from 'mobx';
import * as Api from '../api/bourse.api'
import { IMyDeityStore, IMyDeityList } from '../interface/mydeity.interface';

class Mydeity implements IMyDeityStore
{
    @observable public mydeityPage: number = 1;
    @observable public mydeitySize: number = 15;
    @observable public mydeityOrderBy: string = '0';// 筛选排序方式
    @observable public mydeityList: IMyDeityList[] = []; // 所有交易列表
    @observable public mydeityListCount: number = 0; // 所有交易总数

    /**
     * 获取Nep5交易列表（默认获取所有交易）
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getMyDeityList(addr: string)
    {
        let result: any = null;
        try
        {
            result = await Api.getmydeitylist(addr, parseInt(this.mydeityOrderBy, 10), this.mydeityPage, this.mydeitySize);
        } catch (error)
        {
            this.mydeityListCount = 0;
            this.mydeityList = [];
            return false;
        }
        this.mydeityListCount = result[0].count || 0;
        this.mydeityList = result ? result[0].list : [];
        console.log(result)
        return true;
    }
}
export default new Mydeity();