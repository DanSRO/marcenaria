<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SettingRequest extends FormRequest
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
            'key'=>'required|string|max:100',
            'value'=>'nullable|json',
        ];
        if($this->isMethod('put') || $this->isMethod('patch')){
            $rules['key'] = 'sometimes|string|max:100';
        }
        return $rules;
    }
}
