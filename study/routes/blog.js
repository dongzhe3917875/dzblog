var express = require('express');
var router = express.Router();
var checkLogin = require("../middlePlugin/checkLogin.js");
var uncheckLogin = require("../middlePlugin/uncheckLogin.js");
var blog = require("../controler/blog");
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({
  storage: storage
})
router.get('/post', blog.post);
// router.post('/post', checkLogin);
router.post('/post_blog', blog.post_blog);
router.post('/upload', upload.single("file"), blog.upload);
// router.get('/:name', checkLogin);
router.get('/:name', blog.list);
router.post('/:name/slice', blog.list_slice);
router.post('/home/slice', blog.list_slice);
router.post('/create_new_version', blog.create_new_version);
router.post('/get_version', blog.list_slice);
// router.get('/:name/:day/:title', checkLogin);
router.get('/:name/:day/:title', blog.listone);
router.get('/:name/:day/:title/edit', checkLogin);
router.get('/:name/:day/:title/edit', blog.edit);
router.post('/:name/:day/:title/update', checkLogin);
router.post('/:name/:day/:title/update', blog.update_post);
router.post('/:name/:day/:title/remove', checkLogin);
router.post('/:name/:day/:title/remove', blog.remove_post);

router.post('/:name/:day/:title/comment', checkLogin);
router.post('/:name/:day/:title/comment', blog.comment_post);
module.exports = router;
