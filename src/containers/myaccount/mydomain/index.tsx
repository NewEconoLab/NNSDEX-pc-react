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
import * as formatTime from '@/utils/formatTime';
import { IMydomainProps, IDomainList } from '../interface/mydomain.interface';
import { when } from 'mobx';

@inject('mydomain', 'common')
@observer
class Mydomain extends React.Component<IMydomainProps, any> {
  public state = {
    inputSearchValue: '',
    fillterType: '',// 过滤条件
    orderbyType: 'fulldomain', // 排序条件
    mydomainPage: 1, // 页码
    mydomainSize: 15, // 条数
    mydomainFistLoad: true, // 是否初次加载
    showInfoList: []
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
            placeholder="请搜索您想要的域名"
            styleType="small"
            value={this.state.inputSearchValue}
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
                                {/* <Button text="转让域名" btnColor="white-btn" /> */}
                                <Button text="出售域名" style={{ 'marginLeft': '15px' }} onClick={this.onGoSentDeity.bind(this,item)} />
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
                                this.computeExpireTime(item) && (
                                  <div className="li-btn">
                                    <Button text="续约" />
                                  </div>
                                )
                              } */}
                            </li>
                          </ul>
                          <ul className="open-ul">
                            <li className="open-li">
                              <span className="gray-text">映射地址</span>
                            </li>
                            <li className="open-li">
                              <span>{item.data !== '' ? item.data : '-'}</span>
                              {/* <div className="li-btn">
                                <Button text="修改" />
                              </div> */}
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
            pageSize={this.state.mydomainSize}
            currentPage={this.state.mydomainPage}
            onChange={this.onTransPage}
          />
        </div>
      </div>
    );
  }

  private getListData = () =>
  {
    when(
      () => !!this.props.common.address,
      () => this.props.mydomain.getDomainList(this.props.common.address, this.state.inputSearchValue, this.state.fillterType, this.state.orderbyType, this.state.mydomainPage, this.state.mydomainSize)
    )
  }
  // todo
  private onFillterBack = (item) =>
  {
    console.log(item.id);
    this.setState({
      mydomainPage: 1,
      fillterType: item.id
    }, () =>
      {
        if (!this.state.mydomainFistLoad)
        {
          this.getListData();
        } else
        {
          this.setState({
            mydomainFistLoad: false
          })
        }
      })
  }
  private onOrderbyBack = (item) =>
  {
    console.log(item.id);
    this.setState({
      mydomainPage: 1,
      orderbyType: item.id
    }, () =>
      {
        this.getListData();
      })
  }
  // 翻页
  private onTransPage = (index: number) =>
  {
    this.setState({
      mydomainPage: index
    }, async () =>
      {
        this.getListData();
      })
  }
  // 输入搜索内容
  private onChangeSearch = (value: string) =>
  {
    this.setState({
      inputSearchValue: value
    })
  }
  // 取消搜索
  private onCancelSearch = () =>
  {
    console.log('cancel')
    this.setState({
      inputSearchValue: '',
    })
  }
  // 跳转到搜索页
  private doSearchDomain = () =>
  {
    this.setState({
      mydomainPage: 1
    }, () =>
      {
        this.getListData();
      })
  }

  // 计算是否即将到期
  private computeExpireTime = (item: IDomainList) =>
  {
    // true 为即将到期，反之为false
    const nowTime = new Date().getTime();
    console.log(nowTime);
    if (item.ttl - nowTime > 0)
    {
      console.log('todo')
    }
    const timestamp = new Date().getTime();
    const copare = (new Neo.BigInteger(item.ttl).multiply(1000)).subtract(new Neo.BigInteger(timestamp));
    let oneMonth = (24 * 60 * 60 * 1000) * 30;
    if(item.fulldomain.includes('.test')){
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

    // this.state.showInfoList.push(domain)
  }

  // 跳转到详情页
  private onGoDomainInfo = (item:IDomainList) =>
  {
    this.props.history.push('/saleinfo/' + item.orderid + '?addr=' + this.props.common.address)
  }
  // 跳转到出售域名
  private onGoSentDeity = (item:IDomainList) =>
  {
    this.props.history.push('/selltable?selldomain='+item.fulldomain+'&extime='+item.ttl);
  }
}
export default injectIntl(Mydomain);