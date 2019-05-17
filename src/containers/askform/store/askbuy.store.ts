import { observable } from 'mobx';
import { IAskBuyStore } from '../interface/askbuy.interface';

class AskBuyTable implements IAskBuyStore
{
    @observable public askBuyStep: number = 1;  // 步骤显示

}
export default new AskBuyTable();