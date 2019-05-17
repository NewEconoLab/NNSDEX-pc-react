/**
 * 降价挂单第四步
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';

@observer
class StepFour extends React.Component<any, any> {
   // 上一步
    public onGoPrevious = () =>
    {
        this.props.askform.stepNumber = 3;
    }
    // 下一步
    public onGoNext = () =>
    {
        this.props.askform.stepNumber = 4;
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
                        <div className="line-name">初始价格</div>
                        <div className="line-text">200 CGAS</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">最低价格</div>
                        <div className="line-text">50 CGAS</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">每天降低</div>
                        <div className="line-text">20 CGAS<span className="tips-text">（ 扣除手续费 2 CGAS ）</span></div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">手续费</div>
                        <div className="line-text">2%</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">抵押NNC</div>
                        <div className="line-text">150 NNC</div>
                    </div>
                    <div className="node-tips">注意：未成交的挂单可随时取消，合约不会收取任何费用。抵押的NNC将在订单成交或取消后全部返还。</div>
                </div>
                <div className="step-btn">
                    <Button text="上一步" btnColor="white-btn" onClick={this.onGoPrevious} />
                    <Button text="立即挂单" onClick={this.onGoNext} />
                </div>
            </div>
        );
    }
}

export default injectIntl(StepFour)
