<?php
require_once __DIR__ . '/../vendor/autoload.php';

$input = file_get_contents('php://input');

header('Content-Type: application/x-amf');
http_response_code(200);

$user = amf_decode($input);
echo amf_encode($user);