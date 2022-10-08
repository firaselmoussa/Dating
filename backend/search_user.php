<?php

include 'connection.php';
error_reporting(0);


if(isset($_GET['user_name'])){
    $user_name = $_GET['user_name'];
}else{
    $user_name = '';
}


$sql = "SELECT * FROM `users` WHERE `name` LIKE '$user_name%'";

$result = mysqli_query($conn, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($data);

$conn->close();

?>