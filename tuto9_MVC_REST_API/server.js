const express = require("express");
const path = require("path");
const cors = require("cors");
const coreOption = require("./config/coreOptions")
const { logger } = require("./middleware/logEvents");
const errHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);
//app.use(cors(coreOption));
app.use(express.urlencoded({ extended: false }));
//app.use(express.json);

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));
app.use("/employe", require("./routes/api/employe"));

app.listen(3500, () => console.log(`server is running on ${PORT}`));



app.use(errHandler);
