<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestimonialRequest extends FormRequest
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
            'client_name'=>'required|string|max:255',
            'localization'=>'nullable|string|max:255',
            'text'=>'nullable|string|max:255',
            'rating'=>'nullable|integer',
            'photo_url'=>'nullable|string',
            'is_published'=>'boolean', 
        ];
        if($this->isMethod('put') || $this->isMethod('patch')){
            $rules['client_name'] = 'sometimes|string|max:255';
        }
        return $rules;
    }
}
