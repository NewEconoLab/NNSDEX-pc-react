/**
 * 出售详情页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import OncePrice from './onceprice';
import ReducePrice from './reduce';
import BalanceBox from './balance';
import CancelSale from './cancel';
import OtherList from './otherlist';
import {getQueryString} from '@/utils/function'
import { ISaleInfoProps } from '../interface/saleinfo.interface';

@inject('saleinfo','common')
@observer
class SaleInfo extends React.Component<ISaleInfoProps, any> {
    public state = {
        selltype:getQueryString('selltype') || 'onceprice',
        opt:getQueryString('opt') || 'normal',
    }
    public componentDidMount(){
        console.log(this.state.selltype);
        const params = this.props.match.params;
        const domain =params["domain"];
        this.props.saleinfo.saleDomain = domain;
        this.props.saleinfo.getSaleInfo(domain);
        this.props.saleinfo.getSaleOtherList(domain);
    }
    // 返回上一页
    public onGoBack = () => {
        this.props.history.go(-1);
    }
    public render()
    {
        return (
            <div className="domain-page">
                <div className="domain-title">
                    <span>域名出售</span>
                    <Button text="<<&nbsp;&nbsp;返回" onClick={this.onGoBack} />
                </div>
                {
                    this.state.selltype === 'onceprice' && <OncePrice {...this.props} />
                }
                {
                    this.state.selltype === 'reduce' && <ReducePrice {...this.props} />
                }
                {
                    this.state.opt === 'normal' && <BalanceBox {...this.props} />
                }
                {
                    this.state.opt === 'cancel' && <CancelSale {...this.props} />
                }
                {
                    (this.props.saleinfo.saleOtherList.length>0 && this.state.opt !== 'cancel')&& <OtherList {...this.props} />
                }
            </div>
        );
    }
}

export default injectIntl(SaleInfo)
