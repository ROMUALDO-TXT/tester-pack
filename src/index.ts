import { app, BrowserWindow, ipcMain } from 'electron';
import createServer from './server';
import * as localtunnel from 'localtunnel';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

ipcMain.handle('start-localtunnel', async (event, port) => {
  try {
    const tunnel = await localtunnel({
      port: port,
      subdomain: 'kbite-tester-pack',
    });
    return tunnel.url; // Retorna a URL gerada
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao iniciar localtunnel: ' + error.message);
  }
});

ipcMain.handle('start-express', async (event, port) => {
  try {
    const server = createServer();

    server.listen(port, () => {
      console.log(`Servidor Express rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao iniciar servidor express: ' + error.message);
  }
});

ipcMain.handle('fetch-data', async (event) => {
  const response = await fetch('http://localhost:3000/api');
  return await response.json();
});

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
