<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{

    public function toArray($request): array
    {
        return [
            'id'          => $this->id,  
            'title'       => $this->title,
            'slug'        => $this->slug,
            'content'     => $this->content,
            'cover_image' => $this->cover_image,
            'tags'        => $this->tags,
            'is_published'=> $this->is_published,
            'created_at'  => $this->created_at->toDateString(),
        ];
    }
}
