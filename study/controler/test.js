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
    type: ['red', 'green', 'yellow'],
    type_cn: ['红色', '绿色', '黄色']
  }, {
    name: 'size',
    current: 1,
    type: ['M', 'L', 'XL', 'XXL'],
    type_cn: ['M', 'L', 'XL', 'XXL']
  }, {
    name: 'quality',
    current: 2,
    type: ['NORMAL', 'GOOD', 'EXCELLENT'],
    type_cn: ['正常', '好', '非常好']
  }]
  var cost = 0;
  console.log(price)
  properties.forEach(ele => {
    cost = cost + price[ele.name].basic * price[ele.name][ele.type[ele.current]]
  })
  console.log(cost)
  res.send({
    res: {
      properties: properties,
      price: cost,
      navigation_img: 'img/navigation.jpg',
      thumbnails: 'img/thumbnails.jpg',
      name: 'G-STEP冬季卫衣',
      unit: '1'
    }
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
exports.makeOrder = function(req, res) {
  res.header("Content-Type", "application/json;charset=utf-8");
  console.log(req.query.ids)
  res.send({
    code: 0
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
    res: {
      price: cost
    }
  })
}


exports.addCart = function(req, res) {
  var cost = 0;
  var num = req.body.num;
  delete req.body.num;
  for (var item in req.body) {
    cost = cost + price[item].basic * price[item][req.body[item]]
  }
  cost = cost * num;
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send({
    res: {
      message: 'add success',
      cart_id: '123465789542525',
      seed_id: 'dfsadfasdf',
      cart_count: 10
    }
  })
}
