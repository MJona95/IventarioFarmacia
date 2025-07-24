import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

import { setupAuthProcess } from '../handlers/authHandler'

//manejadores de los usuarios 
import { setupUsersHandlers } from '../handlers/usersHandler'

import { initializeDb, getDb, closeDb } from '../database/database'
import { createTableUser } from '../database/dbtables'

let mainWindow
let adminWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

   mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createAdminWindow() {

  if (adminWindow && !adminWindow.isDestroyed()) {
    adminWindow.focus()
    return
  }

  adminWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  adminWindow.on('ready-to-show', () => {
    adminWindow.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // Para desarrollo, podrías necesitar una URL diferente o un parámetro para cargar la vista de admin
    // Ejemplo: `http://localhost:5173/#/admin` si usas routing en React
    adminWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/admin.html`); // <-- ¡IMPORTANTE! Asume routing en React
  } else {
    // Para producción, podrías tener un HTML diferente o un enrutador JS que redirija
    adminWindow.loadFile(join(__dirname, '../renderer/admin.html')); // Si tienes un HTML específico para admin
    // O si tu index.html principal maneja el routing:
    // adminWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: '/admin' });
  }

}

app.whenReady().then( async () => {

try {
        await initializeDb(app);
        console.log('Database initialized and ready.');

        const db = getDb();
        console.log('Database instance obtained.');

        await createTableUser(db);
        console.log('User table and initial admin user configured.');

        setupAuthProcess(ipcMain, db, createAdminWindow) 

        //invocaciones de los manejadores
        setupUsersHandlers(ipcMain, db)

        createWindow();

    } catch (error) {
        console.error('Critical failure during application startup:', error);
        app.quit();
    }

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    closeDb()
    app.quit()
  }
})
