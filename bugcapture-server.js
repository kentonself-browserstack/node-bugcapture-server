#! /usr/bin/env node

const http = require("http");
const fs = require("fs");

console.log(process.argv.length)
global.port = 8000
if (process.argv.length >= 3) {
 global.port = process.argv[2]
 console.log("new port:" + global.port)
}

const server = http.createServer((req, res) => {
  // Check if the request is for an HTML file
  bugcapture_app_id = process.env.BUGCAPTURE_APP_ID;
  console.log(req.url);
  
  if (req.url == "/") {
    req.url = "/index.html";
  }
  var fname = req.url.replace("/", "");
  fs.readFile(fname, "utf-8", (err, data) => {
    if (req.url.endsWith(".html")) {
      // Modify the HTML content
      var modifiedData = data.replace("<BODY>", "<body>");
      modifiedData = modifiedData.replace("</BODY>", "</body>");
      modifiedData = modifiedData.replace(
        "<body>",
        "<body>" +
          '<script type="text/javascript">' +
          ";(function(){" +
          "const birdeatsbug=(window.birdeatsbug=window.birdeatsbug||[]);" +
          "if(birdeatsbug.initialize)" +
          "return;" +
          "if(birdeatsbug.invoked){" +
          "if(window.console&&console.error){" +
          "console.error('birdeatsbug snippet included twice.')" +
          "}" +
          "return" +
          "}" +
          "birdeatsbug.invoked=true;" +
          "birdeatsbug.methods=['setOptions'," +
          "'trigger'," +
          "'resumeSession'," +
          "'takeScreenshot'," +
          "'startRecording'," +
          "'stopRecording'," +
          "'stopSession'," +
          "'uploadSession'," +
          "'deleteSession'];" +
          "birdeatsbug.factory=function(method){" +
          "return function(){" +
          "const args=Array.prototype.slice.call(arguments);" +
          "args.unshift(method);" +
          "birdeatsbug.push(args);" +
          "return birdeatsbug}};" +
          "for(let i=0;i<birdeatsbug.methods.length;i++){" +
          "const key=birdeatsbug.methods[i];" +
          "birdeatsbug[key]=birdeatsbug.factory(key)" +
          "}" +
          "birdeatsbug.load=function(){" +
          "const script=document.createElement('script');" +
          "script.type='module';" +
          "script.async=true;script.src='https://sdk.birdeatsbug.com/v3/core.js';" +
          "const mountJsBefore=document.getElementsByTagName('script')[0]||document.body.firstChild;" +
          "mountJsBefore.parentNode.insertBefore(script,mountJsBefore);" +
          "const style=document.createElement('link');" +
          "style.rel='stylesheet';" +
          "style.type='text/css';" +
          "style.href='https://sdk.birdeatsbug.com/v3/style.css';" +
          "const mountCssBefore=document.querySelector('link[rel=\"stylesheet\"]')||mountJsBefore;" +
          "mountCssBefore.parentNode.insertBefore(style,mountCssBefore)" +
          "};" +
          "birdeatsbug.load();" +
          "window.birdeatsbug.setOptions({publicAppId:'" +
          bugcapture_app_id +
          "'})" +
          "})();" +
          "</script>"
      );

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(modifiedData);
    } else {
      // Serve other files as-is
      res.writeHead(200);
      res.end(data);
    }
  });
});

server.listen(global.port, () => {
  console.log("Server running on port " +  global.port);
});
