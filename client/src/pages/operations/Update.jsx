import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import axios from "axios";
import Header from "../Components/Header";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Update = () => {

  const navItems = [

    {
      name: "Logout",
      url: "/"
    },
  
  ]

  const [user, setUser] = useState({
    id:"",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
  
    console.log(e.target.name, ": ", e.target.value)
    setUser((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    try{
      // chama o método post "/user" la do server js que faz o insert no banco de dados
      await axios.post("http://localhost:8800/update", user) 
      navigate("/vip")
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <Layout>
      <Header navItems={ navItems} />
      <div className="update">
        <h1>Modificar permissões</h1>
        <p> Insira o ID do usuário abaixo para modificar suas permissões.</p>
        <div>
          <InputText placeholder="ID do usuário" onChange={handleChange} name="id" /><br />
        </div>
        <Button label="Enviar" onClick={handleClick}/>
      </div>
    </Layout>
  )
}

export default Update