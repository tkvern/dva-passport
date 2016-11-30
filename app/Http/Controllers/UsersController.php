<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserProfileRequest;
use App\Http\Requests\ChangeUserRequest;
use App\Models\User;

class UsersController extends Controller
{
    public function current(Request $request)
    {
        $user = $request->user();
        return $this->successJsonResponse($user);
    }

    public function index(Request $request)
    {
        // $user = $request->user();
        $pageSize = $request->input('page_size', 10);
        $users = User::orderBy('id')->paginate($pageSize);
        return $this->paginateJsonResponse($users);
    }

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

    public function deny(User $user)
    {
        $user->status = User::STATE_DENY;
        $user->save();
        return $this->successJsonResponse();
    }
}
