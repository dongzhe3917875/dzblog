exports.test = function(req, res) {
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send({
    name: "dongzhe",
    age: 22
  });
}
var price = {
  color: {
    'basic': 20,
    'red': 1.0,
    'green': 1.1,
    'yellow': 1.2
  },
  size: {
    'basic': 30,
    'M': 1.0,
    'L': 1.1,
    'XL': 1.2,
    'XXL': 1.3
  },
  quality: {
    'basic': 40,
    'NORMAL': 1.0,
    'GOOD': 1.1,
    'EXCELLENT': 1.2
  }
}
exports.apiTest = function(req, res) {
  res.header("Content-Type", "application/json;charset=utf-8");
  var properties = [{
    name: 'color',
    current: 0,
    data: ['red', 'green', 'yellow']
  }, {
    name: 'size',
    current: 1,
    data: ['M', 'L', 'XL', 'XXL']
  }, {
    name: 'quality',
    current: 2,
    data: ['NORMAL', 'GOOD', 'EXCELLENT']
  }]
  var cost = 0;
  console.log(price)
  properties.forEach(ele => {
    cost = cost + price[ele.name].basic * price[ele.name][ele.data[ele.current]]
  })
  console.log(cost)
  res.send({
    properties,
    cost
  });
}

exports.numberInfo = function(req, res) {
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send({
    currentNum: 1,
    min: 1,
    max: 20
  })
}


exports.getPrice = function(req, res) {
  var cost = 0;
  var num = req.query.num;
  delete req.query.num;
  for (var item in req.query) {
    cost = cost + price[item].basic * price[item][req.query[item]]
  }
  cost = cost * num;
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send({
    cost: cost
  })
}
