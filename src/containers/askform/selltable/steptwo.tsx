/**
 * 挂单第二步
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Select from '@/components/select';
import { ISellFormProps } from '../interface/sellform.interface';


@observer
class StepTwo extends React.Component<ISellFormProps, any> {
    public state = {
        selectType: '',
    }
    // 挂单方式
    private typeOptions = [
        {
            id: 'one',
            name: '一口价',  
        },
        {
            id: 'up',
            name: '降价拍卖',
        }
    ]
    
    public render()
    {
        return (
            <div className="step-two">
                <div className="two-content">
                    <Select
                        defaultValue='one'
                        options={this.typeOptions}
                        text=''
                        onCallback={this.onCallback}
                        style={{ 'width': '3rem','minWidth':"300px" }}
                    />
                    <div className="two-text">
                        {this.state.selectType === 'one' ? "以恒定价格出售您的域名。" : "降价拍卖需要您设置一个出售域名的最高价和最低价，订单以最高价挂出。如果没有卖掉每天会降一次价，直到降到最低价。"}
                    </div>
                </div>
                <div className="step-btn">
                    <Button text="上一步" btnColor="white-btn" onClick={this.onGoPrevious} />
                    <Button text="下一步" onClick={this.onGoNext} />
                </div>
            </div>
        );
    }
    // 上一步
    private onGoPrevious = () =>
    {
        this.props.sellform.stepNumber = 1;
    }
    // 下一步
    private onGoNext = () =>
    {
        if(this.state.selectType === 'one'){
            this.props.sellform.stepNumber = 3;
        }else{
            this.props.sellform.stepNumber = 5;
        }
        
    }
    // 选择挂单的方式
    private onCallback = (item) =>
    {
        this.setState({
            selectType: item.id
        })
        console.log(item.id);
    }
}

export default injectIntl(StepTwo)
