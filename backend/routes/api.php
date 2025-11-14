<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\SettingController;

Route::middleware('api')->group(function () {
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('services', ServiceController::class);
    Route::apiResource('testimonials', TestimonialController::class);
    Route::apiResource('posts', PostController::class);
    Route::apiResource('settings', SettingController::class);
});
?>