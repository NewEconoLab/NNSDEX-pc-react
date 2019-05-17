import { TABLE_CONFIG } from "@/config";

export interface ICoinStore{
    assets:{ [ id: string ]: Utxo[] };
    initUtxos: ()=>Promise<boolean>;
}

export class Utxo{
    public addr: string;
    public txid: string;
    public n: number;
    public asset: string;
    public count: Neo.Fixed8;
}

// tslint:disable-next-line:max-classes-per-file
export class MarkUtxo
{
    /**
     * 塞入标记
     * @param utxos 标记
     */
    public static setMark(utxos:MarkUtxo[])
    {
        const session:{[txid:string]:number[]} = this.getMark()
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < utxos.length; index++) 
        {
            const utxo = utxos[index];
            if(session[utxo.txid])
            {
                session[utxo.txid].push(utxo.n);
            }
            else
            {
                session[utxo.txid] = new Array<number>();
                session[utxo.txid].push(utxo.n);
            }
        }
        sessionStorage.setItem(TABLE_CONFIG.utxoMark,JSON.stringify(session));
    }

    /**
     * getMark 获得被标记的utxo
     */
    public static getMark()
    {
        const sessionstr:any = sessionStorage.getItem(TABLE_CONFIG.utxoMark);
        const markutxo:{[txid:string]:number[]} = sessionstr? JSON.parse(sessionstr):{};
        return markutxo;
    }

    // public height:number;
    public txid:string;
    public n:number;
    constructor(txid:string,n:number)
    {
        this.txid = txid;
        this.n = n;
    }
}