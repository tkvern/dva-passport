<?php
namespace App\Support;

class ErrCode {
    const E_NOT_AUTHENTICATED = '100101';
    const E_NOT_AUTHORIZED = '100102';
    const E_BAD_INPUT = '100103';
    const E_HAS_ASSOCIATION = '100104';
    const E_NO_SUCH_API = '100105';
    const E_NOT_FOUND_MODEL = '100106';

    public static $err2msg = [
        self::E_NOT_AUTHENTICATED => '不合法的token',
        self::E_NOT_AUTHORIZED => '没有权限',
        self::E_BAD_INPUT => '参数不合法',
        self::E_HAS_ASSOCIATION => '关联关系不为空',
        self::E_NO_SUCH_API => 'API不存在',
        self::E_NOT_FOUND_MODEL => '资源不存在',
    ];

    public static function errorMessage($errorCode)
    {
        return isset(self::$err2msg[$errorCode]) ? self::$err2msg[$errorCode] : '未知错误' ;
    }
}
