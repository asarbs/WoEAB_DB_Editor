const {app, Menu, ipcRenderer, ipcMain} = require("electron")
const fs = require('fs')
var db = require("../components/db").dbtemplate;

const { CREATE_NEW_ARMY, CREATE_NEW_SKILL, SAVE_DB } = require('../actions/types')


module.exports = function(window){
    return Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: "Save",
                    accelerator: "CommandOrControl+s",
                    click: () => {  
                        window.webContents.send(SAVE_DB, "SaveDB");
                    } 
                }
            ]
        },
        {
            label: 'Data base',
            submenu: [
                {
                    label: 'New Army',
                    icon: 'static/img/icons/army.png',
                    click: () => {
                        window.webContents.send(CREATE_NEW_ARMY, "Create new army");
                    }
                },
                {
                    label: 'New Skill',
                    click: () => {
                        window.webContents.send(CREATE_NEW_SKILL, "Create new skill");
                    }
                }

            ]
        },
        // {
        //     label: 'Custom Menu', 
        //     submenu: [/* We'll add more actions */]
        // }

    ])    
}