import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import { DataTable } from 'primereact/datatable'; 
import { Column } from 'primereact/column';

// Este arquivo é responsável por configurar a janela que exibe todos os usuários

const Users = () => {
  const navItems = [

    {
      name: "Logout",
      url: "/"
    },
  
  ]

  const [users, setUsers] = useState([])

  useEffect(()=>{
    const fetchAllUsers = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/users")
        setUsers(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchAllUsers()
  }, [])
  
  // users = todos os usuarios
  // user = usuario individual
  return (
    <Layout>
      <Header navItems={ navItems} />
      <div className="showUsers">
        <h1> Usuarios registrados </h1>
        <DataTable 
          value={users} 
          paginator rows={5}
          showGridlines tableStyle={{ minWidth: '50rem' }}>
          <Column field="id" header="ID" />
          <Column field="name" header="Nome" />
          <Column 
            header="Tipo" 
            body= {user => (user.type === 1 ? 'Vip' : 'Comum')}
          />
          <Column field="email" header="Email" />
        </DataTable>

      </div>
    </Layout>

  )
}

export default Users