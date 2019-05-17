/**
 * 绑定域名
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';

@observer
class BindDomain extends React.Component<any, any> {
  
  public render()
  {
    return (
      <div className="bind-page">
        绑定域名
      </div>
    );
  }
}

export default injectIntl(BindDomain);
