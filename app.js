const ejs = require('ejs');
const config = require('./config.js');
const fs = require('fs');
config.builderConfig.map(item=>{
    let html = ejs.render(fs.readFileSync("./ejs/index.ejs",{encoding:'utf8'}),{
        config:item,
        i18n:config.i18n,
        helper:{},
    },{
        root:'./ejs/index.ejs',
        filename:'./ejs/index.ejs',
    });
    fs.writeFileSync(`./public/${item.fileName}`,html,{encoding:'utf8'});
})