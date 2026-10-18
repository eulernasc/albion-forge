const fs=require('fs');module.exports=fs.existsSync('catalog.json')?require('./catalog.json'):fs.readdirSync('dist/catalog').filter(p=>p.endsWith('.js')).flatMap(p=>{const text=fs.readFileSync('dist/catalog/'+p,'utf8');return JSON.parse(text.slice(text.indexOf('['),text.lastIndexOf(']')+1))});

