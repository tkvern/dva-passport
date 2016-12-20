<?php
/**
 * Created by PhpStorm.
 * User: liujun
 * Date: 2016/11/24
 * Time: 下午5:25
 */
namespace App\Services;

use GuzzleHttp\Client;
use Cache;
use Log;

class DingOpenAPI
{
    private $appId;
    private $appSecret;
    private $client;

    public function __construct($appId, $appSecret)
    {
        $this->appId = $appId;
        $this->appSecret = $appSecret;
        $this->client = new Client([
            'base_uri' => 'https://oapi.dingtalk.com',
            'timeout' => 10.0,
        ]);
    }

    public function getAccessToken()
    {
        return Cache::store('file')->remember('dingopenapi-accesstoken', 110, function(){
            $response = $this->client->request('GET', 'sns/gettoken', [
                'query' => [
                    'appid' => $this->appId,
                    'appsecret' => $this->appSecret
                ]
            ]);
            $body = (string)$response->getBody();
            Log::info('DingOpenAPI: '.$body);
            $jsonBody = json_decode($body, true);
            return $jsonBody['access_token'];
        });
    }

    public function getUserInfo($tmpCode) {
        return $this->apiJsonBody(
            'GET',
            'sns/getuserinfo',
            [
                'query' => ['sns_token' => $this->getSnsToken($tmpCode)]
            ]
        );
    }

    protected function getPersistentCode($tmpCode)
    {
        $ret =  $this->apiJsonBody(
            'POST',
            'sns/get_persistent_code',
            [
                'query' => [
                    'access_token' => $this->getAccessToken()
                ],
                'json' => [
                    'tmp_auth_code' => $tmpCode
                ]
            ]
        );
        return array_except($ret, ['errcode', 'errmsg']);
    }

    protected function getSnsToken($tmpCode)
    {
        $body = $this->getPersistentCode($tmpCode);
        $body = array_only($body, ['openid', 'persistent_code']);
        return $this->apiJsonBody(
            'POST',
            'sns/get_sns_token',
            [
                'query' => ['access_token' => $this->getAccessToken()],
                'json' => $body
            ]
        )['sns_token'];
    }

    protected function apiJsonBody($method, $uri, array $opts = [])
    {
        $response = $this->client->request($method, $uri, $opts);
        $body = (string)$response->getBody();
        info($uri.$body);
        return json_decode($body, true);
    }
}