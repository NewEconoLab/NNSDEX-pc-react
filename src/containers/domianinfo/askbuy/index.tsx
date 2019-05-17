/**
 * 求购详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Card from '@/components/card';

@observer
class AskBuyInfo extends React.Component<any, any> {
    // 返回上一页
    public onGoBack = () => {
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
                        <div className="line-text">abcde.neo</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">求购价格</div>
                        <div className="line-text">11 CGAS</div>
                    </div>
                    {/* <div className="line-wrapper">
                        <div className="line-name">当前价格</div>
                        <div className="line-text sign-text">10 CGAS</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">降价速度</div>
                        <div className="line-text">1 CGAS/天</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">最低价格</div>
                        <div className="line-text">1 CGAS</div>
                    </div> */}
                    <div className="line-wrapper">
                        <div className="line-name">求购人</div>
                        <div className="line-text">ARtmDzcTZxHCYydqFxFw31d21CpSArZwi4</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">发起时间</div>
                        <div className="line-text">2019/04/11 | 10:07:25</div>
                    </div>
                </div>
                <div className="domain-account">
                    <div className="account-title">
                        <div className="account-text">您已持有该域名</div>
                        <div className="account-text">域名上架中</div>
                        <div className="account-text">您未持有该域名</div>
                    </div>
                    <div className="account-btn">
                        <Button text="出售给他" />
                        <Button text="无法出售" btnColor="gray-btn" />
                    </div>
                </div>
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
                        <li className="table-td">
                            <ul className="td-ul">
                                <li className="td-li">
                                    <Card text="求购" style={{ 'marginRight': '15px' }} cardsize="sm-card" colortype="cs-blue" />
                                </li>
                                <li className="td-li"><span>AJN2SZJuF7j4mvKaMYAY9N8KsyD4j1fNdf</span></li>
                                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
                                <li className="td-li"><span>2019/04/11 | 10:07:25</span></li>
                            </ul>
                        </li>
                        <li className="table-td">
                            <ul className="td-ul">
                                <li className="td-li">
                                    <Card text="求购" style={{ 'marginRight': '15px' }} cardsize="sm-card" colortype="cs-blue" />
                                </li>
                                <li className="td-li"><span>AJN2SZJuF7j4mvKaMYAY9N8KsyD4j1fNdf</span></li>
                                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
                                <li className="td-li"><span>2019/04/11 | 10:07:25</span></li>
                            </ul>
                        </li>
                        <li className="table-td">
                            <ul className="td-ul">
                                <li className="td-li">
                                    <Card text="出售" style={{ 'marginRight': '15px' }} cardsize="sm-card" colortype="c-red" />
                                </li>
                                <li className="td-li"><span>AJN2SZJuF7j4mvKaMYAY9N8KsyD4j1fNdf</span></li>
                                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
                                <li className="td-li"><span>2019/04/11 | 10:07:25</span></li>
                            </ul>
                        </li>
                        <li className="table-td">
                            <ul className="td-ul">
                                <li className="td-li">
                                    <Card text="求购" style={{ 'marginRight': '15px' }} cardsize="sm-card" colortype="cs-blue" />
                                </li>
                                <li className="td-li"><span>AJN2SZJuF7j4mvKaMYAY9N8KsyD4j1fNdf</span></li>
                                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
                                <li className="td-li"><span>2019/04/11 | 10:07:25</span></li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }
}

export default injectIntl(AskBuyInfo)
