/**
 * 出售详情页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Card from '@/components/card';

@observer
class SaleInfo extends React.Component<any, any> {
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
                <div className="domaininfo-wrap">
                    <div className="line-wrapper">
                        <div className="line-name">域名：</div>
                        <div className="line-text">abcde.neo</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">到期时间</div>
                        <div className="line-text">2019/04/11 | 10:07:25</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">出售价格</div>
                        <div className="line-text">0.2 CGAS</div>
                    </div>
                    <div className="line-wrapper">
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
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">出售人</div>
                        <div className="line-text">ARtmDzcTZxHCYydqFxFw31d21CpSArZwi4</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">上架时间</div>
                        <div className="line-text">2019/04/11 | 10:07:25</div>
                    </div>
                </div>
                <div className="domain-account">
                    <div className="account-title">
                        <div className="account-text">账户余额：</div>
                        <div className="account-number">999 CGAS</div>
                        <a href="#" className="link-text">立即充值</a>
                    </div>
                    <div className="account-btn">
                        <Button text="我要出价" btnColor="white-btn" />
                        <Button text="购买域名" />
                    </div>
                </div>
                <div className="domain-account">
                    <div className="account-btn">
                        <Button text="取消挂单" />
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

export default injectIntl(SaleInfo)
