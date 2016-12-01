<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['key', 'name'];

    public function users()
    {
        return $this->belongsToMany('App\Models\User');
    }
}
