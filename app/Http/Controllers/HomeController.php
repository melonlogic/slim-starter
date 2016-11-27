<?php

namespace App\Http\Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

class HomeController extends Controller
{
    public function index(Request $request, Response $response, $params)
    {
        $this->logger->info("SlimPHP '/' route");

        return $this->view('index.phtml', $request, $response, $params);
    }
}
