<?php

namespace App\Http\Requests;

use App\Models\User;

class ChangeUserRequest extends MyFormRequest
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
            'password' => 'min:6',
            'email' => 'email',
            'remark' => 'max:256'
        ];
    }

    protected  function withValidator($validator)
    {
        $user = $this->user;
        $validator->sometimes('mobile', 'unique:users', function() use ($user){
           return !$this->noChange($user, 'mobile');
        });
        $validator->sometimes('email', 'unique:users', function() use ($user){
            return !$this->noChange($user, 'email');
        });
        $validator->sometimes('nickname', 'unique:users', function() use ($user){
            return !$this->noChange($user, 'nickname');
        });
    }
}
