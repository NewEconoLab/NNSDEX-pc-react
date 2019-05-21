/**
 * 出售详情页-一口价拍卖
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import { ISaleInfoProps } from '../interface/saleinfo.interface';
import * as formatTime from '@/utils/formatTime';

@observer
class OncePrice extends React.Component<ISaleInfoProps, any> {
    public render()
    {
        return (
            <>
                <div className="domaininfo-wrap">
                    <div className="line-wrapper">
                        <div className="line-name">域名：</div>
                        <div className="line-text">{this.props.saleinfo.saleData && this.props.saleinfo.saleData.fullDomain}</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">到期时间</div>
                        <div className="line-text">
                            {this.props.saleinfo.saleData && formatTime.format('yyyy/MM/dd | hh:mm:ss', this.props.saleinfo.saleData.ttl.toString(), this.props.intl.locale)}
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">出售价格</div>
                        <div className="line-text">{this.props.saleinfo.saleData && (this.props.saleinfo.saleData.nowPrice + ' ' + this.props.saleinfo.saleData.assetName)}</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">出售人</div>
                        <div className="line-text">{this.props.saleinfo.saleData && this.props.saleinfo.saleData.seller}</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">上架时间</div>
                        <div className="line-text">
                            {this.props.saleinfo.saleData && formatTime.format('yyyy/MM/dd | hh:mm:ss', this.props.saleinfo.saleData.startTimeStamp.toString(), this.props.intl.locale)}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default injectIntl(OncePrice)
