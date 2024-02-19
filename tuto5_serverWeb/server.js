const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const http = require("http");

const logEvents = require("./logEvents");
const Logevent = require("events");
const { type } = require("os");
class MyEvent extends Logevent {}
const myEvent = new MyEvent();

myEvent.on("log", (msg, fileName) => {
  logEvents(msg, fileName);
});

const PORT = process.env.PORT || 3500;

const serverFile = async (filepath, content_type, response) => {
  try {
    const rowdata = await fsPromises.readFile(
      filepath,
      !content_type.includes("image")? "utf-8": ""
    );
    const data =
      content_type == "application/json" ? JSON.parse(rowdata) : rowdata;
    response.writeHead(filepath.includes("404-page.html") ? 404 : 200, {
      "Content-Type": content_type,
    });
    response.end(
      content_type == "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEvent.emit("log", `${err.name}\t${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEvent.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");
  const extension = path.extname(req.url);
  console.log(extension);
  let content_type;
  switch (extension) {
    case ".css":
      content_type = "text/css";
      break;
    case ".txt":
      content_type = "text/pain";
      break;
    case ".jpeg":
      content_type = "image/jpeg";
      break;
    case ".jpg":
      content_type = "text/jpg";
      break;
    case ".json":
      content_type = "application/json";
      break;
    default:
      content_type = "text/html";
  }

  let filepath;
  content_type === "text/html" && req.url === "/"
    ? (filepath = path.join(__dirname, "view", "index.html"))
    : content_type === "text/html" && req.url.slice(-1) === "/"
    ? (filepath = path.join(__dirname, "view", req.url, "index.html"))
    : content_type === "text/html"
    ? (filepath = path.join(__dirname, "view", req.url))
    : (filepath = path.join(__dirname, req.url));

  if (!extension && req.url.slice(-1) !== "/") filepath += ".html";
  
  const fileExiste = fs.existsSync(filepath);
  if (fileExiste) {
    serverFile(filepath, content_type, res);
  } else {
    switch (path.parse(filepath).base) {
      case "old-page.htm":
        res.writeHead(301, { location: "/new-page.html" });
        res.end();
        break;
      case "www-page.htm":
        res.writeHead(301, { location: "/" });
        res.end();
        break;
      default:
        serverFile(
          path.join(__dirname, "view", "404-page.html"),
          "text/html",
          res
        );
    }
  }

  /*if (req.url === "/" || req.url === "index.html") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    filepath = path.join(__dirname, "view", "index.html");
    fs.readFile(filepath, "utf-8", (err, data) => {
      //console.error(err)
      res.write(data);
      res.end;
    });
  }*/
});

server.listen(PORT, () => console.log("server is running on " + PORT));
