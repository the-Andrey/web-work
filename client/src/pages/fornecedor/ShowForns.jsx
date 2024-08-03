import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import { DataTable } from 'primereact/datatable'; 
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Este arquivo é responsável por configurar a janela que exibe todos os usuários

const ShowForns = () => {

  const location = useLocation();
  const { role } = location.state || {};

  console.log('role show forn', role)

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
  
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Tabela de Fornecedores', 14, 16);
    doc.autoTable({
      startY: 25, 
      head: [['CNPJ', 'Nome', 'Número de telefone', 'Data de cadastro', 'Endereço']],
      body: forn.map(f => [f.cnpjFornecedor, f.name, f.number, f.registerDate, f.address])
    });
    doc.save('fornecedores.pdf');
  };
  
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
        { role == 1 && <Button label="Baixar PDF" icon="pi pi-print"  onClick={generatePDF}/>}
      </div>
    </Layout>

  )
}

export default ShowForns