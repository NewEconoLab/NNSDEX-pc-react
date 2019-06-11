/**
 * 一级标题菜单
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import Input from '@/components/Input/Input';
import { History } from 'history'
import EventHandler from 'utils/event';
import zh from '@/img/zh.png';
import en from '@/img/en.png';
import store from "@/store";
import './index.less';
import { observer } from 'mobx-react';
import { IHomeStore } from '../home/interface/home.interface';
import { getQueryString } from 'utils/function'
import { ICommonStore } from '@/store/interface/common.interface';
import DownloadTeemo from '@/containers/download';

interface IState
{
  isShowSearch: boolean,         // 是否在首页显示search功能
  inputValue: string,            // 输入框的输入
  inputPlaceHolder: string,      // 输入框的placeholder
  isNormalSearch: boolean,      // 是否正常显示header上的search
  isShowLanguage: boolean        // 是否显示语言下拉框
  languageText: string,
  languageImg: ImageData,
  isShowOther: boolean, // 是否显示其他功能设置
  isShowMenu: boolean,
  loginText: string, // 登陆显示
}
interface IProps
{
  home: IHomeStore,
  history: History,
  locale: any,
  common: ICommonStore,
  btn: any,
  input: any,
  onChangeLanguage: (lang: string) => void;
  onSearch: (flag: boolean) => void;// 是否在搜索中
}
@observer
export default class Header extends React.Component<IProps, IState>{
  public readonly state = {
    isShowSearch: false,
    isNormalSearch: false,
    inputValue: '',
    inputPlaceHolder: this.props.input.placeholder,
    isShowLanguage: false,
    languageText: store['common'].language === 'en' ? "En" : "中",
    languageImg: store['common'].language === 'en' ? en : zh,
    isShowOther: false,
    isShowMenu: false,
    loginText: 'Login'
  }
  private searchRef: React.RefObject<any> = React.createRef()
  // public prop = this.props.intl.messages;
  public componentDidMount()
  {
    this.setState({
      inputValue: getQueryString('keywords') || ''
    })
    if (location.pathname !== '/search')
    {
      this.setState({
        isNormalSearch: true
      })
    }

    this.props.history.listen(() =>
    {
      let isNormalSearch = false;

      if (location.pathname !== '/search')
      {
        isNormalSearch = true
      }

      this.setState({
        isNormalSearch,
        isShowSearch: false
      })

      // this.props.home.searchAssetList = [];
    })
    EventHandler.add(this.globalClick);
  }

  // 销毁
  public componentWillUnmount()
  {
    EventHandler.remove(this.globalClick);
    this.setState({
      isShowLanguage: false,
      isShowOther: false
    })
  }
  public render()
  {
    return (
      <header className={this.headerClass()}>
        <div className="header-box">
          <div className="header-menu">
            <img src={require('@/img/logo.png')} alt="logo.png" className="logo-icon" />
            {
              this.state.isNormalSearch && (
                <ul>
                  {/* <li className={this.mapRouterUnderline('/')}><Link to="/bourse/salemarket">首页</Link></li> */}
                  {/* <li className={this.mapRouterUnderline('/auction')}>域名竞拍</li> */}
                  <li className={this.mapRouterUnderline(['/bourse/salemarket', '/bourse/askbuymarket', '/bourse/txhistory', '/bourse/mydeity'])}><Link to="/bourse/salemarket">域名交易</Link></li>
                  <li className={this.mapRouterUnderline(['/myaccount/balance', '/myaccount/mydomain', '/myaccount/bind', '/myaccount/bonus', '/myaccount/setting'])}>
                    {/* <Link to="/myaccount/balance">我的账户</Link> */}
                    <a href="javascript:;" onClick={this.toMyaccount}>我的账户</a>
                  </li>
                </ul>
              )
            }
            <Input
              placeholder="请搜索您想要的域名"
              value={this.state.inputValue}
              onChange={this.onChangeSearch}
              type='text'
              onFocus={this.onFocus}
              onBlur={this.onSearchBlur}
              styleType={this.state.isNormalSearch ? 'head' : 'onfous'}
              onCancelSearch={this.onCancelSearch}
              onEnter={this.goSearch}
              ref={this.searchRef}
            />
          </div>
          <div className="header-right">
            <ul>
              <li>
                <div className="language-toggle" id="language">
                  <img src={this.state.languageImg} alt="zh.png"  onClick={this.toggleLanguage} />
                  {/* <label>
                    <div className="language-content">
                      <span className="lang-text">{this.state.languageText}</span>
                      <img src={this.state.languageImg} alt="ch.png" />
                    </div>
                    <span className="middle-line" />
                    <div className="triangle-wrap">
                      <div className="triangle" />
                    </div>
                  </label> */}
                  {
                    this.state.isShowLanguage && (
                      <div className="select-wrap" id="selectlang" onClick={this.toggleLanguage}>
                        <ul>
                          <li><a onClick={this.onClickChinese} href="javascript:;">中文</a></li>
                          <li><a onClick={this.onClickEnglish} href="javascript:;">English</a></li>
                        </ul>
                      </div>
                    )
                  }
                </div>
              </li>
              <li>
                {this.props.common.address === '' ? <span className="point-login" onClick={this.onGoLogin}>Login</span> : <span className="logined-text"><span className="yuan-box" /> {this.props.common.address.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</span>}
              </li>
            </ul>
          </div>
        </div>
        {
          this.props.common.isLoginFlag !== 0 && <DownloadTeemo {...this.props} />
        }        
      </header>
    );
  }

  private globalClick = () =>
  {
    this.setState({
      isShowLanguage: false,
      isShowOther: false
    })
  }

  // 是否显示语言
  private toggleLanguage = (e) =>
  {
    this.setState({
      isShowLanguage: !this.state.isShowLanguage,
      isShowOther: false
    })
    e.stopPropagation();
  }

  // private getPath = (base) =>
  // {
  //   const locations = this.props.history.location;
  //   window.location.href = `${location.origin}${base || ''}${locations.pathname}${locations.search}${locations.hash}`
  // }
  // 切换英文
  private onClickEnglish = () =>
  {
    store['common'].setLanguage('en');
    this.setState({
      languageText: "En",
      languageImg: en
    })
    sessionStorage.setItem('language', 'en');
  }
  // 切换中文
  private onClickChinese = () =>
  {
    store['common'].setLanguage('zh');
    this.setState({
      languageText: "中",
      languageImg: zh
    })
    sessionStorage.setItem('language', 'zh');
  }
  // 登录与登出
  private onGoLogin = () =>
  {
    this.props.common.login();
  }
  // // 登录与登出
  // public onLogout = () =>
  // {
  //   this.props.common.loginOut();
  // }

  // 输入搜索内容
  private onChangeSearch = (value: string) =>
  {
    this.setState({  
      inputValue: value
    })
  }
  // 获取焦点
  private onFocus = () =>
  {
    this.setState({
      isNormalSearch: false
    })
    this.props.onSearch(true);
  }
  // 取消搜索
  private onCancelSearch = () =>
  {
    this.setState({
      inputValue: '',
      isNormalSearch: true
    })
    this.props.onSearch(false)
  }
  // 检测输入域名是否合法
  private checkDomainname(domainname: string)
  {
    let domain = domainname;
    if (/\.neo$/.test(domainname))
    {
      domain = domain.substring(0, domain.length - 4);
    }
    else if (/\.test$/.test(domainname))
    {
      domain = domain.substring(0, domain.length - 5);
    }
    else
    {
      return false;
    }
    if (domain.length >= 2 && domain.length <= 32)
    {
      return true;
    } else
    {
      return false;
    }
  }
  // 跳转到搜索页
  private goSearch = () =>
  {
    let search: string = this.state.inputValue;
    search = search.trim().toLowerCase();
    const checked = this.checkDomainname(search);
    if(!checked){
      return
    }
    const base = this.props.common.network === 'MainNet'?'':'/test';
    window.open(`${location.origin}${base || ''}/search?keywords=${search}`);
    this.onCancelSearch();
  }
  // 跳转到我的账户
  private toMyaccount = ()=>{
    // const base = this.props.common.network === 'MainNet'?'':'/test';
    if(!this.props.common.address)
    {
      this.props.common.login();
      // this.props.history.goBack();
      return
    }
    this.props.history.push('/myaccount/balance');
  }
  // 一级菜单选择
  private mapRouterUnderline = (path) =>
  {
    if (path instanceof Array)
    {
      for (const i in path)
      {
        if (new RegExp(path[i], 'i').test(this.props.history.location.pathname))
        {
          return "active"
        }
      }
    }
    if (path === this.props.history.location.pathname)
    {
      return "active"
    }
    return '';
  }
  // 标题样式显示
  private headerClass = () =>
  {
    if (new RegExp('/bourse', 'i').test(this.props.history.location.pathname))
    {
      return "header-wrap"
    }
    if (new RegExp('/myaccount', 'i').test(this.props.history.location.pathname))
    {
      return "header-wrap"
    }
    return "header-wrap header-shadow"
  }
  private onSearchBlur = () =>
  {
    this.setState({
      isNormalSearch: true
    })
    this.props.onSearch(false);
    this.searchRef.current.inputRef.current.blur();
  }
}
// export default injectIntl(Header);