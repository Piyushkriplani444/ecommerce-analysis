const express = require("express");

const { getData, getFilterData } = require("../controller/ecommerce");
const routes = express.Router();

routes.get("/initialize-data", getData);
routes.get("/get-data", getFilterData);

module.exports = routes;
