/**
 * 搜索页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
import { injectIntl } from 'react-intl';
import Button from '@/components/Button';
import Card from '@/components/card';
import Slider from '@/components/slider';
import { getQueryString } from '@/utils/function'
import { ISearchProps, ILikeList, ISearchInfo } from './interface/search.interface';
@inject('search', 'common')
@observer
class SearchPage extends React.Component<ISearchProps, any> {
  public state = {
    searchDomain: getQueryString('keywords') || '',
    searchPage: 1,
    searchSize: 15,
  }
  public componentDidMount()
  {
    this.props.search.getSearchInfo(this.state.searchDomain);
    this.getLikeList();
  }
  public render()
  {
    return (
      <div className="search-page">
        <div className="search-title">搜索结果</div>
        {
          this.props.search.searchInfo.length !== 0 && this.props.search.searchInfo.map((item: ISearchInfo, value: number) =>
          {
            return (
              <div className="search-result" key={value}>
                <div className="left-side">
                  {
                    (item.state === 'CanAuction') && <Card text="可以竞拍" style={{ 'marginRight': '20px' }} cardsize="big-card" colortype="c-purple" />
                  }
                  {
                    (item.state === 'Auctioning') && <Card text="竞拍中" style={{ 'marginRight': '20px' }} cardsize="big-card" colortype="c-orange" />
                  }
                  {
                    (item.state === 'NotSelling') && <Card text="未出售" style={{ 'marginRight': '20px' }} cardsize="big-card" colortype="c-green" />
                  }
                  {
                    (item.state === 'YesSelling') && <Card text="出售中" style={{ 'marginRight': '20px' }} cardsize="big-card" colortype="c-red" />
                  }
                  <span>{item.fulldomain.toLowerCase()}</span>
                </div>
                <div className="right-side">
                  <span className="price-text">{item.price !== '0' ? (item.price + ' ' + item.assetName) : ''}</span>

                  {
                    (item.state === 'CanAuction') && <Button text="立即开标" onClick={this.onGoAuction} />
                  }
                  {
                    (item.state === 'Auctioning') && <Button text="参与竞拍" onClick={this.onGoAuction} style={{ 'marginLeft': '30px' }} />
                  }
                  {
                    (item.state === 'NotSelling') && <Button text="求购" onClick={this.onGoAskbuy.bind(this,item)} />
                  }
                  {
                    (item.state === 'YesSelling') && <Button text="查看详情" onClick={this.onGoDomainInfo.bind(this,item)} style={{ 'marginLeft': '30px' }} />
                  }
                </div>
              </div>
            )
          })
        }
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
            {
              this.props.search.likeCount === 0 && <li className="table-td li-no-data">没有相关数据</li>
            }
            {
              this.props.search.likeCount > 0 && this.props.search.likeList.map((item: ILikeList, index: number) =>
              {
                return (
                  <li className="table-td" key={index} onClick={this.onGoOtherDomainInfo.bind(this, item)} >
                    <ul className="td-ul">
                      <li className="td-li">
                        <span>{item.fullDomain}</span>
                        {(parseFloat(item.saleRate) !== 0 && item.sellType === 0) && <Slider rate={parseFloat(item.saleRate) * 100} />}
                        {
                          item.isMine && <Card text="我的" style={{ 'marginLeft': '15px' }} cardsize="sm-card" colortype="c-blue" />
                        }
                      </li>
                      <li className="td-li"><span>{item.nowPrice + ' ' + item.assetName}</span></li>
                      <li className="td-li" >
                        <span className="star-icon" onClick={this.onStarClick.bind(this, item)}>
                          {item.isStar ? <img src={require('@/img/star.png')} alt="" /> : <img src={require('@/img/star-un.png')} alt="" />}
                        </span>
                      </li>
                    </ul>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }

  // 获取数据
  private getLikeList = () =>
  {
    this.props.search.getLikeList(this.props.common.address, this.state.searchDomain, this.state.searchPage, this.state.searchSize)
  }
  // 翻页
  // private onChangeSearchPage = (index: number) =>
  // {
  //   this.setState({
  //     searchPage: index
  //   }, async () =>
  //     {
  //       this.getLikeList();
  //     })
  // }
  // 跳转到详情页
  private onGoDomainInfo = (item: ISearchInfo) =>
  {
    this.props.history.push('/saleinfo/' + item.orderid)
  }
  private onGoOtherDomainInfo = (item: ILikeList) =>
  {
    this.props.history.push('/saleinfo/' + item.orderid)
  }
  // 关注或取消关注
  private onStarClick = async (item: ILikeList, event: any) =>
  {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    if (!this.props.common.address)
    {
      this.props.common.login();
      return
    }
    const isStar = item.isStar ? 0 : 1;
    await this.props.search.setSearchStar(this.props.common.address, 0, item.orderid, isStar)
    if (this.props.search.searchStar)
    {
      item.isStar = !item.isStar
    }
  }
  // 跳转到网页钱包
  private onGoAuction = () =>
  {
    if (process.env.REACT_APP_SERVER_ENV === 'DEV')
    {
      window.open("https://testwallet.nel.group/");
    } else
    {
      window.open("https://wallet.nel.group/")
    }
  }
  // 跳转到请求挂单
  private onGoAskbuy = (item: ISearchInfo) =>
  {
    if (!this.props.common.address)
    {
      this.props.common.login();
      return
    }
    this.props.history.push('/askbuytable/' + item.fulldomain)
  }
}

export default injectIntl(SearchPage);
