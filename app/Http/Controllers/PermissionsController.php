<?php

namespace App\Http\Controllers;

use App\Support\ErrCode;
use Illuminate\Http\Request;
use App\Http\Requests\CreatePermissionRequest;
use App\Models\Permission;

class PermissionsController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->input('page_size', 10);
        $permissions = Permission::query()->paginate($pageSize);
        return $this->paginateJsonResponse($permissions);
    }
    //
    public function create(CreatePermissionRequest $request)
    {
        $permission = Permission::create($request->only(array_keys($request->rules())));
        return $this->successJsonResponse($permission);
    }

    public function update(Request $request, Permission $permission)
    {
        $this->validate($request, [
           'name' => 'required|max:30'
        ]);
        $permission->name = $request->input('name');
        return $this->successJsonResponse($permission);
    }

    public function show(Permission $permission)
    {
        return $this->successJsonResponse($permission);
    }

    public function delete(Permission $permission)
    {
        if ($permission->roles()->count() > 0) {
            return $this->errorJsonResponse(ErrCode::E_HAS_ASSOCIATION, 422);
        }
        $permission->delete();
        return $this->successJsonResponse();
    }
}
