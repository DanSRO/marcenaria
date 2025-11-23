<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
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
    public function user() : BelongsTo{
        return $this->belongsTo(User::class);
    }
}