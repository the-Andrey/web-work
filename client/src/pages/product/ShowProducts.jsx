import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import { DataTable } from 'primereact/datatable'; 
import { Column } from 'primereact/column';

// Este arquivo é responsável por configurar a janela que exibe todos os usuários

const ShowProducts = () => {
  const navItems = [

    {
      name: "Logout",
      url: "/"
    },
  
  ]

  const [products, setProduct] = useState([])

  const priceBodyTemplate = (product) => {
    return `R$ ${product.price.toFixed(2)}`; 
  };

  useEffect(()=>{
    const fetchAllProducts = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/products")
        console.log("Dados recebidos do servidor:", res.data);
        setProduct(res.data)
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
        <h1> Produtos registrados </h1>
        <DataTable 
          value={products} 
          paginator rows={5}
          showGridlines tableStyle={{ minWidth: '50rem' }}>
          <Column field="cod" header="Código" />
          <Column field="qtd" header="Quantidade" />
          <Column field="name" header="Nome" />
          <Column field="price" header="Preço" body={priceBodyTemplate}  />
          <Column field="type" header="Tipo" />
        </DataTable>

      </div>
    </Layout>

  )
}

export default ShowProducts