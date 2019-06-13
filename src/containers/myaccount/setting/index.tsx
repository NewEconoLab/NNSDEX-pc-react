/**
 * 账户设置
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import { ISettingProps } from '../interface/setting.interface';
// import Page from '@/components/Page';
// import Select from '@/components/select';
@inject('setting', 'common')
@observer
class Setting extends React.Component<ISettingProps, any> {
  public state = {
    emailFlag: false,
    cancelBox: false, // 关闭邮箱通知
    emailInput:'', // 邮箱
    isCanSendEmail:false, // 是否可发送邮箱验证
    inputEmailFlag:true, // 未绑定时，显示可输入状态
  }

  public async componentDidMount()
  {
    this.getEmailInfo();
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
          {
            this.state.emailFlag && (
              <div className="email-content">
                <div className="email-line">
                  <div className="send-btn">
                    {
                      this.state.inputEmailFlag  && (
                        <Button text="发送验证邮件" onClick={this.onSendBindEmail} btnColor={this.state.isCanSendEmail?'':"gray-btn"} />
                      )
                    }
                    {
                      (!this.state.inputEmailFlag && (this.props.setting.emailState.verifyState === '2' || this.props.setting.emailState.verifyState === '3')) && (
                        <span className="red-text">待验证</span>
                      )
                    }
                  </div>
                  <div className="email-text">通知邮箱</div>
                  {/* <div className="email-input-wrapper"> */}
                  {
                    this.state.inputEmailFlag 
                      ? <input type="text" className="email-input" value={this.state.emailInput} onChange={this.onChangeEmailInput} />
                      : <span>{this.props.setting.emailState && this.props.setting.emailState.email}</span>
                  }


                  {/* </div> */}
                  {
                    (!this.state.inputEmailFlag && (this.props.setting.emailState.verifyState === '2' || this.props.setting.emailState.verifyState === '3')) && (
                      <div className="email-node">
                        我们发送了一份验证邮件给您的邮箱。请前往邮箱进行验证。如果没有收到验证邮件，您可以<a className="orange-text" onClick={this.onSendAgain}>重新发送</a>或者<a className="orange-text" onClick={this.onChangeEmailBind}>修改邮箱</a>。
                      </div>
                    )
                  }
                  {
                    (!this.state.inputEmailFlag && this.props.setting.emailState.verifyState === '1') && (
                      <div className="email-node">
                        当有新的成交、求购信息时，您会收到相关的通知邮件。如果您更换了邮箱，请点击<a className="orange-text" onClick={this.onChangeEmailBind}>修改邮箱</a>。
                      </div>
                    )
                  }

                </div>
              </div>
            )
          }
        </div>
        {
          this.state.cancelBox && (
            <div className="email-cancel-wrapper">
              <div className="cancel-box">
                <h3>提示</h3>
                <p>关闭后将停止接收邮件并清除邮箱信息，确认关闭？</p>
                <div className="cancel-btn">
                  <Button text="取消" btnColor="white-btn" onClick={this.closeCancel} />
                  <Button text="确认" onClick={this.onClearEmain} />
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
  // 获取绑定邮箱信息
  private getEmailInfo = async () => {
    await this.props.setting.getEmailState(this.props.common.address);
    if (this.props.setting.emailState)
    {
      this.setState({
        emailFlag: this.props.setting.emailState.activeState === '1' ? true : false,
        inputEmailFlag:this.props.setting.emailState.activeState === '0' ? true : false,
      })
    }
  }
  // 打开或关闭绑定邮箱
  private onChangeEmailFlag = () =>
  {
    if (this.state.emailFlag && this.props.setting.emailState && this.props.setting.emailState.activeState === '1')
    {
      this.setState({
        cancelBox: true
      })
    }
    this.setState({
      emailFlag: !this.state.emailFlag,
      emailInput:''
    })
  }
  // 邮箱输入
  private onChangeEmailInput = (ev:React.ChangeEvent<HTMLInputElement>) =>{
    const value = ev.target.value;
    this.setState({
      emailInput:value
    })
    this.checkEmail(value);
  }
  // 邮箱验证
  private checkEmail = (str:string) => {
    const re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,10}$/; 
    if (re.test(str)) {
      this.setState({
        isCanSendEmail:true
      })
    } else {
      this.setState({
        isCanSendEmail:false
      })
    }
  }
  // 关闭取消绑定邮箱操作
  private closeCancel = () =>
  {
    this.setState({
      emailFlag: true,
      cancelBox: false,
      inputEmailFlag:false
    })
  }
  // 确认取消绑定邮箱操作
  private onClearEmain = async () =>
  {
    console.log('clear')
    const email = this.props.setting.emailState?this.props.setting.emailState.email:'';
    if(!email){
      return
    }
    await this.props.setting.clearEmail(this.props.common.address,email);
    this.getEmailInfo();
    this.setState({
      cancelBox: false,
      emailInput:''
    })
  }

  // 发送邮箱绑定
  private onSendBindEmail =async () => {
    console.log('send')
    if(!this.state.isCanSendEmail){
      return
    }
    await this.props.setting.bindEmail(this.props.common.address,this.state.emailInput);
    this.getEmailInfo();
  }
  // 重新发送邮箱绑定
  private onSendAgain =async () => {
    console.log('sendagain')    
    await this.props.setting.bindEmail(this.props.common.address,this.props.setting.emailState.email);
    this.getEmailInfo();
  }
  // 修改邮箱
  private onChangeEmailBind = () => {
    this.setState({
      emailInput:'',
      inputEmailFlag:true
    })
  }
}

export default injectIntl(Setting);
