const fs = require("fs");

const path = require("path");

const writefilePath = path.join(__dirname, "", "loremPromises.txt");

const readfilePath = path.join(__dirname, "", "lorem.txt");

const ws = fs.createWriteStream(writefilePath);

const rs = fs.createReadStream(readfilePath, { encoding: "utf-8" });

rs.pipe(ws);
