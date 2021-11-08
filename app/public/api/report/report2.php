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
        'SELECT  
        g.gameName,
        g.Field,
        g.gameDate, 
        g.gameTime, 
        r.Name,
        a.status
        FROM Game g, Referee_table r, assignment a 
        WHERE r.RefereeID = a.refereeid and g.id = a.gameid and g.gameDate > ? and a.status = "Unassigned"');       

$stmt->execute([
    $_POST['gameDate'],
]);

 $Games = $stmt->fetchAll();

 if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');
    echo "Game, Field, Date, Time, Ref Name, Status\r\n";
  
    foreach($Games as $g) {
      echo $g['gameName'] . ','
          .$g['Field'] . ','
          .$g['gameDate'] . ','
          .$g['gateTime'] . ','
          .$g['Name'] . ','
          .$g['status']."\r\n";
    }
  
  } 

 // Step 3: Convert to JSON
 else {
     $json = json_encode($Games, JSON_PRETTY_PRINT);
 
 // Step 4: Output
 header('Content-Type: application/json');
 echo $json;
 }
