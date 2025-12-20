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
    cover_image:File | null;
    cover_image_url?:string;
    galleryInput: File[];
    galleryInput_url?:string[];
    is_published:boolean;
}

export const ProjectFormPage = () =>{
    const [project, setProject] = useState<ProjectFormState>({title:"", slug:"", category:"", description:"",materials:"",cover_image:null, cover_image_url:"",galleryInput:[], galleryInput_url:[], is_published:true});
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
                     cover_image: null,
                     cover_image_url: projectData.cover_image ?? "",
                     // Converte o array da resposta em string para o textarea (separando por vírgula)
                     galleryInput: [],
                     galleryInput_url: Array.isArray(projectData.gallery) ? projectData.gallery: [],
                     is_published: projectData.is_published ?? true,
                 });
            })
            .catch(() => setError(`Erro ao carregar projeto com id ${id}.`));
        }
    },[id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", project.title);
        formData.append("slug", project.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ''));
        formData.append("description", project.description);
        formData.append("category", project.category);
        formData.append("materials", project.materials);
        formData.append("is_published", String(project.is_published));
      
        if(project.cover_image instanceof File){
          formData.append("cover_image", project.cover_image);
        }
      
        if(Array.isArray(project.galleryInput)){
          project.galleryInput.forEach((file: File) => {
            formData.append("gallery", file);
          });
        }
      
        try {
          if(id){
            await api.put(`/projects/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
          } else {
            await api.post("/projects", formData, { headers: { "Content-Type": "multipart/form-data" } });
          }
          navigate("/projects");
        } catch (err) {
          setError("Erro ao salvar projeto.");
        }
      };
    return(
        <form onSubmit={handleSubmit}>
          <div style={{
            position:'relative',
            left:'400px',
            display:'flex',
            flexDirection:'column',
            alignItems:'flex-start',
            justifyContent:'center',
            gap:'1rem',
            margin:'10px',
            boxSizing:'border-box',
            paddingLeft:'20px'
          }}>            
            {error && <p style={{color:"red"}}>{error}</p>}
            <input value={project.title} onChange={e => setProject({ ...project, title: e.target.value })} placeholder="Titulo" />            
            <textarea value={project.description} onChange={e => setProject({ ...project, description: e.target.value })} placeholder="Descrição" />
            <input value={project.category} onChange={e => setProject({ ...project, category: e.target.value })} placeholder="Categoria" />
            <input value={project.materials} onChange={e => setProject({ ...project, materials: e.target.value })} placeholder="Materiais" />
            <input 
                type="file" onChange={(e) => { const file = e.target.files?.[0]; if(file){ setProject({ ...project, cover_image: file});}}} placeholder="Imagem" />
            <input 
                type="file" multiple onChange={(e) => { const files = e.target.files? Array.from(e.target.files) : []; setProject({ ...project, galleryInput: files });}} placeholder="Álbum de imagens (separar por vírgula)" />
            <button 
              style={{
                backgroundColor: '#2E8B57',
                color: '#fff',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                boxSizing: 'border-box',
                marginBottom:'20px'
            }} 
            type="submit">{id ? "Atualizar" : "Criar"}</button>
          </div>
        </form>
    );
}