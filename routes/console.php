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

Artisan::command('dingcorp:departments', function() {
    $headers = ['id', 'name', 'parentid', 'createDeptGroup', 'autoAddUser'];
    $departments = array_map(function($department) use ($headers) {
        return array_map(function($name) use ($department) {
            return array_get($department, $name, null);
        }, $headers);
    }, App\Support\Facades\DingCorp::getAllDepartments());
    $this->table($headers, $departments);
})->describe('获取企业所有部门信息');

Artisan::command('dingcorp:users {--department_id=0 : 部门ID}', function() {
    $department_id = $this->option('department_id');
    if (intval($department_id) === 0) {
        $_users = App\Support\Facades\DingCorp::getAllUsers();
    } else {
        $_users = App\Support\Facades\DingCorp::getUsersByDepartmentId($department_id);
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
})->describe('获取部门员工信息或者公司所有员工信息');

Artisan::command('admin:grant {identity : 手机号或者邮箱}', function() {
    $identity = $this->argument('identity');
    $field = filter_var($identity, FILTER_VALIDATE_EMAIL) ? 'email' : 'mobile';
    $user = App\Models\User::where($field, $identity)->first();
    if (!$user) {
        $this->error('请确认你输入是正确的邮箱或者手机号');
        return;
    } 
    if (!$user->isadmin) {
        $user->isadmin = true;
        $user->save();
        $this->info("{$user->name}被提升为超级管理员");
    } else {
        $this->comment("用户{$user->name}已经是超级管理员");
    }
})->describe('提升用户为超级管理员');

Artisan::command('admin:revoke {identity : 手机号或者邮箱}', function() {
    $identity = $this->argument('identity');
    $field = filter_var($identity, FILTER_VALIDATE_EMAIL) ? 'email' : 'mobile';
    $user = App\Models\User::where($field, $identity)->first();
    if (!$user) {
        $this->error('请确认你输入是正确的邮箱或者手机号');
        return;
    } 
    if ($user->isadmin) {
        $user->isadmin = false;
        $user->save();
        $this->info("{$user->name}超级管理员权限被收回");
    } else {
        $this->comment("用户{$user->name}还不是超级管理员");
    }
})->describe('注销用户的超级管理员权限');

