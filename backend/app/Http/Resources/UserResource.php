<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\Users_ConnectResource;

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
            'birth_date' => $this->birth_date,
            'gender' => $this->gender,
            'address' => $this->address,
            "phone" => $this->phone,
            "education" => $this->education,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            'posts' => PostResource::collection($this->whenLoaded('posts')),
            'friends' => Users_ConnectResource::collection($this->whenLoaded('users_connect'))
        ];
    }
}
