var remote = require('electron').remote
var ipc = require('electron').ipcRenderer
var Menu = remote.Menu

var menu = Menu.buildFromTemplate([
    {
      label: remote.app.getName(),
      submenu: [
        {
          label: 'New user',
          click: function() {
            ipc.send('show-new-user')
          }
        }
      ]
    }
])

Menu.setApplicationMenu(menu)
