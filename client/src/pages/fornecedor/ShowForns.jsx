import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import { DataTable } from 'primereact/datatable'; 
import { Column } from 'primereact/column';

// Este arquivo é responsável por configurar a janela que exibe todos os usuários

const ShowForns = () => {
  const navItems = [

    {
      name: "Logout",
      url: "/"
    },
  
  ]

  const [forn, setForn] = useState([])

  useEffect(()=>{
    const fetchAllProducts = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/showforn")
        console.log("Dados recebidos do servidor:", res.data);
        setForn(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchAllProducts()
  }, [])
  
  // users = todos os usuarios
  // user = usuario individual
  return (
    <Layout>
      <Header navItems={ navItems} />
      <div className="showUsers">
        <h1> Fornecedores registrados </h1>
        <DataTable 
          value={forn} 
          paginator rows={5}
          showGridlines tableStyle={{ minWidth: '50rem' }}>
          <Column field="cnpjFornecedor" header="CNPJ" />
          <Column field="name" header="Nome" />
          <Column field="number" header="Número de telefone" />
          <Column field="registerDate" header="Data de cadastro"  />
          <Column field="address" header="Endereço" />
        </DataTable>

      </div>
    </Layout>

  )
}

export default ShowForns