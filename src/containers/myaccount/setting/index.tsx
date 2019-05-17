/**
 * 账户设置
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
// import Page from '@/components/Page';
// import Select from '@/components/select';

@observer
class Setting extends React.Component<any, any> {
  public state = {
    emailFlag: false
  }
  public onChangeEmailFlag = () =>
  {
    this.setState({
      emailFlag: !this.state.emailFlag
    })
  }
  public render()
  {
    return (
      <div className="setting-page">
        <div className="email-wrapper">
          <div className="email-titlebox">
            <span>邮箱通知</span>
            <span className="tips-text">（ 开启邮箱通知后有新的成交、求购信息时，您会收到相关的通知邮件。）</span>
            <div className="email-btn" onClick={this.onChangeEmailFlag}>
              {
                this.state.emailFlag ? <img src={require('@/img/yes.png')} className="email-img" alt="" /> : <img src={require('@/img/no.png')} className="email-img" alt="" />
              }
            </div>
          </div>
          <div className="email-content">
              <div className="email-line">
                <div className="send-btn">
                  <Button text="发送验证邮件" btnColor="gray-btn"  />
                  <span className="red-text">待验证</span>
                </div>
                <div className="email-text">绑定邮箱</div>
                {/* <div className="email-input-wrapper"> */}
                  <input type="text" className="email-input"/>
                  <span>12345@163.com</span>
                {/* </div> */}
                <div className="email-node">
                我们发送了一份验证邮件给您的邮箱。请前往邮箱进行验证。如果没有收到验证邮件，您可以<a className="orange-text">重新发送</a>或者<a className="orange-text">修改邮箱</a>。
                </div>
                <div className="email-node">
                  当有新的成交、求购信息时，您会收到相关的通知邮件。如果您更换了邮箱，请点击<a className="orange-text">修改邮箱</a>。
                </div>                
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(Setting);
