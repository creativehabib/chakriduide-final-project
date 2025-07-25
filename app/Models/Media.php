<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static find($getMetaInt)
 */
class Media extends Model
{
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
