<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'category',
        'materials',
        'cover_image',
        'gallery',
        'is_published',
    ];
}