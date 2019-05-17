/**
 * 我的域名
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Page from '@/components/Page';
import Select from '@/components/select';
import Input from '@/components/Input/Input';
import Card from '@/components/card';

@observer
class Mydomain extends React.Component<any, any> {
  public state = {
    inputValue: ''
  }
  // 筛选条件
  public orderOptions = [
    {
      id: 'no',
      name: '字母顺序',
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
  // 翻页
  public onTransPage = (index: number) =>
  {
    console.log('index:' + index);
  }
  // 输入搜索内容
  public onChangeSearch = (value: string) =>
  {
    this.setState({
      inputValue: value
    })
  }
  // 取消搜索
  public onCancelSearch = () =>
  {
    this.setState({
      inputValue: '',
    })
  }
  // 跳转到搜索页
  public doSearch = () =>
  {
    // todo
  }
  public render()
  {
    return (
      <div className="mydomain-page">
        <div className="orderby-wrap">
          <div className="orderby-one">
            <Select defaultValue='no' options={this.orderOptions} text='排序' onCallback={this.onCallback} />
          </div>
          <div className="orderby-two">
            <Select defaultValue='all' options={this.selectOptions} text='筛选' onCallback={this.onCallback} />
          </div>
          <Input
            placeholder="请搜索您想要的域名"
            styleType="small"
            value={this.state.inputValue}
            onChange={this.onChangeSearch}
            type='text'
            onCancelSearch={this.onCancelSearch}
            onEnter={this.doSearch}
          />
        </div>
        <div className="mydomain-table">
          <ul className="table-ul">
            <li className="table-th">
              <ul className="th-ul">
                <li className="th-li">域名</li>
                <li className="th-li">状态</li>
              </ul>
            </li>
            <li className="table-td">
              <ul className="td-ul">
                <li className="td-li">
                  <span>qwertyuiopasdfghjklzxcvbnmqwerty.neo</span>
                </li>
                <li className="td-li">
                  <Card text="出售中" style={{ 'marginRight': '15px' }} cardsize="md-card" colortype="cb-gray" />
                  <Card text="未使用" cardsize="md-card" colortype="cb-green" />
                  <div className="li-btn">
                    <Button text="转让域名" btnColor="white-btn" style={{ 'marginRight': '15px' }} />
                    <Button text="查看挂单" />
                  </div>
                </li>
              </ul>
            </li>
            <li className="table-td">
              <ul className="td-ul">
                <li className="td-li">
                  <span className="gray-text">abcde1.neo</span>
                </li>
                <li className="td-li">
                  <Card text="使用中" style={{ 'marginRight': '15px' }} cardsize="md-card" colortype="cb-orange" />
                  <Card text="已绑定" cardsize="md-card" colortype="cb-orange" />
                </li>
              </ul>
            </li>
            <li className="table-td open-td">
              <ul className="td-ul">
                <li className="td-li">
                  <span>abcde1.neo</span>
                </li>
                <li className="td-li">
                  <Card text="使用中" style={{ 'marginRight': '15px' }} cardsize="md-card" colortype="cb-orange" />
                  <Card text="即将到期" cardsize="md-card" colortype="cb-red" />
                </li>
              </ul>
              <ul className="open-ul">
                <li className="open-li">
                  <span className="gray-text">到期时间</span>
                </li>
                <li className="open-li">
                  <span>2020/04/11 | 10:07:25</span>
                  <div className="li-btn">
                    <Button text="续约" />
                  </div>
                </li>
              </ul>
              <ul className="open-ul">
                <li className="open-li">
                  <span className="gray-text">映射地址</span>
                </li>
                <li className="open-li">
                  <span>ARxuMB42MiynfPscDL4Rpv5tymicCHqAvd</span>
                  <div className="li-btn">
                    <Button text="修改" />
                  </div>
                </li>
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
export default injectIntl(Mydomain);