<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserProfileRequest;
use App\Http\Requests\ChangeUserRequest;
use App\Models\User;

class UsersController extends Controller
{
    /*
     * 当前用户
     */
    public function current(Request $request)
    {
        $user = $request->user();
        return $this->successJsonResponse($user);
    }

    /*
     * 用户列表
     */
    public function index(Request $request)
    {
        $pageSize = $request->input('page_size', 10);
        $keyword = $request->input('keyword');
        if(!empty($keyword)) {
            $likeVar = $keyword.'%';
            $resource = User::where('name', 'like', $likeVar)->orWhere('email', 'like', $likeVar)->orWhere('mobile', 'like', $likeVar);
        } else {
            $resource = User::query();
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
    public function update(ChangeUserRequest $request, $user_id)
    {
        $user = User::find($user_id);
        $changeSet = $request->only(array_except(array_keys($request->rules()), ['password'])) ;
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
        if (!empty($request->input('new_password'))) {
            $user->password = bcrypt($request->input('new_password'));
        }
        $user->update($profile);
        return $this->successJsonResponse($user);
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
