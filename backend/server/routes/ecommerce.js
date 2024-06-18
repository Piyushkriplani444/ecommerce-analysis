const express = require("express");

const {
  getData,
  getFilterData,
  getStatictics,
  getBarChart,
} = require("../controller/ecommerce");
const routes = express.Router();

routes.get("/initialize-data", getData);
routes.get("/get-data", getFilterData);
routes.get("/get-statictics", getStatictics);
routes.get("/get-bar-chart", getBarChart);
module.exports = routes;
