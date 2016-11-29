<?php
/**
 * Created by PhpStorm.
 * User: liujun
 * Date: 2016/11/28
 * Time: 下午4:14
 */
namespace App\Support\Traits;
use App\Support\ErrCode;

Trait JsonResponse {
    protected  function successJsonResponse($data, $statusCode=200)
    {
        return response()->json([
            'errCode' => '0',
            'errMsg' => 'SUCCESS',
            'data' => $data
        ], $statusCode);
    }

    protected function errorJsonResponse($errCode, $statusCode=400, $errors=null)
    {
        return response()->json([
            'errCode' => $errCode,
            'errMsg' => ErrCode::errorMessage($errCode),
            'detail' => $errors
        ], $statusCode);
    }

    protected function paginateJsonResponse($data, $statusCode=200)
    {
        $result = [];
        $result['total'] = $data->total();
        $result['current_page'] = $data->currentPage();
        $result['per_page'] = $data->perPage();
        $result['has_more_page'] = $data->hasMorePages();
        $result['last_page'] = $data->lastPage();
        $result['data'] = $data->values();
        return $this->successJsonResponse($result, $statusCode);
    }
}
