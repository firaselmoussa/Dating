<?php

include 'connection.php';
error_reporting(0);


if(isset($_GET['logged_user_id'])){
    $logged_user_id = $_GET['logged_user_id'];
}else{
    $logged_user_id = '';
}

if(isset($_GET['planet'])){
    $planet = $_GET['planet'];
}else{
    $planet = 'earth';
}

if(isset($_GET['gender'])){
    $gender = $_GET['gender'];
}else{
    $gender = 'Male';
}

// calculating minimum birthdate
if(isset($_GET['min_age'])){
    $min_age = $_GET['min_age'];
    $current_date = date("Y-m-d");
    $min_birth_date = ((int)$current_date - $min_age)."-".date("m")."-".date("d");
}else{
    $min_birth_date = '0000-00-00';
}

// calculating maximum birthdate
if(isset($_GET['max_age'])){
    $max_age = $_GET['max_age'];
    $current_date = date("Y-m-d");
    $max_birth_date = ((int)$current_date - $max_age)."-".date("m")."-".date("d");
}else{
    $max_birth_date = '3000-00-00';
}

$sql = "SELECT * FROM `users` WHERE `planet` = '$planet' AND `gender` = '$gender' AND birth_date < '$min_birth_date' AND birth_date > '$max_birth_date' AND `id` != '$logged_user_id' ORDER BY `birth_date` DESC";

$result = mysqli_query($conn, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($data);

$conn->close();

?>