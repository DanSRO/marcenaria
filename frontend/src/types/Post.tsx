export interface Post{
    id:number;
    title:string;
    slug:string;
    content:string;
    cover_image:string | null;
    tags:string | null;
    is_published:boolean;
}