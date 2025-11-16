<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $postId = $this->route('post')?->id ?? null;
        $rules = [
            'title'=>'required|string|max:255',
            'slug'=>'required|string|max:255|unique:posts',
            'content'=>'nullable|string|max:100',
            'cover_image'=>'nullable|string',
            'tags'=>'required|string|max:255',
            'is_published'=>'boolean',
        ];
        if($this->isMethod('put') || $this->isMethod('patch')){
            $rules['title']='sometimes|string|max:255';
            $rules['slug']=['sometimes','string','max:255', Rule::unique('posts', 'slug')->ignore($postId),];
            $rules['tags']='sometimes|string|max:255';
        }
        return $rules;
    }
}
