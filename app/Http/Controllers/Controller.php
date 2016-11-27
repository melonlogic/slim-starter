<?php

namespace App\Http\Controllers;

use Interop\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;

class Controller
{
    protected $logger;
    protected $view;

    public function __construct(ContainerInterface $container)
    {
        $this->logger = $container->get('logger');
        $this->view = $container->get('view');
    }

    protected function view($viewPath, Request $request, Response $response,
        $params = [], $returnRender = false)
    {
        if ($returnRender) {
            return $this->view->fetch(
                $viewPath,
                $this->combineViewParams($request, $params)
            );
        }

        return $this->view->render(
            $response,
            $viewPath,
            $this->combineViewParams($request, $params)
        );
    }

    protected function combineViewParams(Request $request, array $params)
    {
        return array_merge([
            'baseUrl' => $request->getUri()->getBasePath(),
            'googleMapsApiKey' => \env('GOOGLE_MAPS_API_KEY', ''),
            'csrf' => [
                'name' => $request->getAttribute('csrf_name'),
                'value' => $request->getAttribute('csrf_value'),
            ],
        ], $params);
    }
}
