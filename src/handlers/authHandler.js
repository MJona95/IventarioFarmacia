import { BrowserWindow } from "electron";

function setupAuthProcess(ipcMain, db, createAdminWindow) {
    
    console.log("Proceso de autenticación: Configurando manejadores IPC.");

    // Manejador IPC para el login
    ipcMain.handle('login', async (event, credentials) => {

        console.log('Proceso de autenticación: Solicitud de login recibida para:', credentials);
        
        const { username, password } = credentials;

        const query = `SELECT * FROM User WHERE Name = ? AND Password = ?`;

        return new Promise((resolve) => {
            db.get(query, [username, password], (err, row) => {
                if (err) {
                    console.error('Proceso de autenticación: Error de DB al verificar credenciales:', err.message);
                    resolve({ success: false, message: 'Error interno del servidor.' });
                    return;
                }

                if (row) {
                    console.log('Proceso de autenticación: Login exitoso para:', row.Name);
                    const mainWindow = BrowserWindow.fromWebContents(event.sender);
                    if (mainWindow && !mainWindow.isDestroyed()) {
                        console.log('IPC: Cerrando la ventana de login desde authHandler.js.');
                        mainWindow.close(); // Cierra la ventana de login
                    }
                    createAdminWindow();
                    resolve({ success: true, user: { name: row.Name, type: row.Type } });
                } else {
                    console.log('Proceso de autenticación: Login fallido: Credenciales incorrectas para', name);
                    resolve({ success: false, message: 'Nombre de usuario o contraseña incorrectos.' });
                }
            });
        });
    });

}

export { setupAuthProcess };