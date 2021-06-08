const ejs = require("ejs");
const configs = [require("./config.js"), require("./i18n/config-zh-CN.js")];
const fs = require("fs");
configs.forEach((config) =>
  config.builderConfig.map((item) => {
    let html = ejs.render(
      fs.readFileSync("./ejs/index.ejs", { encoding: "utf8" }),
      {
        config: item,
        i18n: config.i18n,
        helper: {},
      },
      {
        root: "./ejs/index.ejs",
        filename: "./ejs/index.ejs",
      }
    );
    fs.writeFileSync(`./public/${item.fileName}`, html, { encoding: "utf8" });
  })
);
