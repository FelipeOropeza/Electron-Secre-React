// main.js
const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  // Carregar a versão de produção do Vite a partir do diretório dist
  const indexPath = path.join(__dirname, "dist", "index.html");
  mainWindow.loadFile(indexPath); // Carrega o HTML da pasta 'dist'
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
