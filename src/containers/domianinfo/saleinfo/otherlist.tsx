/**
 * 出售详情页-其他挂单
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Card from '@/components/card';
import { ISaleInfoProps, ISaleOtherList } from '../interface/saleinfo.interface';
import * as formatTime from '@/utils/formatTime';


@observer
class OtherList extends React.Component<ISaleInfoProps, any> {

    public render()
    {
        return (
            <>
                <div className="domain-title">该域名的其他挂单</div>
                <div className="domain-table">
                    <ul className="table-ul">
                        <li className="table-th">
                            <ul className="th-ul">
                                <li className="th-li">类型</li>
                                <li className="th-li">求购人/出售人</li>
                                <li className="th-li">价格</li>
                                <li className="th-li">时间</li>
                            </ul>
                        </li>
                        {
                            this.props.saleinfo.saleOtherList.length > 0 && this.props.saleinfo.saleOtherList.map((item: ISaleOtherList, index: number) =>
                            {
                                return (
                                    <li className="table-td" key={index} onClick={this.onGoAskbuyInfo.bind(this, item)}>
                                        <ul className="td-ul">
                                            <li className="td-li">
                                                {
                                                    item.orderType === 'Buying' && <Card text="求购" style={{ 'marginRight': '15px' }} cardsize="sm-card" colortype="cs-blue" />
                                                }
                                                {
                                                    item.orderType === 'Selling' && <Card text="出售" style={{ 'marginRight': '15px' }} cardsize="sm-card" colortype="c-red" />
                                                }
                                            </li>
                                            <li className="td-li"><span>{item.address}</span></li>
                                            <li className="td-li"><span>{item.price + ' ' + item.assetName}</span></li>
                                            <li className="td-li">
                                                <span>
                                                    {formatTime.format('yyyy/MM/dd | hh:mm:ss', item.time.toString(), this.props.intl.locale)}
                                                </span>
                                            </li>
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </>
        );
    }
    // 跳转到详情页
    private onGoAskbuyInfo = (item: ISaleOtherList) =>
    {
        this.props.history.push('/askbuyinfo/' + item.orderid+ '?addr=' + item.address)
    }
}

export default injectIntl(OtherList)
