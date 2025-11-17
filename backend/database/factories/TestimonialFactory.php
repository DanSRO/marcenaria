<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_name'  => $this->faker->name,
            'localization' => $this->faker->city,
            'text'         => $this->faker->paragraph,
            'rating'       => $this->faker->numberBetween(1,5),
            'photo_url'    => $this->faker->imageUrl(600,480),
            'is_published' => true
        ];
    }
}
