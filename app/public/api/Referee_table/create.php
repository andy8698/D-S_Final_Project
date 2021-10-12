<?php

try {
    $_POST = json_decode(
        file_get_contents('php://input'),
        true,
        2,
        JSON_THROW_ON_ERROR
    );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . "400 Bad Request");
    exit;
}

require("class/DbConnection.php");

$db = DbConnection::getConnection();

$stmt = $db->prepare(
    'INSERT INTO Referee_table (RefereeID, Name, Age, Grade, Skill)
    VALUES (?, ?, ?, ?, ?)'
);

$stmt->execute([
        $_POST['RefereeID'],
        $_POST['Name'],
        $_POST['Age'],
        $_POST['Grade'],
        $_POST['Skill']
    ]);

header('HTTP/1.1 303 See Other');