import request from 'utils/request';

/**
 * 查询该域名出售详情
 * @param orderid 订单
 */
export const getselldetail = (orderid:string) =>
{
  const opts = {
    method: 'getDexDomainSellDetail',
    params: [
      orderid
    ]
  }
  return request(opts);
}
/**
 * 出售详情页，获取该域名的其他挂单
 * @param domain 域名
 */
export const getsellother = (domain:string) =>
{
  const opts = {
    method: 'getDexDomainSellOther',
    params: [
      domain,
      1,
      15
    ]
  }
  return request(opts);
}
/**
 * 获取该域名的求购详情
 * @param orderid 订单
 */
export const getaskbuydetail = (orderid:string) =>
{
  const opts = {
    method: 'getDexDomainBuyDetail',
    params: [
      orderid
    ]
  }
  return request(opts);
}
/**
 * 求购详情页，获取该域名的其他挂单
 * @param domain 域名
 */
export const getaskbuyother = (domain:string,addr:string) =>
{
  const opts = {
    method: 'getDexDomainBuyOther',
    params: [
      domain,
      addr
    ]
  }
  return request(opts);
}
/**
 * 获取该域名的拥有状态
 * @param domain 域名
 * @param addr 当前地址
 */
export const getdomainowner = (domain:string,addr:string) =>
{
  const opts = {
    method: 'getDexDomainInfo',
    params: [
      domain,
      addr
    ]
  }
  return request(opts);
}
