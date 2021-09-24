const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const isDev = require("electron-is-dev");

const windows = new Set();
let close_timeout;
let close_interval;
let update_available = false;

const createPreloader = () => {
  let preloader = new BrowserWindow({
    width: 300,
    height: 300,
    title: "Todo",
    frame: false,
    resizable: false,
    icon: __dirname + "/logo.ico",
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  windows.add(preloader);

  preloader.loadURL(
    isDev
      ? "http://localhost:3000#/preload"
      : `file://${path.join(__dirname, "../build/index.html#/preload")}`
  );
  preloader.once("ready-to-show", () => {
    preloader.focus();
    autoUpdater.checkForUpdates();
    close_timeout = setTimeout(() => {
      close_interval = setInterval(() => {
        if (!update_available) preloader.close();
      }, 1000);
    }, 5000);
  });
  preloader.on("closed", () => {
    clearTimeout(close_timeout);
    clearInterval(close_interval);
    windows.delete(preloader);
    preloader = null;
    createWindow();
  });
};

const createWindow = () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Todo",
    frame: false,
    icon: __dirname + "/logo.ico",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  windows.add(win);

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  win.on("maximize", () => {
    win.webContents.send("isMaximized");
  });
  win.on("unmaximize", () => {
    win.webContents.send("isRestored");
  });
  win.on("closed", () => {
    windows.delete(win);
    win = null;
  });

  ipcMain.on("minimizeApp", () => {
    win.minimize();
  });
  ipcMain.on("maximizeRestoreApp", () => {
    if (win.isMaximized()) return win.restore();
    win.maximize();
  });
  ipcMain.on("closeApp", () => {
    win.close();
  });
};

app.on("ready", createPreloader);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createPreloader();
});

autoUpdater.on("update-available", () => {
  win.webContents.send("update_available");
});
autoUpdater.on("download-progress", (progressObj) => {
  let percent = Math.round(progressObj.percent);
  win.webContents.send("upprogress", percent);
});
autoUpdater.on("update-downloaded", () => {
  autoUpdater.quitAndInstall();
});
