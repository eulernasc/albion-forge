(function(root){
const cities=['Bridgewatch','Caerleon','Fort Sterling','Lymhurst','Martlock','Thetford'];
const norm=s=>String(s).trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function graphIndex(data){const byName=new Map();for(const [id,z] of Object.entries(data.zones))byName.set(norm(z.name),{...z,id});return byName}
function referenceRoutes(data,start,destination='*',avoidRed=false,kind='city'){
 const lookup=graphIndex(data),first=lookup.get(norm(start));if(!first)return [];
 const targets=kind==='portal'?cities.filter(c=>c!=='Caerleon').map(c=>c+' Portal'):destination==='*'?cities:[destination];
 const goal=new Set(targets.map(norm)),seen=new Set([first.id]),queue=[{zone:first.id,path:[first.name]}],found=[];
 const allowed=(z,isStart=false)=>{if(!z)return false;if(avoidRed&&z.color==='red'&&!isStart)return false;if(kind==='portal')return z.color==='black'&&!cities.includes(z.name);return (['safe','yellow','red'].includes(z.color)||cities.includes(z.name))&&!z.name.endsWith(' Portal')};
 if(!allowed(first,true))return [];
 for(let i=0;i<queue.length;i++){const p=queue[i],z=data.zones[p.zone];if(goal.has(norm(z.name))){found.push({destination:z.name,path:p.path,hops:p.path.length-1});if(found.length>=3)break}for(const id of z.neighbors||[]){const n=data.zones[id];if(!seen.has(id)&&allowed(n)){seen.add(id);queue.push({zone:id,path:[...p.path,n.name]})}}}return found;
}
function completeJourney(data,origin,destination,records,avoidRed=false,now=Date.now()){
 const lookup=graphIndex(data),goals=new Set((destination==='*'?cities:[destination]).map(norm));
 const active=records.filter(r=>(!r.server||['AMERICA','AMERICAS','WEST'].includes(String(r.server).toUpperCase()))&&Number.isFinite(r.observed)&&r.observed<=now&&Number.isFinite(r.expires)&&r.expires>now&&/^https?:\/\//.test(r.source));
 const dynamic=new Map();for(const edge of active){for(const [from,to] of [[edge.from,edge.to],[edge.to,edge.from]]){const key=norm(from);if(!dynamic.has(key))dynamic.set(key,[]);dynamic.get(key).push({to,kind:'portal',source:edge.source,expires:edge.expires})}}
 const queue=[{path:[origin.trim()],legs:[]}],seen=new Set([norm(origin)]);if(!norm(origin))return null;
 for(let i=0;i<queue.length;i++){const p=queue[i],name=p.path.at(-1),key=norm(name);if(goals.has(key))return {...p,expires:p.legs.some(x=>x.kind==='portal')?Math.min(...p.legs.filter(x=>x.kind==='portal').map(x=>x.expires)):null};const moves=[...(dynamic.get(key)||[])],z=lookup.get(key);const royal=n=>n&&(['safe','yellow','red'].includes(n.color)||cities.includes(n.name))&&!n.name.endsWith(' Portal')&&(!avoidRed||n.color!=='red');
 if(royal(z)||(key===norm(origin)&&z?.color==='red'))for(const id of z.neighbors||[]){const next=data.zones[id];if(royal(next))moves.push({to:next.name,kind:'ground',source:data.source})}
 for(const move of moves){const nextKey=norm(move.to),dest=lookup.get(nextKey);if(avoidRed&&dest?.color==='red')continue;if(seen.has(nextKey))continue;seen.add(nextKey);queue.push({path:[...p.path,move.to],legs:[...p.legs,{from:name,...move}]})}}
 return null;
}
const api={referenceRoutes,completeJourney,graphIndex};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ForgeJourney=api;
})(typeof globalThis==='undefined'?this:globalThis);

