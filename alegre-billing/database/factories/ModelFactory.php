<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(AlegreBill\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});


$factory->state(\AlegreBill\User::class,'admin',function (Faker\Generator $faker){
    return [
        'role' => \AlegreBill\User::ROLE_ADMIN
    ];
});

$factory->state(\AlegreBill\User::class,'client',function (Faker\Generator $faker){
    return [
        'role' => \AlegreBill\User::ROLE_CLIENT
    ];
});