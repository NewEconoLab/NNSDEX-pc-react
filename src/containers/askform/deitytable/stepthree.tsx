/**
 * 一口价挂单第三步
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Select from '@/components/select';
import Hint from '@/components/hint';
import Checkbox from '@/components/Checkbox';
import classnames from 'classnames';

@observer
class StepThree extends React.Component<any, any> {
    public state = {
        inputValue: '', // 
        showAdd: false // 是否显示追加抵押
    }
    // 接受币种
    public typeOptions = [
        {
            id: 'cgas',
            name: 'CGAS',
        },
        {
            id: 'nnc',
            name: 'NNC',
        }
    ]
    // 上一步
    public onGoPrevious = () =>
    {
        this.props.askform.stepNumber = 2;
    }
    // 下一步
    public onGoNext = () =>
    {
        this.props.askform.stepNumber = 4;
    }
    // 选择币种
    public onCallback = (item) =>
    {
        this.setState({
            selectType: item.id
        })
        console.log(item.id);
    }
    
    public render()
    {
        const lineClassname = classnames('line-wrapper', { 'line-other': this.state.showAdd })
        return (
            <div className="step-form step-three">
                <div className="stepform-wrapper">
                    <div className="line-wrapper">
                        <div className="line-name">域名：</div>
                        <div className="line-text">abcde.neo</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">到期时间</div>
                        <div className="line-text">2019/04/11 | 10:07:25</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">接受币种</div>
                        <div className="line-text">
                            <Select
                                defaultValue='cgas'
                                options={this.typeOptions}
                                text=''
                                onCallback={this.onCallback}
                                style={{ 'width': '2rem' }}
                            />
                            <div className="tips-text">
                                （ 手续费：2%  <Hint text="使用CGAS成交的订单，合约会抽取2%成交额的手续费进入分红池。" />  ）
                                </div>
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">价格</div>
                        <div className="line-text line-input-wrapper">
                            <input type="text" className="line-input" />
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">抵押NNC
                            <Hint text="发起拍卖订单需要抵押100NNC。通过追加抵押额外NNC，可以使您的订单展示在首页更显眼的位置。抵押的NNC将在订单结束后全额返还。" />
                        </div>
                        <div className="line-text">
                            100 NNC
                                <div className="tips-text red-text">
                                （ 大约排在1000订单之后 ）（ 账户余额不足 ）
                                </div>
                        </div>
                    </div>
                    <div className={lineClassname}>
                        <div className="line-name">
                            <Checkbox text="追加抵押以优先显示" onClick={this.onClickShow} />
                        </div>
                        {
                            this.state.showAdd && (
                                <div className="line-text">
                                    <img className="number-btn" src={require("@/img/minus.png")} alt="" />
                                    <span className="plus-text">+</span>
                                    <input type="text" className="number-input" />
                                    <img className="number-btn" src={require("@/img/plus.png")} alt="" />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="step-btn">
                    <Button text="上一步" btnColor="white-btn" onClick={this.onGoPrevious} />
                    <Button text="下一步" onClick={this.onGoNext} />
                </div>
            </div>
        );
    }
    // 显示追加抵押
    private onClickShow = () =>
    {
        console.log('todo');
        this.setState({
            showAdd: !this.state.showAdd
        })
    }
}

export default injectIntl(StepThree)
