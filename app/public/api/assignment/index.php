<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql='SELECT * FROM assignment';
$vars = [];

if (isset($_GET['Game'])) {
    $sql = 'SELECT * FROM assignment a INNER JOIN Referee_table r ON r.RefereeID = a.refereeid WHERE a.gameid = ?';

    $vars = [ $_GET['Game'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);


$stmt = $db->prepare($sql);
$stmt->execute($vars);
$assignments = $stmt->fetchAll();


// Step 3: Convert to JSON
$json = json_encode($assignments, JSON_PRETTY_PRINT);


// Step 4: Output
header('Content-Type: application/json');
echo $json;
