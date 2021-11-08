<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = '   SELECT  g.Field, g.gameDate, g.gameTime, r.Name, a.status, a.position
FROM assignment a, Game g, Referee_table r
WHERE  a.refereeid = r.RefereeID and a.gameid = g.id and a.status="Assigned" ';


$vars = [];


$stmt = $db->prepare($sql);
$stmt->execute($vars);



$assignments2 = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($assignments2, JSON_PRETTY_PRINT);


// Step 4: Output
header('Content-Type: application/json');
echo $json; 