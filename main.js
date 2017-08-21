const {app, BrowserWindow} = require('electron')
const path = require('path')
const url  = require('url')

const ldb = require(__dirname+'/models/db.js')


const locals = { tdb: ldb, c: content }
//DB
// View
const pug = require('electron-pug')({pretty: true},locals)


let win // Global window object reference so it is not gabaged collected

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600})

  // we generate the View
  win.loadURL(`file://${__dirname}/index.pug`)
  win.webContents.openDevTools()

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
