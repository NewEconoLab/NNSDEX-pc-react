import { observable } from 'mobx';
import { IAskBuyStore } from '../interface/askbuy.interface';

class AskBuyTable implements IAskBuyStore
{
    @observable public askBuyStep: number = 1;  // 步骤显示
    @observable public askBuyDomain:string = ''; // 求购的域名
    @observable public assetName:string = 'cgas'; // 支付的资产名
    @observable public askBuyPrice:number = 0; // 支付的金额

}
export default new AskBuyTable();