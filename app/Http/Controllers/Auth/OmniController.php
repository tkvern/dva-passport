<?php
/**
 * Created by PhpStorm.
 * User: liujun
 * Date: 2016/11/23
 * Time: 下午3:23
 */
namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Support\Facades\DingOpenAPI;
use App\Support\Traits\SsoUsers;
use App\Models\User;
use Auth;

class OmniController extends Controller
{
    use  SsoUsers;

    public function dingtalk(Request $request)
    {
        $code = $request->get('code');
        $userInfo = DingOpenAPI::getUserInfo($code);
        $dingId = $userInfo['user_info']['dingId'];
        $user = User::where('dingid', $dingId)->first();
        if ($user) {
            info('ssouser: '.$user->name);
            Auth::login($user);
            $this->generateSsoToken();
            $url = $request->get('redirect_url', '/');
            return redirect($url);
        } else {
            return redirect()->route('sso_login')->withErrors(['ding' => '无权登录']);
        }
    }
}