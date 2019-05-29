/**
 * 出售详情页-账户余额
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { ISaleInfoProps } from '../interface/saleinfo.interface';
import { Contract } from '@/utils/contract';

@observer
class CancelSale extends React.Component<ISaleInfoProps, any> {
    // 取消挂单
    public onCancelDeity = async ()=>{
        const auctionId = this.props.saleinfo.saleData ?this.props.saleinfo.saleData.auctionid:'';
        console.log(this.props.common.address+"---"+auctionId)
        const res = await Contract.cancelSellDomain(auctionId)
        console.log(res)
        this.props.history.go(-1);
    }
    public render()
    {
        return (
            <React.Fragment>
                <div className="domain-account">
                    <div className="account-btn">
                        <Button text="取消挂单" onClick={this.onCancelDeity} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default injectIntl(CancelSale)
