<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM Game';
$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$Games = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($Games, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;