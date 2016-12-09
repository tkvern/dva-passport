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
        $return_url = $request->get('redirect_url');
        if(!empty($return_url)) {
            $request->session()->set('return_url', $return_url);
        }
        $callback_url = route('omni_dingtalk_cb');
        $goto = "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?".
                "appid=dingoaowu4izq4tforez8h&response_type=code&scope=snsapi_login".
                "&state=VISIONDK&redirect_uri=";
        return view('auth.login', ['goto' => urlencode($goto.$callback_url), 'redirect_url' => $goto.urlencode($callback_url)]);
    }


    /**
     * Log the user out of the application.
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->flush();

        $request->session()->regenerate();

        $this->clearSsoToken();

        return redirect('/login');
    }

    // @override
    protected function credentials(Request $request)
    {
        $identity = $request->get('identity');
        $field = filter_var($identity, FILTER_VALIDATE_EMAIL) ? 'email' : 'mobile';
        return [
            $field => $identity,
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
        $url = $request->session()->get('return_url');
        if(!empty($url)) {
            $request->session()->forget('return_url');
            return redirect($url);
        }
        return false;
    }

}
