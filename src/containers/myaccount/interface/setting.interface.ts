import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface ISettingStore{
    emailState:IEmailState,
    bindResult:string, // 邮箱绑定返回：0000为成功绑定，0101为重复绑定，0102为60秒内重复操作，0112为无效邮箱
    clearResult:boolean,// 清除绑定结果
    verifyResult:string, // 邮箱验证状态码，0000为成功，0111为无效地址，0112为无效邮箱，0113为通知功能未激活，0114为无效验证码，015为过期验证码
    getEmailState:(addr:string)=>Promise<boolean>,
    bindEmail:(addr:string,email:string)=>Promise<boolean>,
    clearEmail:(addr:string,email:string)=>Promise<boolean>,
    verifyEmail:(addr:string,email:string,code:string)=>Promise<boolean>,
}
export interface ISettingProps extends RouteComponentProps{
    setting:ISettingStore,
    common:ICommonStore,
    intl:any
}
export interface IEmailState{
    verifyState:string, // 验证状态 0为未验证，1为已验证，2为等待发送验证码，3为已发送验证码
    email:string, // 邮箱
    activeState:string, // 激活状态 1为已激活，0为未激活
}