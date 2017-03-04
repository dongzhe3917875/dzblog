var express = require('express');
var router = express.Router();
var test = require("../controler/test");
router.get('/test', test.test);
router.get('/dongzhe/purchase/detail', test.apiTest);
router.get('/dongzhe/number_info', test.numberInfo);
router.get('/dongzhe/get_price', test.getPrice)
router.get('/dongzhe/make_order', test.makeOrder)
router.post('/dongzhe/cart/add', test.addCart)

module.exports = router;
