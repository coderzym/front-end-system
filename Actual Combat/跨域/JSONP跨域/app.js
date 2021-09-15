/* 1. 首先安装express包，用来跑node服务：npm install express --save */

// app.js
// const express = require("express");
// const app = express();
// app.use(express.static("./"));
// app.listen(3000, () => {
//   console.log("服务开启在3000端口");
// });

//引入http模块
var http = require("http");
var fs = require("fs");
//设置主机名
var hostName = "127.0.0.1";
//设置端口
var port = 3000;
//创建服务
var server = http.createServer(function (req, res) {
  // application/json text/html text/plain
  res.setHeader("Content-Type", "application/json");
  // 解决跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
});

server.on("request", (request, response) => {
  fs.readFile("./data.json", "utf-8", (error, data) => {
    // response.write(`cb(${JSON.stringify(data)})`);
    response.write(data.replace(/\r\n/g, ""));
    response.end();
  });
});

server.listen(port, hostName, function () {
  console.log(`服务器运行在http://${hostName}:${port}`);
});
