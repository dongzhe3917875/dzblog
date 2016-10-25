var mongodb = require("./db.js");
var markdown = require("markdown").markdown;
var Version = require("./version.js").markdown;

function Post(name, title, markdown, subject, post) {
  this.name = name;
  this.title = title;
  this.post = post;
  this.subject = subject;
  this.markdown = markdown;
}

module.exports = Post;
// 增加
Post.prototype.save = function(callback) {
  var date = new Date();
  var time = {
    date: date,
    year: date.getFullYear(),
    month: date.getFullYear() + "-" + (date.getMonth() + 1),
    day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
      date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() <
        10 ? '0' + date.getMinutes() : date.getMinutes())
  }

  var post = {
    name: this.name,
    time: time,
    title: this.title,
    subject: this.subject,
    post: this.post,
    markdown: this.markdown,
    // 添加comments
    comments: []
  }

  mongodb.open(function(err, db) {
    if (err) {
      return callback(err)
    }
    db.collection("posts", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.insert(post, {
        safe: true
      }, function(err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
        mongodb.close();
      });
    });
  });
}

// 查看所有
Post.getAll = function(name, callback) {

  mongodb.open(function(err, db) {
    if (err) {
      return callback(err)
    }
    db.collection("posts", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};
      if (name) {
        query.name = name;
      }
      // count可以统计出query的个数， 用于返回总个数
      collection.count(query, function(err, total) {
          collection.find(query).sort({
            time: -1
          }).toArray(function(err, docs) {
            mongodb.close();
            if (err) {
              return callback(err);
            }

            //支持markdown
            // console.log(JSON.stringify(markdown))
            // docs.forEach(function(ele) {
            //   ele.post = markdown.toHTML(ele.post);
            // })
            callback(null, docs, total);
            mongodb.close();
          })
        })
        // skip 跳过前多少个
        // limit 请求的数量 这样就可以获取任何区间的数据了
        // skip + limit用来返回数据
    });
  });
}


// 查看所有
Post.getSlice = function(slice_obj, callback) {
  var name = slice_obj.name;
  var offset = slice_obj.offset;
  var pageSize = slice_obj.pageSize;
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err)
    }
    db.collection("posts", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};
      if (name) {
        query.name = name;
      }
      // count可以统计出query的个数， 用于返回总个数
      collection.count(query, function(err, total) {
          collection.find(query, {
            skip: offset,
            limit: pageSize
          }).sort({
            time: -1
          }).toArray(function(err, docs) {
            mongodb.close();
            if (err) {
              return callback(err);
            }

            //支持markdown
            // console.log(JSON.stringify(markdown))
            // docs.forEach(function(ele) {
            //   ele.post = markdown.toHTML(ele.post);
            // })
            mongodb.close();
            callback(null, docs, total);

          })
        })
        // skip 跳过前多少个
        // limit 请求的数量 这样就可以获取任何区间的数据了
        // skip + limit用来返回数据
    });
  });
}


// 查看单个
Post.getOne = function(name, day, title, callback) {

  mongodb.open(function(err, db) {
    if (err) {
      return callback(err)
    }
    db.collection("posts", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      console.log(name, day, title)
      collection.findOne({
        name: name,
        "time.day": day,
        title: title
      }, function(err, doc) {
        if (err) {
          return callback(err);
        }
        callback(null, doc);
        mongodb.close();
      })
    });
  });
}

// 更新
Post.update = function(name, day, title, post, callback) {

  mongodb.open(function(err, db) {
    if (err) {
      return callback(err)
    }
    db.collection("posts", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      console.log(name, day, title)
      collection.update({
        name: name,
        "time.day": day,
        title: title
      }, {
        $set: {
          markdown: post.markdown,
          post: post.post,
          subject: post.subject
        }
      }, function(err) {
        if (err) {
          return callback(err);
        }
        callback(null);
        mongodb.close();
      })
    });
  });
}

// 删除
Post.remove = function(name, day, title, callback) {

  mongodb.open(function(err, db) {
    if (err) {
      return callback(err)
    }
    db.collection("posts", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      console.log(name, day, title)
      collection.remove({
        name: name,
        "time.day": day,
        title: title
      }, {
        w: 1
      }, function(err) {
        if (err) {
          return callback(err);
        }
        callback(null);
        mongodb.close();
      })
    });
  });
}
