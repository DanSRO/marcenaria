<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{

    public function toArray($request): array
    {
        return [
            'name'        => $this->name,
            'slug'        => $this->slug,
            'description' => $this->description,
            'icon'        => $this->icon,
            'is_published'=> $this->is_published,
            'created_at'  => $this->created_at->toDateString(),
        ];
    }
}
