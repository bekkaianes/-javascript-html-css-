console.log("hello BinificaireWindow");

// const sqlite3 = require('sqlite3').verbose();
const { BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const { loadEnvFile } = require("process");
const url = require("url");




let binificaireWindow = null; // Declare globally

function openBinifcaireWindow() {
    let binificaireWindow = new BrowserWindow({

        webPreferences: {
            preload: path.join(__dirname, "../preload.js"),
            contextIsolation: true,
            nodeIntegration: true,
            enableRemoteModule: false, // Improves security
            sandbox: false, 
        },

    });


    binificaireWindow.loadFile("binificaire/binificaireWindow.html");
    binificaireWindow.webContents.openDevTools();

    // Apply menu only to the new window
    const menuTemplate = [
        {
            label: "تسجيل المستفيدين",
            click: () => binificaireWindow.loadFile("binificaire/binificaireWindow.html")
        },
        {
            label: "قائمة الحالات",
            click: () => binificaireWindow.loadFile("binificaire/etatList.html")
        },
        {
            label: "قائمة المسجلين",click: () => binificaireWindow.loadFile("binificaire/registeredBinificaireList.html")
        },
        {
            label: "reload", click: () => binificaireWindow.reload() // recharge juste la page HTML
        },
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    binificaireWindow.setMenu(menu); // Set the menu for this window only

    binificaireWindow.on("closed", () => {
        binificaireWindow = null;
    });
}

// Listen for IPC message from renderer
ipcMain.on("open-binificaire-window", () => {
    openBinifcaireWindow();
});

module.exports = { openBinifcaireWindow };


function removeBinificaire(){
    // ndirha b base de donne rhi f registeredBinificaireList
}

function confirmationBinificaires(){
    // ndirha b base de donne rhi f registeredBinificaireList
}
