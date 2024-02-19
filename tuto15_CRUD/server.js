const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const connectDB = require("./config/dbConnection")
//const cors = require("cors");
//const coreOption = require("./config/coreOptions");
const { logger } = require("./middleware/logEvents");
const errHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;
connectDB();

app.use(cookieParser);
app.use(logger);
//app.use(cors(coreOption))

app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));
app.use("/employe", require("./routes/api/employe"));
app.use("/register", require("./routes/api/register"));
app.use("/refresh", require("./routes/refresh"));

app.use(verifyJWT);
app.use("/auth", require("./routes/api/auth"));

mongoose.connection.once("open", () => {
    console.log("connected the mongoDB"),
      app.listen(3500, () => console.log(`server is running on ${PORT}`));
})


app.use(errHandler);
