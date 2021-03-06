import { observable, action } from 'mobx';
import * as Api from '../api/myaccount.api'
import { IMydomainStore, IDomainList, IMapping } from '../interface/mydomain.interface';

class Mydomain implements IMydomainStore
{
    @observable public inputSearchValue: string = ''; // 搜索域名字段
    @observable public fillterType: string = '';// 过滤条件
    @observable public orderbyType: string = 'fulldomain'; // 排序条件
    @observable public mydomainPage: number = 1; // 页码
    @observable public mydomainSize: number = 15; // 条数
    @observable public domainListCount: number = 0;
    @observable public domainList: IDomainList[] = []; // 我的域名
    @observable public editDomain:IDomainList|null = null; // 转让的域名
    @observable public mapDomain:IDomainList|null = null; // 映射的域名
    @observable public showEditNum:number = 0;// 默认为0 不显示，1为转让域名，2为映射地址
    @observable public mappingAddress:IMapping|null = null;// 已经映射的地址

    /**
     * 查询该域名出售详情
     * @param domain 域名
     */
    @action public async getDomainList(addr: string)
    {
        let result: any = null;
        try
        {
            result = await Api.getdomainlist(addr, this.inputSearchValue, this.fillterType, this.orderbyType, this.mydomainPage, this.mydomainSize);
        } catch (error)
        {
            this.domainListCount = 0;
            this.domainList = []
            return false;
        }
        this.domainListCount = result[0].count || 0;
        this.domainList = result[0].list || [];
        this.domainList = this.domainList.map((item: IDomainList) =>
        {
            return {
                ...item,
                active: false
            }
        })
        console.log(result[0])
        return true;
    }
    @action public async getAddressByDomain(domain:string){
        let result: any = null;
        try
        {
            result = await Api.getresolvedaddress(domain);
        } catch (error)
        {
            this.mappingAddress = null;            
            return false;
        }
        this.mappingAddress = result[0];
        console.log('getAddressByDomain:'+result)
        return true;
    }
}
export default new Mydomain();