import request from 'utils/request';

/**
 * 获取可出售域名列表
 * @param addr 地址
 * @param str 搜索字段
 * @param sellState 出售状态
 * @param bindState 绑定状态
 * @param page 页码
 * @param size 条数
 */
export const getcanselldomain = (addr:string,str:string,sellState:string,bindState:string,page:number,size:number) =>
{
  const opts = {
    method: 'getDexDomainList',
    params: [
      addr,
      str,
      sellState,
      bindState,
      page,
      size,
    ]
  }
  return request(opts);
}