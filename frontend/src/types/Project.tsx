export interface Project{
    id:number;
    title:string;
    slug:string;
    description:string;
    category:string;
    materials:string;
    gallery:string[];
    is_published:boolean;
    created_at:string;
}