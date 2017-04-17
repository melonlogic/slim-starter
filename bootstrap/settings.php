<?php

use Monolog\Logger;

return [
    'settings' => [
        // IC Settings
        'determineRouteBeforeAppMiddleware' => \env('APP_DETERMINE_ROUTE_BEFORE_MIDDLEWARE', true),
        'routerCacheFile' => __DIR__ . '/../storage/cache/routes.cache',

        // Debugging
        'addContentLengthHeader' => \env('DEBUG_ADD_CONTENT_LENGTH_HEADER', false),
        'debug' => \env('DEBUG_DISPLAY_ERRORS', true),
        'displayErrorDetails' => \env('DEBUG_DISPLAY_ERROR_DETAILS', false),

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
