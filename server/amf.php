<?php
require_once __DIR__.'/../vendor/autoload.php';

$input = file_get_contents('php://input');
$response = new Response();

try {
    $user = amf_decode($input);
    $response->data = amf_encode($user);
} catch(Exception $e) {
    $response->error = $e->getMessage();
}

class Response
{
    public $data;
    public $error;
}