import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function entrar(e){

        e.preventDefault();

        try{

            const response = await api.post("/login",{
                email,
                password
            });

            localStorage.setItem("token",response.data.token);

            navigate("/home");

        }catch{

            alert("E-mail ou senha inválidos.");

        }

    }

    return(

        <div className="container">

            <h1>Login</h1>

            <form onSubmit={entrar}>

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

                <button>Entrar</button>

            </form>

            <p>

                Não possui conta?

                <Link to="/register">
                    Cadastre-se
                </Link>

            </p>

        </div>

    );

}

export default Login;