/**
 * 求购市场
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Checkbox from '@/components/Checkbox';
import Page from '@/components/Page';
import Select from '@/components/select';
import Card from '@/components/card';
import { IAskBuyMarketProps, IAskBuyList } from '../interface/askbuymarket.interface';

@inject('askbuymarket')
@observer
class AskBuyMarket extends React.Component<IAskBuyMarketProps, any> {
  public state = {
    askbuyPage: 1,
    askbuySize: 15,
    askbuyOrderBy: 'MortgagePayments_High',// 筛选排序方式
    askbuyAsset: 'All',   // 筛选币种
    askbuyStar: 'All', // 是否只看关注
    askbuyLoading: true, // 是否正在加载
    askbuyFistLoad:true // 是否初次加载
  }
  // 求购市场排序方式
  public askbuyOrder = [
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
  // 币种
  public askbuyAssetOpt = [
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
    this.props.askbuymarket.askbuyList = [];
    this.props.askbuymarket.askbuyListCount = 0;
  }
   // 获取数据
   public getAskbuyData = async() =>
   {
     await this.props.askbuymarket.getAskBuyList(this.state.askbuyPage, this.state.askbuySize, this.state.askbuyOrderBy, this.state.askbuyAsset, this.state.askbuyStar);
     this.setState({
       askbuyLoading: false
     })
   }
  // 排序显示
  public onAskbuyOrderBy = (item) =>
  {
    this.setState({
      askbuyPage: 1,
      askbuyOrderBy: item.id,
      askbuyLoading: true,
    }, async () =>
      {
        this.getAskbuyData();
      })
  }
  // 筛选条件待定
  public onAskbuyAssetSelect = (item) =>
  {
    this.setState({
      askbuyPage: 1,
      askbuyAsset: item.id,
      askbuyLoading: true
    }, async () =>
      {
        if(!this.state.askbuyFistLoad){
          this.getAskbuyData();    
        }else{
          this.setState({
            askbuyFistLoad:false
          })
        }
      })
  }
  // 只看关注 todo
  public onAskbuyMyAttention = (flag: boolean) =>
  {
    console.log('flag:' + flag+','+typeof(flag))
    const starFlag = flag? 'Mine' : 'All';
    console.log(starFlag)
    this.setState({
      askbuyStar: starFlag
    }, async () =>
    {
      this.getAskbuyData();
    })
  }
  // 翻页
  public onChangeAskbuyPage = (index: number) =>
  {
    this.setState({
      askbuyPage: index,
      askbuyLoading: true
    }, async () =>
      {
        this.getAskbuyData();
      })
  }
  // 跳转到详情页
  public onGoDomainInfo = (domain: string, type: string) =>
  {
    this.props.history.push('/askbuyinfo/' + domain + '?type=' + type)
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
      <div className="buy-page">
        <div className="orderby-wrap">
          <div className="orderby-one">
            <Select defaultValue='MortgagePayments_High' options={this.askbuyOrder} text='排序' onCallback={this.onAskbuyOrderBy} />
          </div>
          <div className="orderby-two">
            <Select defaultValue='All' options={this.askbuyAssetOpt} text='筛选' onCallback={this.onAskbuyAssetSelect} />
          </div>
          <Checkbox text="只看我的关注" onClick={this.onAskbuyMyAttention} />
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
            {
              this.props.askbuymarket.askbuyListCount > 0 && this.props.askbuymarket.askbuyList.map((item: IAskBuyList, index: number) =>
              {
                return (
                  <li className="table-td" key={index} onClick={this.onGoDomainInfo.bind(this, item.fullDomain)} >
                    <ul className="td-ul">
                      <li className="td-li">
                        <span>{item.fullDomain}</span>
                        {
                          item.canSell && <Card text="可出售" style={{ 'marginLeft': '15px' }} cardsize="sm-card" colortype="cs-green" />
                        }
                        {
                          item.isNewly && <Card text="新" style={{ 'marginLeft': '15px' }} cardsize="sm-card" colortype="cs-yellow" />
                        }
                      </li>
                      <li className="td-li"><span>{item.maxPrice + ' ' + item.maxAssetName}</span></li>
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
            totalCount={this.props.askbuymarket.askbuyListCount}
            pageSize={this.state.askbuySize}
            currentPage={this.state.askbuyPage}
            onChange={this.onChangeAskbuyPage}
          />
        </div>

      </div>
    );
  }
}

export default injectIntl(AskBuyMarket);
