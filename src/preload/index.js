import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {

  login: (credentials) => ipcRenderer.invoke('login', credentials),
   
  db: {
    // Para buscar/seleccionar datos
    select: (query, params) => ipcRenderer.invoke('select', { query, params }),
    // Para insertar nuevos registros
    insert: (query, params) => ipcRenderer.invoke('insert', { query, params }),
    // Para actualizar registros existentes
    update: (query, params) => ipcRenderer.invoke('update', { query, params }),
    // Para eliminar registros
    delete: (query, params) => ipcRenderer.invoke('delete', { query, params }),

    selectAll: (tableName) => ipcRenderer.invoke('selectAll', tableName),
  }

}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
