<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Support\Facades\DingCorp;
use App\Models\User;

class DingCorpSync extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dingcorp:syncusers {--department_id=0}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '同步钉钉企业通讯录到本地数据库';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $department_id = intval($this->option('department_id'));
        $this->syncUsers($department_id);
    }

    /*
     * 同步某一部门的用户或者所有用户
     */
    protected function syncUsers($department_id)
    {
        if ($department_id === 0) {
            $users = iterator_to_array(DingCorp::getAllUsers());
        } else {
            $users = DingCorp::getUsersByDepartmentId($department_id);
        }
        $userDingIds = array_pluck($users, 'dingId');
        $existDingIds = User::pluck('dingId')->toArray();
        $adds = array_diff($userDingIds, $existDingIds);
        $count = count($adds);
        $this->info($count." users sync from DingCorp");
        if ($count < 1) {
            return;
        }
        $bar = $this->output->createProgressBar($count);
        foreach($users as $user) {
            if (in_array($user['dingId'], $adds)) {
                $userModel = new User([
                    'name' => $user['name'],
                    'nickname' => User::getUniqueNickname($user['name']),
                    'mobile' => $user['mobile'],
                    'tel' => array_get($user, 'tel', null),
                    'avatar' => $user['avatar'],
                    'email' => null_or_value(array_get($user, 'email', null)),
                    'dingid' => $user['dingId'],
                    'remark' => array_get($user, 'remark', ''),
                ]);
                $userModel->save();
                $bar->advance();
            }
        }
        $bar->finish();
    }
}