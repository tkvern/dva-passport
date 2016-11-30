<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RolesController extends Controller
{
    //
    public function create(Request $request)
    {
        $this->validate($request, [
            'key' => ['bail', 'required', 'regex:/[\w.]+/', 'unique:roles'],
            'name' => 'required'
        ], [], ['key' => '角色标识', 'name' => '显示名称']);
        $role = Role::create($request->only(['key', 'name']));
        return $this->successJsonResponse($role);
    }

    public function update(Request $request, Role $role)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);
        $role->name = $request->input('name');
        $role->save();
        $this->successJsonResponse($role);
    }
}
