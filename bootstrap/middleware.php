<?php

use Zeuxisoo\Whoops\Provider\Slim\WhoopsMiddleware;

// Start PHP session
session_start();

// Whoops for debugging
$container['debugger'] = function () {
    return new WhoopsMiddleware;
};
$app->add($container->get('debugger'));
