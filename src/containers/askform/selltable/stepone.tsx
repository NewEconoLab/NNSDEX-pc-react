/**
 * 挂单第一步
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Input from '@/components/Input/Input';
import { ISellFormProps } from '../interface/sellform.interface';
import { when } from 'mobx';

@inject('sellform', 'common')
@observer
class StepOne extends React.Component<ISellFormProps, any> {
    public state = {
        inputValue: ''
    }
    private listRef: React.RefObject<HTMLDivElement> = React.createRef();
    public componentDidMount()
    {
        when(
            () => !!this.props.common.address,
            () => this.getSellDomainData(true)
        )
        const table = document.querySelector('#sellTable');
        if (table)
        {
            table.addEventListener('scroll', this.onScroll, false);
        }
    }
    public componentWillUnmount()
    {
        // this.props.sellform.myBetList = [];
        // this.props.sellform.myBetCount = 0;
        window.removeEventListener('scroll', this.onScroll);
        this.props.sellform.pageIndex = 1;
        this.props.sellform.isLast = false;
        this.props.sellform.isLoading = false;
        // clearInterval(this.state.timer);
    }

    public render()
    {
        return (
            <div className="step-one" ref={this.listRef} >
                <Input
                    placeholder="请搜索您想要的域名"
                    value={this.state.inputValue}
                    onChange={this.onSearchMydomain}
                    type='text'
                    styleType='domain'
                    onCancelSearch={this.onCancelSearch}
                    onEnter={this.doSearch}
                />
                <div className="domain-list" id="sellTable">
                    <ul className="list-ul">
                        {
                            this.props.sellform.sellDomainList.map((item, index) =>
                            {
                                return (
                                    <li key={index} className={item.fulldomain === this.props.sellform.readySellDomainName ? "list-li active" : "list-li"} onClick={this.onChooseDomain.bind(this, item)}>{item.fulldomain}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="step-btn">
                    <Button text="下一步" btnColor={this.props.sellform.readySellDomainName !== '' ? '' : 'gray-btn'} onClick={this.onGoNext} />
                </div>
            </div>
        );
    }

    // 滚动事件
    private onScroll = () =>
    {
        if (this.props.sellform.sellDomainCount === 0)
        {
            return;
        }
        if (!this.listRef || !this.listRef.current)
        {
            return;
        }
        const table = document.querySelector('#sellTable');
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
        console.log('tableScroll:' + tableScroll);
        console.log('(table[offsetHeight]):' + (table['offsetHeight']));
        console.log('ul.offsetHeight:' + ul.offsetHeight);
        console.log('左边:' + (tableScroll + (table['offsetHeight'])));
        console.log('右边：' + (ul.offsetHeight - 5));
        // console.log(tableScroll + (table['offsetHeight']) >= ul.offsetHeight-5)
        if ((tableScroll + (table['offsetHeight'])) >= (ul.offsetHeight - 5))
        {
            this.getSellDomainData(false);
        }
    }

    // 获取可出售的域名列表
    private getSellDomainData = (isFirst?: boolean) =>
    {
        this.props.sellform.getSellDomainList(this.props.common.address, this.state.inputValue, isFirst)
    }
    // 输入搜索域名
    private onSearchMydomain = (value: string) =>
    {
        this.setState({ 
            inputValue: value
        })
    }
    // 实现搜索域名
    private doSearch = () =>
    {
        console.log(this.state.inputValue)
    }
    // 取消搜索
    private onCancelSearch = () =>
    {
        this.setState({
            inputValue: '',
        })
    }
    // 选择挂单域名
    private onChooseDomain = (item) =>
    {
        this.props.sellform.readySellDomainName = item.fulldomain;
        this.props.sellform.readySellItem = item;
    }
    // 下一步
    private onGoNext = () =>
    {
        this.props.sellform.stepNumber = 2;
    }
}

export default injectIntl(StepOne)
