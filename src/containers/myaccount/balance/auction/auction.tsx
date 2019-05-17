/**
 * 账户余额
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Hint from '@/components/hint';
import Button from '@/components/Button';
import Select from '@/components/select';

@observer
class AuctionBalance extends React.Component<any, any> {
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
    // 选择币种
    public onCallback = (item) =>
    {
        this.setState({
            selectType: item.id
        })
        // console.log(item.id);
    }
    public render()
    {
        return (
            <div className="balance-warpper">
                <div className="balance-title"><span className="wtitle">竞拍账户</span><Hint text="资金必须充值到竞拍账户后才能在竞拍域名时使用" /></div>
                <div className="balance-content">
                    <div className="bcontent-title"> 账户余额</div>
                    <div className="bcontent-middle abalance">
                        <div className="balance-name">CGAS</div>
                        <div className="balance-number">10</div>
                    </div>
                    <div className="bcontent-middle bbalance">
                        <div className="balance-smallbox">
                            <div className="b2-text">充值币种</div>
                            <div className="balance-select">
                                <Select
                                    defaultValue='cgas'
                                    options={this.typeOptions}
                                    text=''
                                    onCallback={this.onCallback}
                                    style={{ 'width': '2rem' }}
                                />
                            </div>
                        </div>
                        <div className="balance-smallbox">
                            <div className="b2-text">充值金额</div>
                            <div className="balance-input">
                                <input type="text" className="" />
                                <span className="tips-text">（100可用）</span>
                            </div>
                        </div>
                    </div>
                    <div className="bcontent-middle abalance">
                        <div className="bsuccess">充值成功！资金将在交易确认后到账！</div>
                    </div>
                    <div className="bcontent-btn">
                        <Button text="提现" btnColor="white-btn" />
                        <Button text="充值" />
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(AuctionBalance);
