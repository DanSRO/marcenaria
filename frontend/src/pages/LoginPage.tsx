import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setError("");
        try{
            await login(email, password);
            navigate("/projects");            
        }catch (err: any) {
            setError("Credenciais inválidas.");
        }
    };
    return(
        <form onSubmit={onSubmit}>
            <h1>Entrar</h1>
            {error && <p style={{ color:"red"}}>{error}</p>}
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password" />
            <button type="submit">Login</button>            
        </form>
    )
}