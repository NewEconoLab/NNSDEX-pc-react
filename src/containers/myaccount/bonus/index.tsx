/**
 * NNS分红
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';

@observer
class Bonus extends React.Component<any, any> {
  
  public render()
  {
    return (
      <div className="bonus-page">
        NNS分红        
      </div>
    );
  }
}

export default injectIntl(Bonus);
