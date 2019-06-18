import { Contract } from "./contract";
import { HASH_CONFIG } from "@/config";
import { rpc_getInvokescript } from "@/store/api/common.api";

export class neotools
{
    public static ROOT_TEST: RootDomainInfo;
    public static ROOT_NEO: RootDomainInfo;
    /**
     * verifyAddress
     * @param addr
     */
    public static verifyAddress(addr: string): boolean
    {
        var verify = /^[a-zA-Z0-9]{34,34}$/;
        var res: boolean = verify.test(addr) ? neotools.verifyPublicKey(addr) : verify.test(addr);
        return res;
    }

    /**
     * verifyPublicKey 验证地址
     * @param publicKey 公钥
     */
    public static verifyPublicKey(publicKey: string)
    {
        var array: Uint8Array = Neo.Cryptography.Base58.decode(publicKey);
        var check = array.subarray(21, 21 + 4); //

        var checkdata = array.subarray(0, 21);//
        var hashd = Neo.Cryptography.Sha256.computeHash(checkdata);//
        hashd = Neo.Cryptography.Sha256.computeHash(hashd);//
        var hashd = hashd.slice(0, 4);//    
        var checked = new Uint8Array(hashd);//

        var error = false;
        for (var i = 0; i < 4; i++)
        {
            if (checked[i] != check[i])
            {
                error = true;
                break;
            }
        }
        return !error;
    }
    /**
     * wifDecode wif解码
     * @param wif wif私钥
     */
    public static wifDecode(wif: string)
    {
        let result: Result = new Result();
        let login: LoginInfo = new LoginInfo();
        try
        {
            login.prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
        }
        catch (e)
        {
            result.err = true;
            result.info = e.message;
            return result
        }
        try
        {
            login.pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(login.prikey);
        }
        catch (e)
        {
            result.err = true;
            result.info = e.message;
            return result
        }
        try
        {
            login.address = ThinNeo.Helper.GetAddressFromPublicKey(login.pubkey);
        }
        catch (e)
        {
            result.err = true;
            result.info = e.message;
            return result
        }
        result.info = login;
        return result;
    }
    /**
     * nep2FromWif
     */
    public static nep2FromWif(wif: string, password: string): Result
    {
        var prikey: Uint8Array;
        var pubkey: Uint8Array;
        var address: string;
        let res: Result = new Result();
        try
        {
            prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
            var n = 16384;
            var r = 8;
            var p = 8
            ThinNeo.Helper.GetNep2FromPrivateKey(prikey, password, n, r, p, (info, result) =>
            {
                res.err = false;
                res.info.nep2 = result;
                pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                // var hexstr = pubkey.toHexString();
                address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                res.info.address = address
                return res;
            });
        }
        catch (e)
        {
            res.err = true;
            res.info = e.message;
            return res;
        }
        return res;
    }

    /**
     * nep2TOWif
     */
    public static async nep2ToWif(nep2: string, password: string): Promise<Result>
    {
        var res = new Result();
        let login: LoginInfo = new LoginInfo();
        let promise: Promise<Result> = new Promise((resolve, reject) =>
        {
            let n: number = 16384;
            var r: number = 8;
            var p: number = 8
            ThinNeo.Helper.GetPrivateKeyFromNep2(nep2, password, n, r, p, (info, result) =>
            {
                if ("nep2 hash not match." == result)
                    reject(result);
                login.prikey = result as Uint8Array;
                res.info = {};
                if (login.prikey != null)
                {
                    login.pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(login.prikey);
                    login.address = ThinNeo.Helper.GetAddressFromPublicKey(login.pubkey);
                    res.err = false;
                    res.info = login;
                    resolve(res);
                }
                else
                {
                    res.err = true;
                    reject(res);
                }
            });
        });
        return promise;
    }

    /**
     * nep6Load
     */
    public static async nep6Load(wallet: ThinNeo.nep6wallet, password: string): Promise<{}>
    {
        let arr = {}
        try
        {
            //getPrivateKey 是异步方法，且同时只能执行一个
            // var istart = 0;
            // let res = new Result();

            if (wallet.accounts)
            {
                for (let keyindex = 0; keyindex < wallet.accounts.length; keyindex++)
                {
                    let account = wallet.accounts[keyindex];
                    if (account.nep2key == null)
                    {
                        continue;
                    }
                    try
                    {
                        let result: Result = await neotools.getPriKeyfromAccount(wallet.scrypt, password, account);
                        // console.log("getpkformacc:" + result);
                        arr[account.address] = (result.info);
                        return arr;
                    } catch (error)
                    {
                        throw error;
                    }
                }
            } else
            {
                throw console.error("The account cannot be empty");

            }
        }
        catch (e)
        {
            throw e.result;

        }
        // });
        return arr;
    }

    /**
     * getPriKeyform
     */
    public static async getPriKeyfromAccount(scrypt: ThinNeo.nep6ScryptParameters, password: string, account: ThinNeo.nep6account): Promise<Result>
    {
        let res = new Result();
        let promise: Promise<Result> =
            new Promise((resolve, reject) =>
            {
                account.getPrivateKey(scrypt, password, (info, result) =>
                {
                    if (info == "finish")
                    {
                        var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(result as Uint8Array);
                        var address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                        // var wif = ThinNeo.Helper.GetWifFromPrivateKey(result as Uint8Array);
                        // var hexkey = (result as Uint8Array).toHexString();
                        // console.log(info + "|" + address + " wif=" + wif);
                        res.err = false;
                        res.info = { pubkey: pubkey, address: address, prikey: result as Uint8Array };
                        resolve(res);
                    }
                    else
                    {
                        // info2.textContent += info + "|" + result;
                        reject({ err: true, result: result });
                    }

                });
            })
        return promise;
    }
    public static async getRootInfo(root: string): Promise<RootDomainInfo>
    {
        if (root == "test")
        {
            if (!this.ROOT_TEST)
            {
                let info = await this.initRootDomain(root);
                this.ROOT_TEST = info;
            }
            return this.ROOT_TEST;
        }
        if (root == "neo")
        {
            if (!this.ROOT_NEO)
            {
                let info = await this.initRootDomain(root);
                this.ROOT_NEO = info;
            }
            return this.ROOT_NEO;
        }
        return this.ROOT_NEO;
    }
    /**
     * @method 初始化根域名信息
     */
    static async initRootDomain(root: string)
    {
        var rootInfo = new RootDomainInfo();
        rootInfo.roothash = Contract.nameHash(root);
        rootInfo.rootname = root;
        var scriptaddress = HASH_CONFIG.NNC_HASH;
        var domain = await this.getOwnerInfo(rootInfo.roothash, scriptaddress);
        console.log('domain----');
        console.log(domain)
        if(domain){
            rootInfo.owner = domain["owner"];
            rootInfo.register = domain["register"];
            rootInfo.resolver = domain["resolver"];
            rootInfo.ttl = domain["ttl"];
        }   
        console.log("rootInfo------------")     
        console.log(rootInfo)
        return rootInfo;
    }
    /**
     * @method buildScript 构建script
     * @param appCall 合约地址
     * @param method 方法名
     * @param param 参数
     */
    static buildScript(appCall: Neo.Uint160, method: string, param: string[]): Uint8Array
    {
        var sb = new ThinNeo.ScriptBuilder();

        sb.EmitParamJson(param);//第二个参数是个数组
        sb.EmitPushString(method);
        sb.EmitAppCall(appCall);
        return sb.ToArray();
    }
    // 返回域名详情
    public static async getOwnerInfo(domain: Neo.Uint256, scriptaddress: Neo.Uint160): Promise<DomainInfo|null>
    {
        console.log(domain.toString())
        let info: DomainInfo = new DomainInfo();
        var data = this.buildScript(scriptaddress, "getOwnerInfo", ["(hex256)" + domain.toString()]);
        const result = await rpc_getInvokescript(data);
        console.log("result-----")
        console.log(result)
        try
        {
            var state = result[0]["state"] as string;
           
            // info2.textContent = "";
            if (state.includes("HALT, BREAK"))
            {
                // info2.textContent += "Succ\n";
            }
            var stackarr = result[0]["stack"] as any[];
            let stack = ResultItem.FromJson(DataType.Array, stackarr).subItem[0].subItem;

            if (stackarr[0].type == "Array")
            {
                info.owner = stack[0].AsHash160();
                info.register = stack[1].AsHash160();
                info.resolver = stack[2].AsHash160();
                info.ttl = stack[3].AsInteger().toString();
            }
        }
        catch (e)
        {
            console.error(e);

        }
        return info;
    }
    
}
export class DataType
{
    public static Array = 'Array';
    public static ByteArray = 'ByteArray';
    public static Integer = 'Integer';
    public static Boolean = 'Boolean';
    public static String = 'String';
}
export class ResultItem
{
    public data: Uint8Array;
    public subItem: ResultItem[];

    public static FromJson(type: string, value: any): ResultItem
    {
        let item: ResultItem = new ResultItem();
        if (type === DataType.Array)
        {
            item.subItem = []//new ResultItem[(value as Array<any>).length];
            for (let i = 0; i < (value as any[]).length; i++)
            {
                let subjson = ((value as any)[i] as Map<string, any>);
                let subtype = (subjson["type"] as string);
                item.subItem.push(ResultItem.FromJson(subtype, subjson["value"]));
            }
        }
        else if (type === DataType.ByteArray)
        {
            item.data = (value as string).hexToBytes()
        }
        else if (type === DataType.Integer)
        {
            item.data = Neo.BigInteger.parse(value as string).toUint8Array();
        }
        else if (type === DataType.Boolean)
        {
            if ((value as number) != 0)
                item.data = new Uint8Array(0x01);
            else
                item.data = new Uint8Array(0x00);
        }
        else if (type === DataType.String)
        {
            item.data = ThinNeo.Helper.String2Bytes(value as string);
        }
        else
        {
            console.log("not support type:" + type);
        }
        return item;
    }


    public AsHexString(): string
    {
        return (this.data).toHexString();
    }
    public AsHashString(): string
    {
        return "0x" + this.data.reverse().toHexString();
    }
    public AsString(): string
    {
        return ThinNeo.Helper.Bytes2String(this.data);
    }
    public AsHash160(): Neo.Uint160|null
    {
        if (this.data.length === 0)
            return null;
        return new Neo.Uint160(this.data.buffer);
    }

    public AsHash256(): Neo.Uint256|null
    {
        if (this.data.length === 0)
            return null;
        return new Neo.Uint256(this.data.buffer)
    }
    public AsBoolean(): boolean
    {
        if (this.data.length === 0 || this.data[0] === 0)
            return false;
        return true;
    }

    public AsInteger(): Neo.BigInteger
    {
        return new Neo.BigInteger(this.data);
    }
}

export class DomainInfo
{
    owner: Neo.Uint160|null//所有者
    register: Neo.Uint160|null//注册器
    resolver: Neo.Uint160|null//解析器
    ttl: string//到期时间
}
export class RootDomainInfo extends DomainInfo
{
    rootname: string;
    roothash: Neo.Uint256;
    constructor()
    {
        super();
    }
}
export class NNSResult
{
    public textInfo: string;
    public value: any; // 不管什么类型统一转byte[]
}

export class Result
{
    err: boolean;
    info: any;
}


export class LoginInfo
{
    pubkey: Uint8Array;
    prikey: Uint8Array;
    address: string;
    nep2: string;
    payfee: boolean;
    static info: LoginInfo;
}