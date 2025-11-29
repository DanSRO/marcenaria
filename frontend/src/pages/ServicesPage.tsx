import { useEffect, useState } from "react";
import type { Service } from "../types/Service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export const ServicesPage = () => {
    const [services, setServices ] = useState<Service[]>([]);
    const [error, setError] = useState("");
    const {logout} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        api.get('/services').then((res:any)=>setServices(res.data.data)).catch(()=>setError("Erro ao carregar serviços."));
    }, []);
    const handleLogout = async() =>{
        await logout();
        navigate("/login");
    }
    const handleDelete = async(id:number)=>{
        try{
            await api.delete(`/services/${id}`);
            setServices(services.filter(s=>s.id !== id));
        }catch(err){
            setError("Erro ao excluir serviço.");
        }
    }
    
    return(
        <main style={{
            // backgroundColor: "white",
            width: "100%",
            // padding: "2rem",
            // margin: "0 auto",
            // boxShadow: "0 0 5px rgba(0, 0, 0, 0.15 )",
            boxShadow: "1px 1px 9px #F4AAB9",
            borderRadius: "10px",
            // color:"black",
            color:"white",
            
            display: "flex",
            flexDirection: "column",
            maxWidth: "1240px",
            margin: "4rem auto",
            padding: "0 2rem",

            justifyContent: "space-between",
            alignItems: "stretch",
            flexWrap: "wrap",
            gap: "2rem",
        }}>
        <h1>Página de serviços.</h1>
        {error && <p style={{color:"red"}}>{error}</p>}        
        <ul style={{display:"flex", listStyle:"none", gap:"2rem"}}>
            {services.map((s)=>(
                <li style={{boxShadow: "1px 1px 9px #F4AAB9"}} key={s.id}>{s.icon} - {s.name} - {s.description}
                    <button onClick={()=> navigate(`/services/${s.id}/edit`)}>Editar</button>
                    <button onClick={()=> handleDelete(s.id)}>Excluir</button>
                </li>
            ))}
        </ul>
        <div>
            <button onClick={()=>navigate('/services/new')}>Novo serviço</button>
            <button onClick={handleLogout}>Sair</button>
        </div>
        </main>
    );
}