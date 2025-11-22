<?php

namespace App\Providers;

use App\Models\Project;
use App\Policies\ProjectPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * As policies que serão registradas.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Project::class => ProjectPolicy::class,
    ];

    /**
     * Bootstrap any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // definir Gates globais aqui:
        // Gate::define('isAdmin', fn(User $user) => $user->is_admin);
    }
}