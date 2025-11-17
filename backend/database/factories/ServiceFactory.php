<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'         => $this->faker->name,
            'slug'         => $this->faker->slug,
            'description'  => $this->faker->paragraph,
            'icon'         => $this->faker->randomElement(['🔥','⭐','📷','🏠']),
            'is_published' => true,
        ];
    }
}
