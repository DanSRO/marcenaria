import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export const ProjectFormPage = () =>{
    const [project, setProject] = useState({title:"", category:"", description:"",});
    const [error, setError] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(id){
            api.get(`/projects/${id}`)
            .then((res:any)=>setProject(res.data.data))
            .catch(() => setError(`Erro ao carregar projeto com id ${id}.`));
        }
    },[id]);
    
    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        const payload = {
          ...project,
          slug: project.title.toLowerCase().replace(/\s+/g, "-"),
        };
        try {
            if(id){
                await api.put(`/projects/${id}`, payload);
            }else{
                await api.post('/projects', payload);
            }
            navigate('/projects');            
        } catch (err) {
            setError("Erro ao salvar projeto. ");            
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            {error && <p style={{color:"red"}}>{error}</p>}
            <input value={project.title} onChange={e => setProject({ ...project, title: e.target.value })} placeholder="Titulo" />
            <input value={project.category} onChange={e => setProject({ ...project, category: e.target.value })} placeholder="Categoria" />
            <textarea value={project.description} onChange={e => setProject({ ...project, description: e.target.value })} placeholder="Descrição" />
            <button type="submit">{id ? "Atualizar" : "Criar"}</button>
        </form>
    );
}