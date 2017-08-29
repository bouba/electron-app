const {app, BrowserWindow} = require('electron')
const {ipcMain} = require('electron')
const path = require('path')
const url  = require('url')
const ldb = require(__dirname+'/database/db.js')

const locals = {}
//Renderer html template
const pug = require('electron-pug')({pretty: true}, locals)

let win // Global window object reference so it is not gabaged collected

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600})

  // we generate the View
  win.loadURL(`file://${__dirname}/index.pug`)
  win.webContents.openDevTools()

  //User management
  ipcMain.on('show-new-user', function() {
    win.loadURL(`file://${__dirname}/views/users/new.pug`)
  })

  ipcMain.on('index-users', function() {
    locals.users = ldb.db.instance.getCollection('users').find({login: { $ne: undefined }})
    win.loadURL(`file://${__dirname}/views/users/index.pug`)
  })

  win.on('closed', () => {
    // clean all elements from the app
    win = null
  })
}

// initialize
app.on('ready',createWindow)

// Quit when all windows are closed
app.on('window-all-closed', ()=> {
  if(process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if(win == null) {
    createWindow();
  }
})
