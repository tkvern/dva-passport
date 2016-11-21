<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Support\Facades\DingTalk;
use App\Models\User;

class DingTalkSync extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dingtalk:sync';

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
        
    }

    /*
     * 同步某一部门的用户
     */
    protected function syncDepartmentUser($department_id)
    {
        $users = DingTalk::getUsersByDepartmentId($department_id);
        $userDingIds = array_pluck($users, 'dingId');
        $existDingIds = User::where('dingid', 'in', $userDingIds)->pluck('dingId');
    }
}
