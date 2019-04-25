const {app, Menu, ipcRenderer, ipcMain} = require("electron")
const fs = require('fs')
var db = require("../components/db").dbtemplate;

const { CREATE_NEW_ARMY, CREATE_NEW_SKILL, CREATE_NEW_SPELL, CREATE_NEW_MELEE_WEAPON, CREATE_NEW_RANGE_WEAPON, SAVE_DB } = require('../actions/types')


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
                    //icon: 'static/img/icons/army.png',
                    click: () => {
                        window.webContents.send(CREATE_NEW_ARMY, "Create new army");
                    }
                },
                {
                    label: 'New Skill',
                    click: () => {
                        window.webContents.send(CREATE_NEW_SKILL, "Create new skill");
                    }
                },
                {
                    label: "New Spell",
                    click: () => {
                        window.webContents.send(CREATE_NEW_SPELL, "Creaet new spell")
                    }
                },
                {
                    label: "New Melee Weapon",
                    click: () => {
                        window.webContents.send(CREATE_NEW_MELEE_WEAPON, "Creaet melee weapon")
                    }
                },
                {
                    label: "New Range Weapon",
                    click: () => {
                        window.webContents.send(CREATE_NEW_RANGE_WEAPON, "Creaet range weapon")
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
