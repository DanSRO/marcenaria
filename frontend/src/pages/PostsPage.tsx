import { useEffect, useState } from "react";
import type { Post } from "../types/Post";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export const PostsPage = () =>{
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState("");
    const {logout} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        api.get('/posts').then((res:any)=>setPosts(res.data.data)).catch(() => setError("Erro ao carregar postagens."));
    },[]); 
    const handleLogout = async() =>{
        await logout();
        navigate("/login");
    }
    const handleDelete = async (id:number)=>{
        try{
            await api.delete(`/posts/${id}`);
            setPosts(posts.filter(p=>p.id !== id));
        }catch(err){
            setError("Erro ao excluir postagem. ");
        }
    }
    return (
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
        <h1>Página de postagens</h1>
        {error && <p style={{color:"red"}}>{error}</p>}
        <ul style={{display:"flex", listStyle:"none", gap:"2rem"}}>
            {posts.map((p)=>(
                <li style={{boxShadow: "1px 1px 9px #F4AAB9"}} key={p.id}>{p.title} - {p.content}
                    <button onClick={()=> navigate(`/posts/${p.id}/edit`)}>Editar</button>
                    <button onClick={()=> handleDelete(p.id)}>Excluir</button>
                </li>

            ))}
        </ul>
        <div>
            <button onClick={()=> navigate('/posts/new')}>Nova Postagem</button>
            <button onClick={handleLogout}>Sair</button>
        </div>
        </main>
    );
}