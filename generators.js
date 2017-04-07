var Box = function (x) {
    return {
        map:function(f) { return  Box(f(x));},
        fold: function(f) {
            return f(x);
        },
        toString: function(x) {
            return "The total meal cost is " + x + " dollars";
        }
    }
};

var percentToFloat = function(value) {
     return Box(value)
     .map(function(number) {
         return value.map(function(number) {  return number * 0.01; });
     })
}

var calcAddOns = function(array, price) {
  return array.map(function(tip) {
    return price * tip;
  });
};

var mealCost = function (price, tip, tax) {
      return Box(price)
      .fold(function(price) {
        return percentToFloat([tip,tax]).map(function(array) {
          return array.map(function(el){ return el * price});
        }).fold(function(price) {
          console.warn(price);
        })
      });
}
var cost = mealCost(12, 20, 8);
console.log(cost);