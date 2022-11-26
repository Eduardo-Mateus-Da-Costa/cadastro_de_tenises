import React, { useState } from "react";
import Axios from "axios";

export default function SignUp() {
    const [values, setValues] = useState();

    function navigateToHome(id){
        window.location.href = '/home/' + Number.parseInt(id);
    }

    const doSignUp = () => {
        Axios.post("http://localhost:3001/sign-up", {
            email: values.email,
            password: values.password,
            name: values.name,
        }).then((response) => {
            if(response.data.auth){
                navigateToHome(response.data.id);
            }else{
                alert("Falha no cadastro");
            }
        });
    };

    return(
        <div>
            <h1>Cadastro</h1>
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
            <button onClick={doSignUp}>Cadastrar</button>
            <button onClick={() => window.location.href = '/'}>Voltar</button>
        </div>
    );
}
