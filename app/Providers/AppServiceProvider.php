<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\HubSpotService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(HubSpotService::class, function ($app) {
            return new HubSpotService();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
