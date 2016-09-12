module.exports = function(req, res, next) {
  if (req.session.user) {
    res.redirect('/blog/home')
      // res.redirect('/socketIO_chat')
  }
  next();
}
