<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'materials' => 'nullable|string|max:255',
            'cover_image' => 'nullable|string',
            'gallery' => 'nullable|json',
            'is_published' => 'boolean',            
        ];
        
        if($this->isMethod('put') || $this->isMethod('patch')){
            $rules['title'] = 'sometimes|string|max:255';
            $rules['slug'] = 'sometimes|string|max:255|unique:projects,slug,' . $this->route('project')->id;            
        }
        return $rules;
    }
}
