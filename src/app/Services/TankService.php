<?php

namespace App\Services;

use App\Models\Tank as Model;

class TankService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(string|null $name, string|null $family, int $page, int $pageItems): mixed
    {
        return Model::where('name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->orderBy('family', 'ASC')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(string $name, string $family, string $nationalNo, string $mobile, string $tankNo): mixed
    {
        $data = [
            'name' => $name,
            'family' => $family,
            'national_no' => $nationalNo,
            'mobile' => $mobile,
            'tank_no' => $tankNo,
        ];
        return Model::create($data) ?? null;
    }

    public function update(Model $model, string $name, string $family, string $nationalNo, string $mobile, string $tankNo): bool
    {
        $data = [
            'name' => $name,
            'family' => $family,
            'national_no' => $nationalNo,
            'mobile' => $mobile,
            'tank_no' => $tankNo,
        ];
        return $model->update($data);
    }

    public function count(string|null $name, string|null $family): int
    {
        return Model::where('name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->count();
    }
}
