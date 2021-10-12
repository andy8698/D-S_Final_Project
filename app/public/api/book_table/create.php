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
    'INSERT INTO book_table (Title, Author, Year_Published, Publisher, Page_Count, MSRP)
    VALUES (?, ?, ?, ?, ?, ?)'
);

$stmt->execute([
        $_POST['Title'],
        $_POST['Author'],
        $_POST['Year_Published'],
        $_POST['Publisher'],
        $_POST['Page_Count'],
        $_POST['MSRP']
    ]);

header('HTTP/1.1 303 See Other');