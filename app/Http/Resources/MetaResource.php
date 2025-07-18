<?php

namespace App\Http\Resources;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @method getMetaInt(string $string)
 * @method getMeta(string $string)
 * @property mixed $index
 */
class MetaResource extends JsonResource
{
    public static $wrap = null; // Disable the "data" wrapper
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'meta_title' => $this->getMeta('meta_title'),
            'meta_description' => $this->getMeta('meta_description'),
            'meta_image' => optional(Media::find($this->getMetaInt('meta_image_id')))->path,
            'name' => optional(Media::find($this->getMetaInt('meta_image_id')))->name,
            'index' => $this->index,
        ];
    }
}
