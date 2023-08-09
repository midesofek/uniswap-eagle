const express = require("express");
const fetch = require("node-fetch");
const getLiquidityPoolsDetails = require("./modules/liquidityPoolDetails");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/getLiquidityPoolsDetails", getLiquidityPoolsDetails);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
