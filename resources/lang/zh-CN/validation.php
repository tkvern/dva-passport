<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | such as the size rules. Feel free to tweak each of these messages.
    |
    */

    'accepted'             => ':attribute必须接受。',
    'active_url'           => ':attribute不是一个有效的网址。',
    'after'                => ':attribute必须是一个在:date之后的日期。',
    'alpha'                => ':attribute只能由字母组成。',
    'alpha_dash'           => ':attribute只能由字母、数字和斜杠组成。',
    'alpha_num'            => ':attribute只能由字母和数字组成。',
    'array'                => ':attribute必须是一个数组。',
    'before'               => ':attribute必须是一个在:date之前的日期。',
    'between'              => [
        'numeric' => ':attribute必须介于:min - :max之间。',
        'file'    => ':attribute必须介于:min - :max kb 之间。',
        'string'  => ':attribute必须介于:min - :max个字符之间。',
        'array'   => ':attribute必须只有:min - :max个单元。',
    ],
    'boolean'              => ':attribute必须为布尔值。',
    'confirmed'            => ':attribute两次输入不一致。',
    'date'                 => ':attribute不是一个有效的日期。',
    'date_format'          => ':attribute的格式必须为:format。',
    'different'            => ':attribute和:other必须不同。',
    'digits'               => ':attribute必须是:digits位的数字。',
    'digits_between'       => ':attribute必须是介于:min和:max位的数字。',
    'dimensions'           => ':attribute图片尺寸不正确。',
    'distinct'             => ':attribute已经存在。',
    'email'                => ':attribute不是一个合法的邮箱。',
    'exists'               => ':attribute不存在。',
    'file'                 => ':attribute必须是文件。',
    'filled'               => ':attribute不能为空。',
    'image'                => ':attribute必须是图片。',
    'in'                   => '已选的属性:attribute 非法。',
    'in_array'             => ':attribute没有在:other中。',
    'integer'              => ':attribute必须是整数。',
    'ip'                   => ':attribute必须是有效的IP地址。',
    'json'                 => ':attribute必须是正确的JSON格式。',
    'max'                  => [
        'numeric' => ':attribute不能大于:max。',
        'file'    => ':attribute不能大于:max kb。',
        'string'  => ':attribute不能大于:max个字符。',
        'array'   => ':attribute最多只有:max个单元。',
    ],
    'mimes'                => ':attribute必须是一个:values类型的文件。',
    'min'                  => [
        'numeric' => ':attribute必须大于等于:min。',
        'file'    => ':attribute大小不能小于:min kb。',
        'string'  => ':attribute至少为:min个字符。',
        'array'   => ':attribute至少有:min个单元。',
    ],
    'not_in'               => '已选的属性:attribute非法。',
    'numeric'              => ':attribute必须是一个数字。',
    'present'              => ':attribute必须存在。',
    'regex'                => ':attribute格式不正确。',
    'required'             => ':attribute不能为空。',
    'required_if'          => '当:other为:value时:attribute不能为空。',
    'required_unless'      => '当:other不为:value时:attribute不能为空。',
    'required_with'        => '当 :values存在时 :attribute不能为空。',
    'required_with_all'    => '当 :values存在时 :attribute不能为空。',
    'required_without'     => '当 :values不存在时 :attribute不能为空。',
    'required_without_all' => '当 :values都不存在时 :attribute不能为空。',
    'same'                 => ':attribute和:other必须相同。',
    'size'                 => [
        'numeric' => ':attribute大小必须为:size。',
        'file'    => ':attribute大小必须为:size kb。',
        'string'  => ':attribute必须是:size个字符。',
        'array'   => ':attribute必须为:size个单元。',
    ],
    'string'               => ':attribute必须是一个字符串。',
    'timezone'             => ':attribute必须是一个合法的时区值。',
    'unique'               => ':attribute已经存在。',
    'url'                  => ':attribute格式不正确。',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention 'attribute.rule' to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom'               => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of 'email'. This simply helps us make messages a little cleaner.
    |
    */

    'attributes'           => [
        'name'                  => '名称',
        'username'              => '用户名',
        'email'                 => '邮箱',
        'first_name'            => '名',
        'last_name'             => '姓',
        'password'              => '密码',
        'password_confirmation' => '确认密码',
        'city'                  => '城市',
        'country'               => '国家',
        'address'               => '地址',
        'phone'                 => '电话',
        'mobile'                => '手机',
        'age'                   => '年龄',
        'sex'                   => '性别',
        'gender'                => '性别',
        'day'                   => '天',
        'month'                 => '月',
        'year'                  => '年',
        'hour'                  => '时',
        'minute'                => '分',
        'second'                => '秒',
        'title'                 => '标题',
        'content'               => '内容',
        'description'           => '内容',
        'excerpt'               => '摘要',
        'date'                  => '日期',
        'time'                  => '时间',
        'available'             => '可用的',
        'size'                  => '大小',
        'department'            => '部门',
        'location'              => '地点',
        'cover_image'           => '图片'
    ],

];
