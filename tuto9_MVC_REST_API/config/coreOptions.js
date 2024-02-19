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
      callback(new Error("!!!"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = coreOption;