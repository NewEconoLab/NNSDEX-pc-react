/**
 * 求购页第二步
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { IAskBuyProps } from '../interface/askbuy.interface';
import { HASH_CONFIG } from '@/config';
import { Contract } from '@/utils/contract';

@observer
class AskBuyStepTwo extends React.Component<IAskBuyProps, any> {
    public state = {
        nncPrice:100,
        priceName:this.props.askbuy.assetName === 'cgas'?'CGAS':'NNC',
        priceId:this.props.askbuy.assetName === 'cgas'?HASH_CONFIG.ID_CGAS:HASH_CONFIG.ID_NNC
    }

    public render()
    {
        return (
            <div className="step-form step-four">
                <div className="stepform-wrapper">
                    <div className="line-wrapper">
                        <div className="line-name">域名：</div>
                        <div className="line-text">{this.props.askbuy.askBuyDomain}</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">您的支付币种</div>
                        <div className="line-text">{this.props.askbuy.askBuyPrice+' '+this.state.priceName}</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">抵押NNC</div>
                        <div className="line-text">100 NNC</div>
                    </div>
                    <div className="node-tips">注意：求购域名需要预先支付求购费用和手续费，挂单成交前取消挂单可全额退款。抵押的NNC将在订单成交或取消后全部返还。</div>
                </div>
                <div className="step-btn">
                    <Button text="上一步" btnColor="white-btn" onClick={this.onGoPrevious} />
                    <Button text="立即挂单" onClick={this.onDoAskBuy} />
                </div>
            </div>
        );
    }
    // 上一步
    private onGoPrevious = () =>
    {
        this.props.askbuy.askBuyStep = 1;
    }
    // 立即挂单
    private onDoAskBuy = async () =>
    {
        console.log(this.props.common.address+"---"+this.props.askbuy.askBuyDomain+"---"+this.state.priceId+"---"+this.props.askbuy.askBuyPrice+"---"+this.state.nncPrice)
        const res = await Contract.askBuy(this.props.common.address,this.props.askbuy.askBuyDomain,this.state.priceId,this.props.askbuy.askBuyPrice,this.state.nncPrice);
        if (res)
        {
            this.props.askbuy.askBuyStep = 1;
            this.props.history.go(-1);
        } else
        {
            this.props.askbuy.askBuyStep = 1;
            this.props.history.go(-1);
        }
    }
}

export default injectIntl(AskBuyStepTwo)
