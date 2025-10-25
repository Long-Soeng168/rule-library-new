<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LibraryDataTargetUser extends Model
{
    protected $guarded = [];
    protected $table = 'library_data_target_users';

    public function type()
    {
        return $this->belongsTo(Type::class, 'target_user_type_code', 'code');
    }
}
