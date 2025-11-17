<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{

    public function toArray($request): array
    {
        return [
            'client_name' => $this->client_name,
            'localization'=> $this->localization,
            'text'        => $this->text,
            'rating'      => $this->rating,
            'photo_url'   => $this->photo_url,
            'is_published'=> $this->is_published,
            'created_at'  => $this->created_at->toDateString(),
        ];
    }
}
