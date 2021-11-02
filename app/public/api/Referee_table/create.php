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
    'INSERT INTO Referee_table (GameID, Name, Age, Grade, Skill, status)
    VALUES (?, ?, ?, ?, ?, ?)'
);

$stmt->execute([
        $_POST['GameID'],
        $_POST['Name'],
        $_POST['Age'],
        $_POST['Grade'],
        $_POST['Skill'],
        $_POST['status']
    ]);

header('HTTP/1.1 303 See Other');
header('Location: ../Referee_table/?Game=' . $_POST['GameID']);