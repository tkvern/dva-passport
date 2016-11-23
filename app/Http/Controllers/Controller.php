<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected  function successJsonResponse($data)
    {
        return response()->json([
            'errCode' => '0',
            'errMsg' => 'SUCCESS',
            'data' => $data
        ]);
    }

    protected function errorJsonResponse($errCode, $statusCode=400, $errors=null)
    {
        return response()->json([
            'errCode' => $errCode,
            'errMsg' => App\Support\ErrCode::errMessage($errCode),
            'errors' => $errors
        ]);
    }
}
