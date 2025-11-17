<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
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
    protected $casts = [
        'gallery' => 'array',
    ];
}