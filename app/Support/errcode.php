<?php
namespace App\Support;

class ErrCode {
    const E_USER_INVALID = '100101';
    const E_NOT_AUTHORIZED = '100102';

    public static $err2msg = [
        self::E_USER_INVALID => '不合法的用户',
        self::E_NOT_AUTHORIZED => '用户未认证',
    ];

    public static function errorMessage($errorCode)
    {
        return isset(self::$err2msg[$errorCode]) ? self::$err2msg[$errorCode] : '未知错误' ;
    }
}


