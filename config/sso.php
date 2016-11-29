<?php
/**
 * Created by PhpStorm.
 * User: liujun
 * Date: 2016/11/24
 * Time: 下午5:36
 */
return [
   /*
     * sss cookie name
     */
    'cookie_name' => env('SSO_COOKIE_NAME', 'sso_token'),
    'cookie_domain' => env('SSO_COOKIE_DOMAIN', 'corp.visiondk.com'),
    'cookie_expires' => env('SSO_COOKIE_EXPIRES', 60 * 12),
];