
const loki = require('lokijs')

var db = new loki('smartsl2.db', {
	autoload: true,
	autoloadCallback : databaseInitialize,
	autosave: true,
	autosaveInterval: 4000
})

function databaseInitialize() {
  var entries = db.getCollection("users");
  if (entries === null) {
    entries = db.addCollection("users");
  }

  // kick off any program logic or start listening to external events
  runProgramLogic();
}

function addUsers() {
  var users = db.getCollection('users')
  users.insert({name: 'test4', age: 32})
}

// example method with any bootstrap logic to run after database initialized
function runProgramLogic() {
  var entryCount = db.getCollection("users").count();
  console.log("number of users in database : " + entryCount);
}

var test  = 'toto'

function showResult() {
  var users = db.getCollection('users')
  var result = users.find({age: {$lte: 35}})
  return result[0].name
}

module.exports.db = {
  content: showResult,
  test: test
}
