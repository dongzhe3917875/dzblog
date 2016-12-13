var fs = require("fs");
var i = 1
function main() {
  fs.readdir("./node_modules", function (err, dirs) {
    if (err) {
      console.log(err);
      return;
    }
    dirs.forEach(function(dir, index){
    console.log(index)
      if (dir.indexOf(".") !== 0) {
        var packageJsonFile = "./node_modules/" + dir + "/package.json";
        if (fs.existsSync(packageJsonFile)) {
          fs.readFile(packageJsonFile, function (err, data) {
            if (err) {
              console.log(err);
            }
            else {
              var json = JSON.parse(data);
              i = i + 1;
              console.log('"'+json.name+'": "' + json.version + '",');
            }
          });
        }
      }
    });
  });
}

main();
