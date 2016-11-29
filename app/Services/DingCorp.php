<?php
namespace App\Services;

use GuzzleHttp\Client;
use Cache;
use Log;

class DingCorp
{
    private $corpid;
    private $corpsecret;
    private $client;
    
    public function __construct($corpid, $corpsecret)
    {
        $this->corpid = $corpid;
        $this->corpsecret = $corpsecret;
        $this->client = new Client([
            'base_uri' => 'https://oapi.dingtalk.com',
            'timeout' => 5.0
        ]);
    }

    /*
     * 获取企业所有部门信息
     *
     * @return array
     */
    public function getAllDepartments()
    {
        return $this->apiJsonBody('GET', 'department/list')['department'];
    }

    /*
     * 根据部门ID获取部门成员列表
     *
     * @return array
     */
    public function getUsersByDepartmentId($departmentId)
    {
        return $this->apiJsonBody(
            'GET', 
            'user/list', 
            ['query' => ['department_id' => $departmentId]]
        )['userlist'];
    }

    /*
     * 获取公司所有成员列表
     *
     * @return Generater
     */
    public function getAllUsers()
    {
        $departments = $this->getAllDepartments();
        foreach($departments as $department) {
            $users = $this->getUsersByDepartmentId($department['id']);
            foreach ($users as $user) {
                yield $user;
            }
        }
    }

    protected function apiJsonBody($method, $uri, array $opts = [])
    {
        $opts['query'] = array_merge(
            array_get($opts, 'query', []), 
            ['access_token' => $this->getAccessToken()]
        );
        $response = $this->client->request($method, $uri, $opts);
        return json_decode($response->getBody(), true);
    }
    /*
     * 获取Ding Talk的access token
     */
    protected function getAccessToken()
    {
        return Cache::store('file')->remember('dingcorp-accesstoken', 110, function() {
            $response = $this->client->request('GET', 'gettoken', [
                'query' => [
                    'corpid' => $this->corpid,
                    'corpsecret' => $this->corpsecret 
                ]
            ]);
            $body = (string)$response->getBody();
            Log::info($body);
            $jsonBody = json_decode($body, true);
            return $jsonBody['access_token'];
        });     
    }
}
?>