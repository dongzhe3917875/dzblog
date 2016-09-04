var express = require("express");
var router = express.Router();
var vue_controller = require("../controler/vue_controller.js");
// router.get('/vue', vue_controller.vue);
router.get('/vue/vue_loader_demo', vue_controller.vue_loader);
module.exports = router;
