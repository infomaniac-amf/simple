<?php
$input = file_get_contents('php://input');

header('Content-Type: text/json');
http_response_code(200);

$user = json_decode($input);
echo json_encode($user);