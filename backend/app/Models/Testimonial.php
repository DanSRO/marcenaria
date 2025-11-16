<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'client_name',
        'localization',
        'text',
        'rating',
        'photo_url',
        'is_published'
    ];
}
