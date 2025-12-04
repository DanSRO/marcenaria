import { BannerSlide } from "../components/BannerSlide";
import { CategoryIcons } from "../components/CategoryIcons";
import { Gallery } from "../components/Gallery";
import api from "../api/api";

import {
    ToiletIcon as Banheiro,
    SofaIcon as Sala,
    CookingPot as Cozinha,
} from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import type { Project } from "../types/Project";
import { useEffect, useState } from "react";

export const HomePage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState("");
    
    useEffect(()=>{
        api.get('/projects').then((res:any)=>setProjects(res.data.data)).catch(() => setError("Erro ao carregar projetos."));
    },[]); 
    const bannerSlides = [
        {
            src:"/projetados1.png",
            component:(
                <BannerSlide 
                    title="Móvel projetado"
                    subtitle="O estilo que você esperou de um móvel agora também é uma realização."
                    imageSrc="/projetados1.png"
                    buttonText="Ver ofertas"
                    buttonLink="/ofertas/sala"
                    backgroundColor="#f5f7fa"
                />
            ),
        },
        {
            src:"/projetados2.png",
            component:(
                <BannerSlide 
                    title="Coleção escritório"
                    subtitle="Descubra novos modelos exclusivos para você."
                    imageSrc="/projetados2.png"
                    buttonText="Explorar modelos"
                    buttonLink="/colecao/modelos"
                    backgroundColor="#f0f8ff"
                />
            ),
        },
        {
            src:"/projetados5.png",
            component:(
                <BannerSlide 
                    title="Novo estilo sóbrio"
                    subtitle="A melhor qualidade em design agora com preços imperdíveis. Confira a nossa coleção."
                    imageSrc="/projetados5.png"
                    buttonText="Ver modelos"
                    buttonLink="/produtos/sobrios"
                    backgroundColor="#fff5f5"
                />
            ),
        },
    ]
    const categories = [
        {
            name:"Salas",
            icon:<Sala size={32} color="#FF6B9D" />,
            link:"/categoria/salas"
        },
        {
            name:"Cozinhas",
            icon:<Cozinha size={32} color="#7C9C7C"/>,
            link:"/categoria/cozinhas"
        },
        {
            name:"Banheiros",
            icon:<Banheiro size={32} color="#666"/>,
            link:"/categoria/banheiros"
        }
    ]
    return(
        <div style={{maxWidth:'1280px', marginLeft:'auto', marginRight:'auto', paddingLeft:'1rem', paddingRight:'1rem' }}>
            {/* Banner principal com slides personalizados */}
            <div style={{ maxWidth: "100%", overflow: "hidden" }}>
            <Gallery
                width="100%"
                height="681px"
                radius="4px"
                showThumbs={true}
                images={bannerSlides}
                autoPlay={true}
                autoPlayInterval={6000}
            />
            </div>
            <div>
                <CategoryIcons categories={categories}/>
            </div>
            <div>                
                <div>
                    <h3>Projetos em destaque</h3>
                </div>
                <div
                    style={{
                        // width: "100%",
                        boxShadow: "1px 1px 9px #F4AAB9",
                        borderRadius: "10px",
                        color:"white",
                        
                        display: "grid",
                        // flexDirection: "column",
                        gridTemplateColumns:"repeat(3, 1fr)",
                        maxWidth: "1240px",
                        margin: "1rem",
                        padding: "20px",
    
                        // justifyContent: "space-between",
                        // alignItems: "stretch",
                        justifyItems:"center",
                        // flexWrap: "wrap",
                        gap: "0.5rem",
                    }}
                >
                    {error && <p style={{color:"red"}}>{error}</p>}
                {projects.map((p) => (
                        <ProjectCard
                        key={p.id}
                        {...p}
                        >
                        </ProjectCard>
                    ))}
                </div>
            </div>
        </div>
    );
};