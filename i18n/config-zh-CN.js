const helper = {
  allWorking: {
    client: {
      status: "正常",
      color: "green",
    },
    edgeNetwork: {
      status: "运行",
      color: "green",
    },
    webServer: {
      status: "运行",
      color: "green",
    },
  },
  ServerError: {
    client: {
      status: "正常",
      color: "green",
    },
    edgeNetwork: {
      status: "运行",
      color: "green",
    },
    webServer: {
      status: "错误",
      color: "red",
    },
  },
  edgeError: {
    client: {
      status: "正常",
      color: "green",
    },
    edgeNetwork: {
      status: "错误",
      color: "red",
    },
    webServer: {
      status: "未知",
      color: "yellow",
    },
  },
  edgeBanned: {
    client: {
      status: "正常",
      color: "green",
    },
    edgeNetwork: {
      status: "运行",
      color: "green",
    },
    webServer: {
      status: "未知",
      color: "yellow",
    },
  },
  edgeLimit: {
    client: {
      status: "请求过多",
      color: "red",
    },
    edgeNetwork: {
      status: "运行",
      color: "green",
    },
    webServer: {
      status: "未知",
      color: "yellow",
    },
  },
};

exports.builderConfig = [
  {
    fileName: "zh-CN/index.html",
    statusCode: 200,
    text: "OK",
    card: helper.allWorking,
    reason: {
      explain:
        "这是 CloudflareCustomErrorPage，一个以 ejs 为模板编译器的轻量级错误页面，为 Cloudflare 所编写。",
      howtodo:
        "检查我们的项目，在<a href='https://github.com/186526/CloudflareCustomErrorPage'>GitHub</a>。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/5xxerror.html",
    statusCode: "5xx",
    text: "服务器侧错误",
    card: helper.ServerError,
    reason: {
      explain: "网络服务器汇报了一个错误。",
      howtodo: "请在几分钟后重试。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
      '请求命中到 <code id="pop"> undefined </code>',
    ],
    script: function () {
      const baseDetils = document.querySelector(".cf-error-details");
      const ErrorMessage = baseDetils.querySelector("h1").innerText;
      const Explain = baseDetils.querySelector("p").innerText;
      let ErrorNumber = "5xx";
      let POP = "undefined";
      baseDetils.querySelector("ul").childNodes.forEach((e) => {
        if (e.innerText !== undefined) {
          let check = e.innerText.replace("Error reference number: ", "");
          if (check !== e.innerText) {
            ErrorNumber = check;
            return;
          }
          check = e.innerText.replace("Cloudflare Location: ", "");
          if (check !== e.innerText) {
            POP = check;
            return;
          }
        }
      });
      document.querySelector("header main").innerText = ErrorNumber;
      document.querySelector("header description").innerText = ErrorMessage;
      document.querySelector("explain p").innerText = Explain;
      document.querySelector("text #pop").innerText = POP;
      document.querySelector(
        "title"
      ).innerText = `${ErrorNumber} | ${ErrorMessage}`;
    },
  },
  {
    fileName: "zh-CN/1xxxerror.html",
    statusCode: "1xxx",
    text: "Cloudflare 侧错误",
    card: helper.edgeError,
    reason: {
      explain: "Cloudflare 汇报了一个错误。",
      howtodo: "请在几分钟后重试。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {
      const baseDetils = document.querySelector(".cf-error-details");
      const ErrorMessage = baseDetils.querySelector("h1").innerText;
      const Explain =
        baseDetils.querySelector("p").innerText +
        document.querySelector("ul").innerText;
      let ErrorNumber = "5xx";
      let POP = "undefined";
      baseDetils.querySelector("ul.cferror_details").childNodes.forEach((e) => {
        if (e.innerText !== undefined) {
          let check = e.innerText.replace("Error reference number: ", "");
          if (check !== e.innerText) {
            ErrorNumber = check;
            return;
          }
          check = e.innerText.replace("Cloudflare Location: ", "");
          if (check !== e.innerText) {
            POP = check;
            return;
          }
        }
      });
      document.querySelector("header main").innerText = ErrorNumber;
      document.querySelector("header description").innerText = ErrorMessage;
      document.querySelector("explain p").innerText = Explain;
      document.querySelector(
        "title"
      ).innerText = `${ErrorNumber} | ${ErrorMessage}`;
    },
  },
  {
    fileName: "zh-CN/block-ip.html",
    statusCode: 1006,
    text: "您的 IP 已经被封禁",
    card: helper.edgeBanned,
    reason: {
      explain:
        "所请求网站的站长修改了 Cloudflare 安全级别或者封禁了您的 IP 地址。自从站长禁用您的 IP 后，Cloudflare support 不能覆盖他们的配置。",
      howtodo: "请联系站长并提供该页面。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/block-waf.html",
    statusCode: 1020,
    text: "访问受阻",
    card: helper.edgeBanned,
    reason: {
      explain: "您被该网站所设置的 Cloudflare 防火墙规则所拦截。",
      howtodo: "请联系站长并提供该页面。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1015.html",
    statusCode: 1015,
    text: "请求过多",
    card: helper.edgeLimit,
    reason: {
      explain: "您的请求速率过快。",
      howtodo: "请在几分钟后重试。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
];

exports.i18n = {
  client: "您所运行的客户端",
  edgeNetwork: "Cloudflare 边缘网络",
  webServer: "该站点服务器",
  provider: "与 <a href='https://cloudflare.com'>Cloudflare</a> 一同运行。",
  explain: "发生了什么？",
  howtodo: "我该做什么？",
};
