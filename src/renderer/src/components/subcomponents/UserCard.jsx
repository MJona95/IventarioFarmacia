import '../css/UserCard.css'

import { IdI } from '../icons/IdI'
import { CategoryI } from '../icons/CategoryI'
import { EditI } from '../icons/EditI'
import ButtonC from './ButtonC'

export default function UserCard({image, id, name, type, }) {
  return (
    <div className='Card'>
      <div className="section">
        <img src={image} className='Image' alt="Imagen del usuario" width="50" height="50" />
        <h3 className="Name">Nombre: {name}</h3>
      </div>
      <div className="section">
        <IdI />
        <h3 className="Id">Id de usuario: {id}</h3>
      </div>
      <div className="section">
        <CategoryI />
        <h3 className="Categori">Categoria: {type}</h3>
      </div>
      <section className="gesturebuttons">
        <ButtonC variant="mini" >
          <EditI width='15' height='15' />
          <h4 className='text-button'>editar</h4>
        </ButtonC>
      </section>
    </div>
  )
}
