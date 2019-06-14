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

// export const getorderrange = (num:number) =>
// {
//   const opts = {
//     method: 'getOrderRange',
//     params: [
//       num
//     ]
//   }
//   return request(opts);
// }
/**
 * 获取邮箱绑定状态
 * @param addr 当前地址
 */
export const getemailstate = (addr:string) =>
{
  const opts = {
    method: 'getEmailState',
    params: [
      addr
    ]
  }
  return request(opts);
}
/**
 * 绑定邮箱
 * @param addr 当前地址
 * @param email 绑定的邮箱
 */
export const bindemail = (addr:string,email:string) =>
{
  const opts = {
    method: 'bindEmail',
    params: [
      addr,
      email
    ]
  }
  return request(opts);
}
/**
 * 解除绑定邮箱
 * @param addr 当前地址
 * @param email 解除绑定的邮箱
 */
export const clearemail = (addr:string,email:string) =>
{
  const opts = {
    method: 'clearEmail',
    params: [
      addr,
      email
    ]
  }
  return request(opts);
}
/**
 * 验证邮箱
 * @param addr 当前地址
 * @param email 邮箱
 * @param code 验证code
 */
export const verifyemail = (addr:string,email:string,code:string) =>
{
  const opts = {
    method: 'verifyEmail',
    params: [
      addr,
      email,
      code
    ]
  }
  return request(opts);
}

/**
 * 获取可绑定的域名列表 
 */
export const getBindDomainList = (address: string, currentPage: number, pageSize: number, str?: string) =>
{
    const opts = {
        method: 'getDomainListByAddress',
        params: [
            address,
            currentPage,
            pageSize,
            str?str:''
        ]
    }

    return request(opts);
}

/**
 * 获取绑定的域名
 * @param address 当前地址
 */
export const getBindDomainname = (address: string) =>
{
    const opts = {
        method: 'getMappingDomain',
        params: [
            address
        ],
        baseUrl: 'scan'
    }

    return request(opts);
}