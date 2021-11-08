<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM Referee_table';
$vars = [];

if (isset($_GET['Game'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT * FROM Referee_table WHERE GameID = ?';

  //NOT THIS WAY
  // $sql = 'SELECT * FROM Referee_table WHERE GameId = ' . $_GET['Game'];

  $vars = [ $_GET['Game'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$Referee_tables = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($Referee_tables, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;