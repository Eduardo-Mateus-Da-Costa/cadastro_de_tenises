import React, { useState } from "react";
import Axios from "axios";

import "./SignUp.css";

export default function SignUp() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    function navigateToHome(id){
        window.location.href = '/home/' + Number.parseInt(id);
    }

    const doSignUp = () => {
        if (email == null || password == null || name == null) {
            alert("Preencha todos os campos");
        } else {
            Axios.post("http://localhost:3001/sign-up", {
                email: email,
                password: password,
                name: name,
            }).then((response) => {
                if(response.data.auth){
                    navigateToHome(response.data.id);
                }else{
                    alert("Falha no cadastro");
                }
            });
        }
    };

    return(
        <div className="geral">
            <div className="form">
                <h1 className="title">Cadastro</h1>
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
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="register-input"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    className="register-input"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <div className="buttons">
                    <button className="buttonLogin" onClick={doSignUp}>Cadastrar</button>
                    <button className="buttonRegister" onClick={() => window.location.href = '/'}>Voltar</button>
                </div>
            </div>
        </div>
    );
}
