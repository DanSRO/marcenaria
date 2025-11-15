<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
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
        $rules = [
            'name'=>'required|string|max:255',
            'slug'=>'required|string|max:255|unique:services',
            'description'=>'nullable|string',
            'icon'=>'nullable|string|max:100',
            'is_published'=>'boolean',
        ];
        if($this->isMethod('put') || $this->isMethod('patch')){
            $rules['name']='sometimes|string|max:255';
            $rules['slug']='sometimes|string|max:255|unique:services';
        }
        return $rules;
    }
}
