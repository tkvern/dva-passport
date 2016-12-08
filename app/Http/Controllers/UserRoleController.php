<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserRoleController extends Controller
{
    /*
     * 用户角色管理
     */
    public function onRoles(Request $request, User $user)
    {
        $this->validate($request, [
            'role_ids' => 'required|array',
        ]);
        $roleIds = $request->input('role_ids');
        $user->roles()->sync($roleIds);
        return $this->successJsonResponse($user->roles()->get()->makeHidden('pivot'));
    }

    /*
     * 用户角色列表
     */
    public function index(Request $request, User $user)
    {
        $roles = $user->roles()->get()->makeHidden('pivot');
        return $this->successJsonResponse($roles);
    }
}
