import React from 'react';
import Layout from '../Components/Layout';
import Header from '../Components/Header';
import { Button } from 'primereact/button';
import logo from "../../pages/logo512.png"

const Home = () => {

  const navItems = [

    {
      name: "Login",
      url: "/login"
    },
  
  ]

  return(
    <Layout>
      <div className='main'>
        <Header navItems={ navItems} />
        <img src={logo} alt="Logotipo" style={{ width: '20rem', height: '20rem' }} />
        <Button label="Github do projeto" onClick={() => window.open('https://github.com/the-Andrey', '_blank')}/>
      </div>
    </Layout>
  )
}

export default Home