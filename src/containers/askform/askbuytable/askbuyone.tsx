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

@observer
class AskBuyStepOne extends React.Component<any, any> {
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
    // 上一步
    public onGoPrevious = () =>
    {
        this.props.askbuy.askBuyStep = 1;
    }
    // 下一步
    public onGoNext = () =>
    {
        this.props.askbuy.askBuyStep = 2;
    }
    // 选择币种
    public onChooseAsset = (item) =>
    {
        this.setState({
            selectType: item.id
        })
        console.log(item.id);
    }
    public render()
    {
        return (
            <div className="step-form step-three">
                <div className="stepform-wrapper">
                    <div className="line-wrapper">
                        <div className="line-name">域名：</div>
                        <div className="line-text">abcde.neo</div>
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
                            <input type="text" className="line-input" />
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
                    <Button text="下一步" onClick={this.onGoNext} />
                </div>
            </div>
        );
    }
}

export default injectIntl(AskBuyStepOne)
