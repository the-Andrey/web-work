import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import Header from "../Components/Header";
        

const RegisterProd = () => {
  const [product, setProduct] = useState({
    cod:"",
    qtd:"",
    name:"",
    price:"",
    type:"",
    cnpjFornecedor:"",
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
    setProduct((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    try{
      const res = await axios.post("http://localhost:8800/fornecedor", product) 
      const {data} = res
      console.log(data.message)

      if (data.message == "Fornecedor cadastrado!"){
        await axios.post("http://localhost:8800/registerprod",product) 
        navigate("/vip")
      }
      else{
        navigate("/registerforn")
      }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <Layout>
      <Header navItems={ navItems} />
      <div className="form">
      <h1> Insira os dados do produto: </h1>
      <InputText placeholder="Código do produto" onChange={handleChange} name="cod" /><br />
      <InputText  placeholder="Quantidade" onChange={handleChange} name="qtd" /><br />
      <InputText  placeholder="Nome do produto" onChange={handleChange} name="name" /><br />
      <InputText  placeholder="Preço do produto" onChange={handleChange} name="price" /><br />
      <InputText placeholder="Tipo de produto" onChange={handleChange} name="type" /> <br />
      <InputText placeholder="CNPJ do fornecedor" onChange={handleChange} name="cnpjFornecedor" /> <br />

      <Button label="Enviar" onClick={handleClick}/>
    </div>
    </Layout>
  )
}

export default RegisterProd