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
import { ISellFormProps } from '../interface/sellform.interface';
import * as formatTime from '@/utils/formatTime';

@observer
class StepThree extends React.Component<ISellFormProps, any> {
    public state = {
        sellValue: '', // 
        selectType: '',  // 支付资产的选择
        canDoNext: false, // 是否可下一步操作
        nncCheck: true, // 拥有的nnc金额是否够支付 true为够，false为不够
        showAdd: false, // 是否显示追加抵押
        addNNCNum: 0, // 追加抵押的nnc
        maxNNCFlag:false, // 追加抵押最大
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
    public componentDidMount()
    {
        this.props.sellform.getOrderRank(100);
    }
    // 上一步
    public onGoPrevious = () =>
    {
        this.props.sellform.sellAssetName = '';
        this.props.sellform.sellPrice = 0;
        this.props.sellform.endNNCPrice = 0;
        this.props.sellform.stepNumber = 2;        
    }
    // 下一步
    public onGoNext = () =>
    {
        this.props.sellform.sellAssetName = this.state.selectType;
        this.props.sellform.sellPrice = parseFloat(this.state.sellValue);
        this.props.sellform.endNNCPrice = parseFloat(this.state.addNNCNum.toString())+100;
        this.props.sellform.stepNumber = 4;
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
                                onCallback={this.onAcceptAsset}
                                style={{ 'width': '2rem' }}
                            />
                            {
                                this.state.selectType === 'cgas' && (
                                    <div className="tips-text">
                                        （ 手续费：2%  <Hint text="使用CGAS成交的订单，合约会抽取2%成交额的手续费进入分红池。" />  ）
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">价格</div>
                        <div className="line-text line-input-wrapper">
                            <input type="text" className="line-input" value={this.state.sellValue} onChange={this.onSellValue} />
                        </div>
                    </div>
                    <div className="line-wrapper">
                        <div className="line-name">抵押NNC
                            <Hint text="发起拍卖订单需要抵押100NNC。通过追加抵押额外NNC，可以使您的订单展示在首页更显眼的位置。抵押的NNC将在订单结束后全额返还。" />
                        </div>
                        <div className="line-text">
                            100 NNC
                                {
                                !this.state.nncCheck ? <div className="tips-text red-text">（ 账户余额不足 ）</div>
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
                                        (parseFloat(this.state.addNNCNum.toString()) === 0 || this.state.sellValue==='')? <img className="number-btn number-un-btn" src={require("@/img/minus-un.png")} alt="" />
                                        :<img className="number-btn" src={require("@/img/minus.png")} alt="" onClick={this.onMinusNNC} />
                                    }
                                    <span className="plus-text">+</span>
                                    <input type="text" className="number-input" value={this.state.addNNCNum} onChange={this.onNNCAdd} onBlur={this.onBlurNNCInput} />
                                    {
                                        (this.state.maxNNCFlag || this.state.sellValue==='') ? <img className="number-btn number-un-btn" src={require("@/img/plus-un.png")} alt="" />
                                        :<img className="number-btn" src={require("@/img/plus.png")} alt="" onClick={this.onPlusNNC} />
                                    }                                    
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="step-btn">
                    <Button text="上一步" btnColor="white-btn" onClick={this.onGoPrevious} />
                    <Button text="下一步" onClick={this.onGoNext} btnColor={this.state.canDoNext ? '' : 'gray-btn'} />
                </div>
            </div>
        );
    }
    // 显示追加抵押
    private onClickShow = () =>
    {
        console.log('todo');
        this.setState({
            showAdd: !this.state.showAdd,
            addNNCNum: 0
        })
    }
    // 选择币种
    private onAcceptAsset = (item) =>
    {
        this.setState({
            selectType: item.id,
            sellValue: '',
            canDoNext: false,
            addNNCNum:0
        })
        this.props.sellform.sellAssetName = item.id;
    }
    // 输入金额
    private onSellValue = (e: any) =>
    {
        const value = e.target.value;
        // 判断是否是数字
        if (isNaN(value))
        {
            return false
        }

        // 若输入为空或为0时
        if (parseFloat(value) === 0 || value === '')
        {
            this.setState({
                canDoNext: false
            })
        }

        if (this.state.selectType === 'cgas')
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

        this.setState({
            sellValue: value
        })
        // 如果大于可用金额
        const num = this.state.selectType === 'cgas' ? this.props.common.balances.contractcgas : this.props.common.balances.contractnnc;
        if (parseFloat(value) > num)
        {
            this.setState({
                sellValue: num
            })
        }
        // 判断nnc金额是否足够
        if (this.state.selectType === 'cgas')
        {
            const flag = this.props.common.balances.contractnnc >= 100 ? true : false;
            this.setState({
                nncCheck: flag,
                canDoNext: flag
            })
        } else
        {
            // 求支付出售域名抵押的nnc之后
            const endflag = (this.props.common.balances.contractnnc - parseFloat(value)) > 100;
            console.log(this.props.common.balances.contractnnc - parseFloat(value))
            this.setState({
                nncCheck: endflag,
                canDoNext: endflag
            })
        }
        return true
    }

    private onNNCAdd = (e: any) =>
    {
        const value = e.target.value;
        // 判断是否是数字
        if (isNaN(value))
        {
            return false
        }

        // 若输入为空或为0时
        if (value === '' && parseFloat(value)<0)
        {
            this.setState({
                canDoNext: false,
                addNNCNum: 0
            })
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
            addNNCNum: value,
            maxNNCFlag:false
        })
        // 如果大于可用金额
        const num = this.props.common.balances.contractnnc;
        if (parseFloat(value) > num)
        {
            this.setState({
                addNNCNum: num - 100,
                maxNNCFlag:true
            })
        }
        // 判断nnc金额是否足够
        if (this.state.selectType === 'cgas')
        {
            const flag = this.props.common.balances.contractnnc - 100 - this.state.addNNCNum >= 0 ? true : false;
            this.setState({
                nncCheck: flag,
                canDoNext: flag
            })
        } else
        {
            // 求支付出售域名抵押的nnc之后追加抵押
            const endflag = this.props.common.balances.contractnnc - parseFloat(value) - 100 >= 0 ? true : false;
            console.log(this.props.common.balances.contractnnc - parseFloat(value))
            this.setState({
                nncCheck: endflag,
                canDoNext: endflag
            })
        }        
        return true
    }
    // 抵押nnc输入失去焦点
    private onBlurNNCInput =()=>{
        console.log('blur');
        this.addEndNNC();
    }
    // 加
    private onPlusNNC = () =>
    {
        // 可花费的抵押
        let costPrice = this.props.common.balances.contractnnc - 100;
        console.log(parseFloat(this.state.addNNCNum.toString())+'---'+costPrice)
        if(this.state.selectType === 'nnc'){
            costPrice = costPrice-parseFloat(this.state.sellValue);
        }        
        this.setState({
            addNNCNum: parseFloat(this.state.addNNCNum.toString()) + 10
        },()=>{
            // 最大不超过存储值
            if(parseFloat(this.state.addNNCNum.toString()) >= costPrice){
                this.setState({
                    addNNCNum:costPrice,
                    maxNNCFlag:true
                })                
            }
            this.addEndNNC();
        })
    }
    // 减
    private onMinusNNC = () =>
    {
        this.setState({
            maxNNCFlag:false
        })
        this.setState({
            addNNCNum: parseFloat(this.state.addNNCNum.toString())- 10
        },()=>{
            if(this.state.addNNCNum<0){
                this.setState({
                    addNNCNum:0
                })
            }
            this.addEndNNC();
        })
    }
    private addEndNNC = () =>{
        const endNum = parseFloat(this.state.addNNCNum.toString())+100;
        console.log(endNum)
        this.props.sellform.getOrderRank(endNum);
    }
}

export default injectIntl(StepThree)
