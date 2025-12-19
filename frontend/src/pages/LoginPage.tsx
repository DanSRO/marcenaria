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
            navigate("/");            
        }catch (err: any) {
            setError("Credenciais inválidas.");
        }
    };
    return(
        <form 
            onSubmit={onSubmit} 
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                boxSizing: 'border-box', 
            }}>
            <h3>Entrar</h3>
            {error && <p style={{ color:"red"}}>{error}</p>}
            <div 
                style={{
                    marginTop: '0',
                    marginBottom: '20px',
                    color: '#fff',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}>                
                <label htmlFor="email"
                    style={{
                        display: 'block',
                        textAlign: 'left',
                        marginBottom: '5px',
                        color: '#fff',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                >Email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '5px',
                        boxSizing: 'border-box',
                        backgroundColor: 'rgba(220,220,220,0.7)',
                        color: '#333',
                    }}
                />
                <label htmlFor="password"
                    style={{
                        display: 'block',
                        textAlign: 'left',
                        marginBottom: '5px',
                        color: '#fff',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                >Senha</label>
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Senha" type="password"
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '5px',
                        boxSizing: 'border-box',
                        backgroundColor: 'rgba(220,220,220,0.7)',
                        color: '#333',
                        marginBottom:'20px'
                    }}
                />
                <button 
                    type="submit"
                    style={{
                        backgroundColor: '#2E8B57',
                        color: '#fff',
                        padding: '12px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '100%',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        boxSizing: 'border-box',
                        marginBottom:'20px'
                    }}   
                >Login</button>            
            </div>
        </form>
    )
}