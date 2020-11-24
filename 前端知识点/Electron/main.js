let electron = require("electron")

let app = electron.app

let BrowserWindow = electron.BrowserWindow

app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        // 表示node环境可以在渲染进程中使用
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    let BrowserView = electron.BrowserView
    
    let view = new BrowserView()

    mainWindow.setBrowserView(view)

    view.setBounds({
        x: 0,
        y: 120,
        width: 800,
        height: 500
    })

    view.webContents.loadURL('https://www.baidu.com')

    mainWindow.loadFile("index.html")
    mainWindow.on("closed", () => {
        mainWindow = null
    })
})