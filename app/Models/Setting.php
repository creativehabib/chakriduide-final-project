<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    protected $fillable = ['key', 'value'];
    public $timestamps = true;

    public static function get($key, $default = null)
    {
        return Cache::rememberForever("setting_{$key}", function () use ($key, $default) {
            return static::where('key', $key)->value('value') ?? $default;
        });
    }

    public static function set($key, $value)
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
        Cache::forget("setting_{$key}");
        Cache::forever("setting_{$key}", $value);
    }

    public static function selectSettings($key)
    {
        $setting = Setting::where('key', $key)->first();
        if ($setting) {
            return $setting->value;
        }
        return false;
    }

    public static function updateSettings($key, $data)
    {
        $setting = Setting::where('key', $key)->first();
        if ($setting) {
            $settings = (array) $setting->value;
            foreach ($data as $dataKey => $dataValue) {
                if (array_key_exists($dataKey, $settings)) {
                    $settings[$dataKey] = $dataValue;
                }
            }
            if (count((array) $setting->value) == count($settings)) {
                $setting->value = $settings;
                return $setting->save();
            }
        }
        return false;
    }
}
