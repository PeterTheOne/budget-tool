<?php

require_once 'Slim/Slim/Slim.php';
\Slim\Slim::registerAutoloader();

// todo: autoload?
require_once 'config.inc.php';
require_once 'ApiController.php';

$app = new \Slim\Slim(array('debug' => false));

$response = $app->response();
$response->header('Content-Type', 'application/json');

$pdo = new PDO('mysql:host=' . $config->databaseHost . ';dbname=' . $config->databaseName,
    $config->databaseUser, $config->databasePassword);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$app->error(function(\Exception $exception) use ($app, $pdo) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    $result = array(
        'exception' => $exception->getMessage()
    );
    $app->response()->body(json_encode($result, JSON_PRETTY_PRINT));

    $app->response()->status(400);
    $app->response()->header('X-Status-Reason', $exception->getMessage());
});

$app->post('/user(/)', function() use($app, $config, $pdo) {
    $params = (array) json_decode($app->request()->getBody());
    if (!isset($params['username']) || strlen($params['username']) === 0 ||
            !isset($params['firstname']) || strlen($params['firstname']) === 0 ||
            !isset($params['lastname']) || strlen($params['lastname']) === 0 ||
            !isset($params['email']) || strlen($params['email']) === 0 ||
            !isset($params['password']) || strlen($params['password']) === 0) {
        throw new Exception('params not set.');
    }

    $apiController = new ApiController($config, $pdo);
    $apiController->registerUser(
        $params['username'],
        $params['firstname'],
        $params['lastname'],
        $params['email'],
        $params['password']
    );

    $session = $apiController->loginUser(
        $params['username'],
        $params['password'],
        false
    );

    $app->response()->body(json_encode($session, JSON_PRETTY_PRINT));
});

// todo: should this be a GET request?
$app->post('/session(/)', function() use($app, $config, $pdo) {
    $params = (array) json_decode($app->request()->getBody());
    if (!isset($params['username']) ||
            !isset($params['password']) ||
            !isset($params['remember'])) {
        throw new Exception('params not set.');
    }

    $apiController = new ApiController($config, $pdo);
    $session = $apiController->loginUser(
        $params['username'],
        $params['password'],
        $params['remember']
    );

    $app->response()->body(json_encode($session, JSON_PRETTY_PRINT));
});


$app->delete('/session(/)', function() use($app, $config, $pdo) {
    $sessionToken = $app->request()->headers->get('X-Session-Token');

    $apiController = new ApiController($config, $pdo);
    $session = $apiController->clearSession($sessionToken);

    $app->response()->body(json_encode($session, JSON_PRETTY_PRINT));
});

$app->get('/randomRequest(/)', function() use($app, $config, $pdo) {
    $sessionToken = $app->request()->headers->get('X-Session-Token');

    $apiController = new ApiController($config, $pdo);
    $userId = $apiController->checkSession($sessionToken);

    $result = array('done' => $sessionToken);

    $app->response()->body(json_encode($result, JSON_PRETTY_PRINT));
});

$app->get('/budget(/)', function() use($app, $config, $pdo) {
    $params = $app->request()->params();
    $sessionToken = $app->request()->headers->get('X-Session-Token');

    $apiController = new ApiController($config, $pdo);
    if (isset($params['userId']) && $params['userId'] != '') {
        $result = $apiController->getUserBudgets($params['userId'], $sessionToken);
    } else {
        $result = $apiController->getBudgets();
    }

    $app->response()->body(json_encode($result, JSON_PRETTY_PRINT));
});

$app->get('/budget/:username/:name(/)', function($username, $name) use($app, $config, $pdo) {
    $sessionToken = $app->request()->headers->get('X-Session-Token');

    $apiController = new ApiController($config, $pdo);

    $budget = $apiController->getBudgetByUsernameAndName($username, $sessionToken, $name);

    $app->response()->body(json_encode($budget, JSON_PRETTY_PRINT));
});

$app->post('/budget(/)', function() use($app, $config, $pdo) {
    $params = (array) json_decode($app->request()->getBody());
    if (!isset($params['userId']) || strlen($params['userId']) === 0 ||
        !isset($params['name']) || strlen($params['name']) === 0) {
        throw new Exception('params not set.');
    }
    $sessionToken = $app->request()->headers->get('X-Session-Token');

    $apiController = new ApiController($config, $pdo);
    $budget = $apiController->createBudget(
        $params['userId'],
        $sessionToken,
        $params['name'],
        $params['description'],
        (bool) $params['private']
    );

    $app->response()->body(json_encode($budget, JSON_PRETTY_PRINT));
});

$app->run();