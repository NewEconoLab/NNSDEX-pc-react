/**
 * 求购市场
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Checkbox from '@/components/Checkbox';
import Page from '@/components/Page';
import Select from '@/components/select';
import Card from '@/components/card';

@observer
class AskBuyMarket extends React.Component<any, any> {
  // 求购市场排序方式
  public orderOptions = [
    {
      id: 'no',
      name: '默认',
    },
    {
      id: 'new',
      name: '最新上架',
    },
    {
      id: 'priceup',
      name: '价格最高',
    },
    {
      id: 'pricedown',
      name: '价格最低',
    },
    {
      id: 'attention',
      name: '关注数量',
    }
  ]
  // 币种
  public selectOptions = [
    {
      id: 'all',
      name: '全部',
    },
    {
      id: 'cgas',
      name: 'CGAS',
    },
    {
      id: 'nnc',
      name: 'NNC',
    }
  ]
  // todo待定
  public onCallback = (item) =>
  {
    console.log(item.id);
  }
  // 只看关注的
  public onShowMyAttention = (flag: boolean) =>
  {
    console.log('flag' + flag)
  }
  // 翻页
  public onTransPage = (index: number) =>
  {
    console.log('index:' + index);
  }
  // 跳转到详情页
  public onGoDomainInfo = (domain: string, type: string) =>
  {
    this.props.history.push('/askbuyinfo/' + domain + '?type=' + type)
  }
  public render()
  {
    return (
      <div className="buy-page">
        <div className="orderby-wrap">
          <div className="orderby-one">
            <Select defaultValue='no' options={this.orderOptions} text='排序' onCallback={this.onCallback} />
          </div>
          <div className="orderby-two">
            <Select defaultValue='all' options={this.selectOptions} text='筛选' onCallback={this.onCallback} />
          </div>
          <Checkbox text="只看我的关注" onClick={this.onShowMyAttention} />
        </div>
        <div className="buy-table">
          <ul className="table-ul">
            <li className="table-th">
              <ul className="th-ul">
                <li className="th-li">域名</li>
                <li className="th-li">价格</li>
                <li className="th-li">关注</li>
              </ul>
            </li>
            <li className="table-td" onClick={this.onGoDomainInfo.bind(this, 'sdfa.neo', 'askbuy')}>
              <ul className="td-ul">
                <li className="td-li">
                  <span>abcde1.neo</span>
                  <Card text="可出售" style={{ 'marginLeft': '15px' }} cardsize="sm-card" colortype="cs-green" />
                  <Card text="新" style={{ 'marginLeft': '15px' }} cardsize="sm-card" colortype="cs-yellow" />
                </li>
                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
                <li className="td-li"><img src={require('@/img/unstar.png')} alt="" /></li>
              </ul>
            </li>
            <li className="table-td">
              <ul className="td-ul">
                <li className="td-li">
                  <span>abcde1.neo</span>
                  <Card text="可出售" style={{ 'marginLeft': '15px' }} cardsize="sm-card" colortype="cs-green" />
                  <Card text="新" style={{ 'marginLeft': '15px' }} cardsize="sm-card" colortype="cs-yellow" />
                </li>
                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
                <li className="td-li"><img src={require('@/img/unstar.png')} alt="" /></li>
              </ul>
            </li>
            <li className="table-td">
              <ul className="td-ul">
                <li className="td-li">
                  <span>abcde1.neo</span>
                  <Card text="可出售" style={{ 'marginLeft': '15px' }} cardsize="sm-card" colortype="cs-green" />
                  <Card text="新" style={{ 'marginLeft': '15px' }} cardsize="sm-card" colortype="cs-yellow" />
                </li>
                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
                <li className="td-li"><img src={require('@/img/unstar.png')} alt="" /></li>
              </ul>
            </li>
          </ul>
          <Page
            totalCount={1000000}
            pageSize={15}
            currentPage={1}
            onChange={this.onTransPage}
          />
        </div>

      </div>
    );
  }
}

export default injectIntl(AskBuyMarket);
