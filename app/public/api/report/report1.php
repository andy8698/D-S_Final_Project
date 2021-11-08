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
        r.Name,
        g.gameName,
        g.Field,
        g.gameDate, 
        g.gameTime 
        FROM Game g, Referee_table r, assignment a 
        WHERE r.RefereeID = a.refereeid AND g.id = a.gameid AND 
              g.gameDate > ? and g.gameDate < ? and r.Name = ? and a.status= "Assigned"');

$stmt->execute([
  $_POST['start_date'],
  $_POST['end_date'],
  $_POST['Name'],

 ]);


 $Games = $stmt->fetchAll();
 if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');
    echo "Name, Game Name, Field, Date, Time\r\n";
  
    foreach($Games as $g) {
      echo $g['Name']. ','
                .$g['gameName'] . ','
                .$g['Field'] . ','
                .$g['gameDate'] .','
                .$g['gameTime']."\r\n";
    }
  
  } 
  else {

  
 // Step 3: Convert to JSON
 $json = json_encode($games, JSON_PRETTY_PRINT);
 
 // Step 4: Output
 header('Content-Type: application/json');
 echo $json;}