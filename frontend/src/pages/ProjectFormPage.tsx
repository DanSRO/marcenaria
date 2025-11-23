import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types/Project";

interface ProjectFormState{
    title:string;
    slug:string;
    description:string;
    category:string;
    materials:string;
    cover_image:string;
    galleryInput:string;
    is_published:boolean;
}

export const ProjectFormPage = () =>{
    const [project, setProject] = useState<ProjectFormState>({title:"", slug:"", category:"", description:"",materials:"",cover_image:"",galleryInput:"", is_published:true});
    const [error, setError] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(id){
            api.get(`/projects/${id}`)
            .then((res:any) => {
                 // Assumimos que 'res.data.data' é do tipo Project, que pode ter campos null e gallery: string[]
                 const projectData = res.data.data as Project; 
 
                 // Mapeia os dados do backend (Project) para o estado do formulário (ProjectFormState)
                 setProject({
                     // '?? ""' para garantir que null/undefined se tornem string vazia ("")
                     title: projectData.title ?? "",
                     slug: projectData.slug ?? "",
                     description: projectData.description ?? "",
                     category: projectData.category ?? "",
                     materials: projectData.materials ?? "",
                     cover_image: projectData.cover_image ?? "",
                     // Converte o array da resposta em string para o textarea (separando por vírgula)
                     galleryInput: Array.isArray(projectData.gallery) ? projectData.gallery.join(', ') : "",
                     is_published: projectData.is_published ?? true,
                 });
            })
            .catch(() => setError(`Erro ao carregar projeto com id ${id}.`));
        }
    },[id]);
    
    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        const galleryArray = project.galleryInput
            .split(',')
            .map((url: string) => url.trim())
            .filter((url: string) => url.length > 0);
        const payload = {
          ...project,
          slug: project.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ''),
          gallery: galleryArray,
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
            <textarea value={project.description} onChange={e => setProject({ ...project, description: e.target.value })} placeholder="Descrição" />
            <input value={project.category} onChange={e => setProject({ ...project, category: e.target.value })} placeholder="Categoria" />
            <input value={project.materials} onChange={e => setProject({ ...project, materials: e.target.value })} placeholder="Materiais" />
            <input value={project.cover_image} onChange={e => setProject({ ...project, cover_image: e.target.value })} placeholder="Imagem" />
            <textarea 
                value={project.galleryInput} onChange={e => setProject({ ...project, galleryInput: e.target.value })} 
                placeholder="Álbum de imagens (separar por vírgula)" 
            />
            <button type="submit">{id ? "Atualizar" : "Criar"}</button>
        </form>
    );
}