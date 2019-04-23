const { app, BrowserWindow } = require('electron')

function createWindow () 
{
    let win = new BrowserWindow({ width: 800, height: 600 })
    win.loadFile('scripts/index.html')

    devtools = new BrowserWindow()
    win.webContents.setDevToolsWebContents(devtools.webContents)
    win.webContents.openDevTools({mode: 'detach'})
    win.webContents.once('did-finish-load', function () {
        let winBounds = win.getBounds()
        devtools.setPosition(500,200)
    })

    win.on('closed', () => 
    {
        win = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', () =>
{
    if (process.platform !== 'darwin')
    {
        app.quit()
    }
})

app.on('active', () =>
{
    if (win === null)
    {
        createWindow()
    }
})
