/**
 * 主页布局
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
// import Toast from '@/components/Toast';

@observer
class Home extends React.Component<any, any> {
  
  public render() {
    return (
      <div className="index-page">
        home page
      </div>
    );
  }
}

export default injectIntl(Home);
