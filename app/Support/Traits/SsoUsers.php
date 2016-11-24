<?php
/**
 * Created by PhpStorm.
 * User: liujun
 * Date: 2016/11/23
 * Time: 下午3:43
 */
namespace App\Support\Traits;

use Illuminate\Support\Facades\Cookie;
use Tymon\JWTAuth\Facades\JWTAuth;

trait SsoUsers
{
    /**
     * 生成用于sso登录的cookie
     */
    protected function generateSsoToken()
    {
        $user = $request->user();
        $token = JWTAuth::fromUser($user);
        setcookie(
            config('sso.cookie_name'), $token, time() + 60 * config('sso.cookie_expires'),
            '/',  config('sso.cookie_domain')
        );
    }

    /**
     * 清除sso的cookie
     */
    protected function clearSsoToken()
    {
        setcookie(config('sso.cookie_name'), null);
    }


    /**
     * @return \Tymon\JWTAuth\Payload
     */
    protected function getSSoClaims()
    {
        $sso_token = Cookie::get(config('sso.cookie_name'));
        $manager = app('tymon.jwt.manager');
        return $manager->decode(new Token($sso_token));
    }

    protected function checkSsoToken()
    {
        return $this->getSSoClaims();
    }
}