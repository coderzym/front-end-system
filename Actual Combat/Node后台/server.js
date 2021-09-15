function start() {
  var router = require("./router");
  //引入http模块
  var http = require("http");
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
    router(request.url, response);
  });

  server.listen(port, hostName, function () {
    console.log(`服务器运行在http://${hostName}:${port}`);
  });
}

module.exports = start;
