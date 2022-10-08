<?php

include 'connection.php';
error_reporting(0);

if(isset($_POST['planet'])){
    $planet = $_POST['planet'];
}else{
    $planet = 'Earth';
}

if(isset($_POST['gender'])){
    $gender = $_POST['gender'];
}else{
    $gender = 'Tree';
}

// calculating minimum birthdate
if(isset($_POST['min_age'])){
    $min_age = $_POST['min_age'];
    $current_date = date("Y-m-d");
    $min_birth_date = ($current_date - $min_age)."-".date("m")."-".date("d");
}else{
    $min_birth_date = '0000-00-00';
}

// calculating maximum birthdate
if(isset($_POST['max_age'])){
    $max_age = $_POST['max_age'];
    $current_date = date("Y-m-d");
    $min_birth_date = ($current_date - $max_age)."-".date("m")."-".date("d");
}else{
    $max_birth_date = '3000-00-00';
}

$sql = "SELECT * FROM `users` WHERE `planet` = 'earth' AND `gender` = '$gender' AND birth_date > '$min_birth_date' AND birth_date < '$max_birth_date' ORDER BY `birth_date` DESC";

$result = mysqli_query($conn, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($data);

$conn->close();

?>