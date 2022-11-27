import React, { useState } from "react";
import Axios from "axios";

import "./login.css";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    function navigateToHome(id){
        window.location.href = '/home/' + Number.parseInt(id);
    }

    const doLogin = () => {
        if (email == null || password == null) {
            alert("Preencha todos os campos");
        } else {
            Axios.patch("http://localhost:3001/login", {
                email: email,
                password: password,
            }).then((response) => {
                if(response.data.auth){
                    navigateToHome(response.data.id);
                }else{
                    alert("Senha ou email incorretos");
                }
            });
        }
    };

    
    return (
        <div className="geral">
            <div className="form">
                <h1 className="title">Login</h1>
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
                    <button className="buttonLogin" onClick={doLogin}>Entrar</button>
                    <button className="buttonRegister" onClick={() => window.location.href = '/register'}>Cadastrar</button>
                </div>
            </div>
        </div>
    );
}