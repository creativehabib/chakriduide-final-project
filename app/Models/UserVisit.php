<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVisit extends Model
{
    use HasFactory;

    protected $table = 'user_visits';

    protected $fillable = [
        'session_id',
        'ip_address',
        'user_agent',
        'browser', // নতুন
        'os',      // নতুন
        'device',  // নতুন
        'device_type', // নতুন
        'country',
        'city',
        'region',
        'zip',
        'latitude',
        'longitude',
        'timezone',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
