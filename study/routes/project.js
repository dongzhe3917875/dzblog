var express = require('express');
var router = express.Router();
var project = require("../controler/project");

router.get('/select_simulate', project.select_simulate);
module.exports = router;
