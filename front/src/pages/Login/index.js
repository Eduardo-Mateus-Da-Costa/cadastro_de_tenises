import React, { useState } from "react";
import Axios from "axios";

export default function Login() {
    const [values, setValues] = useState();
    
    function navigateToHome(id){
        window.location.href = '/home/' + Number.parseInt(id);
    }

    const doLogin = () => {
        Axios.patch("http://localhost:3001/login", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            if(response.data.auth){
                navigateToHome(response.data.id);
            }else{
                alert("Senha ou email incorretos");
            }
        });
    };

    
    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                name="email"
                placeholder="Email"
                className="register-input"
                onChange={(value) => setValues((prevValues) => ({
                    ...prevValues,
                    [value.target.name]: value.target.value,
                }))}
            />
            <input
                type="password"
                name="password"
                placeholder="Senha"
                className="register-input"
                onChange={(value) => setValues((prevValues) => ({
                    ...prevValues,
                    [value.target.name]: value.target.value,
                }))}
            />
            <button onClick={doLogin}>Entrar</button>
            <button onClick={() => window.location.href = '/register'}>Cadastrar</button>
        </div>
    );
}