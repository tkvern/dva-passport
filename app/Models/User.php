<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    const STATE_NORMAL = 1;
    const STATE_DENY = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'nickname', 'mobile', 'email', 'password',
        'tel', 'status', 'avatar', 'dingid', 'remark' 
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function roles()
    {
        return $this->belongsToMany('App\Models\Role');
    }

    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->id;
    }

    /*
     * 传入一个昵称生成唯一的昵称
     */
    public static function getUniqueNickname($nickname)
    {
        $origNickname = $nickname;
        while(true) {
            if (self::where('nickname', $nickname)->count() < 1) {
                break;
            } 
            $nickname = $origNickname.str_pad(random_int(1, 999), 3, '0'); 
        }
        return $nickname;
    }
}
