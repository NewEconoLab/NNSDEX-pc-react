import request from 'utils/request';

/**
 * 获取可出售域名列表
 * @param addr 地址
 * @param str 搜索字段
 * @param fillter 过滤条件 Sell/NotSell/Map/NotMap或者为空串
 * @param orderby 排序条件 fulldomain/ttl或者空串
 * @param page 页码
 * @param size 条数
 */
export const getdomainlist = (addr:string,str:string,fillter:string,orderby:string,page:number,size:number) =>
{
  const opts = {
    method: 'getDexDomainList',
    params: [
      addr,
      str,
      fillter,
      orderby,
      page,
      size,
    ]
  }
  return request(opts);
}

export const getorderrange = (num:number) =>
{
  const opts = {
    method: 'getOrderRange',
    params: [
      num
    ]
  }
  return request(opts);
}