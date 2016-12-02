<?php

namespace App\Http\Requests;

use Illuminate\Validation\Validator;
use App\Models\Permission;

class CreatePermissionRequest extends MyFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'scope' => 'required|max:20',
            'key' => 'required|max:20',
            'name' => 'required:max:30',
        ];
    }

    /**
     * @param Validator $validator
     */
    protected function withValidator($validator)
    {
        $validator->after(function($validator) {
            $scope = $this->input('scope');
            $key = $this->input('key');
            if(Permission::where('scope', $scope)->where('key', $key)->count() > 0) {
                $validator->errors()->add('key', '范围与键不唯一');
            }
        });
    }
}
