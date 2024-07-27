import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import Header from '../Components/Header';
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';

const Common = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate()


  const navItems = [

    {
      name: "Logout",
      url: "/"
    },
  
  ]

  const handleNavigateUsers = () => {
    navigate('/showusers')
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
    navigate('/showforn')
  }

  const categories = [
    { label: 'Usuário', value: 'user' },
    { label: 'Produto', value: 'product' },
    { label: 'Fornecedor', value: 'forn' }
  ];

  // Terá um layout específico
  return (
    <Layout>
      <Header navItems={ navItems} />
      <div className="homecommon">
        <h1>Usuário Comum</h1>
        <p>Você é um usuário comum, escolha uma das operações, se desejar.</p>
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
                </div>
        )}
    </div>
    </Layout>
  )
}

export default Common