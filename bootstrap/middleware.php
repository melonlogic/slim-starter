<?php

use Zeuxisoo\Whoops\Provider\Slim\WhoopsMiddleware;

// Whoops for debugging
$container['debugger'] = function () {
    return new WhoopsMiddleware;
};
$app->add($container->get('debugger'));
