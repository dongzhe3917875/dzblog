var mongodb = require("./db");

function Version(version, username, day) {
  this.version = version;
  this.username = username
  this.article = 0;
  this.day = day;
}

module.exports = Version;

Version.prototype.save = function(callback) {
  var version = {
    username: this.username,
    day: this.day,
    version: this.version,
    article: this.article
  }
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err)
    }
    db.collection("version", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.insert(version, {
        safe: true
      }, function(err, version) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, version[0])
      })
    })
  })
}

Version.get_all = function(callback) {
  var query = {};
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection("version", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.find(query).sort({
        day: -1
      }).toArray(function(err, docs) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, docs)
      })
    })
  })
}

Version.get_one = function(version, callback) {
  var query = {
    version: version
  };
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection("version", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.findOne(query, function(err, version) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, version)
      })
    })
  })
}



Version.update = function(version, count, callback) {
  console.log("xxxxxxxxxxx")
  console.log(version, count)
  console.log(callback)
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err)
    }
    db.collection("version", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.update({
        version: version
      }, {
        $set: {
          article: count
        }
      }, function(err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        console.log("xxxxxxxxxxx")
        console.log(callback)
        callback(null);
      })
    });
  });
}
