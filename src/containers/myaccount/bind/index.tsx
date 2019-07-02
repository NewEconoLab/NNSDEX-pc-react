/**
 * 绑定域名
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Input from '@/components/Input/Input';
import { IBindProps, IBindList } from '../interface/bind.interface';
import { Contract } from '@/utils/contract';
@inject('common', 'bind')
@observer
class BindDomain extends React.Component<IBindProps, any> {
  public state = {
    strInput: '',
    bindChangeNum: 0, // 修改绑定
    willDomainName: '' // 记录下将要绑定的域名
  }
  public componentDidMount()
  {
    this.props.bind.getBindDomain()
    const table = document.querySelector('#bindTable');
    if (table)
    {
      table.addEventListener('scroll', this.onScroll, false);
    }
  }
  public render()
  {
    return (
      <div className="bind-page">
        <div className="bind-wrapper">
          <div className="bind-title">
            <div className="bind-left">我的地址：</div>
            <div className="bind-right">
              {this.props.common.address}
            </div>
          </div>
          <div className="bind-line">
            <div className="bind-line-left">已绑定域名</div>
            <div className="bind-line-right">
              <span className="orange-text">{this.props.bind.bindDomain ? this.props.bind.bindDomain : '-'}</span>
            </div>
            <div className="right-btn-wrapper">
              <Button text={this.props.bind.bindDomain !== '' ? "修改" : "绑定"} btnSize="sm-btn" onClick={this.handleToChangeBind} />
            </div>
          </div>
          {
            this.state.bindChangeNum === 0 && (
              <div className="bind-line">
                <div className="bind-line-left">域名到期时间</div>
                <div className="bind-line-right">
                  <span>2020/04/11 | 10:07:25</span>
                </div>
                <div className="right-btn-wrapper">
                  <Button text="续约" btnSize="sm-btn" />
                </div>
              </div>
            )
          }

          {
            this.state.bindChangeNum !== 0 && (
              <>
                <div className="bind-line">
                  <div className="bind-line-left line-top">更改绑定</div>
                  {
                    this.state.bindChangeNum === 1 && (
                      <>
                        <div className="bind-line-right">
                          <Input
                            placeholder="搜索我的域名"
                            value={this.state.strInput}
                            onChange={this.onSearchMydomain}
                            type='text'
                            styleType='domain'
                            style={{ 'padding': '0 30px 0 15px' }}
                            onCancelSearch={this.onCancelSearch}
                            onEnter={this.doSearch}
                          />
                          <div className="domain-list" id="bindTable">
                            <ul className="list-ul">
                              {
                                this.props.bind.bindList.map((item, index) =>
                                {
                                  return (
                                    <li key={index} className={item.fulldomain === this.state.willDomainName ? "list-li active" : "list-li"} onClick={this.onChooseDomain.bind(this, item)}>{item.bindflag === '1' ? '解除绑定' : item.fulldomain}</li>
                                  )
                                })
                              }
                              {/* <li className="list-li active" onClick={this.onChooseDomain.bind(this, 'sdaf')}>asdf</li>
                              <li className="list-li" onClick={this.onChooseDomain.bind(this, 'sdaf')}>asdf</li>
                              <li className="list-li" onClick={this.onChooseDomain.bind(this, 'sdaf')}>asdf</li>
                              <li className="list-li" onClick={this.onChooseDomain.bind(this, 'sdaf')}>asdf</li>
                              <li className="list-li" onClick={this.onChooseDomain.bind(this, 'sdaf')}>asdf</li> */}
                            </ul>
                          </div>
                        </div>
                      </>
                    )
                  }
                  {
                    this.state.bindChangeNum === 2 && (
                      <div className="bind-line-right">
                        <span>{this.state.willDomainName === this.props.bind.bindDomain ? '解除绑定' : this.props.bind.willBindDomain}</span>
                      </div>
                    )
                  }

                </div>

                <div className="bind-btn-wrapper">
                  <Button text="取消" btnColor='white-btn' style={{ 'marginRight': '30px' }} onClick={this.handleToCancelBind} />
                  {
                    this.state.bindChangeNum === 1
                      ? <Button text="下一步" onClick={this.handleToNext} btnColor={this.state.willDomainName !== '' ? '' : 'gray-btn'} />
                      : <Button text="确定" onClick={this.handleToBindDomain} />
                  }
                </div>


                {/* <div className="bind-btn-wrapper">
                  <Button text="取消" btnColor='white-btn' style={{ 'marginRight': '30px' }} />
                  
                </div> */}
              </>
            )
          }
        </div>
      </div>
    );
  }
  // 滚动事件
  private onScroll = () =>
  {
    if (this.props.bind.bindList.length === 0)
    {
      return;
    }
    // if (!this.listRef || !this.listRef.current)
    // {
    //     return;
    // }
    const table = document.querySelector('#bindTable');
    if (!table)
    {
      return;
    }
    const ul = table.querySelector('ul');
    if (!ul)
    {
      return;
    }
    const tableScroll = table.scrollTop
    // console.log(tableScroll + (table['offsetHeight']) >= ul.offsetHeight-5)
    if ((tableScroll + (table['offsetHeight'])) >= (ul.offsetHeight - 5))
    {
      this.getBindList(false);
    }
  }
  // 域名输入
  private onSearchMydomain = (value: string) =>
  {
    console.log(value);
    this.setState({
      strInput: value
    })
  }
  // 取消搜索
  private onCancelSearch = () =>
  {
    console.log('cancel');
    this.setState({
      strInput: '',
      isCanNext: false
    }, () =>
      {
        this.props.bind.isLast = false;
        this.getBindList(true);
      })
  }
  // 搜索域名
  private doSearch = () =>
  {
    console.log('search');
    this.props.bind.isLast = false;
    this.getBindList(true);
  }
  // 选择绑定域名
  private onChooseDomain = (item: IBindList) =>
  {
    console.log(item)
    this.props.bind.willBindDomain = item
    this.setState({
      willDomainName: item.fulldomain
    })

  }
  // 修改按钮点击
  private handleToChangeBind = () =>
  {
    this.setState({
      bindChangeNum: 1
    })
    this.getBindList(true);
  }
  // 获取域名列表
  private getBindList = (isFirst?: boolean) =>
  {
    this.props.bind.getBindDomainList(isFirst, this.state.strInput)
  }
  // 绑定下一步
  private handleToNext = () =>
  {
    alert(1)
    this.setState({
      bindChangeNum: 2
    })
  }
  // 取消绑定操作
  private handleToCancelBind = () =>
  {
    this.setState({
      bindChangeNum: 0,
      willDomainName: ''
    })
    this.props.bind.willBindDomain = {
      fulldomain: '',
      bindflag: ''
    }
  }
  // 绑定域名或解除绑定
  private handleToBindDomain = async () =>
  {
    //
    if (!this.props.bind.willBindDomain)
    {
      return
    }
    // 绑定
    if (this.props.bind.willBindDomain.bindflag === '0')
    {
      const res = await Contract.bindDomain(this.props.bind.willBindDomain.fulldomain, this.props.common.address);
      console.log(res);
    }// 解除绑定
    else
    {
      const res = await Contract.cancalBindDomain(this.props.common.address);
      console.log(res)
    }
    this.handleToCancelBind();
  }
}

export default injectIntl(BindDomain);
