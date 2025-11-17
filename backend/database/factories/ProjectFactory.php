<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'       => $this->faker->sentence,
            'slug'        => $this->faker->slug,
            'description' => $this->faker->paragraph,
            'category'    => $this->faker->word,
            'materials'   => $this->faker->words(3,true),
            'gallery'     => [],
            'is_published'=> true,
        ];
    }
}
