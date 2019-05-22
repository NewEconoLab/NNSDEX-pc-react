/**
 * 求购页第二步
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IAskBuyProps } from '../interface/askbuy.interface';

@observer
class AskBuyStepTwo extends React.Component<IAskBuyProps, any> {
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
    public render()
    {
        return (
            <div className="step-form step-four">
                <div className="stepform-wrapper">
                    <div className="line-wrapper">
                        <div className="line-name">域名：</div>
                        <div className="line-text">abcde.neo</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">您的支付币种</div>
                        <div className="line-text">200 CGAS</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">抵押NNC</div>
                        <div className="line-text">100 NNC</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">待支付</div>
                        <div className="line-text">
                            <span className="orange-text">204 CGAS</span> <span className="tips-text">（ 含手续费 4 CGAS ）</span>
                        </div>
                    </div>
                    <div className="node-tips">注意：求购域名需要预先支付求购费用和手续费，挂单成交前取消挂单可全额退款。抵押的NNC将在订单成交或取消后全部返还。</div>
                </div>
                <div className="step-btn">
                    <Button text="上一步" btnColor="white-btn" onClick={this.onGoPrevious} />
                    <Button text="立即挂单" onClick={this.onGoNext} />
                </div>
            </div>
        );
    }
}

export default injectIntl(AskBuyStepTwo)
