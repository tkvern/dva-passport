<?php

namespace App\Http\Controllers;

use App\Support\ErrCode;
use Illuminate\Http\Request;
use App\Models\Role;

class RolesController extends Controller
{
    public function index(Request $request)
    {
        $roles = Role::paginate($request->input('page_size', 10));
        return $this->paginateJsonResponse($roles);
    }

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

    public function show(Role $role)
    {
        return $this->successJsonResponse($role);
    }

    public function update(Request $request, Role $role)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);
        $role->name = $request->input('name');
        $role->save();
        return $this->successJsonResponse($role);
    }

    public function delete(Role $role)
    {
        if ($role->users()->count() > 0) {
            return $this->errorJsonResponse(ErrCode::E_HAS_ASSOCIATION, 422);
        }
        $role->delete();
        return $this->successJsonResponse();
    }
}
