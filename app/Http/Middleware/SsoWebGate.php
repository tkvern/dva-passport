<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\Support\Traits\SsoUsers;

class SsoWebGate
{
    use SsoUsers;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if(!Auth::guard($guard)->check() || !$this->checkSsoToken()) {
            $this->clearSsoToken();
            return redirect()->route('sso_login');
        }
        return $next($request);
    }
}
