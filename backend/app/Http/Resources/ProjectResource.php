<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{

    public function toArray($request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'slug'        => $this->slug,
            'description' => $this->description,
            'category'    => $this->category,
            'materials'   => $this->materials,
            'gallery'     => $this->gallery,
            'is_published'=> $this->is_published,
            'created_at'  => $this->created_at->toDateString(),
        ];
    }
}
