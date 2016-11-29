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
            'nickname' => 'bail|min:3',
            'mobile' => ['bail', 'regex:/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\\d{8}$/'],
            'avatar' => 'url',
            'tel' => 'max:10',
            'old_password' => 'bail|present',
            'new_password' => 'min:6',
            'email' => 'bail|email|unique:users',
            'remark' => 'max:256'
        ];
    }

    /**
     * @param Validator $validator
     */
    protected function withValidator($validator)
    {
        $validator->sometimes('mobile', 'unique:users', function() {
           return $this->user()->mobile != $this->input('mobile');
        });
        $validator->sometimes('nickname', 'unique:users', function() {
            return $this->user()->nickname != $this->input('nickname');
        });
//        $validator->sometimes('old_password', 'required', function() {
//           return !empty($this->user()->password);
//        });
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
