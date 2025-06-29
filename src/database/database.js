// electron/dbInitializer.js

import sqlite3 from 'sqlite3';
import path from 'path';

let dbInstance = null; // Variable para mantener la única instancia de la base de datos

/**
 * Inicializa la base de datos SQLite y devuelve su instancia.
 * Esta función debe ser llamada después de que Electron esté listo (app.whenReady()).
 * @param {object} app Electron's app object, necesario para app.getPath('userData').
 * @returns {Promise<sqlite3.Database>} Una promesa que resuelve con la instancia de la base de datos.
 */
export function initializeDb(app) {
    return new Promise((resolve, reject) => {
        if (dbInstance) {
            console.log('La base de datos ya está inicializada.');
            return resolve(dbInstance); // Devuelve la instancia existente
        }

        const dbPath = path.join(app.getPath('userData'), 'mydatabase.db');

        dbInstance = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error al conectar la base de datos:', err.message);
                reject(err);
            } else {
                console.log('Conexión exitosa a la base de datos en:', dbPath);
                resolve(dbInstance); // Resuelve con la instancia de la base de datos
            }
        });
    });
}

/**
 * Retorna la instancia de la base de datos ya inicializada.
 * @returns {sqlite3.Database} La instancia de la base de datos.
 * @throws {Error} Si la base de datos no ha sido inicializada.
 */
export function getDb() {
    if (!dbInstance) {
        throw new Error('La base de datos no ha sido inicializada. Asegúrate de llamar a initializeDb() primero.');
    }
    return dbInstance;
}

/**
 * Cierra la conexión de la base de datos.
 */
export function closeDb() {
    if (dbInstance) {
        dbInstance.close((err) => {
            if (err) {
                console.error('Error al cerrar la base de datos:', err.message);
            } else {
                console.log('Base de datos SQLite cerrada.');
                dbInstance = null; // Reiniciar la instancia
            }
        });
    }
}