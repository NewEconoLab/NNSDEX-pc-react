/**
 * 一口价挂单第四步
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { ISellFormProps } from '../interface/sellform.interface';
import { HASH_CONFIG } from '@/config';

@observer
class StepFour extends React.Component<ISellFormProps, any> {
    public state = {
        sellAsset:this.props.sellform.sellAssetName === 'cgas'?'CGAS':'NNC',
        sellAssetId:this.props.sellform.sellAssetName === 'cgas'?HASH_CONFIG.ID_CGAS:HASH_CONFIG.ID_NNC,
        receivePrice:0,
        sellFee:0
    }
    public componentDidMount(){
        if(this.props.sellform.sellAssetName === 'cgas'){
            this.setState({
                sellFee:this.props.sellform.sellPrice*0.02,
                receivePrice:this.props.sellform.sellPrice*(1-0.02)
            })
        }
    }
    // 上一步
    public onGoPrevious = () =>
    {
        this.props.sellform.stepNumber = 3;
    }
    // 下一步
    public onGoNext = () =>
    {
        this.props.sellform.stepNumber = 4;
    }
    public render()
    {
        return (
            <div className="step-form step-four">
                <div className="stepform-wrapper">
                    <div className="line-wrapper">
                        <div className="line-name">域名：</div>
                        <div className="line-text">{this.props.sellform.readySellDomainName}</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">价格</div>
                        <div className="line-text">{this.props.sellform.sellPrice+' '+this.state.sellAsset}</div>
                    </div>
                    {
                        this.props.sellform.sellAssetName === 'cgas' && (
                            <div className="line-wrapper">
                                <div className="line-name">手续费</div>
                                <div className="line-text">{this.state.sellFee} CGAS</div>
                            </div>
                        )
                    }
                    
                    <div className="line-wrapper">
                        <div className="line-name">抵押NNC</div>
                        <div className="line-text">{this.props.sellform.endNNCPrice} NNC</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">预计收入</div>
                        <div className="line-text">
                            <span className="orange-text">{this.state.receivePrice+' '+this.state.sellAsset}</span>
                            {
                                this.props.sellform.sellAssetName === 'cgas' && ( <span className="tips-text">（ 扣除手续费 {this.state.sellFee} CGAS ）</span>)
                            }                           
                        </div>
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
