/**
 * 出售详情页-账户余额
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { ISaleInfoProps } from '../interface/saleinfo.interface';
import { Link } from 'react-router-dom';

@observer
class BalanceInfo extends React.Component<ISaleInfoProps, any> {
    public componentDidMount(){
        this.props.common.getContract();
    }
    // 我要出价 todo
    public onMakePrice = ()=>{
        console.log('todo')
    }
    // 购买域名
    public onBuyDomain = ()=> {
        console.log('todo')
    }
    public render()
    {
        return (
            <React.Fragment>
                <div className="domain-account">
                    <div className="account-title">
                        <div className="account-text">账户余额：</div>
                        <div className="account-number">
                        {
                            (this.props.saleinfo.saleData&& this.props.saleinfo.saleData.assetName === 'CGAS')
                            ?this.props.common.balances.contractcgas:this.props.common.balances.contractnnc
                        }
                        &nbsp;
                        {
                            this.props.saleinfo.saleData&& this.props.saleinfo.saleData.assetName
                        }
                        </div>
                        <Link to="/myaccount/balance" className="link-text">立即充值</Link>
                    </div>
                    <div className="account-btn">
                        <Button text="我要出价" btnColor="white-btn" onClick={this.onMakePrice} />
                        <Button text="购买域名" onClick={this.onBuyDomain} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default injectIntl(BalanceInfo)
