<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "interstellar_date";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

?>