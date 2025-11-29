import { useEffect, useState } from "react"
import type { Project } from "../types/Project";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";

export const ProjectsPage = () =>{
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState("");
    const {logout} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        api.get('/projects').then((res:any)=>setProjects(res.data.data)).catch(() => setError("Erro ao carregar projetos."));
    },[]);    

    const handleLogout = async() =>{
        await logout();
        navigate("/login");
    }
    const handleDelete = async (id:number)=>{
        try{
            await api.delete(`/projects/${id}`);
            setProjects(projects.filter(p=>p.id !== id));
        }catch(err){
            setError("Erro ao excluir projeto. ");
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
            <h1>Projetos</h1>
            {error && <p style={{color:"red"}}>{error}</p>}
            <ul style={{ display: "flex", listStyle: "none", gap: "1rem" }}>
                {projects.map((p) => (
                    <ProjectCard
                    key={p.id}
                    {...p}
                    >
                    <button onClick={() => navigate(`/projects/${p.id}/edit`)}>Editar</button>
                    <button onClick={() => handleDelete(p.id)}>Excluir</button>
                    </ProjectCard>
                ))}
                </ul>
            <div>
                <button onClick={()=> navigate('/projects/new')}>Novo Projeto</button>
                <button onClick={handleLogout}>Sair</button>
            </div>
        </main>
    );
}