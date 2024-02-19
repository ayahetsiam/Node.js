const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const fsPromise = require("fs").promises;

const logEvent = async (message) => {
  const logdate = `${format(new Date(), "dd-MM-yyyy\thh:mm:ss")}`;
  const logid = `${uuid()}`;
  const logitem = `${logdate}\t${logid}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      fs.mkdirSync(path.join(__dirname, "logs"));
    }

    await fsPromise.appendFile(
      path.join(__dirname, "logs", "logEvent.txt"),
      logitem
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = logEvent;
