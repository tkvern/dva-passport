<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Http\Request;

//Auth::routes();
Route::get('/login', 'Auth\LoginController@showLoginForm')->name('sso_login');
Route::delete('/logout', 'Auth\LoginController@logout');
Route::get('/auth/callback/dingtalk', 'Auth\OmniController@dingtalk')->name('omni_dingtalk_cb');

Route::post('/login', 'Auth\LoginController@login');

Route::group(['middleware'=> 'sso', 'prefix'=> 'ajax'], function() {
    require base_path('routes/common.php');
});

Route::get('{any}', function () {
    return view('index');
})->where('any', '.*');
