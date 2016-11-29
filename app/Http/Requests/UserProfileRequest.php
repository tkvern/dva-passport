<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UserProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nickname' => 'unique:users',
            'mobile' => ['bail','regex:/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\\d{8}$/', 'unique:users'],
            'tel' => ['max:10'],
            'old_password' => 'required',
            'password' => 'min:6',
            'password_confirmation' => 'confirmed',
            'email' => 'bail|email|unique:users',
            'remark' => 'max:256'
        ];
    }

    /**
     * @param Validator $validator
     */
    protected function withValidator($validator)
    {
        $validator->after(function($validator) {
            $testPassword = $this->input('old_password');
            $user = $this->user();
            if (!password_verify($testPassword, $user->getAuthPassword())) {
                $validator->errors()->add('old_password', '原密码不正确');
            }
        });
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'old_password' => '原密码',
            'password' => '新密码'
        ];
    }
}
