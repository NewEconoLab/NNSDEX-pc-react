/**
 * 我的挂单
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
import Select from '@/components/select';
import Card from '@/components/card';
import Slider from '@/components/slider';
import { IMyDeityProps, IMyDeityList } from '../interface/mydeity.interface';

@inject('mydeity')
@observer
class Mydeity extends React.Component<IMyDeityProps, any> {
  public state = {
    mydeityPage: 1,
    mydeitySize: 15,
    mydeityOrderBy: '0',// 筛选排序方式
    mydeityLoading: true, // 是否正在加载
    mydeityFistLoad: true // 是否初次加载
  }
  // 筛选
  public mydeityOptions = [
    {
      id: '0',
      name: '未成交',
    },
    {
      id: '1',
      name: '已成交',
    }
  ]
  public componentWillUnmount()
  {
    this.props.mydeity.mydeityList = [];
    this.props.mydeity.mydeityListCount = 0;
  }
  // 获取数据
  public getMyDeityData = async () =>
  {
    await this.props.mydeity.getMyDeityList(parseInt(this.state.mydeityOrderBy, 10), this.state.mydeityPage, this.state.mydeitySize);
    this.setState({
      mydeityLoading: false
    })
  }
  // 选择筛选条件
  public onMyDeityCallback = (item) =>
  {
    console.log(item.id);
    this.setState({
      mydeityPage: 1,
      mydeityOrderBy: item.id,
      mydeityLoading: true,
    }, async () =>
      {
        this.getMyDeityData();
      })
  }
  // 翻页
  public onMydeityPage = (index: number) =>
  {
    this.setState({
      mydeityPage: index,
      mydeityLoading: true
    }, async () =>
      {
        this.getMyDeityData();
      })
  }
  public dealClassname = (deal:boolean)=>{
    if(deal){
      return 'td-ul gray-ul'
    }else{
      return 'td-ul'
    }
  }
  public render()
  {
    return (
      <div className="mydeity-page">
        <div className="orderby-wrap">
          <div className="orderby-one">
            <Select defaultValue='0' options={this.mydeityOptions} text='筛选' onCallback={this.onMyDeityCallback} />
          </div>
        </div>
        <div className="mydeity-table">
          <ul className="table-ul">
            <li className="table-th">
              <ul className="th-ul">
                <li className="th-li">域名</li>
                <li className="th-li">价格</li>
              </ul>
            </li>
            {
              this.props.mydeity.mydeityListCount > 0 && this.props.mydeity.mydeityList.map((item: IMyDeityList, index: number) =>
              {
                return (
                  <li className="table-td" key={index} >
                    <ul className={this.dealClassname(item.isDeal)}>
                      <li className="td-li">
                        {
                          item.orderType === 'Selling' && <Card text="出售" style={{ 'marginRight': '15px' }} cardsize="sm-card" colortype={!item.isDeal?"c-red":"cs-gray"} />
                        }
                        {
                          item.orderType === 'Buying' && <Card text="求购" style={{ 'marginRight': '15px' }} cardsize="sm-card" colortype={!item.isDeal?"cs-blue":"cs-gray"} />
                        }
                        <span>{item.fullDomain}</span>
                        {
                          (!item.isDeal && item.saleRate !== 0) && <Slider rate={item.saleRate * 100} />
                        }
                        {
                          item.isDeal && <Card text="已成交" style={{ 'marginLeft': '15px' }} cardsize="md-card" colortype="cs-gray" />
                        }
                      </li>
                      <li className="td-li"><span>{item.nowPrice + ' ' + item.assetName}</span></li>
                    </ul>
                  </li>
                )
              })
            }
          </ul>
          <Page
            totalCount={this.props.mydeity.mydeityListCount}
            pageSize={this.state.mydeitySize}
            currentPage={this.state.mydeityPage}
            onChange={this.onMydeityPage}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(Mydeity);
