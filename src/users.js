var remote = require('electron').remote
var ipc = require('electron').ipcRenderer
var database = remote.require(__dirname+'/../../database/db.js')


function createUser(login) {
  console.log('click on create user')
  var users = database.db.instance.getCollection('users')

  users.insert({login: login})
  console.log('Added user: '+login)

  ipc.send('index-users')
}

function getUsers() {
  console.log('getting users')
  var users = database.db.instance.getCollection('users').find({})
  return users
}
