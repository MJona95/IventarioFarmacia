const ALLOWED_TABLES = ['User']

function setupUsersHandlers( ipcMain, db ) {

    ipcMain.handle('selectAll', async (event, tableName) => {

        // --- VALIDACIÓN DE SEGURIDAD AQUÍ ---
        if (!ALLOWED_TABLES.includes(tableName)) {
            console.error(`ERROR DE SEGURIDAD: Intento de seleccionar de tabla no permitida: ${tableName}`);
            return reject('Nombre de tabla no permitido.'); // Rechaza la promesa por seguridad
        }
        
        const query = `SELECT * FROM ${tableName}`

        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
            if(err) {
                console.error('Error al extraer todos los usuarios')
                reject(err.message);
            } else {
                resolve(rows)
                console.log(rows)
            }
            })
        })
        
    })

}

export { setupUsersHandlers }