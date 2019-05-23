/**
 * 交易余额
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Hint from '@/components/hint';
import Button from '@/components/Button';
import Select from '@/components/select';
import hashConfig from '@/config/hash.config';
import { Contract } from '@/utils/contract';

@observer
class TransactionBalance extends React.Component<any, any> {
    public state = {
        stepNum: 0,// 显示控制 0为显示余额，1为充值，2为提取，3为提示,4为失败
        selectId: '',// 选中资产的显示id
        topupValue: '', // 交易账户中的充值输入金额
        withdrawValue: '', // 提取金额
        canDoTopup:false, // 是否可充值
        canDoWithdraw:false, // 是否可提现
    }
    // 币种
    public typeOptions = [
        {
            id: 'cgas',
            name: 'CGAS'
        },
        {
            id: 'nnc',
            name: 'NNC'
        }
    ]
    public componentDidMount(){
        this.props.common.initAccountBalance();
    }
    // 选择币种
    public onCallback = (item) =>
    {
        this.setState({
            selectId: item.id
        })
    }

    public render()
    {
        return (
            <div className="balance-warpper">
                <div className="balance-title"><span className="wtitle">交易账户</span><Hint text="资金必须充值到交易账户后才能在交易域名时使用" /></div>
                <div className="balance-content">
                    <div className="bcontent-title"> 账户余额</div>
                    {this.state.stepNum === 0 && (
                        <>
                            <div className="bcontent-middle tbalance">
                                <div className="balance-smallbox">
                                    <div className="balance-name">CGAS</div>
                                    <div className="balance-number">{this.props.common.balances.contractcgas}</div>
                                </div>
                                <div className="balance-smallbox">
                                    <div className="balance-name">NNC</div>
                                    <div className="balance-number">{this.props.common.balances.contractnnc}</div>
                                </div>
                            </div>
                            <div className="bcontent-btn">
                                <Button text="提现" btnColor="white-btn" onClick={this.onWithdraw} />
                                <Button text="充值" onClick={this.onTopup} />
                            </div>
                        </>
                    )}
                    {
                        this.state.stepNum === 1 && (
                            <>
                                <div className="bcontent-middle bbalance">
                                    <div className="balance-smallbox">
                                        <div className="b2-text">充值币种</div>
                                        <div className="balance-select">
                                            <Select
                                                defaultValue='cgas'
                                                options={this.typeOptions}
                                                text=''
                                                onCallback={this.onCallback}
                                                style={{ 'width': '2rem' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="balance-smallbox">
                                        <div className="b2-text">充值金额</div>
                                        <div className="balance-input">
                                            <input type="text" className="" value={this.state.topupValue} onChange={this.onTopupValue} />
                                            <span className="tips-text">（{this.state.selectId === 'cgas' ? this.props.common.balances.cgas : this.props.common.balances.nnc}可用）</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bcontent-btn">
                                    <Button text="取消" btnColor="white-btn" onClick={this.onGoFiristStep} />
                                    <Button text="确定" onClick={this.doTopup} btnColor={this.state.canDoTopup ? '' : 'gray-btn'} />
                                </div>
                            </>
                        )
                    }
                    {
                        this.state.stepNum === 2 && (
                            <>
                                <div className="bcontent-middle bbalance">
                                    <div className="balance-smallbox">
                                        <div className="b2-text">提取币种</div>
                                        <div className="balance-select">
                                            <Select
                                                defaultValue='cgas'
                                                options={this.typeOptions}
                                                text=''
                                                onCallback={this.onCallback}
                                                style={{ 'width': '2rem' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="balance-smallbox">
                                        <div className="b2-text">提取金额</div>
                                        <div className="balance-input">
                                            <input type="text" className="" value={this.state.withdrawValue} onChange={this.onWithdrawValue} />
                                            <span className="tips-text">（{this.state.selectId === 'cgas' ? this.props.common.balances.contractcgas : this.props.common.balances.contractnnc}可用）</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bcontent-btn">
                                    <Button text="取消" btnColor="white-btn" onClick={this.onGoFiristStep} />
                                    <Button text="确定" onClick={this.doWithdraw} btnColor={this.state.canDoWithdraw ? '' : 'gray-btn'}/>
                                </div>
                            </>
                        )
                    }
                    {
                        this.state.stepNum === 3 && (
                            <>
                                <div className="bcontent-middle abalance">
                                    <div className="bsuccess">操作成功！资金将在交易确认后到账！</div>
                                </div>
                                <div className="bcontent-btn">
                                    <Button text="确定" onClick={this.onGoFiristStep} />
                                </div>
                            </>
                        )
                    }
                    {
                        this.state.stepNum === 4 && (
                            <>
                                <div className="bcontent-middle abalance">
                                    <div className="bsuccess">操作失败！原因未知！</div>
                                </div>
                                <div className="bcontent-btn">
                                    <Button text="确定" onClick={this.onGoFiristStep} />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        );
    }
    private doTopup = async () =>
    {
        if(!this.state.canDoTopup){
            return false;
        }
        console.log('todo')
        const amount = parseFloat(this.state.topupValue);
        const asset: Neo.Uint160 = this.state.selectId === "cgas" ? hashConfig.ID_CGAS : hashConfig.ID_NNC;
        const res = await Contract.rechargeReg(amount, asset);
        console.log("交易结果");
        console.log(res);
        if (res)
        {
            this.setState({
                stepNum: 3
            })
        } else
        {
            this.setState({
                stepNum: 4
            })
        }
        return true
    }
    private doWithdraw = async () =>
    {
        if(!this.state.canDoWithdraw){
            return false
        }
        console.log('todo')
        const amount = parseFloat(this.state.withdrawValue);
        const asset: Neo.Uint160 = this.state.selectId === "cgas" ? hashConfig.ID_CGAS : hashConfig.ID_NNC;
        const res = await Contract.getmoneyback(asset,this.props.common.address, amount);
        console.log("交易结果");
        console.log(res);
        if (res)
        {
            this.setState({
                stepNum: 3
            })
        } else
        {
            this.setState({
                stepNum: 4
            })
        }
        return true
    }

    // 输入金额
    private onTopupValue = (e) =>
    {
        const value = e.target.value;
        console.log(value)
        // 判断是否是数字
        if (isNaN(value))
        {
            return false
        }
        // 若输入为空或为0时
        if (parseFloat(value) === 0 || value === '')
        {
            this.setState({
                canDoTopup: false
            })
        }
        if (this.state.selectId === 'cgas')
        {
            // 精确到一位
            if (/\./.test(value) && value.split('.')[1].length >= 2)
            {
                return false;
            }
            
        } else // nnc的
        {
            // 精确到两位
            if (/\./.test(value) && value.split('.')[1].length >= 3)
            {
                return false;
            }
        }
        // 大于1000000000
        if(parseFloat(value)>1000000000){
            return false;
        }
        this.setState({
            topupValue: value,
            canDoTopup:true
        })
        // 如果大于可用金额
        const num = parseFloat(this.state.selectId === 'cgas' ? this.props.common.balances.cgas : this.props.common.balances.nnc);
        if (parseFloat(value) > num)
        {
            this.setState({
                topupValue: num
            })
        }
        
        return true
    }
    private onWithdrawValue = (e) =>
    {
        const value = e.target.value;
        console.log(value)
        // 判断是否是数字
        if (isNaN(value))
        {
            return false
        }
        // 若输入为空或为0时
        if (parseFloat(value) === 0 || value === '')
        {
            this.setState({
                canDoWithdraw: false
            })
        }
        if (this.state.selectId === 'cgas')
        {
            // 精确到一位
            if (/\./.test(value) && value.split('.')[1].length >= 2)
            {
                return false;
            }
            
        } else // nnc的
        {
            // 精确到两位
            if (/\./.test(value) && value.split('.')[1].length >= 3)
            {
                return false;
            }
        }
        
        // 大于1000000000
        if(parseFloat(value)>1000000000){
            return false;
        }
        this.setState({
            withdrawValue: value,
            canDoWithdraw:true
        })
        // 如果大于可用金额
        const num = parseFloat(this.state.selectId === 'cgas' ? this.props.common.balances.contractcgas : this.props.common.balances.contractnnc);
        if (value > num)
        {
            this.setState({
                withdrawValue: num
            })
            return true
        }
        
        return true
    }
    // 进入充值
    private onTopup = () =>
    {
        this.setState({
            stepNum: 1
        })
    }
    // 进入提取
    private onWithdraw = () =>
    {
        this.setState({
            stepNum: 2
        })
    }
    // 返回首步
    private onGoFiristStep = () =>
    {
        this.setState({
            stepNum: 0,
            selectId: 'cgas',
            selectAssetId: hashConfig.ID_CGAS.toString(),
            topupValue: '',
            withdrawValue: ''
        })
    }
}

export default injectIntl(TransactionBalance);
