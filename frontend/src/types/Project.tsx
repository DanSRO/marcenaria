export interface Project{
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
}