<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $projectId = $this->route('project')?->id ?? null;
        $rules = [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'materials' => 'nullable|string|max:255',
            'cover_image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'gallery.*' => 'string|max:255',
            'is_published' => 'boolean',            
        ];
        
        if($this->isMethod('put') || $this->isMethod('patch')){
            $rules['title'] = 'sometimes|string|max:255';
            $rules['slug'] = ['sometimes','string','max:255',Rule::unique('projects', 'slug')->ignore($projectId),];            
        }
        return $rules;
    }
}
