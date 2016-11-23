<?php
/**
 * Created by PhpStorm.
 * User: liujun
 * Date: 2016/11/23
 * Time: 下午3:43
 */
trait SsoUsers
{
    public function generateSsoToken()
    {
        $user = Auth::user();
    }
}