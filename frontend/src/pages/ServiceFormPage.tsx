import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import type { Service } from "../types/Service";

interface ServiceFormState{
    name:string;
    slug:string;
    description:string;
    icon:string;
    is_published:boolean;
}
export const ServiceFormPage = () =>{
    const [service, setService] = useState<ServiceFormState>({name:"", slug:"", description:"", icon:"", is_published:true});
    const [error, setError] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(id){
            api.get(`/services/${id}`)
            .then((res:any)=>{
                const servData = res.data.data as Service;
                setService({
                    name:servData.name ?? "",
                    slug:servData.slug ?? "",
                    description:servData.description ?? "",
                    icon:servData.icon ?? "",
                    is_published:servData.is_published ?? true,
                });
            })
            .catch(()=> setError(`Erro ao carregar serviço com id ${id}.`));
        }
    }, [id]);

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ... service,
            slug: service.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ''),
        };
        try{
            if(id){
                await api.put(`/services/${id}`, payload);
            }else{
                await api.post('/services', payload)
            }
            navigate('/services');
        }catch(err){
            setError(`Erro ao salvar serviço.`);
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            {error && <p style={{color:"red"}}>{error}</p>}
            <input value={service.name} onChange={e=> setService({... service, name:e.target.value})} placeholder="Nome do serviço" />
            <textarea value={service.description} onChange={e=> setService({... service, description:e.target.value})} placeholder="Descrição do serviço" />
            <input value={service.icon} onChange={e=> setService({... service, icon:e.target.value})} placeholder="Ícone" />
            <button type="submit">{id ? "Atualizar" : "Criar"}</button>            
        </form>
    );
}