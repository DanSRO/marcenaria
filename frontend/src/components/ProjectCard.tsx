import { Link } from "react-router-dom";

interface ProjectCardProps{
    id:number;
    title:string;
    slug:string;
    description:string;
    category:string;
    materials:string | null;
    cover_image:string | null;
    gallery:string[];
    is_published:boolean;
    created_at:string;
    children?: React.ReactNode;
}
export const ProjectCard = ({id, title, slug, description, category, materials, cover_image, gallery, is_published, children}:ProjectCardProps) => {
    return(
        <section style={{
            width:'292px',
            border:'1px solid #e0e0e0',
            borderRadius:'8px',
            overflow:'hidden',
            backgroundColor:'#fff',
            textAlign:'center',
            paddingBottom:'10px'
        }}>
            <Link to={`/detalhes-do-projeto/${id}`}>
                <img src={gallery.length > 0 ? `/${gallery}` : "/projetados1.png" } alt={title} style={{display:'block', maxWidth:'80%', height:'321px', margin: '0 auto', objectFit:'contain'}} />
            </Link>
            <div style={{padding:"10px"}}>
                <h5 style={{margin:"5px 0"}}>{title}</h5>
                <div>
                    <span style={{textDecoration:"line-through", color:"darkgray", marginRight:"10px", fontSize:"1.5rem"}}>{category}</span>             
                </div>
            </div>
            <div>
                {children}
            </div>
        </section>
    );
}