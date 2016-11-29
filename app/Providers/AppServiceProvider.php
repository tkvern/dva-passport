<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('dingcorp', function() {
            return new \App\Services\DingCorp(
                config('ding.corpid'), config('ding.corpsecret')
            );
        });
        $this->app->singleton('dingopenapi', function() {
            return new \App\Services\DingOpenAPI(
                config('ding.appid'), config('ding.appsecret')
            );
        });
        if ($this->app->environment() !== 'production') {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }
    }
}
