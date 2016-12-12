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
            'permission_ids' => 'present|array',
        ]);
        $permissionIds = $request->input('permission_ids');
        $role->permissions()->sync($permissionIds);
        return $this->successJsonResponse($role->permissions()->get()->makeHidden('pivot'));
    }
}
