<?php

include 'connection.php';
error_reporting(0);

$date = date("Y-m-d H:i:s", strtotime('-24 hours', time()));

$sql = "SELECT * FROM `users` WHERE `join_date` > '$date'";

$result = mysqli_query($conn, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($data);

$conn->close();

?>