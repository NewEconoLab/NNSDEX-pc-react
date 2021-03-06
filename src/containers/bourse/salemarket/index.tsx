/**
 * 出售市场
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Checkbox from '@/components/Checkbox';
import Page from '@/components/Page';
import Select from '@/components/select';
import Card from '@/components/card';
import Slider from '@/components/slider';
import { ISaleMarketProps, ISaleList } from '../interface/salemarket.interface';

@inject('salemarket', 'common')
@observer
class SaleMarket extends React.Component<ISaleMarketProps, any> {
  public state = {
    saleFistLoad: true // 是否初次加载
  }
  // 筛选条件
  private saleOrder = [
    {
      id: 'MortgagePayments_High',
      name: '默认',
    },
    {
      id: 'LaunchTime_New',
      name: '最新上架',
    },
    {
      id: 'Price_High',
      name: '价格最高',
    },
    {
      id: 'Price_Low',
      name: '价格最低',
    },
    {
      id: 'StarCount_High',
      name: '关注数量',
    }
  ]
  // 筛选条件二
  private saleAssetOpt = [
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
    this.props.salemarket.salePage = 1;
    this.props.salemarket.saleOrderBy = 'MortgagePayments_High';
    this.props.salemarket.saleAsset = 'All';
    this.props.salemarket.saleStar = 'All';
    this.props.salemarket.saleList = [];
    this.props.salemarket.saleListCount = 0;
  }
  public render()
  {
    return (
      <div className="sale-page">
        <div className="orderby-wrap">
          <div className="orderby-one">
            <Select defaultValue='MortgagePayments_High' options={this.saleOrder} text='排序' onCallback={this.onSaleOrderBy} />
          </div>
          <div className="orderby-two">
            <Select defaultValue='All' options={this.saleAssetOpt} text='筛选' onCallback={this.onSaleAssetSelect} />
          </div>
          <Checkbox text="只看我的关注" onClick={this.onSaleMyAttention} />
        </div>
        <div className="sale-table">
          <ul className="table-ul">
            <li className="table-th">
              <ul className="th-ul">
                <li className="th-li">域名</li>
                <li className="th-li">价格</li>
                <li className="th-li">关注</li>
              </ul>
            </li>
            {
              this.props.salemarket.saleListCount === 0 && <li className="table-td li-no-data">没有相关数据</li>
            }
            {
              this.props.salemarket.saleListCount > 0 && this.props.salemarket.saleList.map((item: ISaleList, index: number) =>
              {
                return (
                  <li className="table-td" key={index} onClick={this.onGoDomainInfo.bind(this, item)} >
                    <ul className="td-ul">
                      <li className="td-li">
                        <span>{item.fullDomain}</span>
                        {(parseFloat(item.saleRate) !== 0 && item.sellType === 0) && <Slider rate={parseFloat(item.saleRate) * 100} />}
                        {
                          item.isMine && <Card text="我的" style={{ 'marginLeft': '15px' }} cardsize="sm-card" colortype="c-blue" />
                        }
                      </li>
                      <li className="td-li"><span>{item.nowPrice + ' ' + item.assetName}</span></li>
                      <li className="td-li" >
                        <span className="star-icon" onClick={this.onStarClick.bind(this, item)}>
                          {item.isStar ? <img src={require('@/img/star.png')} alt="" /> : <img src={require('@/img/star-un.png')} alt="" />}
                        </span>
                      </li>
                    </ul>
                  </li>
                )
              })
            }
          </ul>
          <Page
            totalCount={this.props.salemarket.saleListCount}
            pageSize={this.props.salemarket.saleSize}
            currentPage={this.props.salemarket.salePage}
            onChange={this.onChangeSalePage}
          />
        </div>
      </div>
    );
  }

  // 获取数据
  public getSaleData = async () =>
  {
    this.props.salemarket.getSaleList(this.props.common.address)
  }
  // 排序显示
  private onSaleOrderBy = (item) =>
  {
    this.props.salemarket.salePage = 1;
    this.props.salemarket.saleOrderBy = item.id;
    this.getSaleData();
  }
  // 筛选条件待定
  private onSaleAssetSelect = (item) =>
  {
    this.props.salemarket.salePage = 1;
    this.props.salemarket.saleAsset = item.id;
    if (!this.state.saleFistLoad)
    {
      this.getSaleData();
    } else
    {
      this.setState({
        saleFistLoad: false
      })
    }
  }
  // 只看关注 todo
  private onSaleMyAttention = (flag: boolean) =>
  {
    const starFlag = flag ? 'Mine' : 'All';
    this.props.salemarket.saleStar = starFlag;
    this.getSaleData();
  }
  // 翻页
  private onChangeSalePage = (index: number) =>
  {
    this.props.salemarket.salePage = index;
    this.getSaleData();
  }
  // 跳转到详情页
  private onGoDomainInfo = (item: ISaleList) =>
  {
    this.props.history.push('/saleinfo/' + item.orderid)
  }
  // 关注或取消关注
  private onStarClick = async (item: ISaleList, event: any) =>
  {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    if (!this.props.common.address)
    {
      this.props.common.login();
      return
    }
    const isStar = item.isStar ? 0 : 1;
    await this.props.salemarket.setStarDomain(this.props.common.address, 0, item.orderid, isStar)
    if (this.props.salemarket.resStar)
    {
      item.isStar = !item.isStar
    }
  }
}

export default injectIntl(SaleMarket);
