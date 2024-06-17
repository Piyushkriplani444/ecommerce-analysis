const express = require("express");

const {
  getData,
  getFilterData,
  getStatictics,
} = require("../controller/ecommerce");
const routes = express.Router();

routes.get("/initialize-data", getData);
routes.get("/get-data", getFilterData);
routes.get("/get-statictics", getStatictics);

module.exports = routes;
