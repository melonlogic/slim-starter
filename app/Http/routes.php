<?php

// Application Routes
$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("SlimPHP '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
