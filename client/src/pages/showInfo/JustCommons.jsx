import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import { DataTable } from 'primereact/datatable'; // Importe o DataTable do PrimeReact
import { Column } from 'primereact/column';

// Este arquivo é responsável por configurar a janela que exibe todos os usuários comuns

const JustCommons = () => {

  const navItems = [

    {
      name: "Logout",
      url: "/"
    },
  
  ]

  const [commons, setCommons] = useState([])

  useEffect(()=>{
    const fetchCommonUsers = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/commons")
        setCommons(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchCommonUsers()
  }, [])
  
  // users = todos os usuarios
  // user = usuario individual
  return (
    <Layout>
      <Header navItems={ navItems} />
      <div className="showUsers">
        <h1> Usuarios comuns registrados </h1>
        <DataTable 
          value={commons} 
          paginator rows={5}
          showGridlines tableStyle={{ minWidth: '50rem' }}>
          <Column field="id" header="ID" />
          <Column field="name" header="Nome" />
          <Column 
            header="Tipo" 
            body= {common => (common.type === 0 && (<span>Comum</span>))}
          />
          <Column field="email" header="Email" />
        </DataTable>
      </div>
    </Layout>
  )
}

export default JustCommons