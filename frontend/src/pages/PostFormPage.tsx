import { useEffect, useState } from "react";
import type { Post } from "../types/Post";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

interface PostFormState{
    title:string;
    slug:string;
    content:string;
    cover_image:string | null;
    tags:string | null;
    is_published:boolean;
}

export const PostFormPage = () =>{
    const [post, setPost] = useState<PostFormState>({title:"", slug:"", content:"", cover_image:"", tags:"",is_published:true});
    const [error, setError] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(id){
            api.get(`/posts/${id}`)
            .then((res:any) => {
                const postData = res.data.data as Post;

                setPost({
                    title:postData.title ?? "",
                    slug:postData.slug ?? "",
                    content:postData.content ?? "",
                    cover_image:postData.cover_image ?? "",
                    tags:postData.tags ?? "",
                    is_published: postData.is_published ?? true,
                });
            })
            .catch(()=> setError(`Erro ao carregar postagens com id ${id}.`));
        }
    }, [id]);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...post,
            slug: post.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ''),            
        };
        try{
            if(id){
                await api.put(`/posts/${id}`, payload);
            }else{
                await api.post('/posts', payload);
            }
            navigate('/posts');
        }catch(err){
            setError("Erro ao salvar postagem.");
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            {error && <p style={{color:"red"}}>{error}</p>}
            <input value={post.title} onChange={e => setPost({ ... post, title: e.target.value})} placeholder="Título" />
            <textarea value={post.content} onChange={e => setPost({ ...post, content: e.target.value })} placeholder="Conteúdo da postagem"/>
            <input value={post.cover_image ?? ""} onChange={e => setPost({ ... post, cover_image: e.target.value })} placeholder="Imagem" />
            <input value={post.tags ?? ""} onChange={e => setPost({ ... post, tags: e.target.value})}/>            
            <button type="submit">{id ? "Atualizar" : "Criar"}</button>
        </form>
    );
}