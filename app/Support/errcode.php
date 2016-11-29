<?php
namespace App\Support;

class ErrCode {
    const E_NOT_AUTHENTICATED = '100101';
    const E_NOT_AUTHORIZED = '100102';
    const E_BAD_INPUT = '100103';

    public static $err2msg = [
        self::E_NOT_AUTHENTICATED => '不合法的token',
        self::E_NOT_AUTHORIZED => '没有权限',
        self::E_BAD_INPUT => '不合法的输入参数',
    ];

    public static function errorMessage($errorCode)
    {
        return isset(self::$err2msg[$errorCode]) ? self::$err2msg[$errorCode] : '未知错误' ;
    }
}
