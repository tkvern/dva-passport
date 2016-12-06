<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $fillable = ['scope', 'key', 'name'];
    //
    public function roles()
    {
        return $this->belongsToMany('App\Models\Role', 'role_permission');
    }
}
