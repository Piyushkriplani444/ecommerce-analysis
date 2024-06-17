const express = require("express");

const app = express();

const ecommerceRoutes = require("./routes/ecommerce");

const port = 3000;

app.use("/", ecommerceRoutes);

app.listen(port, () => {
  console.log(`Port is running at port ${port}`);
});
