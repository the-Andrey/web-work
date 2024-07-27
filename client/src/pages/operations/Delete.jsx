import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Header from "../Components/Header";


const Delete = () => {

  const navItems = [

    {
      name: "Logout",
      url: "/"
    },
  
  ]

  const navigate = useNavigate()

  const [user, setUser] = useState({
    id:"",
  })
  const handleChange = (e) => {
    console.log(e.target.name, ": ", e.target.value)
    setUser((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    try{
      // chama o método post "/user" la do server js que faz o insert no banco de dados
      await axios.post("http://localhost:8800/delete", user) 
      navigate("/vip")
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <Layout>
      <Header navItems={ navItems} />
      <div className="delete">
          <h2>Deletar Usuário</h2>
          <div>
            <InputText placeholder="ID do usuário" onChange={handleChange} name="id" /><br />
          </div>
          <div>
            <Button label="Deletar usuário" onClick={handleClick}/>
          </div>
      </div>
    </Layout>
  );
};

export default Delete;