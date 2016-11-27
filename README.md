# Slim Framework 3 Starter

This minimal starter package is to help developers quickly setup a SlimPHP application with little configuration. Currently it uses the following packages:
* slim/slim: 3.1
* slim/php-view: 2.0
* monolog/monolog: 1.17
* vlucas/phpdotenv: 2.4

### Why another SlimPHP skeleton?

This is a fork of the wonderful [Slim-Skeleton](https://github.com/slimphp/Slim-Skeleton) package by Josh Lockhart, however has the directory structure revamped to follow a more "Laravelisque" setup, suited for even medium-sized applications. The addition of the dotenv helper is to enable team-based development. We have included boilerplate for fast front-end development using Gulp with Babel and PostCSS.

Since bootstrapping the application with further component is easy with SlimPHP we have purposefully omitted the inclusion of packages like CSRF middleware and Twig. 

### Installation

Clone the repository, run install composer and npm packages.

```
git clone https://github.com/melonlogic/slim-starter.git [app-name]
composer install
npm install
```

### Configuration

After completing the above steps, and setting up your localhost/server to point to the "public" directory within the application directory, please follow the below steps to finish the configuration:

* Rename `.env.example` to `.env` and add any required environment specific variables.
* The `storage/` directory is meant to hold assets, logs and other dynamic files, please ensure that they are writeable.

### Run the Application

The following command starts the application using PHPs built-in server:

```
gulp
composer start
```

You can have the gulp watcher running on a separate terminal to monitor the front-end files being modified, triggering recompilation:

```
gulp watch
```

The following command runs the test suite:

```
composer test
```
