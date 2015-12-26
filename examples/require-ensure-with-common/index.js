var a = require('./a.js');
var b = require('./b.js');

console.log('index', new Date());

module.exports = {
  a: a,
  b: b
};
