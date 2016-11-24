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

Auth::routes();
Route::get('/login', 'Auth\LoginController@showLogin')->name('sso_login');
Route::get('/auth/callback/dingtalk', 'Auth\OmniController@dingtalk')->name('omni_dingtalk_cb');
Route::get('*', function () {
    return view('index');
});

Route::post('/login', 'Auth\LoginController@login');
