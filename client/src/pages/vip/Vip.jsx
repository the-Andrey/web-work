import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Layout from '../Components/Layout';
import Header from '../Components/Header';
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';

const Vip = () => {

  const location = useLocation();
  const { role } = location.state || {};

  console.log("Role:", role)

  const [selectedCategory, setSelectedCategory] = useState(null);

  const navItems = [

    {
      name: "Logout",
      url: "/"
    },
  
  ]
  const navigate = useNavigate()

  const handleNavigatetoAdd = () => {
    navigate('/adduser')
  }

  const handleNavigateCommons = () =>{
    navigate('/showcommons')
  }

  const handleNavigateUsers = () => {
    navigate('/showusers')
  }

  const handleNavigatetoUpdate= () => {
    navigate('/updateuser')
  }

  const handleNavigatetoDelete= () => {
    navigate('/deleteuser')
  }

  const handleNavigatetoProduct = () => {
    navigate('/registerproduct')
  }

  const handleNavigatetoShowProducts = () => {
    navigate('/showproducts')
  }

  const   handleNavigatetoForn = () => {
    navigate('/registerforn')
  }

  const   handleNavigatetoShowForns = () => {
    navigate('/showforn', {state:{role:role}})
  }

  const handleNavigatetoDeleteProd = () => {
    navigate('/deleteprod')
  }

  const handleNavigatetoUpdateProd = () => {
    navigate('/updateprod')
  }

  const handleNavigatetoDeleteForn = () => {
    navigate('/deleteforn')
  }

  const categories = [
    { label: 'Usuário', value: 'user' },
    { label: 'Produto', value: 'product' },
    { label: 'Fornecedor', value: 'forn' }
  ];

  const handleNavigatetoUpdateForn = () => {
    navigate('/updateforn')
  }


  // Terá um layout específico
  return (
    <Layout>
      <Header navItems={ navItems} />
      <div className="homevip">
        <h1>Usuário vip</h1>
        <p>Você é um usuário vip, escolha uma das operações, se desejar.</p>
        <Dropdown
          value={selectedCategory}
          options={categories}
          onChange={(e) => setSelectedCategory(e.value)}
          placeholder="Selecione uma categoria"
        />
        {selectedCategory === 'user' && (
                <div className="user-conteiner">
                  <div>
                    <Button label="Visualizar todos os usuários " onClick={handleNavigateUsers} />
                  </div>
                  <div>
                    <Button label="Visualizar usuários comuns" onClick={handleNavigateCommons}/>
                  </div>
                  <div>
                    <Button label="Adicionar usuário" onClick={handleNavigatetoAdd}/>
                  </div>
                  <div>
                    <Button label="Alterar permissões" onClick={ handleNavigatetoUpdate}/>
                  </div>
                  <div>
                    <Button label="Deletar usuários" onClick={ handleNavigatetoDelete}/>
                  </div>
                </div>
        )}
        {selectedCategory === 'product' && (
                <div className="product-conteiner">
                  <div>
                    <Button label="Cadastrar produto" onClick={ handleNavigatetoProduct}/>
                  </div>
                  <div>
                    <Button label="Ver todos os produtos" onClick={ handleNavigatetoShowProducts}/>
                  </div>
                  <div>
                    <Button label="Deletar produto" onClick={ handleNavigatetoDeleteProd}/>
                  </div>
                  <div>
                    <Button label="Editar produto" onClick={ handleNavigatetoUpdateProd}/>
                  </div>
                </div>
        )}
        {selectedCategory === 'forn' && (
                <div className="forn-conteiner">
                  <div>
                    <Button label="Cadastrar fornecedor" onClick={ handleNavigatetoForn}/>
                  </div>
                  <div>
                    <Button label="Ver todos os fornecedores" onClick={ handleNavigatetoShowForns}/>
                  </div>
                  <div>
                    <Button label="Deletar fornecedor" onClick={ handleNavigatetoDeleteForn}/>
                  </div>
                  <div>
                    <Button label="Editar fornecedor" onClick={ handleNavigatetoUpdateForn}/>
                  </div>
                  <div>
                    <Button label="Relatório de fornecedores" onClick={ handleNavigatetoUpdateForn}/>
                  </div>
                </div>
        )}
      </div>
    </Layout>
  )
}

export default Vip