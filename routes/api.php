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
    Route::get('/user', 'UsersController@current');
    Route::patch('/user', 'UsersController@updateProfile');
    Route::get('/users', 'UsersController@index');
    Route::patch('/users/{user_id}', 'UsersController@update');
    Route::post('/users/{user}/action/deny', 'UsersController@deny');

    //user roles
    Route::get('/users/{user}/roles', 'UserRoleController@index');
    Route::post('/users/{user}/action/onroles', 'UserRoleController@onRoles');

    //roles
    Route::get('/roles', 'RolesController@index');
    Route::get('/roles/{role}', 'RolesController@show');
    Route::post('/roles', 'RolesController@create');
    Route::patch('/roles/{role}', 'RolesController@update');
    Route::delete('/roles/{role}', 'RolesController@delete');

    //permissions
    Route::get('/permissions', 'PermissionsController@index');
    Route::get('/permissions/{permission}', 'PermissionsController@show');
    Route::post('/permissions', 'PermissionsController@create');
    Route::patch('/permissions/{permission}', 'PermissionsController@update');
    Route::delete('/permissions/{permission}', 'PermissionsController@delete');

    //role permissions
    Route::get('/roles/{role}/permissions', 'RolePermissionController@index');
    Route::post('/roles/{role}/action/onpermissions', 'RolePermissionController@onPermissions');

    Route::any('{any}', function() {
       return response()->json([
           'err_code' => \App\Support\ErrCode::E_NO_SUCH_API,
           'err_msg' => \App\Support\ErrCode::errorMessage(\App\Support\ErrCode::E_NO_SUCH_API)
       ], 404);
    })->where('any', '.*');
});
