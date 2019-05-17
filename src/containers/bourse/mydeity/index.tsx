/**
 * 我的挂单
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
import Select from '@/components/select';
import Card from '@/components/card';
import Slider from '@/components/slider';

@observer
class Mydeity extends React.Component<any, any> {
  // 筛选
  public selectOptions = [
    {
      id: 'undone',
      name: '未成交',
    },
    {
      id: 'done',
      name: '已成交',
    }
  ]
  // 选择筛选条件
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
      <div className="mydeity-page">
        <div className="orderby-wrap">
          <div className="orderby-one">
            <Select defaultValue='undone' options={this.selectOptions} text='筛选' onCallback={this.onCallback} />
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
            <li className="table-td">
              <ul className="td-ul">
                <li className="td-li">
                  <Card text="出售" style={{'marginRight':'15px'}} cardsize="sm-card" colortype="c-red"/>
                  <span>abcde1.neo</span>
                  <Slider rate={20} />
                  <Card text="已成交" style={{'marginLeft':'15px'}} cardsize="md-card" colortype="cs-gray"/>
                </li>
                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
              </ul>
            </li>
            <li className="table-td">
              <ul className="td-ul">
                <li className="td-li">
                  <Card text="求购" style={{'marginRight':'15px'}} cardsize="sm-card" colortype="cs-blue"/>
                  <span>abcde1.neo</span>
                  <Slider rate={20} />
                  <Card text="已成交" style={{'marginLeft':'15px'}} cardsize="md-card" colortype="cs-gray"/>
                </li>
                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
              </ul>
            </li>
            <li className="table-td">
              <ul className="td-ul gray-ul">
                <li className="td-li">
                  <Card text="出售" style={{'marginRight':'15px'}} cardsize="sm-card" colortype="cs-gray"/>
                  <span>abcde1.neo</span>
                  <Slider rate={20} />
                  <Card text="已成交" style={{'marginLeft':'15px'}} cardsize="md-card" colortype="cs-gray"/>
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

export default injectIntl(Mydeity);
