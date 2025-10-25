<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LibraryDataAgeTargetUser extends Model
{
    protected $guarded = [];
    protected $table = 'library_data_age_target_users';

    public function type()
    {
        return $this->belongsTo(Type::class, 'age_target_type_code', 'code');
    }
}
