const { app, BrowserWindow } = require('electron')

const windows = new Set()

const createMain = () => {
  // Spin up a renderer for the view
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: `file://${__dirname}/build/ebaytool/assets/64x64.png`,
    show: false
  })

   win.loadURL(`file://${__dirname}/build/ebaytool/index.html`)

  // uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  win.once('ready-to-show', () => {
    win.show()
  })

  // Event when the window is closed.
  win.on('closed', () => {
    windows.delete(win)
    win = null
  })

  windows.add(win)
}

// Create window on electron intialization
app.on('ready', () => {
  createMain()
})


// Quit when all windows are closed.
app.on('window-all-closed',  () => {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // macOS specific close process
  if (win === null) {
    createMain()
  }
})