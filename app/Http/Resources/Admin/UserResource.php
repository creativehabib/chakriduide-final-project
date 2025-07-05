<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
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
            'email' => $this->email,
            'phone' => $this->phone,
            'about' => $this->about,
            'media' => $this->media ? [
                'id' => $this->media->id,
                'path' => $this->media->path,
                'name' => $this->media->name,
            ] : null,
            'status' => $this->status,
            'created_at' => $this->created_at->format('M d, Y, H:i:s'),
            'updated_at' => $this->updated_at,
        ];
    }
}
