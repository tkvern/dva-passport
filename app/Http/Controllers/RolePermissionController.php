<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RolePermissionController extends Controller
{
    //
    public function index(Request $request, Role $role)
    {
        $permissions = $role->permissions()->get()->makeHidden('pivot');
        return $this->successJsonResponse($permissions);
    }

    public function onPermissions(Request $request, Role $role)
    {
        $this->validate($request, [
            'grant_permissions' => 'array',
            'revoke_permissions' => 'array'
        ], [], ['grant_permissions' => '授权权限ID列表', 'revoke_permissions' => '注销权限ID列表']);
        $grantPermissions = $request->input('grant_permissions');
        $revokePermissions = $request->input('revoke_permissions');
        if (!empty($grantPermissions)) {
            $role->permissions()->syncWithoutDetaching($grantPermissions);
        }
        if (!empty($revokePermissions)) {
            $role->permissions()->detach($revokePermissions);
        }
        return $this->successJsonResponse($role->permissions()->get()->makeHidden('pivot'));
    }
}
