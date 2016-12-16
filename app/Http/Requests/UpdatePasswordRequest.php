<?php

namespace App\Http\Requests;

use Illuminate\Validation\Validator;

class UpdatePasswordRequest extends MyFormRequest
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
            'old_password' => 'present',
            'new_password' => 'required|min:6'
        ];
    }

    /**
     * @param Validator $validator
     */
    protected function withValidator($validator)
    {
        if (empty($this->input('old_password')) && empty($this->user()->password)) {
            return;
        }
        $validator->after(function($validator) {
            $testPassword = $this->input('old_password', '');
            $user = $this->user();
            if (!password_verify($testPassword, $user->getAuthPassword())) {
                $validator->errors()->add('old_password', '原密码不正确');
            }
        });
    }
}
