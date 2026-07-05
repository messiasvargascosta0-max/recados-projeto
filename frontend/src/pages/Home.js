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

                await api.put(`/recados/${editando}`,
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

                await api.post("/recados",
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

        const confirmar = window.confirm(
            "Deseja realmente excluir este recado?"
        );

        if (!confirmar) return;

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

            alert("Erro ao excluir.");

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
                onClick={logout}
                style={{
                    background: "#6c757d",
                    marginBottom: "20px"
                }}
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
                    style={{
                        width: "100%",
                        height: "90px",
                        marginTop: "15px",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        resize: "none",
                        fontSize: "16px"
                    }}
                />

                <button
                    type="submit"
                    disabled={!titulo.trim() || !texto.trim()}
                    style={{
                        marginTop: "20px",
                        width: "100%"
                    }}
                >
                    {editando ? "Atualizar Recado" : "Salvar Recado"}
                </button>

                {editando && (

                    <button
                        type="button"
                        onClick={limparFormulario}
                        style={{
                            width: "100%",
                            marginTop: "10px",
                            background: "#6c757d"
                        }}
                    >
                        Cancelar
                    </button>

                )}

            </form>

            <hr style={{ margin: "30px 0" }} />

            {recados.length === 0 ? (

                <p>Nenhum recado cadastrado.</p>

            ) : (

                recados.map((recado) => (

                    <div
                        key={recado.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "20px",
                            marginBottom: "20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                        }}
                    >

                        <h3>{recado.titulo}</h3>

                        <p>{recado.texto}</p>

                        <button
                            onClick={() => editarRecado(recado)}
                            style={{
                                background: "#ffc107",
                                color: "#000",
                                marginRight: "10px"
                            }}
                        >
                            Editar
                        </button>

                        <button
                            onClick={() => excluirRecado(recado.id)}
                            style={{
                                background: "#dc3545"
                            }}
                        >
                            Excluir
                        </button>

                    </div>

                ))

            )}

        </div>

    );

}

export default Home;