/**
 * 成交历史
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
// import Button from '@/components/Button';
import Page from '@/components/Page';
import Select from '@/components/select';
import { ITxHistoryProps, ITxHistoryList } from '../interface/txhistory.interface';
@inject('txhistory', 'common')
@observer
class TXHistory extends React.Component<ITxHistoryProps, any> {
  public state = {
    txhistoryFistLoad: true // 是否初次加载
  }
  // 筛选条件
  private txhistoryOrder = [
    {
      id: 'MortgagePayments_High',
      name: '默认',
    },
    // {
    //   id: 'LaunchTime_New',
    //   name: '最新上架',
    // },
    {
      id: 'Price_High',
      name: '价格最高',
    },
    {
      id: 'Price_Low',
      name: '价格最低',
    }
    // {
    //   id: 'StarCount_High',
    //   name: '关注数量',
    // }
  ]
  // 筛选条件二
  private txhistoryAssetOpt = [
    {
      id: 'All',
      name: '全部',
    },
    {
      id: 'CGAS',
      name: 'CGAS',
    },
    {
      id: 'NNC',
      name: 'NNC',
    }
  ]
  public componentWillUnmount()
  {
    this.props.txhistory.txhistoryPage = 1;
    this.props.txhistory.txhistoryOrderBy = 'MortgagePayments_High';
    this.props.txhistory.txhistoryAsset = 'All';
    this.props.txhistory.txhistoryList = [];
    this.props.txhistory.txhistoryListCount = 0;
  }
  public render()
  {
    return (
      <div className="history-page">
        <div className="orderby-wrap">
          <div className="orderby-one">
            <Select defaultValue='MortgagePayments_High' options={this.txhistoryOrder} text='排序' onCallback={this.onTxOrderBy} />
          </div>
          <div className="orderby-two">
            <Select defaultValue='All' options={this.txhistoryAssetOpt} text='筛选' onCallback={this.onTxAssetSelect} />
          </div>
          {/* <Button text="成交价格分布" btnSize='sm-btn' /> */}
        </div>
        <div className="history-table">
          <ul className="table-ul">
            <li className="table-th">
              <ul className="th-ul">
                <li className="th-li">域名</li>
                <li className="th-li">成交价格</li>
              </ul>
            </li>
            {
              this.props.txhistory.txhistoryListCount === 0 && <li className="table-td li-no-data">没有相关数据</li>
            }
            {
              this.props.txhistory.txhistoryListCount > 0 && this.props.txhistory.txhistoryList.map((item: ITxHistoryList, index: number) =>
              {
                return (
                  <li className="table-td" key={index} >
                    <ul className="td-ul">
                      <li className="td-li">
                        <span>{item.fullDomain}</span>
                      </li>
                      <li className="td-li"><span>{item.price + ' ' + item.assetName}</span></li>
                    </ul>
                  </li>
                )
              })
            }
          </ul>
          <Page
            totalCount={this.props.txhistory.txhistoryListCount}
            pageSize={this.props.txhistory.txhistorySize}
            currentPage={this.props.txhistory.txhistoryPage}
            onChange={this.onChangeTxPage}
          />
        </div>
      </div>
    );
  }

  // 获取数据
  private getTxHistoryData = () =>
  {
    this.props.txhistory.getTxHistoryList(this.props.common.address)
  }
  // 排序显示
  private onTxOrderBy = (item) =>
  {
    this.props.txhistory.txhistoryPage = 1;
    this.props.txhistory.txhistoryOrderBy = item.id
    this.getTxHistoryData();
  }
  // 筛选条件待定
  private onTxAssetSelect = (item) =>
  {
    this.props.txhistory.txhistoryPage = 1;
    this.props.txhistory.txhistoryAsset = item.id

    if (!this.state.txhistoryFistLoad)
    {
      this.getTxHistoryData();
    } else
    {
      this.setState({
        txhistoryFistLoad: false
      })
    }

  }
  // 翻页
  private onChangeTxPage = (index: number) =>
  {
    this.props.txhistory.txhistoryPage = index;
    this.getTxHistoryData();
  }
}

export default injectIntl(TXHistory);
