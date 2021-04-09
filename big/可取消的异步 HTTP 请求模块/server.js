const cors = require("cors");
const express = require("express");
let app = express();

app.use(cors());

app.get("/tab1", (req, res) => {
  console.log(req.url);
  setTimeout(() => {
    res.json("Tab1 的数据");
  }, 3000);
});

app.get("/tab2", (req, res) => {
  setTimeout(() => {
    res.json("Tab2 的数据");
  }, 3000);
});

app.get("/tab3", (req, res) => {
  setTimeout(() => {
    res.json("Tab3 的数据");
  }, 3000);
});

app.listen(3000, () => {
  console.log("app start at 3000 port");
});
