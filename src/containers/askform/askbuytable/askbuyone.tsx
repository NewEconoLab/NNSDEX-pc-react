/**
 * 求购页第一步
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Select from '@/components/select';
import Hint from '@/components/hint';
import { IAskBuyProps } from '../interface/askbuy.interface';

@observer
class AskBuyStepOne extends React.Component<IAskBuyProps, any> {
    public state = {
        selectType: '',  // 支付资产的选择
        buyInput: '',    // 输入的金额
        canDoNext: false, // 是否可下一步操作
        nncCheck: true // 拥有的nnc金额是否够支付 true为够，false为不够
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
                            {
                                this.state.selectType === 'cgas' && (
                                    <div className="tips-text">
                                        （ 手续费：2%  <Hint text="使用CGAS成交的订单，合约会抽取2%成交额的手续费进入分红池。" />  ）
                                    </div>
                                )
                            }

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
                        <div className="line-text">
                            100 NNC
                            {
                                !this.state.nncCheck && <div className="tips-text red-text">（ 账户余额不足 ）</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="step-btn">
                    <Button text="下一步" onClick={this.onGoNext} btnColor={this.state.canDoNext ? '' : 'gray-btn'} />
                </div>
            </div>
        );
    }
    // 下一步
    private onGoNext = () =>
    {
        if (!this.state.canDoNext)
        {
            return false;
        }
        this.props.askbuy.askBuyPrice = parseFloat(this.state.buyInput);
        this.props.askbuy.askBuyStep = 2;
        return true;
    }
    // 选择币种
    private onChooseAsset = (item) =>
    {
        this.setState({
            selectType: item.id,
            buyInput: '',
            canDoNext: false
        })
        this.props.askbuy.assetName = item.id
    }
    // 输入金额
    private onBuyValue = (e: any) =>
    {
        const value = e.target.value;
        // 判断是否是数字
        if (isNaN(value))
        {
            return false
        }

        // 若输入为空或为0时
        if (parseFloat(value) === 0 || value === '')
        {
            this.setState({
                canDoNext: false
            })
        }
        if (parseFloat(value) < 0)
        {
            this.setState({
                canDoNext: false
            })
            return false
        }

        if (this.state.selectType === 'cgas')
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
        if (parseFloat(value) > 1000000000)
        {
            return false;
        }

        this.setState({
            buyInput: value
        })
        // 如果大于可用金额
        const num = this.state.selectType === 'cgas' ? this.props.common.balances.contractcgas : this.props.common.balances.contractnnc;
        if (parseFloat(value) > num)
        {
            this.setState({
                buyInput: num
            })
        }
        // 判断nnc金额是否足够
        if (this.state.selectType === 'cgas')
        {
            const flag = this.props.common.balances.contractnnc >= 100 ? true : false;
            this.setState({
                nncCheck: flag,
                canDoNext: flag
            })
        } else
        { 
            // 求支付求购金额之后的nnc
            const endflag = (this.props.common.balances.contractnnc - parseFloat(value)) >= 100;
            console.log(this.props.common.balances.contractnnc - parseFloat(value))
            this.setState({
                nncCheck: endflag,
                canDoNext: endflag
            })
        }
        return true
    }
}

export default injectIntl(AskBuyStepOne)
