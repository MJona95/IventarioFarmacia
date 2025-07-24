
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Importa los componentes de React Router

import AdminLayout from './components/AdminLayout';       // Para el layout general (sidebar, header, etc.)
import Dashboard from './components/Dashboard';           // Una vista para el dashboard
import UsersManagement from './components/UsersManagement'; // Una vista para la gestión de usuarios
import ProductsManagement from './components/ProductsManagement'; 
import ProvidersManagement from './components/ProvidersManagement'; 

function AdminApp() {
  return (
    <Router> 
      <AdminLayout> 
        <Routes>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/users" element={<UsersManagement />} />
          <Route path="/products" element={<ProductsManagement />} />
          <Route path="/providers" element={<ProvidersManagement />} />
          <Route path="*" element={<div>404: Página de Administración no encontrada</div>} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default AdminApp;