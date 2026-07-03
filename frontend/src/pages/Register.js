import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register(){

    const navigate = useNavigate();

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function cadastrar(e){

        e.preventDefault();

        try{

            await api.post("/register",{

                name,
                email,
                password

            });

            alert("Cadastro realizado!");

            navigate("/");

        }catch{

            alert("Erro ao cadastrar.");

        }

    }

    return(

        <div className="container">

            <h1>Cadastro</h1>

            <form onSubmit={cadastrar}>

                <input
                    placeholder="Nome"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button>Cadastrar</button>

            </form>

            <p>

                <Link to="/">
                    Voltar para Login
                </Link>

            </p>

        </div>

    );

}

export default Register;