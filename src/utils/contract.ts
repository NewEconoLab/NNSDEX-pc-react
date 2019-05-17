// tslint:disable-next-line:no-reference
/// <reference path="./inject.d.ts" />
import { HASH_CONFIG } from "@/config";
import common from '@/store/common'
import * as Wallet from '@/utils/wallet';

export class Contract
{

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
     * 投注接口
     * @param bettor 下注者
     * @param assetid 下注资产
     * @param count 下注资产数量 （在外层先转换好进度去掉小数点）
     * @param decimal 下注的资产精度 （小数点后有几位）
     * @param num 下注的数字
     */
    public static async bet(bettor: string, assetid: Neo.Uint160, count: number, num: number)
    {
        // 小数精度的处理
        const str = count.toFixed(HASH_CONFIG.assetDecimal[assetid.toString()]).replace(".", "");
        const amount = parseFloat(str);
        const params: InvokeGroup =
        {
            merge: false,
            group:
                [
                    {
                        scriptHash: HASH_CONFIG.DEX_HASH.toString(),
                        operation: "bet",
                        arguments: [
                            { type: "Address", value: bettor },
                            { type: "Hash160", value: assetid.toString() },
                            { type: "Integer", value: amount },
                            { type: "Integer", value: num }
                        ],
                        fee: "0.001",
                        network: common.network === 'testnet' ? 'TestNet' : 'MainNet',
                        description: common.language === 'zh' ? '游戏投注' : 'Game Bet'
                    },
                    {
                        scriptHash: HASH_CONFIG.DEX_HASH.toString(),
                        operation: "settle",
                        arguments: [
                            { type: "Hook_Txid", value: "0" }
                        ],
                        fee: "0.001",
                        network: common.network === 'testnet' ? 'TestNet' : 'MainNet',
                        description: common.language === 'zh' ? '游戏结算' : 'Game Settlement'
                    }
                ]
        }

        return Wallet.invokeGroup(params);
    }

    /**
     * 用户结算接口
     * @param txid 交易id
     */
    public static async settle(txid: string)
    {
        const params: InvokeArgs = {
            scriptHash: HASH_CONFIG.DEX_HASH.toString(),
            operation: "settle",
            arguments: [
                { type: "Hash256", value: txid }
            ],
            fee: '0',
            network: common.network === 'testnet' ? 'TestNet' : 'MainNet',
            description: common.language === 'zh' ? '游戏结算' : 'Game Settlement'
            // assets: 暂时用不到
        }
        return Wallet.invoke(params);
    }

    
}