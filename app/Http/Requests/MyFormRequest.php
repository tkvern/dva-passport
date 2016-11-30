<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MyFormRequest extends FormRequest
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
     * 判读表单数据和模型中的数据是否改变
     * @param Illuminate\Database\Eloquent\Model $model
     * @param $field
     * @return bool
     */
    protected function noChange($model, $field)
    {
        $current =  $model[$field];
        $input = $this->input($field, null);
        return is_null($input) || $input === $current;
    }
}
