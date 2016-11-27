<?php

use Monolog\Logger;

return [
    'settings' => [
        // IC Settings
        'addContentLengthHeader' => \env('ADD_CONTENT_LENGTH_HEADER', false),
        'determineRouteBeforeAppMiddleware' => \env('DETERMINE_ROUTE_BEFORE_MIDDLEWARE', true),
        'displayErrorDetails' => \env('DEBUG_DISPLAY_ERROR_DETAILS', false),
        'routerCacheFile' => \env('ROUTER_CACHE_FILE', true),

        // Renderer settings
        'view' => [
            'view_path' => __DIR__ . '/../resources/views/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'logger',
            'path' => __DIR__ . '/../storage/logs/app.log',
            'level' => Logger::DEBUG,
        ],
    ],
];
