/**
 * 挂单第一步
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Input from '@/components/Input/Input';
import { IAskFormProps } from './interface/askform.interface';


@observer
class StepOne extends React.Component<IAskFormProps, any> {
    public state = {
        inputValue: '',
        domainName: ''
    }
    // 输入搜索域名
    public onSearchMydomain = (value: string) =>
    {
        this.setState({
            inputValue: value
        })
    }
    // 实现搜索域名
    public doSearch = () =>
    {
        console.log(this.state.inputValue)
    }
    // 取消搜索
    public onCancelSearch = () =>
    {
        this.setState({
            inputValue: '',
        })
    }
    // 选择挂单域名
    public onChooseDomain = (domain: string) =>
    {
        this.setState({
            domainName: domain
        })
    }
    // 下一步
    public onGoNext = () =>
    {
       this.props.askform.stepNumber = 2;
    }
    public render()
    {
        return (
            <div className="step-one">
                <Input
                    placeholder="请搜索您想要的域名"
                    value={this.state.inputValue}
                    onChange={this.onSearchMydomain}
                    type='text'
                    styleType='domain'
                    onCancelSearch={this.onCancelSearch}
                    onEnter={this.doSearch}
                />
                <div className="domain-list">
                    <ul className="list-ul">
                        <li className="list-li active" onClick={this.onChooseDomain.bind(this, 'asdfs.neo')}>wallet.neo</li>
                        <li className="list-li">wallet.neo</li>
                        <li className="list-li">wallet.neo</li>
                        <li className="list-li">wallet.neo</li>
                        <li className="list-li">wallet.neo</li>
                        <li className="list-li">wallet.neo</li>
                        <li className="list-li">wallet.neo</li>
                        <li className="list-li">wallet.neo</li>
                        <li className="list-li">wallet.neo</li>
                        <li className="list-li">wallet.neo</li>
                    </ul>
                </div>
                <div className="step-btn">
                    <Button text="下一步" btnColor={this.state.domainName!==''?'':'gray-btn'} onClick={this.onGoNext} />
                </div>
            </div>
        );
    }
}

export default injectIntl(StepOne)
