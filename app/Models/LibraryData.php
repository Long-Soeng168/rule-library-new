<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LibraryData extends Model
{
    use SoftDeletes;
    protected $guarded = [];

    public function user_owner()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function created_user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_user()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
    public function province()
    {
        return $this->belongsTo(Location::class, 'province_code', 'code');
    }
    public function funding_type()
    {
        return $this->belongsTo(Type::class, 'source_of_funding_type_code', 'code');
    }
    public function class_type()
    {
        return $this->belongsTo(Type::class, 'class_type_code', 'code');
    }
    public function library_type()
    {
        return $this->belongsTo(Type::class, 'library_type_code', 'code');
    }

    public function target_users()
    {
        return $this->hasMany(LibraryDataTargetUser::class, 'library_data_id', 'id');
    }

    public function age_of_target_users()
    {
        return $this->hasMany(LibraryDataAgeTargetUser::class, 'library_data_id', 'id');
    }

    // Scope
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }
}
