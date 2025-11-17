<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'        => $this->faker->sentence,
            'slug'         => $this->faker->slug,
            'content'      => $this->faker->paragraph,
            'cover_image'  => $this->faker->imageUrl(1200,600),
            'tags'         => implode(',', $this->faker->words(3)),            
            'is_published' => true,
        ];
    }
}
