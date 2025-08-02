<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(QCategory::class, 'category_id');
    }

    public function options()
    {
        return $this->hasMany(Option::class);
    }
}
