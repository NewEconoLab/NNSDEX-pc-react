/**
 * 账户余额
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Auction from './auction/auction';
import Transaction from './transaction/transaction';
import { ICommonStore } from '@/store/interface/common.interface';
interface IBalanceProps{
    common:ICommonStore,
    history:History,
    intl:any
}
@inject('common')
@observer
class Balance extends React.Component<IBalanceProps, any> {
  public render()
  { 
    return (
      <div className="balance-page">
          <Auction />
          <Transaction {...this.props} />
      </div>
    );
  }
}

export default injectIntl(Balance);
 