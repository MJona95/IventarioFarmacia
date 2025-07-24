import '../components/css/UsersManagement.css'
import { ProvidersI } from './icons/ProvidersI'

function ProvidersManagement() {
  return (
    <>
      <section className='section-user'>
        <div className="head">
          <h2>Gestion de Usuarios</h2>
          <ProvidersI />
        </div>
      </section>
    </>
  );
}

export default ProvidersManagement;