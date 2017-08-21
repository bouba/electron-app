const loki = require('lokijs')

var db = new loki('smartsl2.db')

var users = db.addCollection('users')
var test  = 'toto'
users.insert({name: 'test4', age: 32})

const content = { to: test}

function showResult() {
  // var db = new loki('smartsl2.db')
  // var users = db.addCollection('users')
  // var result = users.find({age: {$lte: 35}})
  // return console.log(result) + 'toto'
  return 'test'
}
