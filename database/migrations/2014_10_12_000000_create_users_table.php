<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->comment('姓名');
            $table->string('nickname')->unique()->comment('昵称');
            $table->string('password')->default('')->comment('密码');
            $table->string('mobile')->unique()->comment('手机号');
            $table->string('avatar')->default('')->comment('头像');
            $table->tinyInteger('status')->default(1)->commit('用户状态: 1-正常,2-禁止登录');
            $table->string('tel')->nullable()->comment('分机号');
            $table->string('email')->nullable()->unique()->comment('电子邮箱');
            $table->boolean('isadmin')->default(false)->comment('是否是超管');
            $table->string('dingid')->nullable()->unique()->commment('钉钉ID');
            $table->string('remark')->comment('备注');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
