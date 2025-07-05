<?php

namespace App\Traits;

use App\Models\Meta;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Cache;

/**
 * Trait HasMeta
 *
 * This trait provides methods to manage metadata for models.
 * It allows setting, getting, and clearing metadata associated with the model.
 *
 * @package App\Traits
 */
trait HasMeta
{
    /**
     * Get the meta-relationship.
     *
     * @return MorphMany
     */
    public function metas(): MorphMany
    {
        return $this->morphMany(Meta::class, 'metable');
    }

    /**
     * Get the value of a specific meta-key as a boolean.
     *
     * @param string $key
     * @return int|null
     */
    public function getMetaInt(string $key): ?int
    {
        $value = $this->getMeta($key);
        return $value !== null ? (int) $value : null;
    }
    /**
     * Get the value of a specific meta-key.
     *
     * @param string $key
     * @return string|null
     */
    public function getMeta(string $key): ?string
    {
        return Cache::remember($this->getMetaCacheKey($key), now()->addHour(), function () use ($key) {
            return optional($this->metas()->where('key', $key)->first())->value;
        });
    }

    /**
     * Get all metadata as an associative array.
     *
     * @param string $key
     * @param string|null $value
     * @return void
     */
    public function setMeta(string $key, ?string $value): void
    {
        if ($value === null) return;
        $this->metas()->updateOrCreate(['key' => $key], ['value' => $value]);
        Cache::forget($this->getMetaCacheKey($key));
    }

    /**
     * @param array $data
     * @return void
     */
    public function setMetas(array $data): void
    {
        foreach ($data as $key => $value) {
            if(!is_null($value)) {
                $this->setMeta($key, $value);
            }
        }
    }

    /**
     * @return void
     */
    public function clearMetaCache(): void
    {
        foreach ($this->metas as $meta) {
            Cache::forget($this->getMetaCacheKey($meta->key));
        }
    }

    /**
     * @param string $key
     * @return string
     */
    protected function getMetaCacheKey(string $key): string
    {
        return "meta:{$this->getTable()}:{$this->id}:{$key}";
    }
}
