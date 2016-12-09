<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use DB;

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

        DB::listen(
            function ($sql) {
                // $sql is an object with the properties:
                //  sql: The query
                //  bindings: the sql query variables
                //  time: The execution time for the query
                //  connectionName: The name of the connection

                // To save the executed queries to file:
                // Process the sql and the bindings:
                foreach ($sql->bindings as $i => $binding) {
                    if ($binding instanceof \DateTime) {
                        $sql->bindings[$i] = $binding->format('\'Y-m-d H:i:s\'');
                    } else {
                        if (is_string($binding)) {
                            $sql->bindings[$i] = "'$binding'";
                        }
                    }
                }

                // Insert bindings into query
                $query = str_replace(array('%', '?'), array('%%', '%s'), $sql->sql);

                $query = vsprintf($query, $sql->bindings);

                info('sql: '.$query);
            }
        );
    }
}
