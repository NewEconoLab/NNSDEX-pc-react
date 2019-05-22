// tslint:disable-next-line:no-reference
/// <reference path="./inject.d.ts" />
import { HASH_CONFIG } from "@/config";
import common from '@/store/common'
import * as Wallet from '@/utils/wallet';

export class Contract
{

    /**
     * 域名转hash    
     * #region 域名转hash算法
     * 域名转hash算法
     * aaa.bb.test =>{"test","bb","aa"}
     * @param domain 域名
     */
    public static nameHash(domain: string): Neo.Uint256
    {
        const domainBytes: Uint8Array = ThinNeo.Helper.String2Bytes(domain);
        const hashd = Neo.Cryptography.Sha256.computeHash(domainBytes);
        return new Neo.Uint256(hashd);
    }

    /**
     * 子域名转hash
     * @param roothash  根域名hash
     * @param subdomain 子域名
     */
    public static nameHashSub(roothash: Neo.Uint256, subdomain: string): Neo.Uint256
    {
        const bs: Uint8Array = ThinNeo.Helper.String2Bytes(subdomain);
        if (bs.length === 0)
        {
            return roothash;
        }
        const domain = Neo.Cryptography.Sha256.computeHash(bs);
        const domainBytes = new Uint8Array(domain);
        const domainUint8arry = domainBytes.concat(new Uint8Array(roothash.bits.buffer));
        const sub = Neo.Cryptography.Sha256.computeHash(domainUint8arry);
        return new Neo.Uint256(sub);
    }
    /**
     * 返回一组域名的最终hash
     * @param domainarray 域名倒叙的数组
     */
    public static nameHashArray(domainarray: string[]): Neo.Uint256
    {
        domainarray.reverse();
        let hash: Neo.Uint256 = this.nameHash(domainarray[0]);
        for (let i = 1; i < domainarray.length; i++)
        {
            hash = this.nameHashSub(hash, domainarray[i]);
        }
        return hash;
    }

    /**
     * 注册器充值
     * @param amount 充值金额
     */
    public static async rechargeReg(amount: number, assetid: Neo.Uint160)
    {
        // 小数精度的处理
        const str = amount.toFixed(HASH_CONFIG.assetDecimal[assetid.toString()]).replace(".", "");
        const count = parseFloat(str);

        const addressto = ThinNeo.Helper.GetAddressFromScriptHash(HASH_CONFIG.DEX_HASH);
        const address = common.address;
        const params: InvokeGroup = {
            merge: true,
            group: [
                {
                    scriptHash: assetid.toString(),  // 合约地址
                    operation: "transferIn",
                    arguments: [
                        { type: "Address", value: address },
                        { type: "Address", value: addressto },
                        { type: "Integer", value: count }
                    ],
                    network: common.network === 'testnet' ? 'TestNet' : 'MainNet'
                    // assets: 暂时用不到
                },
                {
                    scriptHash: HASH_CONFIG.DEX_HASH.toString(),
                    operation: "setMoneyIn",
                    arguments: [
                        /**
                         * 这个地方相当与使用了 Hook_Txid 类型 等同于当前的交易id 代替了 下面这几句
                         *  sb.EmitSysCall("System.ExecutionEngine.GetScriptContainer");
                         *   sb.EmitSysCall("Neo.Transaction.GetHash");
                         */
                        { type: "Hook_Txid", value: 0 }, // 
                        { type: "Hash160", value: assetid.toString() },
                    ],
                    fee: '0.001',
                    network: common.network === 'testnet' ? 'TestNet' : 'MainNet',
                    description: common.language === 'zh' ? '充值' : 'Topup'
                }
            ]
        }
        return Wallet.invokeGroup(params)
    }

    /**
     * 退款
     * @param assetid 退款的资产id
     * @param who 退币人地址
     * @param amount 退款数额
     */
    public static async getmoneyback(assetid: Neo.Uint160, who: string, amount: number)
    {
        // 小数精度的处理
        const str = amount.toFixed(HASH_CONFIG.assetDecimal[assetid.toString()]).replace(".", "");
        const count = parseFloat(str);
        const params: InvokeArgs = {
            scriptHash: HASH_CONFIG.DEX_HASH.toString(),
            operation: "getMoneyBack",
            arguments: [
                { type: "Address", value: who },
                { type: "Hash160", value: assetid.toString() },
                { type: "Integer", value: count }
            ],
            fee: '0.001',
            network: common.network === 'testnet' ? 'TestNet' : 'MainNet',
            description: common.language === 'zh' ? '退款' : 'Getmoneyback'
            // assets: 暂时用不到
        }
        return Wallet.invoke(params);
    }

    /**
     * 求购某个域名
     * @param addr 当前地址
     * @param domain 求购的域名
     * @param assetid 花费的资产id
     * @param price 花费的价格
     * @param nncPrice 抵押的nnc
     */
    public static async askBuy(addr: string, domain: string, assetid: Neo.Uint160, price: number, nncPrice: number)
    {
        let arr = domain.split(".").reverse();
        arr = arr.map(str => `(str)${str}`);
        // 小数精度的处理
        const strPrice = price.toFixed(HASH_CONFIG.assetDecimal[assetid.toString()]).replace(".", "");
        const amount = parseFloat(strPrice);
        const nncStr = nncPrice.toFixed(HASH_CONFIG.assetDecimal[HASH_CONFIG.ID_NNC.toString()]).replace('.', '');
        const nncAmount = parseFloat(nncStr);
        const params: InvokeArgs =
        {
            scriptHash: HASH_CONFIG.DEX_HASH.toString(),
            operation: "offerToBuy",
            arguments: [
                { type: "Address", value: addr },
                { type: "Array", value: [
                    {type:"String",value:arr[0]},
                    {type:"String",value:arr[1]}
                ] },
                { type: "Hash160", value: assetid.toString() },
                { type: "Integer", value: amount },
                { type: "Integer", value: nncAmount }
            ],
            fee: "0.001",
            network: common.network === 'testnet' ? 'TestNet' : 'MainNet',
            description: common.language === 'zh' ? '求购域名' : '求购域名'
        }
        return Wallet.invoke(params);
    }

    /**
     * 取消求购某个域名
     * @param addr 求购者
     * @param domain 取消求购的域名
     * @param assetid 求购所花费的资产id
     */
    public static async cancelDeity(addr: string,domain:string,assetid: Neo.Uint160)
    {
        const domainHash = this.nameHashArray(domain.split("."));
        const params: InvokeArgs = {
            scriptHash: HASH_CONFIG.DEX_HASH.toString(),
            operation: "discontinueOfferToBuy",
            arguments: [
                { type: "Address", value: addr },
                { type: "Hash256", value: domainHash.toString() },
                { type: "Hash160", value: assetid.toString() },
            ],
            fee: '0',
            network: common.network === 'testnet' ? 'TestNet' : 'MainNet',
            description: common.language === 'zh' ? '取消求购' : '取消求购'
        }
        return Wallet.invoke(params);
    }
    /**
     * 出售某个域名个求购者
     * @param addr 求购者
     * @param domain 求购的域名
     * @param assetid 求购所花费的资产id
     */
    public static async sellDomainToWho(who: string,domain:string,assetid: Neo.Uint160)
    {
        const domainHash = this.nameHashArray(domain.split("."));
        const params: InvokeArgs = {
            scriptHash: HASH_CONFIG.DEX_HASH.toString(),
            operation: "sell",
            arguments: [
                { type: "Address", value: who },
                { type: "Hash256", value: domainHash.toString() },
                { type: "Hash160", value: assetid.toString() },
            ],
            fee: '0',
            network: common.network === 'testnet' ? 'TestNet' : 'MainNet',
            description: common.language === 'zh' ? '指定出售域名' : '指定出售域名'
        }
        return Wallet.invoke(params);
    }
    /**
     * 
     * @param domain 出售的域名
     * @param assetid 出售的资产
     * @param startPrice 起始价格
     * @param endPrice 最低价格
     * @param salePrice 每轮降价的价格
     * @param nncPrice 抵押的nnc
     */
    public static async domainSell( domain: string, assetid: Neo.Uint160, startPrice: number,endPrice:number,salePrice:number, nncPrice: number)
    {
        let arr = domain.split(".").reverse();
        arr = arr.map(str => `(str)${str}`);
        // 小数精度的处理
        const startStr = startPrice.toFixed(HASH_CONFIG.assetDecimal[assetid.toString()]).replace(".", "");
        const startAmount = parseFloat(startStr);
        const endStr = endPrice.toFixed(HASH_CONFIG.assetDecimal[assetid.toString()]).replace(".", "");
        const endAmount = parseFloat(endStr);
        const saleStr = salePrice.toFixed(HASH_CONFIG.assetDecimal[assetid.toString()]).replace(".", "");
        const saleAmount = parseFloat(saleStr);
        const nncStr = nncPrice.toFixed(HASH_CONFIG.assetDecimal[HASH_CONFIG.ID_NNC.toString()]).replace('.', '');
        const nncAmount = parseFloat(nncStr);
        const params: InvokeArgs =
        {
            scriptHash: HASH_CONFIG.DEX_HASH.toString(),
            operation: "auction",
            arguments: [
                { type: "Array", value: [
                    {type:"String",value:arr[0]},
                    {type:"String",value:arr[1]}
                ] },
                { type: "Hash160", value: assetid.toString() },
                { type: "Integer", value: startAmount },
                { type: "Integer", value: endAmount },
                { type: "Integer", value: saleAmount },
                { type: "Integer", value: nncAmount }
            ],
            fee: "0.001",
            network: common.network === 'testnet' ? 'TestNet' : 'MainNet',
            description: common.language === 'zh' ? '出售域名' : '出售域名'
        }
        return Wallet.invoke(params);
    }
    /**
     * 取消出售域名
     * @param domain 域名
     */
    public static async cancelSellDomain(domain:string)
    {
        const domainHash = this.nameHashArray(domain.split("."));
        const params: InvokeArgs = {
            scriptHash: HASH_CONFIG.DEX_HASH.toString(),
            operation: "discontinueAuction",
            arguments: [
                { type: "Hash256", value: domainHash.toString() }
            ],
            fee: '0',
            network: common.network === 'testnet' ? 'TestNet' : 'MainNet',
            description: common.language === 'zh' ? '取消出售域名' : '取消出售域名'
        }
        return Wallet.invoke(params);
    }

    /**
     * 购买某个域名
     * @param buyer 购买者
     * @param domain 域名
     * @param assetid 购买资产id
     * @param price 购买价格
     */
    public static async betDomain(buyer: string,domain:string,assetid: Neo.Uint160,price:number)
    {
        const domainHash = this.nameHashArray(domain.split("."));
        const priceStr = price.toFixed(HASH_CONFIG.assetDecimal[assetid.toString()]).replace(".", "");
        const amount = parseFloat(priceStr);
        const params: InvokeArgs = {
            scriptHash: HASH_CONFIG.DEX_HASH.toString(),
            operation: "bet",
            arguments: [
                { type: "Address", value: buyer },
                { type: "Hash256", value: domainHash.toString() },
                { type: "Hash160", value: assetid.toString() },
                { type: "Integer", value: amount }
            ],
            fee: '0',
            network: common.network === 'testnet' ? 'TestNet' : 'MainNet',
            description: common.language === 'zh' ? '购买域名' : '购买域名'
        }
        return Wallet.invoke(params);
    }
}