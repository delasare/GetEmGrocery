<?php
error_reporting(E_ALL | E_STRICT);

require('recipe.class.php');
$recipe_handler = new RecipeHandler();

header('Pragma: no-cache');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Content-Disposition: inline; filename="files.json"');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, HEAD, GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-File-Name, X-File-Type, X-File-Size');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'OPTIONS':
        break;
    case 'HEAD':
    case 'GET':
        $recipe_handler->get();
        break;
    case 'POST':
        if (isset($_REQUEST['_method']) && $_REQUEST['_method'] === 'DELETE') {
            $recipe_handler->delete();
        } else {
            $recipe_handler->post();
        }
        break;
    case 'DELETE':
        $recipe_handler->delete();
        break;
    default:
        header('HTTP/1.1 405 Method Not Allowed');
}
