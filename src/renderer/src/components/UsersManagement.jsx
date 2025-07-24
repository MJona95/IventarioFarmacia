// src/renderer/src/components/UsersManagement.jsx
import { useState, useEffect } from 'react'
// Importa los estilos CSS específicos para este componente.
import '../components/css/UsersManagement.css'

import UserCard from './subcomponents/UserCard'

// Importa los componentes secundarios necesarios.
import Search from './subcomponents/Search' // Componente para la barra de búsqueda.
import { UsersI } from './icons/UsersI' // Icono de usuarios.
import { AddUserI } from './icons/AddUserI' // Icono para añadir usuario.
import ButtonC from './subcomponents/ButtonC' // Componente de botón personalizado.

function UsersManagement() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // <-- ¡AÑADIDO! Estado para indicar si está cargando
  const [error, setError] = useState(null);     // <-- ¡AÑADIDO! Estado para manejar errores

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Comienza a cargar
        // Llama a la nueva función de preload
        const allUsers = await window.api.db.selectAll('User');
        setUsers(allUsers);
      } catch (err) {
        // Usa err.message para un mensaje más limpio del error
        setError('Error al cargar usuarios: ' + err.message); // <-- Ahora setError está definido
        console.error(err);
      } finally {
        setLoading(false); // Termina de cargar (ya sea con éxito o error)
        console.log('isloading false') // Este log ahora tiene sentido
      }
    };

    fetchUsers();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // ¡IMPORTANTE! Añade la lógica de renderizado condicional para loading y error
  if (loading) {
    return (
      <section className="container-user">
        <section className="content">
          <h2>Cargando usuarios...</h2>
        </section>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container-user">
        <section className="content">
          <h2>Error al cargar usuarios:</h2>
          <p>{error}</p>
        </section>
      </section>
    );
  }

  console.log(users)

  return (
    // El fragmento <>...</> se utiliza para agrupar múltiples elementos sin añadir un nodo extra al DOM.
    <>
      {/* Sección principal que contiene toda la interfaz de gestión de usuarios. */}
      <section className="container-user">
        {/* Sección del encabezado. */}
        <section className="head">
          {/* Título de la página. */}
          <h2 className="title">Gestion de Usuarios</h2>
          {/* Icono de usuarios que se muestra junto al título. */}
          <UsersI width="35" height="35" />
        </section>

        {/* Sección de búsqueda. */}
        <section className="research">
          {/* Componente de búsqueda, se le pasa el tipo "Usuario" como placeholder o etiqueta. */}
          <Search type="Usuario" />
        </section>

        {/* Sección de botones de acción. */}
        <section className="buttons">
          {/* Botón para añadir un nuevo usuario. */}
          <ButtonC variant="primary">
            Añadir <AddUserI width="20" height="20" />
          </ButtonC>
          {/* Botón para editar un usuario existente. */}
          <ButtonC variant="secondary">
            Editar <AddUserI width="20" height="20" />
          </ButtonC>
  

        </section>

        {/* Sección para el contenido principal. */}
        <section className="content">
          {/* Placeholder para el contenido que se mostrará aquí, como una tabla de usuarios. */}
          {users.map((user) => (
            <UserCard image={user.ImagePath} id={user.idUser} name={user.Name} type={user.Type} />
          ))}
        </section>
      </section>
    </>
  )
}

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación.
export default UsersManagement
