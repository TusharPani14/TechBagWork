const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const userRoutes = require("./routes/userRoutes")
const buyNowRoute = require("./routes/buyNowRoute")
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
var cors = require('cors')

dotenv.config();

const app = express();

app.use(cors())
//Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/user", userRoutes);
app.use("/buyNow", buyNowRoute);

//----------------------------Development-----------------------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "../frontend/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

//----------------------------Development-----------------------------------

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));
