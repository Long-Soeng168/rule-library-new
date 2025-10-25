<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use HasRoles;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'gender',
        'image',
        'created_by',
        'updated_by',
        'password',

        'library_data_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function created_user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_user()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
    public function publisher_items()
    {
        return $this->hasMany(Item::class, 'publisher_id', 'id');
    }
    public function library_data()
    {
        return $this->hasOne(LibraryData::class, 'user_id', 'id');
    }

    public function author_items()
    {
        return $this->belongsToMany(Item::class, 'item_authors', 'author_id', 'item_id')
            ->withTimestamps();
    }


    // Reusable search scope
    public function scopeSearch($query, $search, array $fields = ['name'])
    {
        if ($search) {
            $query->where(function ($sub_query) use ($search, $fields) {
                foreach ($fields as $field) {
                    $sub_query->orWhere($field, 'LIKE', "%{$search}%");
                }
            });
        }

        return $query;
    }

    // Reusable sort scope
    public function scopeSort($query, $sortBy = 'id', $sortDirection = 'desc')
    {
        return $query->orderBy($sortBy, $sortDirection);
    }

    public function scopeWithoutLibraryData($query, $exceptId = null)
    {
        return $query->where(function ($q) use ($exceptId) {
            $q->whereNull('library_data_id');
            if ($exceptId) {
                $q->orWhere('id', $exceptId);
            }
        });
    }
}
