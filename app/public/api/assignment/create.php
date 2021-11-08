<?php

try {
    $_POST = json_decode(
                file_get_contents('php://input'), 
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    exit;
}

require("class/DbConnection.php");

$db = DbConnection::getConnection();

$stmt = $db->prepare(
  'INSERT INTO assignment (refereeid, gameid, position, status)
  VALUES (?, ?, ?, ?)'
);

$stmt->execute([
  
  $_POST['refereeid'],
  $_POST['gameid'],
  $_POST['position'],
  $_POST['status']
]);


header('HTTP/1.1 303 See Other');
header('Location: ../assignment/?Game=' . $_POST['gameid']);
