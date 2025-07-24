/**
 * Crea la tabla de usuarios si no existe.
 */
function createTableUser(db) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS User (
            idUser INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT NOT NULL UNIQUE,
            Password TEXT NOT NULL,
            Type TEXT NOT NULL,
            ImagePath Text
        )
    `;

    const insertAdminQuery = `
        INSERT OR IGNORE INTO User (Name, Password, Type, ImagePath)
        VALUES (?, ?, ?, ?)
    `;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error al crear la tabla "User":', err);
        } else {
            console.log('Tabla "User" lista.');
            const adminImagePath = '/images/user.jpg';
            db.run(insertAdminQuery, ['admin', 'del1al3', 'admin', adminImagePath], (insertErr) => {
                if (insertErr) {
                    console.error('Error al insertar usuario admin:', insertErr);
                } else {
                    console.log('Usuario "admin" verificado/insertado.');
                }
            });
        }
    });
}

export { createTableUser };