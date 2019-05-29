import request from 'utils/request';

/**
 * 查询该域名详情
 * @param domain 域名
 */
export const searchInfo = (domain: string) =>
{
    const opts = {
        method: 'searchDexDomainInfo',
        params: [
            domain
        ]
    }
    return request(opts);
}
/**
 * 查询相似的域名列表
 * @param addr 当前地址
 * @param domain 域名
 * @param page 
 * @param size 
 */
export const searchLikeList = (addr: string, domain: string, page: number, size: number) =>
{
    const opts = {
        method: 'searchDexDomainLikeInfo',
        params: [
            addr,
            domain,
            page,
            size
        ]
    }
    return request(opts);
}