<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Type extends Model
{
    use SoftDeletes;
    protected $guarded = [];

    public function created_user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_user()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

    public function type_libraries()
    {
        return $this->hasMany(LibraryData::class, 'library_type_code', 'code');
    }
    public function source_of_funding_libraries()
    {
        return $this->hasMany(LibraryData::class, 'source_of_funding_type_code', 'code');
    }
    public function class_libraries()
    {
        return $this->hasMany(LibraryData::class, 'class_type_code', 'code');
    }
    public function file_type_items()
    {
        return $this->hasMany(Item::class, 'file_type_code', 'code');
    }
    public function annual_budget_libraries()
    {
        return $this->hasMany(LibraryData::class, 'annual_budget_type_code', 'code');
    }
    public function library_management_system_libraries()
    {
        return $this->hasMany(LibraryData::class, 'library_system_type_code', 'code');
    }

    public function target_user_libraries()
    {
        return $this->hasMany(LibraryDataTargetUser::class, 'target_user_type_code', 'code');
    }
    public function age_target_user_libraries()
    {
        return $this->hasMany(LibraryDataAgeTargetUser::class, 'age_target_type_code', 'code');
    }

    // Scope
    public function scopeGroup($query, string $groupCode)
    {
        return $query->where('group_code', $groupCode)
            ->orderBy('order_index')
            ->orderBy('name');
    }
}
