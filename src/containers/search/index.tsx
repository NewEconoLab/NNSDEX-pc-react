/**
 * 搜索页
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Card from '@/components/card';

@observer
class SearchPage extends React.Component<any, any> {
  public render() {
    return (
      <div className="search-page">
        <div className="search-title">搜索结果</div>
        <div className="search-result">
          <div className="left-side">
            <Card text="可以竞拍" style={{'marginRight':'20px'}} cardsize="big-card" colortype="c-purple" />
            <span>asdf.neo</span>
          </div>
          <div className="right-side">
          <span className="price-text">100 CGAS</span>
            <Button text="立即开标" style={{'marginLeft':'30px'}} />
          </div>
        </div>
        <div className="search-title">出售中的相似域名</div>
        <div className="search-table">
          <ul className="table-ul">
            <li className="table-th">
              <ul className="th-ul">
                <li className="th-li">域名</li>
                <li className="th-li">价格</li>
                <li className="th-li">关注</li>
              </ul>              
            </li>
            <li className="table-td">
              <ul className="td-ul">
                <li className="td-li">
                  <span>abcde1.neo</span>
                </li>
                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
                <li className="td-li"><img src={require('@/img/star.png')} alt=""/></li>
              </ul>
            </li>
            <li className="table-td">
              <ul className="td-ul">
                <li className="td-li">
                  <span>abcde1.neo</span>
                </li>
                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
                <li className="td-li"><img src={require('@/img/star-un.png')} alt=""/></li>
              </ul>
            </li>
            <li className="table-td">
              <ul className="td-ul">
                <li className="td-li">
                  <span>abcde1.neo</span>
                </li>
                <li className="td-li"><span>12345678.12345678 CGAS</span></li>
                <li className="td-li"><img src={require('@/img/star.png')} alt=""/></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default injectIntl(SearchPage);
