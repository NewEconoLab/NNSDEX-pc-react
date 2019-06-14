/**
 * 绑定域名
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Input from '@/components/Input/Input';

@observer
class BindDomain extends React.Component<any, any> {
  public state = {
    inputValue: ''
  }
  public render()
  {
    return (
      <div className="bind-page">
        <div className="bind-wrapper">
          <div className="bind-title">
            <div className="bind-left">我的地址：</div>
            <div className="bind-right">
              AJzoeKrj7RHMwSrPQDPdv61ciVEYpmhkjk
            </div>
          </div>
          <div className="bind-line">
            <div className="bind-line-left">已绑定域名</div>
            <div className="bind-line-right">
              <span className="orange-text">asddf.neo</span>
            </div>
            <div className="right-btn-wrapper">
              <Button text="修改" btnSize="sm-btn" />
            </div>
          </div>
          <div className="bind-line">
            <div className="bind-line-left">域名到期时间</div>
            <div className="bind-line-right">
              <span>2020/04/11 | 10:07:25</span>
            </div>
            <div className="right-btn-wrapper">
              <Button text="续约" btnSize="sm-btn" />
            </div>
          </div>
          <div className="bind-line">
            <div className="bind-line-left line-top">更改绑定</div>
            <div className="bind-line-right">
              <Input
                placeholder="搜索我的域名"
                value={this.state.inputValue}
                onChange={this.onSearchMydomain}
                type='text'
                styleType='domain'
                style={{ 'padding': '0 30px 0 15px' }}
                onCancelSearch={this.onCancelSearch}
                onEnter={this.doSearch}
              />
              <div className="domain-list" id="sellTable">
                <ul className="list-ul">
                  {/* {
                            this.props.sellform.sellDomainList.map((item, index) =>
                            {
                                return (
                                    <li key={index} className={item.fulldomain === this.props.sellform.readySellDomainName ? "list-li active" : "list-li"} onClick={this.onChooseDomain.bind(this, item)}>{item.fulldomain}</li>
                                )
                            })
                        } */}
                  <li className="list-li active" onClick={this.onChooseDomain.bind(this, 'sdaf')}>asdf</li>
                  <li className="list-li" onClick={this.onChooseDomain.bind(this, 'sdaf')}>asdf</li>
                  <li className="list-li" onClick={this.onChooseDomain.bind(this, 'sdaf')}>asdf</li>
                  <li className="list-li" onClick={this.onChooseDomain.bind(this, 'sdaf')}>asdf</li>
                  <li className="list-li" onClick={this.onChooseDomain.bind(this, 'sdaf')}>asdf</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bind-btn-wrapper">
            <Button text="取消" btnColor='white-btn' style={{ 'marginRight': '30px' }} />
            <Button text="下一步" btnColor='gray-btn' />
          </div>
          <div className="bind-btn-wrapper">
            <Button text="取消" btnColor='white-btn' style={{ 'marginRight': '30px' }} />
            <Button text="确定" />
          </div>
        </div>
      </div>
    );
  }
  private onSearchMydomain = (value: string) =>
  {
    console.log(value)
  }
  private onCancelSearch = () =>
  {
    console.log('cancel')
  }
  private doSearch = () =>
  {
    console.log('search')
  }
  private onChooseDomain = (item) =>
  {
    console.log(item)
  }
}

export default injectIntl(BindDomain);
