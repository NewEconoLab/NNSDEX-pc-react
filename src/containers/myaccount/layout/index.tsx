/**
 * 域名交易
 */
import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import { History } from 'history'
// import Button from '@/components/Button';
import './index.less';
import { ICommonStore } from '@/store/interface/common.interface';
import { observer, inject } from 'mobx-react';

interface IProps
{
  route: {
    [key: string]: any
  };
  history:History,
  common:ICommonStore
}
@inject('common')
@observer
export default class MyaccountLayout extends React.Component<IProps> {
  public render()
  {
    return (
      <div className="myaccount-layout-container">
        <div className="trans-header">
          <div className="header-box">
            <ul>
              <li>
                <Link to="/myaccount/balance">
                  {
                    this.mapChildUnderline('/myaccount/balance') 
                    ? <><img className="trans-icon" src={require('@/img/balance.png')} alt="" /><span className="trans-title trans-active">账户余额</span></>
                      : <><img className="trans-icon" src={require('@/img/balance-un.png')} alt="" /><span className="trans-title">账户余额</span></>
                  }
                  
                </Link>
              </li>
              <li>
                <Link to="/myaccount/mydomain">
                  {
                    this.mapChildUnderline('/myaccount/mydomain') 
                    ? <><img className="trans-icon" src={require('@/img/mynns.png')} alt="" /><span className="trans-title trans-active">我的域名</span></>
                      : <><img className="trans-icon" src={require('@/img/mynns-un.png')} alt="" /><span className="trans-title">我的域名</span></>
                  }
                  {/* <img className="trans-icon" src={require('@/img/boughtmarket.png')} alt="" /> */}
                  {/* <span className="trans-title">求购市场</span> */}
                </Link>
              </li>
              <li>
                <Link to="/myaccount/bind">
                  {
                    this.mapChildUnderline('/myaccount/bind') 
                    ? <><img className="trans-icon" src={require('@/img/bind.png')} alt="" /><span className="trans-title trans-active">绑定域名</span></>
                      : <><img className="trans-icon" src={require('@/img/bind-un.png')} alt="" /><span className="trans-title">绑定域名</span></>
                  }
                  {/* <img className="trans-icon" src={require('@/img/history.png')} alt="" /> */}
                  {/* <span className="trans-title">成交历史</span> */}
                </Link>
              </li>
              <li>
                <Link to="/myaccount/bonus">
                  {
                    this.mapChildUnderline('/myaccount/bonus') 
                    ? <><img className="trans-icon" src={require('@/img/bonus.png')} alt="" /><span className="trans-title trans-active">NNS分红</span></>
                      : <><img className="trans-icon" src={require('@/img/bonus-un.png')} alt="" /><span className="trans-title">NNS分红</span></>
                  }
                  {/* <img className="trans-icon" src={require('@/img/mylist.png')} alt="" /> */}
                  {/* <span className="trans-title">我的挂单</span> */}
                </Link>
              </li>
              <li>
                <Link to="/myaccount/setting">
                {
                    this.mapChildUnderline('/myaccount/setting') 
                    ? <><img className="trans-icon" src={require('@/img/settings.png')} alt="" /><span className="trans-title trans-active">账户设置</span></>
                      : <><img className="trans-icon" src={require('@/img/settings-un.png')} alt="" /><span className="trans-title">账户设置</span></>
                  }
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="myaccount-content-wrapper">
          {
            renderRoutes(this.props.route.children)
          }
        </div>
      </div>
    )
  }
  // 二级菜单选择
  private mapChildUnderline = (path) =>
  {
    if (path instanceof Array)
    {
      for (const i in path)
      {
        if (new RegExp(path[i], 'i').test(this.props.history.location.pathname))
        {
          return true;
        }
      }
    }
    if (path === this.props.history.location.pathname)
    {
      return true;
    }
    return false;
  }
}