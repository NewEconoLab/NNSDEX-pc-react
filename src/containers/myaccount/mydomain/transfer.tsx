/**
 * 域名交易
 */
import * as React from 'react';
import Button from '@/components/Button';
import './index.less';
import { observer } from 'mobx-react';
import { IMydomainProps } from '../interface/mydomain.interface';
import * as Neotool from '@/utils/neotools';
import * as formatTime from '@/utils/formatTime';
import { Contract } from '@/utils/contract';



@observer
export default class DomainTransfer extends React.Component<IMydomainProps> {
    public state = {
        transferOwner:'',
        transInput:'',
        isCanTransfer: false,        
    }
    public render()
    {
        return (
            <div className="domain-edit-wrapper">
                <div className="domain-edit-content">
                    <div className="domain-edit-title">
                        <h3>转让域名</h3>
                    </div>
                    <div className="domain-edit-line">
                        <div className="edit-line-left">
                            域名
                        </div>
                        <div className="edit-line-right">
                            <strong>{this.props.mydomain.editDomain&&this.props.mydomain.editDomain.fulldomain}</strong>
                        </div>
                    </div>
                    <div className="domain-edit-line edit-small">
                        <div className="edit-line-left">
                            转让至
                        </div>
                        <div className="edit-line-right">
                            <input type="text" className="edit-input" value={this.state.transInput} onChange={this.verifySetOwner} />
                            <br/>
                            {
                                this.props.mydomain.mappingAddress&&(
                                    <span className="gray-text">{this.props.mydomain.mappingAddress.data}&nbsp;有效期至：{formatTime.format('yyyy/MM/dd | hh:mm:ss', this.props.mydomain.mappingAddress.TTL.toString(), this.props.intl.locale)}</span>
                                )
                            }
                            
                        </div>
                    </div>
                    <div className="domain-edit-btn-wrapper">
                        <Button text="取消" btnColor='white-btn' style={{'marginRight':'30px'}} onClick={this.handleToCloseTransfer} />
                        <Button text="转让" onClick={this.handleToTransfer} btnColor={this.state.isCanTransfer?"":"gray-btn"} />
                    </div>
                </div>
            </div>
        )
    }
    // 校验转让输入
    private verifySetOwner = async (event:React.ChangeEvent<HTMLInputElement>)=>
    {
        const value = event.target.value.trim();        
        const isDomain = this.verifyDomain(value);
        this.props.mydomain.mappingAddress = null;
        if (!isDomain)
        {
            const res = Neotool.neotools.verifyAddress(value);
            // 如果地址正确
            if(res){
                this.setState({
                    isCanTransfer:true,
                    transferOwner:value
                })
            }else{
                this.setState({
                    isCanTransfer:false,
                    transferOwner:''
                })
            }
        } else
        {
            const domainName = value.toLowerCase();
            await this.getDomainAddress(domainName);
            // 如果存在映射地址
            if(this.props.mydomain.mappingAddress){
                this.setState({
                    isCanTransfer:true,
                    transferOwner:this.props.mydomain.mappingAddress?this.props.mydomain.mappingAddress["data"]:''
                })
            }else{
                this.setState({
                    isCanTransfer:false,
                    transferOwner:''
                })
            }
        }
        this.setState({
            transInput: value
        })
    }
    /**
     * 获取域名映射的地址
     * @param domainName 域名
     */
    private  getDomainAddress = async (domainName: string)=>
    {
        await this.props.mydomain.getAddressByDomain(domainName);        
    }
    // 校验转让内容输入是否为域名
    private verifyDomain=(domain:string)=>
    {
        const reg = /^(.+\.)(test|TEST|neo|NEO[a-z][a-z])$/;
        if (!reg.test(domain))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    // 转让域名确认 todo
    private handleToTransfer = async () =>
    {
        if(!this.state.isCanTransfer){
            return
        }
        const domain = this.props.mydomain.editDomain?this.props.mydomain.editDomain.fulldomain:'';    
        console.log(domain+"---"+this.state.transferOwner)    
        if(domain==='' || this.state.transferOwner===''){
            return
        }
        const res = await Contract.transferOwner(domain,this.state.transferOwner);
        console.log(res)
        this.handleToCloseTransfer();
    }
    // 关闭
    private handleToCloseTransfer = () =>
    {
        this.props.mydomain.showEditNum = 0;
        this.props.mydomain.mappingAddress = null;
        this.setState({
            transferOwner:'',
            transInput:'',
            isCanTransfer:false
        })
    }

}