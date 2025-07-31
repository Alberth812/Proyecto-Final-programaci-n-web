<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UsuarioFactory extends Factory
{
    protected $model = \App\Models\Usuario::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->name(),
            'correo' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'), // contraseña
            'rol' => $this->faker->randomElement(['admin', 'vendedor', 'cliente']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
