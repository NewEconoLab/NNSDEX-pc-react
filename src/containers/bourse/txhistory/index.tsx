/**
 * 成交历史
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Page from '@/components/Page';
import Select from '@/components/select';

@observer
class TXHistory extends React.Component<any, any> {
  // 筛选条件
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
  // 筛选条件二
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
  // todo
  public onCallback = (item) =>
  {
    console.log(item.id);
  }
  // 只看关注
  public onShowMyAttention = (flag: boolean) =>
  {
    console.log('flag' + flag)
  }
  // 翻页
  public onTransPage = (index: number) =>
  {
    console.log('index:' + index);
  }
  public render()
  {
    return (
      <div className="history-page">
        <div className="orderby-wrap">
          <div className="orderby-one">
            <Select defaultValue='no' options={this.orderOptions} text='排序' onCallback={this.onCallback} />
          </div>
          <div className="orderby-two">
            <Select defaultValue='all' options={this.selectOptions} text='筛选' onCallback={this.onCallback} />
          </div>
          <Button text="成交价格分布" btnSize='sm-btn' />
        </div>
        <div className="history-table">
          <ul className="table-ul">
            <li className="table-th">
              <ul className="th-ul">
                <li className="th-li">域名</li>
                <li className="th-li">成交价格</li>
              </ul>              
            </li>
            <li className="table-td">
              <ul className="td-ul">
                <li className="td-li">
                  <span>abcde1.neo</span>
                  </li>
                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
              </ul>
            </li>
            <li className="table-td">
              <ul className="td-ul">
                <li className="td-li">
                  <span>abcde1.neo</span>
                  </li>
                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
              </ul>
            </li>
            <li className="table-td">
              <ul className="td-ul">
                <li className="td-li">
                  <span>abcde1.neo</span>
                  </li>
                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
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

export default injectIntl(TXHistory);
