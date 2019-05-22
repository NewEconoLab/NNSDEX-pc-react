/**
 * 求购页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import StepOne from './askbuyone';
import StepTwo from './askbuytwo';
import { IAskBuyProps } from '../interface/askbuy.interface';

@inject('askbuy','common')
@observer
class AskBuyTable extends React.Component<IAskBuyProps, any> {
    public componentDidMount(){
        const params = this.props.match.params;
        const domain =params["domain"];
        this.props.askbuy.askBuyDomain = domain;
    }
    // 返回上一页
    public onGoBack = () =>
    {
        this.props.askbuy.askBuyStep = 1;
        this.props.history.go(-1);
    }

    public render()
    {
        return (
            <div className="step-page">
                <div className="askstep-title">
                    <span>求购域名</span>
                    <Button text="<<&nbsp;&nbsp;返回" onClick={this.onGoBack} />
                </div>
                <div className="step-content">
                    <div className="step-title">
                        <ul className="step-ul">
                            <li className={this.stepShow(1)}><span>设置价格</span></li>
                            <li className={this.stepShow(2)}>
                                {
                                    this.props.askbuy.askBuyStep === 2 ? <img src={require('@/img/next.png')} alt="" />
                                        : <img src={require('@/img/next-un.png')} alt="" />
                                }

                                <span>挂单确认</span>
                            </li>
                        </ul>
                    </div>
                    <div className="step-wrapper">
                        {
                            this.props.askbuy.askBuyStep === 1 && <StepOne {...this.props} />
                        }
                        {
                            this.props.askbuy.askBuyStep === 2 && <StepTwo {...this.props} />
                        }
                    </div>
                </div>
            </div>
        );
    }
    // 步骤显示样式
    private stepShow = (num: number) =>
    {
        if (num === this.props.askbuy.askBuyStep)
        {
            return "step-li active"
        } else
        {
            return "step-li"
        }
    }
}

export default injectIntl(AskBuyTable)
