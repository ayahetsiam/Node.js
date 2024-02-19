const allowesOrigins = require("./allowed_origin")
const coreOption = {
  origin: (origin, callback) => {
    if (allowesOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("!!!"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = coreOption;