import { useEffect, useState } from "react"
import type { Project } from "../types/Project";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProjectsPage = () =>{
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState("");
    const {logout} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        api.get("/projects").then((res:any)=>setProjects(res.data.data)).catch(() => setError("Erro ao carregar projetos."));
    },[]);    

    const handleDelete = async (id:number)=>{
        await api.delete(`/projects/${id}`);
        setProjects(projects.filter(p=>p.id !== id));
    }

    return(
        <div>
            <h1>Projetos</h1>
            {error && <p style={{color:"red"}}>{error}</p>}
            <ul>
                {projects.map((p)=>(
                    <li key={p.id}>{p.title} - {p.category}
                    <button onClick={()=> navigate(`/projects/${p.id}/edit`)}>Editar</button>
                    <button onClick={()=> handleDelete(p.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={()=> navigate("/projects/new")}>Novo Projeto</button>
                <button onClick={logout}>Sair</button>
            </div>
        </div>
    );
}