<?php
namespace App\Http\Resources;

use App\Http\Resources\Admin\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Media;

class BlogResource extends JsonResource
{
    public static $wrap = null; // 👈 This disables the "data" wrapper
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'category_id' => $this->category_id,
            'description' => $this->description,
            'content' => $this->content,
            'status' => $this->status,
            'is_featured' => $this->is_featured,
            'index' => $this->index,
            'allow_comments' => $this->allow_comments,
            'media_id' => $this->media_id,

            // 🔹 Metas
            'meta_title' => $this->getMeta('meta_title'),
            'meta_description' => $this->getMeta('meta_description'),
            'meta_image' => MediaResource::make(Media::find($this->getMetaInt('meta_image_id'))),
            'og_img_id' => $this->getMetaInt('meta_image_id'),

            // Relations
            'media' => new MediaResource($this->whenLoaded('media')),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'user' => new UserResource($this->whenLoaded('user')),

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

