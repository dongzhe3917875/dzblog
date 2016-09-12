var mongodb = require("./db");

function Comment(name, day, title, comment) {
  this.name = name;
  this.day = day;
  this.title = title;
  this.comment = comment;
}

module.exports = Comment;

Comment.prototype.save = function(callback) {
  var name = this.name;
  var day = this.day;
  var title = this.title;
  var comment = this.commnet;
  var time = {
    date: date,
    year: date.getFullYear(),
    month: date.getFullYear() + "-" + (date.getMonth() + 1),
    day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
      date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() <
        10 ? '0' + date.getMinutes() : date.getMinutes())
  }
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.update({
        name: name,
        'this.day': day,
        title: title,
      }, {
        $push: {"comments": comment}
      }, function(err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        return callback(null);
      })
    })
  })
}
