(function(root){
  const utc=value=>{if(typeof value==='number')return Number.isFinite(value)?value:NaN;if(!value||String(value).startsWith('0001-'))return NaN;const s=String(value);return Date.parse(/[zZ]$|[+-]\d\d:\d\d$/.test(s)?s:s+'Z')};
  const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function variants(catalog,base,tier='',enchant=''){return catalog.filter(x=>{const m=x.id.match(/^T([1-8])_(.+?)(?:@([1-4]))?$/);return m&&m[2]===base&&(!tier||m[1]===String(tier))&&(enchant===''||String(m[3]||0)===String(enchant))}).map(x=>x.id)}
  function validPrice(r,now=Date.now()){const d=utc(r.sell_price_min_date);return Number.isFinite(r.sell_price_min)&&r.sell_price_min>0&&Number.isFinite(d)&&d<=now+60000&&Number.isInteger(r.quality)&&r.quality>=1&&r.quality<=5}
  function batches(ids,max=2800){const result=[];let batch=[];for(const id of [...new Set(ids)]){if(batch.length&&encodeURIComponent([...batch,id].join(',')).length>max){result.push(batch);batch=[]}batch.push(id)}if(batch.length)result.push(batch);return result}
  function importConnections(data,source,server,now=Date.now()){
    if(!/^https?:\/\//.test(source))throw Error('Informe uma URL HTTP(S) de origem.');
    if(server!=='AMERICA')throw Error('Selecione explicitamente Américas para importar.');
    const declared=data.server||data.region;if(declared&&!['AMERICA','AMERICAS','WEST'].includes(String(declared).toUpperCase()))throw Error('Arquivo pertence a outro servidor.');
    const items=Array.isArray(data)?data:Array.isArray(data.connections)?data.connections:Array.isArray(data.links)?data.links:[];
    const result=[];let skipped=0;let candidates=[];
    for(const item of items){if(Array.isArray(item.portalConnections))candidates.push(...item.portalConnections.map(x=>({...x,_mapServer:item.server})));else candidates.push(item)}
    for(const raw of candidates){const x=raw.info||raw;const declaredServer=x.server||raw._mapServer;const region=typeof declaredServer==='object'?declaredServer?.name:declaredServer;if(region&&!['AMERICA','AMERICAS','WEST'].includes(String(region).toUpperCase())){skipped++;continue}
      const from=x.from||x.fromZone?.name||x.connection?.[0],to=x.to||x.toZone?.name||x.connection?.[1],expires=utc(x.expires??x.expiresUtc??x.expiringDate),observed=utc(x.observed??x.observedAt??x.updatedAt);
      if(typeof from!=='string'||typeof to!=='string'||!from.trim()||!to.trim()||normalize(from)===normalize(to)||!Number.isFinite(expires)||expires<=now||(Number.isFinite(observed)&&observed>now+60000)){skipped++;continue}
      result.push({from:from.trim(),to:to.trim(),expires,observed:Number.isFinite(observed)?observed:now,observationKind:Number.isFinite(observed)?'observed':'retrieved',retrievedAt:now,source,server:'AMERICA',fromRoyal:x.fromRoyal===true||x.fromZone?.isRoyal===true,toRoyal:x.toRoyal===true||x.toZone?.isRoyal===true});
    }return {connections:result,skipped};
  }
  const api={utc,normalize,variants,validPrice,batches,importConnections};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ForgeSearch=api;
})(typeof globalThis==='undefined'?this:globalThis);

