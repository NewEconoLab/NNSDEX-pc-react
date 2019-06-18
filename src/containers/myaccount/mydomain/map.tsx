/**
 * 域名交易
 */
import * as React from 'react';
import Button from '@/components/Button';
import './index.less';
import { observer } from 'mobx-react';
import { IMydomainProps } from '../interface/mydomain.interface';
import Hint from '@/components/hint/index';
import * as Neotool from '@/utils/neotools';
import { Contract } from '@/utils/contract';

@observer
export default class DomainMap extends React.Component<IMydomainProps> {
    public state = {
        set_contract:"0x6e2aea28af9c5febea0774759b1b76398e3167f1",
        addrInput:'',
        isCanMap:true
    }
    public render()
    {
        return (
            <div className="domain-edit-wrapper">
                <div className="domain-edit-content">
                    <div className="domain-edit-title">
                        <h3>映射地址</h3>
                    </div>
                    <div className="domain-edit-line">
                        <div className="edit-line-left">
                            域名
                        </div>
                        <div className="edit-line-right">
                            <strong>{this.props.mydomain.mapDomain && this.props.mydomain.mapDomain.fulldomain}</strong>
                        </div>
                    </div>
                    {
                        (this.props.mydomain.mapDomain && this.props.mydomain.mapDomain.data) && (
                            <div className="domain-edit-line edit-small">
                                <div className="edit-line-left">
                                    当前映射地址
                        </div>
                                <div className="edit-line-right">
                                    <strong className="orange-text">{this.props.mydomain.mapDomain.data}</strong>
                                </div>
                            </div>
                        )
                    }

                    <div className="domain-edit-line edit-small">
                        <div className="edit-line-left">
                            映射地址
                        </div>
                        <div className="edit-line-right">
                            <input type="text" className="edit-input" value={this.state.addrInput} onChange={this.verifyMapping} />
                            {
                                (this.props.mydomain.mapDomain && this.props.mydomain.mapDomain.data)&&<Hint text="如不填写地址则视为清空映射地址" />
                            }                            
                        </div>
                    </div>
                    <div className="domain-edit-btn-wrapper">
                        <Button text="取消" btnColor='white-btn' style={{ 'marginRight': '30px' }} onClick={this.handleToCloseTransfer} />
                        <Button text="修改" onClick={this.handleToMapping} btnColor={this.state.isCanMap?"":"gray-btn"} />
                    </div>
                </div>
            </div>
        )
    }
    private verifyMapping = async (event:React.ChangeEvent<HTMLInputElement>)=>{
        const value = event.target.value.trim(); 
        this.setState({
            addrInput:value
        })
        const res = Neotool.neotools.verifyAddress(value);
        if(value===''){
            this.setState({
                isCanMap:true
            })
        }
        else if(res){
            this.setState({
                isCanMap:true
            })
        }else{
            this.setState({
                isCanMap:false
            })
        }
    }

    // 转让域名确认 todo
    private handleToMapping = async() =>
    {
        if(!this.state.isCanMap){
            return
        }
        const domain = this.props.mydomain.mapDomain?this.props.mydomain.mapDomain.fulldomain:'';
        console.log(domain+'----'+this.state.addrInput)
        if(domain===''){
            return
        }
        const resolve = this.state.set_contract.hexToBytes().reverse();
        const res = await Contract.setResolveAndMap(domain,resolve,this.state.addrInput);
        console.log(res)
        this.handleToCloseTransfer();
    }
    // 关闭
    private handleToCloseTransfer = () =>
    {
        this.props.mydomain.showEditNum = 0;
    }

}