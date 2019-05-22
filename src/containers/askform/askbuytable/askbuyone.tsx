/**
 * 求购页第一步
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Select from '@/components/select';
import Hint from '@/components/hint';
import { IAskBuyProps } from '../interface/askbuy.interface';

@inject('askbuy','common')
@observer
class AskBuyStepOne extends React.Component<IAskBuyProps, any> {
    public state = {
        selectType:'',  // 支付资产的选择
        buyInput:'',    // 输入的金额
        canDoNext:false // 是否可下一步操作
    }
    // 支付币种
    public typeOptions = [
        {
            id: 'cgas',
            name: 'CGAS',
        },
        {
            id: 'nnc',
            name: 'NNC',
        }
    ]
    
    public render()
    {
        return (
            <div className="step-form step-three">
                <div className="stepform-wrapper">
                    <div className="line-wrapper">
                        <div className="line-name">域名：</div>
                        <div className="line-text">{this.props.askbuy.askBuyDomain}</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">您的支付币种</div>
                        <div className="line-text">
                            <Select
                                defaultValue='cgas'
                                options={this.typeOptions}
                                text=''
                                onCallback={this.onChooseAsset}
                                style={{ 'width': '2rem' }}
                            />
                            <div className="tips-text">
                                （ 手续费：2%  <Hint text="使用CGAS成交的订单，合约会抽取2%成交额的手续费进入分红池。" />  ）
                                </div>
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">您愿意支付的价格</div>
                        <div className="line-text line-input-wrapper">
                            <input type="text" className="line-input" value={this.state.buyInput} onChange={this.onBuyValue} />
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">抵押NNC
                            <Hint text="发起拍卖订单需要抵押100NNC。通过追加抵押额外NNC，可以使您的订单展示在首页更显眼的位置。抵押的NNC将在订单结束后全额返还。" />
                        </div>
                        <div className="line-text">100 NNC</div>
                    </div>
                </div>
                <div className="step-btn">
                    <Button text="上一步" btnColor="white-btn" onClick={this.onGoPrevious} />
                    <Button text="下一步" onClick={this.onGoNext} btnColor={this.state.canDoNext?'':'gray-btn'} />
                </div>
            </div>
        );
    }
    // 上一步
    private onGoPrevious = () =>
    {
        this.props.askbuy.askBuyStep = 1;
    }
    // 下一步
    private onGoNext = () =>
    {
        if(!this.state.canDoNext){
            return false;
        }
        this.props.askbuy.askBuyStep = 2;
        return true;
    }
    // 选择币种
    private onChooseAsset = (item) =>
    {
        this.setState({
            selectType: item.id
        })
        this.props.askbuy.assetName = item.id
    }
    // 输入金额
    private onBuyValue = (e) =>
    {
        const value = e.target.value;
        console.log(value)
        // 判断是否是数字
        if (isNaN(value))
        {
            return false
        }
        console.log(this.props)
        // const okAmount = this.state.selectType === 'cgas' ? this.props.common.balances.cgas : this.props.common.balances.nnc
        // 如果大于可用金额
        const num = this.state.selectType === 'cgas' ? this.props.common.balances.contractcgas : this.props.common.balances.contractnnc;
        if (value > num)
        {
            this.setState({
                buyInput: num
            })
            return true
        }
        this.setState({
            buyInput: value
        })
        if(parseFloat(value)===0||value===''){
            this.state.canDoNext = false;
            return false;
        }
        this.state.canDoNext= true;
        return true
    }
}

export default injectIntl(AskBuyStepOne)
