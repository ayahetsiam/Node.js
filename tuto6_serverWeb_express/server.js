const express = require("express");
const { existsSync } = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3500;

app.get("/$|/index(.html)?", (req, res) => {
  res.sendfile(path.join(__dirname, "view", "index.html"));
});
app.get("/new-page(.html)?", (req, res) => {
  res.sendfile(path.join(__dirname, "view", "new-page.html"));
});
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.get("/*", (req, res) => {
  res.status(404).sendfile(path.join(__dirname, "view", "404-page.html"));
});

app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("hello on the bit");
    next();
  },
  (req, res) => {
    res.send("hello word");
  }
);

app.listen(3500, () => console.log(`server is running on ${PORT}`));
