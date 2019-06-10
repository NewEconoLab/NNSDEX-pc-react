/**
 * 一口价挂单页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import StepOne from './stepone';
import StepTwo from './steptwo';
import StepThree from './stepthree';
import StepFour from './stepfour';
import ReStepThree from './restepthree';
import ReStepFour from './restepfour';
import { getQueryString } from '@/utils/function'
import { ISellFormProps } from '../interface/sellform.interface';

@inject('sellform', 'common')
@observer
class SellTable extends React.Component<ISellFormProps, any> {

    public componentDidMount()
    {
        // if (!this.props.common.address)
        // {
        //     this.props.common.login();
        //     this.props.history.goBack();
        // }
        const domain = getQueryString('selldomain') || '';
        const time = getQueryString('extime') || '0';
        if (domain !== '')
        {
            this.props.sellform.readySellDomainName = domain;
            this.props.sellform.readySellItem = {
                fulldomain: domain,
                TTL: parseInt(time, 10)
            }
            this.props.sellform.stepNumber = 2;
        }
    }
    // 销毁
    public componentWillUnmount()
    {
        this.props.sellform.stepNumber = 1;
        this.props.sellform.sellAssetName = 'cgas';
        this.props.sellform.sellStartPrice = 0;
        this.props.sellform.sellEndPrice = 0;
        this.props.sellform.sellReducePrice = 0;
        this.props.sellform.endNNCPrice = 0;
        this.props.sellform.sellDomainCount = 0;
        this.props.sellform.sellDomainList = [];
        this.props.sellform.pageIndex = 1;// 当前页面
        this.props.sellform.isLast = false;
        this.props.sellform.isLoading = false;
        this.props.sellform.readySellDomainName = ''; // 记录准备出售的域名
        this.props.sellform.readySellItem = null; // 记录准备出售的域名
        this.props.sellform.orderRank = 0;
        this.props.sellform.endNNCPrice = 0;
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
                                    this.props.sellform.stepNumber === 2 ? <img src={require('@/img/next.png')} alt="" />
                                        : <img src={require('@/img/next-un.png')} alt="" />
                                }

                                <span>选择挂单类型</span>
                            </li>
                            <li className={this.stepShow(3) || this.stepShow(5)}>
                                {
                                    (this.props.sellform.stepNumber === 3 || this.props.sellform.stepNumber === 5) ? <img src={require('@/img/next.png')} alt="" />
                                        : <img src={require('@/img/next-un.png')} alt="" />
                                }
                                <span>设置价格</span>
                            </li>
                            {/* <li className={this.stepShow(5)}>
                                {
                                    this.props.sellform.stepNumber === 5 ? <img src={require('@/img/next.png')} alt="" />
                                        : <img src={require('@/img/next-un.png')} alt="" />
                                }
                                <span>设置价格</span>
                            </li> */}
                            <li className={this.stepShow(4 || 6)}>
                                {
                                    (this.props.sellform.stepNumber === 4 || this.props.sellform.stepNumber === 6) ? <img src={require('@/img/next.png')} alt="" />
                                        : <img src={require('@/img/next-un.png')} alt="" />
                                }
                                <span>挂单确认</span>
                            </li>
                        </ul>
                    </div>
                    <div className="step-wrapper">
                        {
                            this.props.sellform.stepNumber === 1 && <StepOne {...this.props} />
                        }
                        {
                            this.props.sellform.stepNumber === 2 && <StepTwo {...this.props} />
                        }
                        {/* 3，4步为一口价拍卖 */}
                        {
                            this.props.sellform.stepNumber === 3 && <StepThree {...this.props} />
                        }
                        {
                            this.props.sellform.stepNumber === 4 && <StepFour {...this.props} />
                        }
                        {/* 后面两步为降价拍卖 */}
                        {
                            this.props.sellform.stepNumber === 5 && <ReStepThree {...this.props} />
                        }
                        {
                            this.props.sellform.stepNumber === 6 && <ReStepFour {...this.props} />
                        }
                    </div>
                </div>
            </div>
        );
    }
    // 返回上一页
    private onGoBack = () =>
    {

        this.props.history.go(-1);
    }
    // 步骤显示样式
    private stepShow = (num: number) =>
    {
        if (num === this.props.sellform.stepNumber)
        {
            return "step-li active"
        } else
        {
            return "step-li"
        }
    }
}

export default injectIntl(SellTable)
