console.log("hello OrganisationWindow");

const { BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const url = require("url");
let OrganisationRegistered = null; // Declare globally
function openOrganisationWindow() {
    let OrganisationRegistered = new BrowserWindow({

        webPreferences: {
            preload: path.join(__dirname, "../preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false, // Improves security
            sandbox: false,
        },

    });


    OrganisationRegistered.loadFile("organisation/OrganisationRegistered.html");
    OrganisationRegistered.webContents.openDevTools();

    // Apply menu only to the new window
    const menuTemplate = [
        {
            label: "تسجيل المؤسسات",
            click: () => OrganisationRegistered.loadFile("organisation/OrganisationRegistered.html")
        },
        {
            label: " البلديات",
            click: () => OrganisationRegistered.loadFile("organisation/baladiya.html")
        },
        {
            label: "قائمة المؤسسات", click: () => OrganisationRegistered.loadFile("organisation/organisationList.html")
        },
        {
            label: "reload", click: () => OrganisationRegistered.reload() // recharge juste la page HTML
        },
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    OrganisationRegistered.setMenu(menu); // Set the menu for this window only

    OrganisationRegistered.on("closed", () => {
        OrganisationRegistered = null;
    });
}

// Listen for IPC message from renderer
ipcMain.on("open-organisation-window", () => {
    openOrganisationWindow();
});



module.exports = { openOrganisationWindow };


function removeBaladiya(){

    // mn base de donne
}

function removeOrganisation(){
    // base de donnee
}