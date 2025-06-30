
function AdminApp() {

  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <h1>hola mundo desde la ventana admin</h1>
    </>
  )
}

export default AdminApp
