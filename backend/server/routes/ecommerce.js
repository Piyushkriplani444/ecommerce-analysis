const express = require("express");

const { getData } = require("../controller/ecommerce");
const routes = express.Router();

routes.get("/initialize-data", getData);

module.exports = routes;
