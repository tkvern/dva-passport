<?php
namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use App\Support\Traits\JsonResponse;
use App\Support\ErrCode;
use Illuminate\Validation\ValidationException;

class Handler extends ExceptionHandler
{
    use JsonResponse;
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if($exception instanceof  AuthorizationException) {
            return $this->unauthorized($request, $exception);
        } elseif ($exception instanceof ValidationException) {
            return $this->badInput($exception, $request);
        } elseif ($exception instanceof ModelNotFoundException) {
            return $this->modelNotFound($exception, $request);
        }
        return parent::render($request, $exception);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return $this->errorJsonResponse(ErrCode::E_NOT_AUTHENTICATED, 401);
        }

        return redirect()->guest('sso_login');
    }


    /**
     * @param $request
     * @param AuthorizationException $exception
     * @return $this|\Illuminate\Http\JsonResponse
     */
    protected function unauthorized($request, AuthorizationException $exception)
    {
        if ($request->expectsJson()) {
            return $this->errorJsonResponse(ErrCode::E_NOT_AUTHORIZED, 403);
        }

        return redirect()->back()->withErrors('没有权限');
    }

    /**
     * @param ValidationException $e
     * @param $request
     * @return $this|\Illuminate\Http\JsonResponse|null|\Symfony\Component\HttpFoundation\Response
     */
    protected function badInput(ValidationException $e, $request)
    {
        $errors = $e->validator->errors()->getMessages();

        if ($request->expectsJson()) {
            //return response()->json($errors, 422);
            return $this->errorJsonResponse(ErrCode::E_BAD_INPUT, 422, $errors);
        }

        return redirect()->back()->withInput($request->input())->withErrors($errors);
    }

    protected function modelNotFound(ModelNotFoundException $e, $request)
    {
        return $this->errorJsonResponse(ErrCode::E_NOT_FOUND_MODEL);
    }
}
