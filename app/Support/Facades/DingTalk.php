<?php
namespace App\Support\Facades;

use Illuminate\Support\Facades\Facade;

class DingTalk extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'dingtalk';
    }
}
?>