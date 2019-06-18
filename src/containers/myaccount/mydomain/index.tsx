/**
 * 我的域名
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Page from '@/components/Page';
import Select from '@/components/select';
import Input from '@/components/Input/Input';
import Card from '@/components/card';
import Transfer from './transfer';
import Map from './map';
import * as formatTime from '@/utils/formatTime';
import { IMydomainProps, IDomainList } from '../interface/mydomain.interface';
import { when } from 'mobx';
import * as Neotool from '@/utils/neotools';
import { Contract } from '@/utils/contract';

@inject('mydomain', 'common')
@observer
class Mydomain extends React.Component<IMydomainProps, any> {
  public state = {
    mydomainFistLoad: true, // 是否初次加载
  }
  // 筛选条件
  private orderOptions = [
    {
      id: 'fulldomain',
      name: '字母顺序',
    },
    {
      id: 'ttl',
      name: '到期时间',
    }
  ]
  // 筛选条件二
  private selectOptions = [
    {
      id: '',
      name: '全部',
    },
    {
      id: 'Sell',
      name: '出售中',
    },
    {
      id: 'NotSell',
      name: '未出售',
    },
    {
      id: 'Map',
      name: '已映射',
    },
    {
      id: 'NotMap',
      name: '未映射',
    }
  ]
  public componentWillUnmount()
  {
    this.props.mydomain.inputSearchValue = '';
    this.props.mydomain.fillterType = '';// 过滤条件
    this.props.mydomain.orderbyType = 'fulldomain'; // 排序条件
    this.props.mydomain.mydomainPage = 1; // 页码
    this.props.mydomain.domainList = [];
    this.props.mydomain.domainListCount = 0;
  }
  public render()
  {
    return (
      <div className="mydomain-page">
        <div className="orderby-wrap">
          <div className="orderby-one">
            <Select defaultValue='fulldomain' options={this.orderOptions} text='排序' onCallback={this.onOrderbyBack} />
          </div>
          <div className="orderby-two">
            <Select defaultValue='' options={this.selectOptions} text='筛选' onCallback={this.onFillterBack} />
          </div>
          <Input
            placeholder="搜索我的域名"
            styleType="small"
            value={this.props.mydomain.inputSearchValue}
            onChange={this.onChangeSearch}
            type='text'
            onCancelSearch={this.onCancelSearch}
            onEnter={this.doSearchDomain}
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
            {
              this.props.mydomain.domainListCount === 0 && <li className="table-td li-no-data">没有相关数据</li>
            }
            {
              this.props.mydomain.domainListCount > 0 && this.props.mydomain.domainList.map((item: IDomainList, index: number) =>
              {
                return (
                  <li className={classnames("table-td", { 'open-td': item.active })} key={index}>
                    <ul className="td-ul" onClick={this.onClickOpenInfo.bind(this, item)}>
                      <li className="td-li">
                        <span className={item.isSelling ? "gray-text" : ""}>{item.fulldomain}</span>
                      </li>
                      <li className="td-li">
                        {
                          !item.isUsing && <Card text="未使用" cardsize="md-card" colortype="cb-green" />
                        }
                        {
                          item.isUsing && <Card text="使用中" cardsize="md-card" colortype="cb-orange" />
                        }
                        {
                          item.isBind && <Card text="已绑定" style={{ 'marginLeft': '15px' }} cardsize="md-card" colortype="cb-orange" />
                        }
                        {
                          item.isSelling && <Card text="出售中" style={{ 'marginLeft': '15px' }} cardsize="md-card" colortype="cb-gray" />
                        }
                        {
                          this.computeExpireTime(item) && <Card text="即将到期" cardsize="md-card" style={{ 'marginLeft': '15px' }} colortype="cb-red" />
                        }
                        <div className="li-btn">
                          {
                            (!item.isSelling && !item.isBind) && (
                              <>
                                <Button text="转让域名" btnColor="white-btn" onClick={this.openTransfer.bind(this,item,event)} />
                                <Button text="出售域名" style={{ 'marginLeft': '15px' }} onClick={this.onGoSentDeity.bind(this, item)} />
                              </>
                            )
                          }

                        </div>
                        {
                          item.isSelling && (<div className="li-lookinfo">
                            <Button text="查看挂单" onClick={this.onGoDomainInfo.bind(this, item)} />
                          </div>)
                        }

                      </li>
                    </ul>
                    {
                      (!item.isSelling) && (
                        <>
                          <ul className="open-ul">
                            <li className="open-li">
                              <span className="gray-text">到期时间</span>
                            </li>
                            <li className="open-li">
                              <span>
                                {formatTime.format('yyyy/MM/dd | hh:mm:ss', item.ttl.toString(), this.props.intl.locale)}
                              </span>
                              {/* {
                                this.computeExpireTime(item) && ( */}
                                  <div className="li-btn">
                                    <Button text="续约" onClick={this.handleToRenew.bind(this,item)} />
                                  </div>
                                {/* )
                              } */}
                            </li>
                          </ul>
                          <ul className="open-ul">
                            <li className="open-li">
                              <span className="gray-text">映射地址</span>
                            </li>
                            <li className="open-li">
                              <span>{item.data !== '' ? item.data : '-'}</span>
                              <div className="li-btn">
                                <Button text="修改" onClick={this.openMap.bind(this,item)} />
                              </div>
                            </li>
                          </ul>
                        </>
                      )
                    }
                  </li>)
              })
            }
          </ul>
          <Page
            totalCount={this.props.mydomain.domainListCount}
            pageSize={this.props.mydomain.mydomainSize}
            currentPage={this.props.mydomain.mydomainPage}
            onChange={this.onTransPage}
          />
        </div>
        {
          this.props.mydomain.showEditNum === 1 && <Transfer {...this.props} />
        }
        {
          this.props.mydomain.showEditNum === 2 && <Map {...this.props} />
        }       
      </div>
    );
  }

  private getListData = () =>
  {
    when(
      () => !!this.props.common.address,
      () => this.props.mydomain.getDomainList(this.props.common.address)
    )
  }
  // 域名转让
  private openTransfer = (item: IDomainList,event:Event)=>{
    event.preventDefault();
    event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();
    this.props.mydomain.editDomain = item;
    this.props.mydomain.showEditNum = 1;
  }
  // 地址映射
  private openMap = (item: IDomainList)=>{
    this.props.mydomain.mapDomain = item;
    this.props.mydomain.showEditNum = 2;
  }
  // 域名续约
  private handleToRenew = async (item: IDomainList)=>{
    console.log(item);
    const root = await Neotool.neotools.getRootInfo("neo");
    console.log(root.register)
    if(!root.register){
      return
    }
    const res = await Contract.renewDomain(item.fulldomain,root.register);
    console.log(res);
  }
  // 筛选返回
  private onFillterBack = (item) =>
  {
    this.props.mydomain.mydomainPage = 1;
    this.props.mydomain.fillterType = item.id;
    if (!this.state.mydomainFistLoad)
    {
      this.getListData();
    } else
    {
      this.setState({
        mydomainFistLoad: false
      })
    }
  }
  private onOrderbyBack = (item) =>
  {
    this.props.mydomain.mydomainPage = 1;
    this.props.mydomain.orderbyType = item.id;
    this.getListData();
  }
  // 翻页
  private onTransPage = (index: number) =>
  {
    this.props.mydomain.mydomainPage = index;
    this.getListData();
  }
  // 输入搜索内容
  private onChangeSearch = (value: string) =>
  {
    this.props.mydomain.inputSearchValue = value;
  }
  // 取消搜索
  private onCancelSearch = () =>
  {
    this.props.mydomain.inputSearchValue = '';
    this.getListData();
  }
  // 跳转到搜索页
  private doSearchDomain = () =>
  {
    this.props.mydomain.mydomainPage = 1;
    this.getListData();
  }

  // 计算是否即将到期
  private computeExpireTime = (item: IDomainList) =>
  {
    // true 为即将到期，反之为false
    const timestamp = new Date().getTime();
    const copare = (new Neo.BigInteger(item.ttl).multiply(1000)).subtract(new Neo.BigInteger(timestamp));
    let oneMonth = (24 * 60 * 60 * 1000) * 30;
    if (item.fulldomain.includes('.test'))
    {
      oneMonth = (5 * 60 * 1000) * 90;
    }

    return copare.compareTo(oneMonth) < 0 ? true : false;    // 小于oneMonth即将过期true
  }
  // 点击展开或关闭
  private onClickOpenInfo = (domain: IDomainList) =>
  {
    if (domain.isSelling)
    {
      return
    }
    domain.active = !domain.active;
  }

  // 跳转到详情页
  private onGoDomainInfo = (item: IDomainList) =>
  {
    this.props.history.push('/saleinfo/' + item.orderid + '?addr=' + this.props.common.address)
  }
  // 跳转到出售域名
  private onGoSentDeity = (item: IDomainList) =>
  {
    this.props.history.push('/selltable?selldomain=' + item.fulldomain + '&extime=' + item.ttl);
  }
}
export default injectIntl(Mydomain);