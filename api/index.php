<?php
session_start();
header('Content-Type: application/json');
$db = require_once '../database.php';
require_once '../admin/user.php';

function respond(int $status, mixed $data): never {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

$uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$parts = explode('/', $uri);
$resource = $parts[2] ?? '';
$id = $parts[3] ?? null; 
$method = $_SERVER['REQUEST_METHOD'];
$content = json_decode(file_get_contents('php://input'), true);
$user = new User($db);

switch ($resource) {
    case 'users':
        switch ($method) {
            case 'GET':
                    $result = $db->query("
                    SELECT DATE(created_at) AS date, COUNT(*) AS count
                    FROM users GROUP BY date ORDER BY date DESC LIMIT 30
                ");
                respond(200, $result ? $result->fetch_all(MYSQLI_ASSOC) : []);
                break;
            // case 'POST':
            //     if(empty($body['username']) || empty($body['password']) || empty($body['email']) || empty($body['role_id'])) {
            //         respond(400, ['error' => 'all fields must be filled']);
            //     }
            //     $user->insert($body['username'], $body['password'], $body['email'], $body['role_id']);
            //     respond(201, ['message' => 'user created']);
            //     break;
            // case 'PUT':
            //     if(!$id) 
            //         respond(400, ['error' => 'id required']);
            //     if(empty($body['username']) || empty($body['email']) || empty($body['role_id'] || empty($body['password']))) {
            //         respond(400, ['error' => 'all fields must be filled']);
            //     }
            //     $user->update($body['username'], $body['email'], $body['role_id'], $id, $body['password'] ?? null);
            //     respond(200, ['message' => 'user updated']);
            //     break;
            // case 'DELETE':
            //     if(!$id) 
            //         respond(400, ['error' => 'id required']);
            //     $user->delete($id);
            //     respond(200, ['message' => 'User deleted']);
            //     break;
            default:
                respond(405, ['error' => 'method forbidden']);
        }
    case 'themes':
        $result = $db->query("SELECT config FROM themes");
        $data = [];
        foreach ($result ? $result->fetch_all(MYSQLI_ASSOC) : [] as $row) {
            $config = json_decode($row['config'], true);
            if (json_last_error() === JSON_ERROR_NONE) 
                $data[] = $config;
        }
        respond(200, [$data, 'debug_uri' => $uri]);
        break;
    case 'update_stats':
        if ($method !== 'POST') {
            respond(405, ['error' => 'method forbidden']);
        } else {
        if (empty($_SESSION['user_id'])) {
            respond(400, ['error' => 'user not logged in']);
        } 
        else if (empty($content['playtime']) || empty($content['games'])) {
            respond(400, ['error' => 'playtime and games fields are required']);
        } 
        else {
            $user->update_stats($_SESSION['user_id'], $content['playtime'], $content['games']);
            respond(200, ['message' => 'stats updated']);
        }
        }
        break;
    default:
        respond(404, ['error' => 'Resource not found', 'debug_uri' => $uri]);
}
?>