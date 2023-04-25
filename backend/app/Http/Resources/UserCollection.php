<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\PostResource;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */

    private $title;
    private $status;
    private $detail;
    public function __construct($resource, $status = 200, $title, $detail)
    {
        parent::__construct($resource);
        $this->status = $status;
        $this->title = $title;
        $this->detail = $detail;
    }

    public function toArray(Request $request): array
    {
        // return parent::toArray($request);

        return [
            "data" => $this->collection,
            'status' => $this->status,
            'title' => $this->title,
            'detail' => $this->detail,
            'count' => $this->collection->count(),
        ];
    }
}
