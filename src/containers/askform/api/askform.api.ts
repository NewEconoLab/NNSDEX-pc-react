import request from 'utils/request';

/**
 * 获取可出售域名列表
 * @param addr 地址
 * @param str 搜索字段
 * @param page 页码
 * @param size 条数
 */
export const getcanselldomain = (addr:string,str:string,page:number,size:number) =>
{
  const opts = {
    method: 'getDexDomainCanUseList',
    params: [
      addr,
      str,
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