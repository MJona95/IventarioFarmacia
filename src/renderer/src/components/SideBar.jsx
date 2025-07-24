import { NavLink } from 'react-router-dom'

import { MenuI } from './icons/MenuI'
import { HomeI } from './icons/HomeI'
import { UsersI } from './icons/UsersI'
import { ProductsI } from './icons/ProductsI'
import { ProvidersI } from './icons/ProvidersI'

import './css/SideBar.css'

function SideBar() {

  return (
    <nav className="sidebar">
        <div className="menu">
          <h2 className='title' >Administrar</h2>
          <MenuI fill="white" className="icon" />
        </div>
        <ul className='list'>
          <li className='item' >
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')} >
              <span className="icon-wrapper">
                <HomeI className="icon" width="24" heigth="24" />
              </span>
              <span className="text-item">Inicio</span>              
            </NavLink>
          </li>
          <li className='item' >
            <NavLink to="/users" className={({ isActive }) => (isActive ? 'active-link' : '')} >
              <span className="icon-wrapper">
                <UsersI className="icon" width="24" heigth="24" />
              </span>
              <span className="text-item">Usuarios</span>
            </NavLink>
          </li>
          <li className='item' >
            <NavLink to="/products" className={({ isActive }) => (isActive ? 'active-link' : '')} >
              <span className="icon-wrapper">
                <ProductsI className="icon" width="24" heigth="24" />
              </span>
              <span className="text-item">Productos</span>
            </NavLink>
          </li>
          <li className='item' >
            <NavLink to="/providers" className={({ isActive }) => (isActive ? 'active-link' : '')} >
              <span className="icon-wrapper">
                <ProvidersI className="icon" width="24" heigth="24" />
              </span>
              <span className="text-item">Proveedor</span>
            </NavLink>
          </li>
        </ul>
    </nav>
  )
}

export default SideBar