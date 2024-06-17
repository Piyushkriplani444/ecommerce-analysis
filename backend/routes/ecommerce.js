const express = require("express");

const ecommController = require("../controller/ecommerce");
const routes = express.Router();

routes.get("/", ecommController.getData);

module.exports = routes;
