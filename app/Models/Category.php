<?php

namespace App\Models;

use App\Traits\HasMeta;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    use HasMeta;
    protected $guarded = ['id'];

    public function blogs()
    {
        return $this->hasMany(Blog::class, 'category_id');
    }

    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    protected static function booted()
    {
        static::deleting(function ($blog) {
            $blog->metas()->delete();
        });
    }

}
