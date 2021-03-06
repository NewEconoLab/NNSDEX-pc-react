import request from 'utils/request';
/**
 * 获取nep5的资产
 */
export const getnep5balanceofaddress =  (address:string,assetid:string) => {
    const opts = {
        method:'getnep5balanceofaddress',
        params:[
            assetid,
            address
        ],
      baseUrl:'common'
    }
    return request(opts);
}

/**
 * 发送交易
 * @param data 交易数据
 */
export const sendrawtransaction =  (data:string) => {
  const opts = {
   method:'sendrawtransaction',
   params:[
    data
   ],
   baseUrl:'common'
  }
  return request(opts);
}

/**
 * 获得指定地址对应的utxo
 * @param address 地址
 */
export const getUtxo=(address:string)=>{
  const opts={
    method:"getutxo",
    params:[
      address
    ],
    baseUrl:'common'
  }
  return request(opts);
}


/**
 * 获得指定地址对应的utxo
 * @param address 地址
 */
export const getDomainInfo=(domain:string)=>{
  const opts={
    method:"getdomaininfo",
    params:[
      domain
    ]
  }
  return request(opts);
}

/**
 * 判断交易是否入链
 * @param txid 交易id
 */
export const hasTx=(txid:string)=>{
  const opts={
    method:"hastx",
    params:[
      txid
    ]
  }
  return request(opts);
}

/**
 * 判断合约调用是否抛出 notify
 * @param txid 交易id
 */
export const hasContract=(txid:string)=>{
  const opts={
    method:"hascontract",
    params:[
      txid
    ]
  }
  return request(opts);
}

/**
 * 判断双交易是否成功
 * @param txid 交易id
 */
export const getRehargeAndTransfer=(txid:string)=>{
  const opts={
    method:"getrechargeandtransfer",
    params:[
      txid
    ]
  }
  return request(opts);
}
// getblockcount
export const getBlockCount=()=>{
  const opts={
    method:"getNotifyProcessHeight",
    params:[],
    // baseUrl:"common"
  }
  return request(opts);
}
/**
 * 合并发送交易
 * @param data1 
 * @param data2 
 */
export const rechargeAndTransfer=(data1:string,data2:string)=>{
  const opts={
    method:"rechargeandtransfer",
    params:[
      data1,
      data2
    ]
  }
  return request(opts);
}

/**
 * 查询当前地址的合约里的余额
 * @param addr 地址
 */
export const getBalanceFromDex = (addr:string)=>{
  const opts = {
    method:'getBalanceFromDex',
    params:[
      addr
    ]
  }
  return request(opts)
}

export const rpc_getInvokescript = (scripthash: Uint8Array)=>{
  const opts = {
    method:'invokescript',
    params:[
      scripthash.toHexString()
    ],
    baseUrl:'common'
  }
  return request(opts)
}