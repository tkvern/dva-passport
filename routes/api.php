<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware'=> ['auth:api']], function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, HEAD, POST, PUT, PATCH, DELETE");
    header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    require base_path('routes/common.php');
});
