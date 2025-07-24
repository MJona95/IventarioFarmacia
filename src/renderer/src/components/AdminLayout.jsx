// src/renderer/src/components/AdminLayout.jsx
import './css/AdminLayout.css'

import SideBar from './SideBar';

function AdminLayout({ children }) {
  return (
    <div className="container">
      <SideBar />
      <main className="content">
        {children} {/* Aquí se renderizará el componente de la ruta actual */}
      </main>
    </div>
  );
}

export default AdminLayout;