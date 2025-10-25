<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model
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
    public function libraries()
    {
        return $this->hasMany(LibraryData::class, 'province_code', 'code');
    }

    // Scope
    public function scopeType($query, string $typeCode)
    {
        return $query->where('type_code', $typeCode);
    }
}
