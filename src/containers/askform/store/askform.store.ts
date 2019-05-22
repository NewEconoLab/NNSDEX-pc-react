import { observable } from 'mobx';
import { IAskFormStore } from '../interface/askform.interface';

class AskFormTable implements IAskFormStore
{
    @observable public stepNumber: number = 1;  // 步骤显示

}
export default new AskFormTable();