import { useState } from "react"
import './css/Login.css'

export default function Login() {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault();

        const response = await window.api.login({ username, password });

        console.log(response)
   
    }

  return (
    <>
    <form 
      onSubmit={handleSubmit}
      className="form glass-effect"
    >
      <h1 className="title">Login</h1>

        <input 
          className="inputuser"
          type="text" 
          id="user" 
          name="user" 
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      <label className="label" id="userlabel">Usuario</label>
      
      <input 
          className="inputpassword"
          type="password" 
          id="password" 
          name="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <label className="label" id="passwordlabel">Contraseña</label>
       
       <button 
        type="submit" 
        className="button"
      >
        Enviar
      </button>
    </form>
    </>
  )
}
