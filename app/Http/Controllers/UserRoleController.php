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
            'grant_roles' => 'required_without:revoke_roles|array',
            'revoke_roles' => 'required_without:grant_roles|array'
        ], [], ['grant_roles' => '授予角色ID列表', 'revoke_roles' => '移除角色ID列表']);
        $grantRoles = $request->input('grant_roles');
        $revokeRoles = $request->input('revoke_roles');
        if(!empty($grantRoles)) {
            $user->roles()->syncWithoutDetaching($grantRoles);
        }
        if(!empty($revokeRoles)) {
            $user->roles()->detach($revokeRoles);
        }
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
