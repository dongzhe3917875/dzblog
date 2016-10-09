var express = require('express');
var router = express.Router();
var project = require("../controler/project");

router.get('/select_simulate', project.select_simulate);
router.get('/vue_todolist', project.vue_todolist);
module.exports = router;
