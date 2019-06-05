/**
 * 出售详情页-账户余额
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { ISaleInfoProps } from '../interface/saleinfo.interface';
// import { Link } from 'react-router-dom';
import { Contract } from '@/utils/contract';
import { HASH_CONFIG } from '@/config';

@observer
class BalanceInfo extends React.Component<ISaleInfoProps, any> {
    public componentDidMount()
    {
        this.props.common.getContract();
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
                                (this.props.saleinfo.saleData && this.props.saleinfo.saleData.assetName === 'CGAS')
                                    ? this.props.common.balances.contractcgas : this.props.common.balances.contractnnc
                            }
                            &nbsp;
                        {
                                this.props.saleinfo.saleData && this.props.saleinfo.saleData.assetName
                            }
                        </div>
                        <span className="link-text" onClick={this.onGoTopup} >立即充值</span>
                    </div>
                    <div className="account-btn">
                        <Button text="我要出价" btnColor="white-btn" onClick={this.onMakePrice} />
                        <Button text="购买域名" onClick={this.onBuyDomain} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
    // 我要出价 
    private onGoTopup = () =>
    {
        if (!this.props.common.address)
        {
            this.props.common.login();
            return
        }
        this.props.history.push('/myaccount/balance')
    }
    // 我要出价 
    private onMakePrice = () =>
    {
        if (!this.props.common.address)
        {
            this.props.common.login();
            return
        }
        this.props.history.push('/askbuytable/' + this.props.saleinfo.saleDomain)
    }
    // 购买域名
    private onBuyDomain = async () =>
    {
        if (!this.props.common.address)
        {
            this.props.common.login();
            return
        }
        const assetName = this.props.saleinfo.saleData ? this.props.saleinfo.saleData.assetName : 'CGAS';
        const assetId = assetName === 'CGAS' ? HASH_CONFIG.ID_CGAS : HASH_CONFIG.ID_NNC;
        const amount = this.props.saleinfo.saleData ? parseFloat(this.props.saleinfo.saleData.nowPrice) : 0;
        if (amount === 0)
        {
            return
        }
        const auctionId = this.props.saleinfo.saleData ? this.props.saleinfo.saleData.orderid : '';
        console.log(this.props.common.address + "---" + auctionId + "---" + assetId + '---' + amount)
        const res = await Contract.betDomain(this.props.common.address, auctionId, assetId, amount);
        console.log(res)
        this.props.history.go(-1);
        return true;
    }
}

export default injectIntl(BalanceInfo)
