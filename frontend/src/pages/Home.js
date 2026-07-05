import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {

    const navigate = useNavigate();

    const [recados, setRecados] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [editando, setEditando] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        carregarRecados();

    }, []);

    async function carregarRecados() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/recados", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setRecados(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    async function salvarRecado(e) {

        e.preventDefault();

        if (!titulo.trim() || !texto.trim()) {

            alert("Preencha todos os campos.");

            return;

        }

        try {

            const token = localStorage.getItem("token");

            if (editando) {

                await api.put(

                    `/recados/${editando}`,

                    {
                        titulo,
                        texto
                    },

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                );

                alert("Recado atualizado com sucesso!");

            } else {

                await api.post(

                    "/recados",

                    {
                        titulo,
                        texto
                    },

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                );

                alert("Recado criado com sucesso!");

            }

            limparFormulario();

            carregarRecados();

        } catch (error) {

            console.log(error);

            alert("Erro ao salvar o recado.");

        }

    }

    function editarRecado(recado) {

        setTitulo(recado.titulo);
        setTexto(recado.texto);
        setEditando(recado.id);

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    function limparFormulario() {

        setTitulo("");
        setTexto("");
        setEditando(null);

    }

    async function excluirRecado(id) {

        if (!window.confirm("Deseja realmente excluir este recado?")) {

            return;

        }

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/recados/${id}`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            alert("Recado excluído com sucesso!");

            carregarRecados();

        } catch (error) {

            console.log(error);

            alert("Erro ao excluir o recado.");

        }

    }

    function logout() {

        localStorage.removeItem("token");

        navigate("/");

    }

    return (

        <div className="container">

            <h1>Meus Recados</h1>

            <button
                className="logout"
                onClick={logout}
            >
                Logout
            </button>

            <form onSubmit={salvarRecado}>

                <input

                    type="text"

                    placeholder="Título"

                    value={titulo}

                    onChange={(e) => setTitulo(e.target.value)}

                />

                <textarea

                    placeholder="Texto do recado"

                    value={texto}

                    onChange={(e) => setTexto(e.target.value)}

                />

                <button

                    type="submit"

                    disabled={!titulo.trim() || !texto.trim()}

                >

                    {editando ? "Atualizar Recado" : "Salvar Recado"}

                </button>

                {editando && (

                    <button

                        type="button"

                        className="cancelar"

                        onClick={limparFormulario}

                    >

                        Cancelar

                    </button>

                )}

            </form>

            <hr />

            {recados.length === 0 ? (

                <p style={{ textAlign: "center" }}>

                    Nenhum recado cadastrado.

                </p>

            ) : (

                recados.map((recado) => (

                    <div
                        className="card"
                        key={recado.id}
                    >

                        <h3>{recado.titulo}</h3>

                        <p>{recado.texto}</p>

                        <div className="acoes">

                            <button

                                className="editar"

                                onClick={() => editarRecado(recado)}

                            >

                                Editar

                            </button>

                            <button

                                className="excluir"

                                onClick={() => excluirRecado(recado.id)}

                            >

                                Excluir

                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}

export default Home;