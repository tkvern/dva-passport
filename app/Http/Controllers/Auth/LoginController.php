<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Support\Traits\SsoUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;
    use SsoUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

    // @override
    public function username()
    {
        return 'identity';
    }

    // @override
    public function showLoginForm(Request $request)
    {
        $_redirect_url = $request->get('redirect_url');
        $redirect_url = route('omni_dingtalk_cb', ['redirect_url' => $_redirect_url]);
        $goto = "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?".
                "appid=dingoaowu4izq4tforez8h&response_type=code&scope=snsapi_login".
                "&state=VISIONDK&redirect_uri=$redirect_url";
        return view('auth.login', ['goto' => urlencode($goto)]);
    }

    // @override
    protected function credentials(Request $request)
    {
        $identify = $request->get('identity');
        $field = filter_var($identify, FILTER_VALIDATE_EMAIL) ? 'email' : 'mobile';
        return [
            $field => $identify,
            'password' => $request->get('password')
        ];
    }

    // @override
    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        $this->generateSsoToken();
        $redirect_url = $request->get('redirect_url');
        if (!empty($redirect_url)) {
            return redirect($redirect_url);
        }
        return false;
    }
}
