<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserProfileRequest;
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

    public function update(Request $request)
    {
        $user = $request->user();
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
}
