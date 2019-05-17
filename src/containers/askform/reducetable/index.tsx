/**
 * 降价挂单页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import StepOne from '../stepone';
import StepTwo from '../steptwo';
import StepThree from './stepthree';
import StepFour from './stepfour';
import { IAskFormProps } from '../interface/askform.interface';

@inject('askform')
@observer
class ReduceTable extends React.Component<IAskFormProps, any> {
    // 返回上一页
    public onGoBack = () =>
    {
        this.props.history.go(-1);
    }

    public render()
    {
        return (
            <div className="step-page">
                <div className="askstep-title">
                    <span>发起挂单</span>
                    <Button text="<<&nbsp;&nbsp;返回" onClick={this.onGoBack} />
                </div>
                <div className="step-content">
                    <div className="step-title">
                        <ul className="step-ul">
                            <li className={this.stepShow(1)}><span>选择域名</span></li>
                            <li className={this.stepShow(2)}>
                                {
                                    this.props.askform.stepNumber === 2 ? <img src={require('@/img/next.png')} alt="" />
                                        : <img src={require('@/img/next-un.png')} alt="" />
                                }

                                <span>选择挂单类型</span>
                            </li>
                            <li className={this.stepShow(3)}>
                                {
                                    this.props.askform.stepNumber === 3 ? <img src={require('@/img/next.png')} alt="" />
                                        : <img src={require('@/img/next-un.png')} alt="" />
                                }
                                <span>设置价格</span>
                            </li>
                            <li className={this.stepShow(4)}>
                                {
                                    this.props.askform.stepNumber === 4 ? <img src={require('@/img/next.png')} alt="" />
                                        : <img src={require('@/img/next-un.png')} alt="" />
                                }
                                <span>挂单确认</span>
                            </li>
                        </ul>
                    </div>
                    <div className="step-wrapper">
                        {
                            this.props.askform.stepNumber === 1 && <StepOne {...this.props} />
                        }
                        {
                            this.props.askform.stepNumber === 2 && <StepTwo {...this.props} />
                        }
                        {
                            this.props.askform.stepNumber === 3 && <StepThree {...this.props} />
                        }
                        {
                            this.props.askform.stepNumber === 4 && <StepFour {...this.props} />
                        }
                    </div>
                </div>
            </div>
        );
    }
    // 步骤显示样式
    private stepShow = (num: number) =>
    {
        if (num === this.props.askform.stepNumber)
        {
            return "step-li active"
        } else
        {
            return "step-li"
        }
    }
}

export default injectIntl(ReduceTable)
