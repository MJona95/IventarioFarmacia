import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { initializeDb, getDb, closeDb } from '../database/database'
import { createTableUser } from '../database/dbtables'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
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

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( async () => {
try {
        // 1. Initialize the database
        // We 'await' this because we need the DB to be ready before creating tables or doing anything else.
        // We pass the 'app' object because dbInitializer.js needs it for app.getPath('userData').
        await initializeDb(app);
        console.log('Database initialized and ready.');

        // 2. Get the database instance
        // Once initializeDb has finished, you can get the actual db instance from dbInitializer.js
        const db = getDb();
        console.log('Database instance obtained.');

        // 3. Create your tables
        // We 'await' this because table creation is asynchronous.
        // We pass the 'db' instance to createTableUser.
        await createTableUser(db);
        console.log('User table and initial admin user configured.');

        // If you have more table creation functions (e.g., createTableProducts), call them here:
        // await createTableProducts(db);
        // console.log('Products table created.');

        // Now that the database is fully set up, create the main window
        createWindow();

    } catch (error) {
        // If any error occurs during DB init or table creation, log it and quit the app.
        console.error('Critical failure during application startup:', error);
        app.quit();
    }


})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
