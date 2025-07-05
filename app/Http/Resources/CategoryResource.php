<?php

namespace App\Http\Resources;

use App\Http\Resources\Admin\UserResource;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'status' => $this->status,
            'media_id' => $this->media_id,

            // 🔹 Metas
            'meta_title' => $this->getMeta('meta_title'),
            'meta_description' => $this->getMeta('meta_description'),
            'og_img_id' => $this->getMetaInt('meta_image_id'),

            // 🔹 Media Resource from og_img_id
            'meta_image' => MediaResource::make(Media::find($this->getMetaInt('meta_image_id'))),

            // Relations
            'media' => new MediaResource($this->whenLoaded('media')),
            'blogs' => BlogResource::collection($this->whenLoaded('blogs')),
            'user' => new UserResource($this->whenLoaded('user')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
