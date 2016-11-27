<?php

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Processor\UidProcessor;
use Slim\Views\PhpRenderer;

// DIC configuration
$container = $app->getContainer();

// View Renderer
$container['view'] = function ($c) {
    $settings = $c->get('settings')['view'];

    return new PhpRenderer($settings['view_path']);
};

// Monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Logger($settings['name']);
    $logger->pushProcessor(new UidProcessor());
    $logger->pushHandler(new StreamHandler($settings['path'], $settings['level']));

    return $logger;
};
