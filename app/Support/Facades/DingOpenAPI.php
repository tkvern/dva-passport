<?php
namespace App\Support\Facades;

use Illuminate\Support\Facades\Facade;

class DingOpenAPI extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'dingopenapi';
    }
}
?>