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
      className="form"
    >
      <h1 className="title">Login</h1>

      <label className="label">
        <input 
          type="text" 
          id="email" 
          name="correo" 
          placeholder="Escriba su Correo"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </label>

      <label className="">
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Escriba su Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
       
       <button 
        type="submit" 
        className=""
      >
        Enviar
      </button>
    </form>
    </>
  )
}
