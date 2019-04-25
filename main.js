const { app, ipcMain, BrowserWindow, Menu } = require('electron')
const path = require('path')
const { CREATE_NEW_ARMY } = require(path.resolve('actions/types'))
const menu = require("./components/Menu");


app.on('ready', function(){
    let window = new BrowserWindow({x: 0, y: 0, width:1600, height:1000})
    window.loadURL(path.join('file://', __dirname, 'static/index.html'))
    Menu.setApplicationMenu(menu(window));

    devtools = new BrowserWindow()
    window.webContents.setDevToolsWebContents(devtools.webContents)
    window.webContents.openDevTools({mode: 'detach'})
    window.webContents.once('did-finish-load', function () {   
        let windowBounds = window.getBounds();  
        devtools.setPosition(500, 200);        
    });


    // ipcMain.on(CREATE_NEW_ARMY, (event, {}) => {
    //    console.log(`CREATE_NEW_ARMY ${db.db}`);
    // })

    // Set the devtools position when the parent window is moved.
    window.on('move', function () { 
        let windowBounds = window.getBounds();
        devtools.setPosition(windowBounds.x + windowBounds.width, windowBounds.y);
    });

})
app.on('close', function() {
    window = null
})

