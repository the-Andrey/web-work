import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import axios from "axios";
import Header from "../Components/Header";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown'; // Importando o Dropdown

const UpdateProduct = () => {
    const navItems = [
        {
            name: "Logout",
            url: "/"
        },
    ];

    const [prod, setProd] = useState({
        cod:"",
        value:""
    });

    const [selectedAttribute, setSelectedAttribute] = useState(null); // Estado para o atributo selecionado

    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log(e.target.name, ": ", e.target.value);
        setProd((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            const dataToSend = {
                cod: prod.cod,
                attribute: selectedAttribute, // Atributo que será alterado
                value: prod.value
            };
            const res =await axios.post("http://localhost:8800/updateprod", dataToSend);            
            if (res.status === 200) {
              navigate("/vip");
            } else {
                console.error("Erro na atualização:", res.data);
            }
            
        } catch (err) {
            console.log(err);
        }
    };

    const attributes = [
        {label: 'Codigo' , value: 'cod'},
        {label: 'Quantidade' , value: 'qtd'},
        { label: 'Nome', value: 'name' },
        { label: 'Preço', value: 'price' },
        { label: 'Tipo', value: 'type' },
    ];

    return (
        <Layout>
            <Header navItems={navItems} />
            <div className="update">
                <h1>Modificar produto</h1>
                <p>Insira o código do produto e escolha o que será mudado.</p>
                <div>
                    <InputText placeholder="Código do produto" onChange={handleChange} name="cod" /><br />
                    <Dropdown 
                        value={selectedAttribute} 
                        options={attributes} 
                        onChange={(e) => setSelectedAttribute(e.value)} 
                        placeholder="Selecione o campo" 
                    /><br/>
                    <InputText placeholder="Novo valor" onChange={handleChange} name="value" /><br />
                </div>
                <Button label="Enviar" onClick={handleClick} />
            </div>
        </Layout>
    );
};

export default UpdateProduct;
