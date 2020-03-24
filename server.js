const http = require("http");
const fs = require("fs");
const server = http.createServer(); // 创建服务
server.listen(8888); // 监听端口
const CONTENT_TYPE_MAP = { // 定义Content-Type的HashMap
  html: "text/html; charset=UTF-8",
  htm: "text/html; charset=UTF-8",
  js: "application/javascript; charset=UTF-8",
  css: "text/css; charset=UTF-8",
  txt: "text/plain; charset=UTF-8",
  mainfest: "text/plain; charset=UTF-8"
};
server.on("request", function(request, response) {
  const url = require("url").parse(request.url);
  const filename = url.pathname.substring(1);
  const suffix = filename.substring(filename.lastIndexOf(".") + 1); // 获取文件后缀
  fs.readFile(filename, function(err, content) {
    if (err) {
      response.writeHead(404, {
        "Content-Type": "text/plain; charset=UTF-8"
      });
      response.write(err.message);
    } else {
      response.writeHead(200, {
        "Content-Type": CONTENT_TYPE_MAP[suffix] || "application/octet-stream"
      });
      response.write(content);
    }
    response.end();
  });
});
