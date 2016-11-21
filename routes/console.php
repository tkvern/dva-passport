<?php

use Illuminate\Foundation\Inspiring;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');

Artisan::command('dingtalk:departments', function() {
    $headers = ['id', 'name', 'parentid', 'createDeptGroup', 'autoAddUser'];
    $departments = array_map(function($department) use ($headers) {
        return array_map(function($name) use ($department) {
            return array_get($department, $name, null);
        }, $headers);
    }, App\Support\Facades\DingTalk::getAllDepartments());
    $this->table($headers, $departments);
})->describe('获取企业所有部门信息');

Artisan::command('dingtalk:users {--department_id=0}', function() {
    $department_id = $this->option('department_id');
    if (intval($department_id) === 0) {
        $_users = App\Support\Facades\DingTalk::getAllUsers();
    } else {
        $_users = App\Support\Facades\DingTalk::getUsersByDepartmentId($department_id);
    }
    $headers = [
        'userid', 'dingId', 'name', 'mobile', 'position', 
        'email', 'avatar'
    ];
    $users = [];
    foreach($_users as $user) {
        $users[] = array_map(function($name) use($user) {
            return array_get($user, $name, null);
        }, $headers);
    }
    $this->table($headers, $users);
});


