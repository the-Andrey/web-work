import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../Components/Layout';
import Header from "../Components/Header";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const Login= () => {

  const navItems = [

  {
    name: "Home",
    url: "/"
  }

]

 const [user, setUser] = useState({
  id:"",
  password:""
 })

 const navigate = useNavigate()

  const handleLogin = async e =>{
    e.preventDefault()
    try{
      const res = await axios.post("http://localhost:8800/login",user )
      const {data} = res
      if(data.message === "Login bem-sucedido!"){
        const type = data.user.type
        if(type == 1){
          navigate("/vip", {state:{role:1}})
        }else{
          navigate("/common")
        }
      }
      else if(data === "Usuário não encontrado."){
        console.log("Usuário não encontrado.")
      }
      else{
        console.log(data)
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleChange = (e) => {
    console.log(e.target.name, ": ", e.target.value)
    setUser((prev) => ({...prev, [e.target.name] : e.target.value}))
  }
  
  return (
    <Layout>
      <Header navItems={ navItems} />
      <div className="login-conteiner">
        <form className="login-form" onSubmit={handleLogin} ></form>
        <h1>Login </h1>
        <div className="form-group">
          <label htmlFor="id">ID: </label><br />
          <InputText type="text"  onChange={handleChange} name="id" /><br />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha: </label><br />
          <InputText type="password" onChange={handleChange} name="password" /><br />
        </div>
        <Button label="Enviar" type="submit" onClick={handleLogin}/>
      </div>
    </Layout>
  )
}

export default Login