import { useParams } from 'react-router';
import React, { useState } from "react";
import Axios from "axios";

import Card from "./components/cards/cards";	

export default function Home() {
    const [values, setValues] = useState();
    const { id } = useParams();
    const [tenis, setTenis] = useState([]);

    function logout(){
        window.location.href = '/';
    }
    const search = () => {
        Axios.patch("http://localhost:3001/search", {
            id: id,
            name: values.name || '',
            tamanho: values.size || null,
            cor: values.color || '',
            preco: values.price || '',
        }).then((response) => {
            if(response.data.auth){
                console.log(response.data);
            }else{
                alert("Falha na busca");
            }
        });
    };


    const addTenis = () => {
        Axios.post("http://localhost:3001/addTenis", {
            id: id,
            name: values.name,
            tamanho: values.size,
            cor: values.color,
            preco: values.price,
        }).then((response) => {
            if(response.data.auth){
                console.log(response.data);
            }else{
                alert("Falha no cadastro");
            }
        });
    };
    

    return(
        <div>
            <section className='search'>
                <h1>Busca</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    className="register-input"
                    onChange={(value) => setValues((prevValues) => ({
                        ...prevValues,
                        [value.target.name]: value.target.value,
                    }))}
                />
                <input
                    type="number"
                    name="size"
                    placeholder="Tamanho"
                    className="register-input"
                    onChange={(value) => setValues((prevValues) => ({
                        ...prevValues,
                        [value.target.name]: value.target.value,
                    }))}
                />
                <input
                    type="text"
                    name="color"
                    placeholder="Cor"
                    className="register-input"
                    onChange={(value) => setValues((prevValues) => ({
                        ...prevValues,
                        [value.target.name]: value.target.value,
                    }))}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Preço"
                    className="register-input"
                    onChange={(value) => setValues((prevValues) => ({
                        ...prevValues,
                        [value.target.name]: value.target.value,
                    }))}
                />
                <button onClick={search}>Buscar</button>
                <button onClick={addTenis}>Adicionar</button>
                <button onClick={logout}>Sair</button>
            </section>
            <section>
                <h1>Produtos</h1>
                {tenis.map((val) => (
                    <Card
                        listCard={tenis}
                        setListCard={setTenis}
                        key={val.id}
                        id={val.id}
                        name={val.name}
                        cost={val.cost}
                        color={val.color}
                        size={val.size}
                    />
                ))}
            </section>
        </div>
    );
}