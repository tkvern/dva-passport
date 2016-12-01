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
    header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    Route::get('/user', 'UsersController@current');
    Route::put('/user', 'UsersController@updateProfile');
    Route::get('/users', 'UsersController@index');
    Route::put('/users/{user_id}', 'UsersController@update');
    Route::post('/users/{user}/action/deny', 'UsersController@deny');

    //user roles
    Route::get('/users/{user}/roles', 'UserRoleController@index');
    Route::post('/users/{user}/action/onroles', 'UserRoleController@onRoles');

    //roles
    Route::get('/roles', 'RolesController@index');
    Route::post('/roles', 'RolesController@create');
    Route::put('/roles/{role}', 'RolesController@update');
});
