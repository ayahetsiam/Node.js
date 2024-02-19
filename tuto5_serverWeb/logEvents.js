const fs = require("fs");
const fsPromise = require("fs").promises;
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const path = require("path");

const logEvents = async (message, logName) => {
  const logdate = `${format(new Date(), "dd-MM-yyyy\thh:mm:ss")}`;
  const logitem = `${logdate}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      fs.mkdirSync(path.join(__dirname, "logs"));
    }
    await fsPromise.appendFile(path.join(__dirname, "logs", logName), logitem);
  } catch (err) {
    console.error(err);
  }
};

module.exports = logEvents;
