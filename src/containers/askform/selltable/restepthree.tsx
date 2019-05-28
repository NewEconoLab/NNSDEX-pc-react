/**
 * 降价挂单第三步
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
import { ISellFormProps } from '../interface/sellform.interface';
import * as formatTime from '@/utils/formatTime'

@observer
class StepThree extends React.Component<ISellFormProps, any> {
    public state = {
        reStartValue: '', // 出售初始价格
        reEndValue: '', // 出售最低价格
        reduceValue: '', // 出售每天减价价格
        reSelectType: '',  // 支付资产的选择
        reCanDoNext: false, // 是否可下一步操作
        reNNCCheck: true, // 拥有的nnc金额是否够支付 true为够，false为不够
        showAdd: false, // 是否显示追加抵押
        reAddNNCNum: 0, // 追加抵押的nnc
        reMaxNNCFlag: false, // 追加抵押最大
        reducePercent: 0, // 降价百分比
    }
    // 币种
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
    public componentDidMount()
    {
        this.props.sellform.getOrderRank(100);
    }
    // 上一步
    public onGoPrevious = () =>
    {
        this.props.sellform.sellAssetName = '';
        this.props.sellform.sellStartPrice = 0;
        this.props.sellform.sellEndPrice = 0;
        this.props.sellform.sellReducePrice = 0;
        this.props.sellform.endNNCPrice = 0;
        this.props.sellform.stepNumber = 2;
    }
    // 下一步 todo
    public onGoNext = () =>
    {
        this.props.sellform.sellAssetName = this.state.reSelectType;
        this.props.sellform.sellStartPrice = parseFloat(this.state.reStartValue);
        this.props.sellform.sellEndPrice = parseFloat(this.state.reEndValue);
        this.props.sellform.sellReducePrice = parseFloat(this.state.reduceValue);
        this.props.sellform.endNNCPrice = parseFloat(this.state.reAddNNCNum.toString())+100;
        this.props.sellform.stepNumber = 6;
    }

    public render()
    {
        const lineClassname = classnames('line-wrapper', { 'line-other': this.state.showAdd })
        return (
            <div className="step-form step-three">
                <div className="stepform-wrapper">
                    <div className="line-wrapper">
                        <div className="line-name">域名：</div>
                        <div className="line-text">{this.props.sellform.readySellItem && this.props.sellform.readySellItem.fulldomain}</div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">到期时间</div>
                        <div className="line-text">
                            {formatTime.format('yyyy/MM/dd | hh:mm:ss', this.props.sellform.readySellItem ? this.props.sellform.readySellItem.TTL.toString() : '0', this.props.intl.locale)}
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">接受币种</div>
                        <div className="line-text">
                            <Select
                                defaultValue='cgas'
                                options={this.typeOptions}
                                text=''
                                onCallback={this.onReAcceptAsset}
                                style={{ 'width': '2rem' }}
                            />
                            {
                                this.state.reSelectType === 'cgas' && (
                                    <div className="tips-text">
                                        （ 手续费：2%  <Hint text="使用CGAS成交的订单，合约会抽取2%成交额的手续费进入分红池。" />  ）
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">初始价格</div>
                        <div className="line-text line-input-wrapper">
                            <input type="text" className="line-input" value={this.state.reStartValue} onChange={this.onInputStartValue} />
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">最低价格</div>
                        <div className="line-text line-input-wrapper">
                            <input type="text" className="line-input" value={this.state.reEndValue} onChange={this.onInputEndValue} />
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">每天降低</div>
                        <div className="line-text line-input-wrapper">
                            <input type="text" className="line-input" value={this.state.reduceValue} onChange={this.onInputReduceValue} />
                            <div className="tips-text">
                                （ 约最高价的{this.state.reducePercent}% ）
                            </div>
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">抵押NNC
                            <Hint text="发起拍卖订单需要抵押100NNC。通过追加抵押额外NNC，可以使您的订单展示在首页更显眼的位置。抵押的NNC将在订单结束后全额返还。" />
                        </div>
                        <div className="line-text">
                            100 NNC
                            {
                                !this.state.reNNCCheck ? <div className="tips-text red-text">（ 账户余额不足 ）</div>
                                    : <div className="tips-text ">（ 大约排在{this.props.sellform.orderRank}订单之后 ）</div>
                            }
                        </div>
                    </div>
                    <div className={lineClassname}>
                        <div className="line-name">
                            <Checkbox text="追加抵押以优先显示" onClick={this.onClickShow} />
                        </div>
                        {
                            this.state.showAdd && (
                                <div className="line-text">
                                    {
                                        (parseFloat(this.state.reAddNNCNum.toString()) === 0 || this.state.reStartValue === '') ? <img className="number-btn number-un-btn" src={require("@/img/minus-un.png")} alt="" />
                                            : <img className="number-btn" src={require("@/img/minus.png")} alt="" onClick={this.onReMinusNNC} />
                                    }
                                    <span className="plus-text">+</span>
                                    <input type="text" className="number-input" value={this.state.reAddNNCNum} onChange={this.onReNNCAdd} onBlur={this.onBlurReNNCInput} />
                                    {
                                        (this.state.reMaxNNCFlag || this.state.reStartValue === '') ? <img className="number-btn number-un-btn" src={require("@/img/plus-un.png")} alt="" />
                                            : <img className="number-btn" src={require("@/img/plus.png")} alt="" onClick={this.onRePlusNNC} />
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="step-btn">
                    <Button text="上一步" btnColor="white-btn" onClick={this.onGoPrevious} />
                    <Button text="下一步" onClick={this.onGoNext} btnColor={this.state.reCanDoNext ? '' : 'gray-btn'} />
                </div>
            </div>
        );
    }
    // 选择币种
    private onReAcceptAsset = (item) =>
    {
        this.setState({
            reSelectType: item.id,
            reSellValue: '',
            reCanDoNext: false,
            reAddNNCNum: 0
        })
        this.props.sellform.sellAssetName = item.id;
    }
    // 显示追加抵押
    private onClickShow = () =>
    {
        this.setState({
            showAdd: !this.state.showAdd,
            reAddNNCNum: 0
        })
    }
    // 校验输入内容
    private onChectInputValue = (value) =>
    {
        // 判断是否是数字
        if (isNaN(value))
        {
            return false
        }

        // 若输入为空或为0时
        if (value === '' || parseFloat(value) === 0)
        {
            this.setState({
                reCanDoNext: false
            })
        }
        // 小于0时
        if (parseFloat(value) < 0)
        {
            this.setState({
                reCanDoNext: false
            })
            return false
        }

        if (this.state.reSelectType === 'cgas')
        {
            // 精确到一位
            if (/\./.test(value) && value.split('.')[1].length >= 2)
            {
                return false;
            }

        } else // nnc的
        {
            // 精确到两位
            if (/\./.test(value) && value.split('.')[1].length >= 3)
            {
                return false;
            }
        }

        // 大于1000000000
        if (parseFloat(value) > 1000000000)
        {
            return false;
        }

        return true;
    }
    // 输入初始金额
    private onInputStartValue = (e: any) =>
    {
        const value = e.target.value;
        const checkResult = this.onChectInputValue(value);
        if (!checkResult)
        {
            return false
        }

        this.setState({
            reStartValue: value,
            reEndValue: '',
            reduceValue: ''
        }, () =>
        {
            this.checkNextStep();
            this.computePercent();
        })
        return true
    }
    // 输入最低金额
    private onInputEndValue = (e: any) =>
    {
        const value = e.target.value;
        const checkResult = this.onChectInputValue(value);
        if (!checkResult)
        {
            return false
        }
        // 如果金额大于初始金额
        if (parseFloat(value) >= parseFloat(this.state.reStartValue))
        {
            return false
        }
        this.setState({
            reEndValue: value,
            reduceValue: ''
        }, () =>
        {
            this.checkNextStep()
        })
        return true
    }
    // 输入降价金额
    private onInputReduceValue = (e: any) =>
    {
        const value = e.target.value;
        const checkResult = this.onChectInputValue(value);
        if (!checkResult)
        {
            return false
        }
        // 每天降低需要>0且<=（初始价格-最低价格）
        const reduceNum = parseFloat(this.state.reStartValue) - parseFloat(this.state.reEndValue);
        if (parseFloat(value) > reduceNum)
        {
            return false
        }

        this.setState({
            reduceValue: value
        }, () =>
        {
            this.checkNextStep();
            this.computePercent();
        })

        return true
    }
    private checkNextStep = () =>
    {
        if (this.state.reStartValue === '')
        {
            return false
        }
        if (this.state.reEndValue === '')
        {
            return false
        }
        if (this.state.reduceValue === '')
        {
            return false
        }

        this.setState({
            reCanDoNext: true,
        })
        return true
    }
    // 计算百分比
    private computePercent = () =>
    {
        if (this.state.reduceValue === '' || this.state.reStartValue === '')
        {
            this.setState({
                reducePercent: 0
            })
            return
        }
        const percent = (100 * parseFloat(this.state.reduceValue) / parseFloat(this.state.reStartValue)).toFixed(0);
        this.setState({
            reducePercent: parseInt(percent.toString(),10)
        })
    }
    // 增加抵押NNC
    private onReNNCAdd = (e: any) =>
    {
        const value = e.target.value;
        // 判断是否是数字
        if (isNaN(value))
        {
            return false
        }

        // 若输入为空或为0时
        if (value === '' && parseFloat(value) === 0)
        {
            this.setState({
                reAddNNCNum: 0
            })
        }
        // 小于0时
        if (parseFloat(value) < 0)
        {
            this.setState({
                reAddNNCNum: 0
            })
            return false
        }
        // 精确到整数
        if (/\./.test(value))
        {
            return false;
        }
        // 大于1000000000
        if (parseFloat(value) > 1000000000)
        {
            return false;
        }

        this.setState({
            reAddNNCNum: value,
            reMaxNNCFlag: false
        })
        // 如果大于可用金额
        const num = this.props.common.balances.contractnnc;
        if (parseFloat(value) > num)
        {
            this.setState({
                reAddNNCNum: num - 100,
                reMaxNNCFlag: true
            })
        }

        return true;
    }
    // 抵押nnc输入失去焦点
    private onBlurReNNCInput = () =>
    {
        console.log('blur');
        this.addReEndNNC();
    }
    // 加
    private onRePlusNNC = () =>
    {
        // 可花费的抵押
        const costPrice = this.props.common.balances.contractnnc - 100;
        console.log(parseFloat(this.state.reAddNNCNum.toString()) + '---' + costPrice)
        
        this.setState({
            reAddNNCNum: parseFloat(this.state.reAddNNCNum.toString()) + 10
        }, () =>
            {
                // 最大不超过存储值
                if (parseFloat(this.state.reAddNNCNum.toString()) >= costPrice)
                {
                    this.setState({
                        reAddNNCNum: costPrice,
                        reMaxNNCFlag: true
                    })
                }
                this.addReEndNNC();
            })
    }
    // 减
    private onReMinusNNC = () =>
    {
        this.setState({
            reMaxNNCFlag: false
        })
        this.setState({
            reAddNNCNum: parseFloat(this.state.reAddNNCNum.toString()) - 10
        }, () =>
            {
                if (this.state.reAddNNCNum < 0)
                {
                    this.setState({
                        reAddNNCNum: 0
                    })
                }
                this.addReEndNNC();
            })
    }
    private addReEndNNC = () =>
    {
        const endNum = parseFloat(this.state.reAddNNCNum.toString()) + 100;
        console.log(endNum)
        this.props.sellform.getOrderRank(endNum);
    }
}

export default injectIntl(StepThree)
