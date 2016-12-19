<?php
/**
 * Created by PhpStorm.
 * User: liujun
 * Date: 2016/11/23
 * Time: 下午3:23
 */
namespace App\Http\Controllers\Auth;

use GuzzleHttp\Exception\ConnectException;
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
        try {
            $userInfo = DingOpenAPI::getUserInfo($code);
        } catch(ConnectException $e) {
            info($e->getMessage());
            return redirect()->route('sso_login')->withErrors(['ding' => '当前服务不可用']);
        }
        $dingId = $userInfo['user_info']['dingId'];
        $user = User::where('dingid', $dingId)->first();
        if ($user) {
            Auth::login($user);
            $this->generateSsoToken();
            $url = $request->session()->get('return_url');
            if(!empty($url)) {
                $request->session()->forget('return_url');
            } else {
                $url = '/';
            }
            return redirect($url);
        } else {
            return redirect()->route('sso_login')->withErrors(['ding' => '无权登录']);
        }
    }
}