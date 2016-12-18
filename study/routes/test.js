var express = require('express');
var router = express.Router();
var test = require("../controler/test");
router.get('/test', test.test);
router.get('/api/test', test.apiTest);
router.get('/api/number_info', test.numberInfo);
router.get('/api/get_price', test.getPrice)
module.exports = router;
