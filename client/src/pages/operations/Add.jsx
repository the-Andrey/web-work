import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import Header from "../Components/Header";
        

const Add = () => {
  const [user, setUser] = useState({
    id:"",
    name:"",
    type:"",
    email:"",
    password:"",
  })

  const navItems = [

    {
      name: "Logout",
      url: "/"
    },
  
  ]

  const navigate = useNavigate()

  const handleChange = (e) => {
    console.log(e.target.name, ": ", e.target.value)
    setUser((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    try{
      // chama o método post "/user" la do server js que faz o insert no banco de dados
      await axios.post("http://localhost:8800/register", user) 
      navigate("/vip")
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <Layout>
      <Header navItems={ navItems} />
      <div className="form">
      <h1> Insira os dados do usuário: </h1>
      <InputText placeholder="ID do usuário" onChange={handleChange} name="id" /><br />
      <InputText  placeholder="Nome do usuário" onChange={handleChange} name="name" /><br />
      <InputText  placeholder="Tipo de usuário" onChange={handleChange} name="type" /><br />
      <InputText  placeholder="E-mail do usuário" onChange={handleChange} name="email" /><br />
      <InputText placeholder="Senha" onChange={handleChange} name="password" /> <br />

      <Button label="Enviar" onClick={handleClick}/>
    </div>
    </Layout>
  )
}

export default Add