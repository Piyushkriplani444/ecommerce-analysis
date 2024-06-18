const express = require("express");

const {
  getData,
  getFilterData,
  getStatictics,
  getBarChart,
  getcategoryCount,
  GetAllInfo,
} = require("../controller/ecommerce");
const routes = express.Router();

routes.get("/initialize-data", getData);
routes.get("/get-data", getFilterData);
routes.get("/get-info", GetAllInfo);
// routes.get("/get-statictics", getStatictics);
// routes.get("/get-bar-chart", getBarChart);
// routes.get("/get-category-count", getcategoryCount);
module.exports = routes;
