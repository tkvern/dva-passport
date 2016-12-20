<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserProfileRequest;
use App\Http\Requests\ChangeUserRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Models\User;

class UsersController extends Controller
{
    /*
     * 当前用户
     */
    public function current(Request $request)
    {
        $with = explode(',', $request->input('with', ''));
        $user = $request->user();
        $arr = $user->toArray();
        if(in_array('roles', $with)) {
            $arr['roles'] = $user->roles;
        }
        if(in_array('permissions', $with)) {
            $scopes = explode(',', $request->input('scope', ''));
            $arr['permissions'] = $user->permissions($scopes);
        }
        return $this->successJsonResponse($arr);
    }

    public function batchUsers(Request $request)
    {
        $this->validate($request, [
           'user_ids' => 'required|array'
        ]);
        $userIds = $request->input('user_ids');
        $users = User::whereIn('id', $userIds)->get();
        return $this->successJsonResponse($users);
    }

    /*
     * 用户列表
     */
    public function index(Request $request)
    {
        $pageSize = $request->input('page_size', 10);
        $keyword = $request->input('keyword');
        $with = explode(',', $request->input('with', ''));
        if(!empty($keyword)) {
            $likeVar = $keyword.'%';
            $resource = User::where('name', 'like', $likeVar)->orWhere('email', 'like', $likeVar)->orWhere('mobile', 'like', $likeVar);
        } else {
            $resource = User::query();
        }
        if(in_array('roles', $with)) {
            $resource = $resource->with('roles');
        }
        $users = $resource->paginate($pageSize);
        return $this->paginateJsonResponse($users);
    }

    public function show(User $user)
    {
        return $this->successJsonResponse($user);
    }

    /*
     * 修改用户资料
     */
    public function update(ChangeUserRequest $request, User $user)
    {
        $changeSet = array_except($request->only(array_keys($request->rules())), ['password']);
        $changeSet = array_filter($changeSet, function($k) use ($request) {
            return !is_null($request->input($k));
        }, ARRAY_FILTER_USE_KEY);
        if (!empty($request->input('password'))) {
            $user->password = bcrypt($request->input('password'));
        }
        $user->update($changeSet);
        return $this->successJsonResponse($user);
    }

    /*
     * 用户资料管理
     */
    public function updateProfile(UserProfileRequest $request)
    {
        $user = $request->user();
        $profile = $request->only(array_except(array_keys($request->rules()), ['old_password', 'new_password']));
        $profile = array_filter($profile, function($k) use ($request){
            return !is_null($request->input($k, null));
        }, ARRAY_FILTER_USE_KEY);
        $user->update($profile);
        return $this->successJsonResponse($user);
    }

    /*
     *  用户密码修改
     */
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = $request->user();
        $user->password = bcrypt($request->input('new_password'));
        $user->save();
        return $this->successJsonResponse();
    }

    /*
     * 禁用或激活用户
     */
    public function deny(Request $request, User $user)
    {
        $this->validate($request, [
            'enable' => 'required|boolean'
        ]);
        if (is_true($request->input('enable'))) {
            $user->status = User::STATE_DENY;
        } else {
            $user->status = User::STATE_NORMAL;
        }
        $user->save();
        return $this->successJsonResponse();
    }
}
