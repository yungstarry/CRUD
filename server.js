const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const bodyparser = require("body-parser");
const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
PORT = process.env.PORT || 5000;

// log requests
app.use(morgan("tiny"));

// mongo connection
connectDB()

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));


// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {
  console.log(`App listening at Port ${PORT}`);
});
