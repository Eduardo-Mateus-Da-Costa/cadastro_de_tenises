import { useParams } from 'react-router';
import React, { useState, useEffect } from "react";
import Axios from "axios";

import Card from "./components/cards/cards";
import FormDialog from './components/dialog/dialogForm';	
import "./Home.css";

export default function Home() {
    const [name, setName] = useState("");
    const [tamanho, setTamanho] = useState(null);
    const [cor, setCor] = useState("");
    const [preco, setPreco] = useState(null);
    const { id } = useParams();
    const [tenis, setTenis] = useState([]);
    const [open, setOpen] = useState(false);

    function logout(){
        window.location.href = '/';
    }

    const search = () => {
        Axios.patch("http://localhost:3001/search", {
            id: id,
            name: name,
            tamanho: tamanho,
            cor: cor,
            preco: preco,
        }).then((response) => {
            if(response.data.auth){
                setTenis(
                    response.data.result.map((value) => {
                        return {
                            id: value.tenis_id,
                            name: value.name,
                            tamanho: parseFloat(value.size),
                            cor: value.color,
                            preco: value.price,
                        };
                    })
                );
            }else{
                alert("Falha na busca");
            }
        });
    };

    useEffect(() => {
        search();
    }, []);


    return(
        <>
            <FormDialog
                open={open}
                setOpen={setOpen}
                mode={0}
                listCard={tenis}
                setListCard={setTenis}
                user_id={id}
            />
             <div>
            <div className="header">
                <h1 className="title">Tenises, organize seus tênis</h1>
                <button onClick={logout}>Sair</button>
            </div>
            <div className="divider"></div>
            <section className='search'>
                <h1>Busca</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    className="register-input"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <input
                    type="number"
                    name="size"
                    placeholder="Tamanho"
                    className="register-input"
                    onChange={(e) => {
                        setTamanho(e.target.value);
                    }}
                />
                <input
                    type="text"
                    name="color"
                    placeholder="Cor"
                    className="register-input"
                    onChange={(e) => {
                        setCor(e.target.value);
                    }}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Preço máximo"
                    className="register-input"
                    onChange={(e) => {
                        setPreco(e.target.value);
                    }}
                />
                <button onClick={() => {search();}}>Buscar</button>
                <button onClick={() => {setOpen(true);}}>Adicionar</button>
            </section>
            <div className='divider'></div>
            <section>
                <h1>Seus Tênis</h1>
                <div className="tenisTable">
                    {tenis.map((val) => (
                        <Card
                            listCard={tenis}
                            setListCard={setTenis}
                            key={val.id}
                            id={val.id}
                            name={val.name}
                            cost={val.preco}
                            color={val.cor}
                            size={val.tamanho}
                            user_id={id}
                        />
                    ))} 
                </div>
            </section>
        </div>
        </>
    );
}