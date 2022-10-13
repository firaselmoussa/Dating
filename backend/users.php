<?php

include 'connection.php';
error_reporting(0);


$where = ' ';
$current_date = date("Y-m-d");

if(isset($_GET['logged_user_id'])){
    $logged_user_id = $_GET['logged_user_id'];
    $where .= "`id` != '$logged_user_id'";
}

if(isset($_GET['planet'])){
    $planet = $_GET['planet'];
    $where .= "AND `planet` = '$planet'";
}

if(isset($_GET['gender'])){
    $gender = $_GET['gender'];
    $where .= "AND `gender` = '$gender'";
}

// calculating minimum birthdate
if(isset($_GET['min_age'])){
    $min_age = $_GET['min_age'];
    $min_birth_date = ((int)$current_date - $min_age)."-".date("m")."-".date("d");
    $where .= "AND `birth_date` < '$min_birth_date'";
}

// calculating maximum birthdate
if(isset($_GET['max_age'])){
    $max_age = $_GET['max_age'];
    $max_birth_date = ((int)$current_date - $max_age)."-".date("m")."-".date("d");
    $where .= "AND `birth_date` > '$max_birth_date'";
}

$sql = "SELECT * FROM `users` WHERE $where ORDER BY `birth_date` DESC";

$result = mysqli_query($conn, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($data);

$conn->close();

?>