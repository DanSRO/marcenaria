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
    console.log(projects);
    
    return(
        <main>
            <h1>Projetos</h1>
            <div 
                style={{
                    boxShadow: "1px 1px 9px #F4AAB9",
                    borderRadius: "10px",
                    color:"white",                    
                    display: "grid",                    
                    gridTemplateColumns:"repeat(3, 1fr)",
                    maxWidth: "1240px",
                    margin: "1rem",
                    padding: "20px",
                    justifyItems:"center",
                    gap: "1rem",
                }}
            >
                {error && <p style={{color:"red"}}>{error}</p>}
                    {projects.map((p) => (
                        <ProjectCard
                        key={p.id}
                        {...p}
                        >
                            <div style={{ display: "flex", listStyle: "none",alignItems:'center', justifyContent:"space-evently",margin:'10px', gap: "0.5rem" }}>
                                <button
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
                                    onClick={() => navigate(`/projects/${p.id}/edit`)}>Editar</button>
                                <button 
                                    style={{
                                        backgroundColor: '#9c1341',
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
                                    onClick={() => handleDelete(p.id)}>Excluir</button>
                            </div>
                        </ProjectCard>
                    ))}
        
                <div style={{display:'flex', gridColumn:"span 4", textAlign:"center", gap:'10px'}}>
                    <button onClick={()=> navigate('/projects/new')}>Novo Projeto</button>
                    <button onClick={handleLogout}>Sair</button>
                </div>
            </div>
        </main>
    );
}