const express = require("express");
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const errHandler = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);

const whiteListe = [
  "https://www.yoursite.com",
  "https://127.0.0.1:5500",
  "http://localhost:3500",
  "http://localhost",
];

const coreOption = {
  origin: (origin, callback) => {
    if (whiteListe.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by core"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(coreOption));
app.use(express.urlencoded({ extended: false }));

//app.use(express.json);

app.use(express.static(path.join(__dirname, "/public")));

app.get("/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "new-page.html"));
});
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
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

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("terminé!");
};

app.use(errHandler);

app.get("/state(.html)?", [one, two, three]);

app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "view", "404-page.html"));
  } else if (req.accepts("json")) {
    res.status(404).json({ err: "Erreur 404" });
  } else {
    res.status(404).type("txt").send("Erreur 404 ");
  }
});
