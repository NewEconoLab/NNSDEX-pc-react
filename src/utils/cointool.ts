import { getUtxo } from "@/store/api/common.api";
import common from "@/store/common";
import { MarkUtxo, Utxo } from "@/store/interface/icon.interface";

const id_GAS: string = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
const id_NEO: string = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";

export const toChangeAssetName = (assets) =>
{
    const names = assets.name;
    const id = assets.id || assets.asset;
    let name: string = '';
    if (id === id_GAS)
    {
        name = 'GAS';
    }
    else if (id === id_NEO)
    {
        name = 'NEO';
    } else
    {
        name = names[0].name;             
    }
    return name;
}

export const getAssets = async ()=>
{
    try 
    {
        const utxos = await getUtxo(common.address);   // 获得为使用的utxo
        if(!utxos)
        {
            return {};
        }
        const marks = MarkUtxo.getMark();   // 获得被标记的utxo
        console.log("=================get mark=============");
        
        console.log(marks);
        
        const assets = {};        
        // 对utxo进行归类，并且将count由string转换成 Neo.Fixed8
        // tslint:disable-next-line:forin        
        for (const i in utxos)
        {
            const item = utxos[ i ];
            const mark = marks[item["txid"]]
            if(!mark || !mark.includes(item.n))   // 排除已经标记的utxo返回给调用放
            {
                const asset = item.asset;
                if (assets[ asset ] === undefined || assets[ asset ] == null)
                {
                    assets[ asset ] = [];
                }
                const utxo = new Utxo();
                utxo.addr = item.addr;
                utxo.asset = item.asset;
                utxo.n = item.n;
                utxo.txid = item.txid;
                utxo.count = Neo.Fixed8.parse(item.value);
                assets[ asset ].push(utxo);
            }
        }
        return assets;
    } 
    catch (error) 
    {
        if(error["code"]==="-1")
        {
            return {};
        }else
        {
            throw error; 
        }            
    }
}