<?php

use Dotenv\Dotenv;
use Slim\App;

// -----------------------------------------------------------------------------
// PHP Built-In Server helper
// -----------------------------------------------------------------------------

if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

// -----------------------------------------------------------------------------
// Initialise Application
// -----------------------------------------------------------------------------

// Composer autoloader
require __DIR__ . '/../vendor/autoload.php';

// App Helpers
require __DIR__ . '/../bootstrap/helpers.php';

// Init Dotenv
$dotenv = new Dotenv(__DIR__ . '/../');
$dotenv->load();

// Instantiate the app
$settings = require __DIR__ . '/../bootstrap/settings.php';
$app = new App($settings);

// -----------------------------------------------------------------------------
// Load configurations
// -----------------------------------------------------------------------------

// Set up dependencies
require __DIR__ . '/../bootstrap/dependencies.php';

// Register middleware
require __DIR__ . '/../bootstrap/middleware.php';

// Register routes
require __DIR__ . '/../app/Http/routes.php';

// -----------------------------------------------------------------------------
// Tally ho!
// -----------------------------------------------------------------------------

$app->run();
