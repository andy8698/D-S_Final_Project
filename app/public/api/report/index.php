<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT 
  name, 
  username, 
  MAX(salary) AS maxSalary, 
  COUNT(salary) AS offerCount
FROM student 
  LEFT OUTER JOIN offer ON student.id = offer.studentId
GROUP BY usename, name';
$vars = [];

if (isset($_GET['Referee_table'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT * FROM Referee_table';

  $vars = [ $_GET['Referee_table'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$Referee_tables = $stmt->fetchAll();

if (isset($_GET['format']) && $_GET['format']=='csv') {
  header('Content-Type: text/csv');
  echo "Name,Username,MaxSalary,OfferCount\r\n";

  foreach($offers as $o) {
    echo "\"".$o['name'] ."\","
        .$o['username'] .','
        .$o['maxSalary'] .','
        .$o['offerCount'] ."\r\n";
  }

} else {

    // Step 3: Convert to JSON
    $json = json_encode($Referee_tables, JSON_PRETTY_PRINT);

    // Step 4: Output
    header('Content-Type: application/json');
    echo $json;
}