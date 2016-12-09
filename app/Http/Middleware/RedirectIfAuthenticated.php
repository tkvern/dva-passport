<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\Support\Traits\SsoUsers;

class RedirectIfAuthenticated
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
        if (Auth::guard($guard)->check() && $this->checkSsoToken()) {
            $redirect_url = $request->query('redirect_url');
            if (empty($redirect_url)) {
                $redirect_url = '/';
            }
            return redirect($redirect_url);
        }
        return $next($request);
    }
}
