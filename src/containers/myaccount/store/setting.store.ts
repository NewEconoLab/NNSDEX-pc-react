import { observable, action } from 'mobx';
import * as Api from '../api/myaccount.api'
import { ISettingStore, IEmailState } from '../interface/setting.interface';

class Setting implements ISettingStore
{
    @observable public emailState:IEmailState = {
        verifyState:'0', // 验证状态 0为未验证，1为已验证，2为等待发送验证码，3为已发送验证码
        email:'', // 邮箱
        activeState:'0', // 激活状态 1为已激活，0为未激活
    };
    @observable public bindResult:string = '';
    @observable public clearResult:boolean=false;// 清除绑定结果
    @observable public verifyResult:string='' // 邮箱验证状态码
    

    /**
     * 查询该域名出售详情
     * @param domain 域名
     */
    @action public async getEmailState(addr:string)
    {
        let result: any = null;
        try
        {
            result = await Api.getemailstate(addr);
        } catch (error)
        {
            return false;
        }
        this.emailState = result[0];        
        console.log(result[0])
        return true; 
    }
    @action public async bindEmail(addr:string,email:string)
    {
        let result: any = null;
        try
        {
            result = await Api.bindemail(addr,email);
        } catch (error)
        {
            this.bindResult = '';
            return false;
        }
        this.bindResult = result[0].res || '';
        
        console.log(result[0])
        return true; 
    }
    @action public async clearEmail(addr:string,email:string)
    {
        let result: any = null;
        try
        {
            result = await Api.clearemail(addr,email);
        } catch (error)
        {
            this.clearResult = false;
            return false;
        }
        this.clearResult = result[0].res || false;
        
        console.log(result[0])
        return true; 
    }
    @action public async verifyEmail(addr:string,email:string,code:string)
    {
        let result: any = null;
        try
        {
            result = await Api.verifyemail(addr,email,code);
        } catch (error)
        {
            this.verifyResult = '';
            return false;
        }
        this.verifyResult = result[0].res || '';
        
        console.log(result[0])
        return true; 
    }
}
export default new Setting();