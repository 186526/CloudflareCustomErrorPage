const helper = {
  allWorking: {
    client: {
      status: "Working",
      color: "green",
    },
    edgeNetwork: {
      status: "Working",
      color: "green",
    },
    webServer: {
      status: "Working",
      color: "green",
    },
  },
  ServerError: {
    client: {
      status: "Working",
      color: "green",
    },
    edgeNetwork: {
      status: "Working",
      color: "green",
    },
    webServer: {
      status: "Error",
      color: "red",
    },
  },
  edgeError: {
    client: {
      status: "Working",
      color: "green",
    },
    edgeNetwork: {
      status: "Error",
      color: "red",
    },
    webServer: {
      status: "Unknown",
      color: "yellow",
    },
  },
  edgeBanned: {
    client: {
      status: "Working",
      color: "green",
    },
    edgeNetwork: {
      status: "Working",
      color: "green",
    },
    webServer: {
      status: "Unknown",
      color: "yellow",
    },
  },
  edgeLimit: {
    client: {
      status: "Too Many Requests",
      color: "red",
    },
    edgeNetwork: {
      status: "Working",
      color: "green",
    },
    webServer: {
      status: "Unknown",
      color: "yellow",
    },
  },
};

exports.builderConfig = [
  {
    fileName: "index.html",
    statusCode: 200,
    text: "OK",
    card: helper.allWorking,
    reason: {
      explain:
        "This is CloudflareCustomErrorPage, a lightweight custom error page written for Cloudflare that uses ejs as a template compiler.",
      howtodo:
        "Check Our Project on <a href='https://github.com/186526/CloudflareCustomErrorPage'>GitHub</a>.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
    ],
    script: function () {},
  },
  {
    fileName: "5xxerror.html",
    statusCode: "5xx",
    text: "Server-side Error",
    card: helper.ServerError,
    reason: {
      explain: "The web server reported a Server error.",
      howtodo: "Please try again in a few minutes.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
      'Hit in <code id="pop"> undefined </code>',
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
    fileName: "1xxxerror.html",
    statusCode: "1xxx",
    text: "Cloudflare-side Error",
    card: helper.edgeError,
    reason: {
      explain: "Cloudflare Edge Network reported a error.",
      howtodo: "Please try again in a few minutes.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
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
    fileName: "block-ip.html",
    statusCode: 1006,
    text: "Your IP address has been banned",
    card: helper.edgeBanned,
    reason: {
      explain:
        "Request the website owner to investigate their Cloudflare security settings or allow your client IP address. Since the website owner blocked your request, Cloudflare support cannot override a customer’s security settings.",
      howtodo:
        "Provide the website owner with a screenshot of the 1006 error message you received.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "block-waf.html",
    statusCode: 1020,
    text: "Access denied",
    card: helper.edgeBanned,
    reason: {
      explain:
        "A client or browser is blocked by a Cloudflare customer’s Firewall Rules.",
      howtodo:
        "Provide the website owner with a screenshot of the 1020 error message you received.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1015.html",
    statusCode: 1015,
    text: "Too Many Requests",
    card: helper.edgeLimit,
    reason: {
      explain: "Your request rate to the current site is too fast.",
      howtodo: "Please try again in a few minutes.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
];

exports.i18n = {
  client: "Your Client",
  edgeNetwork: "Cloudflare Edge Network",
  webServer: "Web Server",
  provider:
    "Running with <a href='https://cloudflare.com'>Cloudflare</a>.",
  explain: "What happened?",
  howtodo: "What can I do?",
};
