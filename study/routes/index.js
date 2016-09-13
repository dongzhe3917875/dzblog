var express = require('express');
var router = express.Router();
var monk = require('monk');
var user = require("../controler/user");
var demo = require("../controler/demo");
var db = monk('localhost:27017/nodetest');
var checkLogin = require("../middlePlugin/checkLogin.js");
var uncheckLogin = require("../middlePlugin/uncheckLogin.js");
router.get('/userlist', user.userlist(db));
router.get('/newuser', user.newuser);
router.post('/adduser', user.adduser(db));
router.get('/socket_chat', demo.chat);

router.get('/socketIO_chat', checkLogin);
router.get('/socketIO_chat', demo.iochat);


router.get('/blog/login', uncheckLogin);
router.get('/blog/login', demo.iochat_login);

router.get('/blog/register', uncheckLogin);
router.get('/blog/register', demo.iochat_register);


// router.get('/blog/home', checkLogin);
router.get('/blog/home', demo.home);

router.post("/reg", demo.register);
router.post("/login", demo.login);
router.post("/logout", demo.logout);
module.exports = router;
