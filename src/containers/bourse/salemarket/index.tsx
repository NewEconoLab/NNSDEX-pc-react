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

@inject('salemarket')
@observer
class SaleMarket extends React.Component<ISaleMarketProps, any> {
  public state = {
    salePage: 1,
    saleSize: 15,
    saleOrderBy: 'MortgagePayments_High',// 筛选排序方式
    saleAsset: 'All',   // 筛选币种
    saleStar: 'All', // 是否只看关注
    saleLoading: true, // 是否正在加载
    saleFistLoad:true // 是否初次加载
  }
  // 筛选条件
  public saleOrder = [
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
  public saleAssetOpt = [
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
    this.props.salemarket.saleList = [];
    this.props.salemarket.saleListCount = 0;
  }
  // 获取数据
  public getSaleData = async() =>
  {
    await this.props.salemarket.getSaleList(this.state.salePage, this.state.saleSize, this.state.saleOrderBy, this.state.saleAsset, this.state.saleStar);
    this.setState({
      saleLoading: false
    })
  }
  // 排序显示
  public onSaleOrderBy = (item) =>
  {
    this.setState({
      salePage: 1,
      saleOrderBy: item.id,
      saleLoading: true,
    }, async () =>
      {
        this.getSaleData();
      })
  }
  // 筛选条件待定
  public onSaleAssetSelect = (item) =>
  {
    this.setState({
      salePage: 1,
      saleAsset: item.id,
      saleLoading: true
    }, async () =>
      {
        if(!this.state.saleFistLoad){
          this.getSaleData();    
        }else{
          this.setState({
            saleFistLoad:false
          })
        }
      })
  }
  // 只看关注 todo
  public onSaleMyAttention = (flag: boolean) =>
  {
    console.log('flag:' + flag+','+typeof(flag))
    const starFlag = flag? 'Mine' : 'All';
    console.log(starFlag)
    this.setState({
      saleStar: starFlag
    }, async () =>
    {
      this.getSaleData();
    })
  }
  // 翻页
  public onChangeSalePage = (index: number) =>
  {
    this.setState({
      salePage: index,
      saleLoading: true
    }, async () =>
      {
        this.getSaleData();
      })
  }
  // 跳转到详情页
  public onGoDomainInfo = (domain: string) =>
  {
    this.props.history.push('/saleinfo/' + domain)
  }
  // 关注或取消关注
  public onStarClick = (domain: string, event: any) =>
  {
    console.log(domain);
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
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
              this.props.salemarket.saleListCount > 0 && this.props.salemarket.saleList.map((item: ISaleList, index: number) =>
              {
                return (
                  <li className="table-td" key={index} onClick={this.onGoDomainInfo.bind(this, item.fullDomain)} >
                    <ul className="td-ul">
                      <li className="td-li">
                        <span>{item.fullDomain}</span>
                        {item.saleRate !== '0' && <Slider rate={parseFloat(item.saleRate) * 100} />}
                        {
                          item.isMine && <Card text="我的" style={{ 'marginLeft': '15px' }} cardsize="sm-card" colortype="c-blue" />
                        }
                      </li>
                      <li className="td-li"><span>{item.nowPrice + ' ' + item.assetName}</span></li>
                      <li className="td-li" >
                        <span className="star-icon" onClick={this.onStarClick.bind(this, item.fullDomain)}>
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
            pageSize={this.state.saleSize}
            currentPage={this.state.salePage}
            onChange={this.onChangeSalePage}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(SaleMarket);
