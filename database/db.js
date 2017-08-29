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

function getUsers() {
  console.log('getting users')
  var users = db.getCollection('users').find({})
  return users
}

// example method with any bootstrap logic to run after database initialized
function runProgramLogic() {
  var entryCount = db.getCollection("users").count();
  console.log("number of users in database : " + entryCount);
}

module.exports.db = {
  instance: db
}
