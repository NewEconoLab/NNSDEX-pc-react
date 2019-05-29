/**
 * 求购详情页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Card from '@/components/card';
import { IAskbuyInfoProps, IAskbuyOtherList } from '../interface/askbuyinfo.interface';
import * as formatTime from '@/utils/formatTime';
import Hint from '@/components/hint'
import { getQueryString } from '@/utils/function'
import { Contract } from '@/utils/contract';
import { HASH_CONFIG } from '@/config';

@inject('askbuyinfo', 'common')
@observer
class AskBuyInfo extends React.Component<IAskbuyInfoProps, any> {
    public state = {
        askBuyer: getQueryString('addr') || '',
        opt: getQueryString('opt') || '',
    }

    public componentDidMount()
    {
        const params = this.props.match.params;
        const domain = params["domain"];
        this.props.askbuyinfo.askbuyDomain = domain;
        this.props.askbuyinfo.getAskbuyInfo(domain, this.state.askBuyer);
        this.props.askbuyinfo.getAskbuyOtherList(domain, this.state.askBuyer);
        this.props.askbuyinfo.getDomainOwner(domain, this.props.common.address);
        console.log(JSON.stringify(this.props.askbuyinfo));
    }
    // 取消挂单
    public onCancelAskbuy = async () =>
    {
        const assetName = this.props.askbuyinfo.askbuyData ? this.props.askbuyinfo.askbuyData.assetName : 'CGAS';
        const assetId = assetName === 'CGAS' ? HASH_CONFIG.ID_CGAS : HASH_CONFIG.ID_NNC;
        console.log(this.props.common.address + "---" + this.props.askbuyinfo.askbuyDomain + "---" + assetId)
        const res = await Contract.cancelAskbuy(this.props.common.address, this.props.askbuyinfo.askbuyDomain, assetId)
        console.log(res)
        this.props.history.go(-1);
    }
    // 返回上一页
    public onGoBack = () =>
    {
        this.props.history.go(-1);
    }
    // 跳转到详情页
    public onGoInfo = (type: string, addr: string, selltype: number) =>
    {
        // selltype出售类型：0表示降价出售，1表示一口价
        if (type === 'Buying')
        {
            this.props.history.push('/askbuyinfo/' + this.props.askbuyinfo.askbuyDomain + '?addr=' + addr)
        }
        else if (type === 'Selling' && selltype === 0)
        {
            this.props.history.push('/saleinfo/' + this.props.askbuyinfo.askbuyDomain + '?selltype=reduce')
        } else if (type === 'Selling' && selltype === 1)
        {
            this.props.history.push('/saleinfo/' + this.props.askbuyinfo.askbuyDomain + '?selltype=onceprice')
        }
    }
    // 出售域名给某人
    public sellDomainToHim = async ()=>{
        console.log("todo")
        const assetName = this.props.askbuyinfo.askbuyData ? this.props.askbuyinfo.askbuyData.assetName : 'CGAS';
        const assetId = assetName === 'CGAS' ? HASH_CONFIG.ID_CGAS : HASH_CONFIG.ID_NNC;
        console.log(this.state.askBuyer + "---" + this.props.askbuyinfo.askbuyDomain + "---" + assetId)
        const res = await Contract.sellDomainToWho(this.state.askBuyer, this.props.askbuyinfo.askbuyDomain, assetId)
        console.log(res)
        this.props.history.go(-1);
    }
    public render()
    {
        return (
            <div className="domain-page">
                <div className="domain-title">
                    <span>求购域名</span>
                    <Button text="<<&nbsp;&nbsp;返回" onClick={this.onGoBack} />
                </div>
                <div className="domaininfo-wrap">
                    <div className="line-wrapper">
                        <div className="line-name">域名：</div>
                        <div className="line-text">{this.props.askbuyinfo.askbuyData && this.props.askbuyinfo.askbuyData.fullDomain}</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">求购价格</div>
                        <div className="line-text">
                            {this.props.askbuyinfo.askbuyData && (this.props.askbuyinfo.askbuyData.price + ' ' + this.props.askbuyinfo.askbuyData.assetName)}
                            <div className="tips-text">
                                （ 手续费：2%  <Hint text="使用CGAS成交的订单，合约会抽取2%成交额的手续费进入分红池。" />  ）
                            </div>
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">求购人</div>
                        <div className="line-text">{this.props.askbuyinfo.askbuyData && this.props.askbuyinfo.askbuyData.buyer}</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">发起时间</div>
                        <div className="line-text">
                            {this.props.askbuyinfo.askbuyData && formatTime.format('yyyy/MM/dd | hh:mm:ss', this.props.askbuyinfo.askbuyData.time.toString(), this.props.intl.locale)}
                        </div>
                    </div>
                </div>
                {
                    (this.state.opt === 'normal'|| this.state.askBuyer !== this.props.common.address) && (
                        <div className="domain-account">
                            {
                                (this.props.askbuyinfo.ownerInfo && !this.props.askbuyinfo.ownerInfo.isOwn) && (
                                    <>
                                        <div className="account-title">
                                            <div className="account-text">您未持有该域名</div>
                                        </div>
                                        <div className="account-btn">
                                            <Button text="无法出售" btnColor="gray-btn" />
                                        </div>
                                    </>
                                )
                            }
                            {
                                (this.props.askbuyinfo.ownerInfo && this.props.askbuyinfo.ownerInfo.isOwn && !this.props.askbuyinfo.ownerInfo.isLaunch) && (
                                    <>
                                        <div className="account-title">
                                            <div className="account-text">您已持有该域名</div>
                                        </div>
                                        <div className="account-btn">
                                            <Button text="出售给他" onClick={this.sellDomainToHim} />
                                        </div>
                                    </>
                                )
                            }
                            {
                                (this.props.askbuyinfo.ownerInfo && this.props.askbuyinfo.ownerInfo.isOwn && this.props.askbuyinfo.ownerInfo.isLaunch) && (
                                    <>
                                        <div className="account-title">
                                            <div className="account-text">域名上架中</div>
                                        </div>
                                        <div className="account-btn">
                                            <Button text="无法出售" btnColor="gray-btn" />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    )
                }
                {
                    (this.state.opt === 'cancel'|| this.state.askBuyer === this.props.common.address) && (
                        <div className="domain-account">
                            <div className="account-btn">
                                <Button text="取消挂单" onClick={this.onCancelAskbuy} />
                            </div>
                        </div>
                    )
                }
                {
                    (this.props.askbuyinfo.askbuyOtherList.length > 0 && this.state.opt !== 'cancel') && (
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
                                        this.props.askbuyinfo.askbuyOtherList.map((item: IAskbuyOtherList, index: number) =>
                                        {
                                            return (
                                                <li className="table-td" key={index} onClick={this.onGoInfo.bind(this, item.orderType, item.address, item.sellType)} >
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
                    )
                }
            </div>
        );
    }
}

export default injectIntl(AskBuyInfo)
