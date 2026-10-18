const fs=require('fs'),meta=require('./world-reference.json');module.exports={...meta,zones:Object.assign({},...meta.parts.map(p=>JSON.parse(fs.readFileSync(p,'utf8'))))};

