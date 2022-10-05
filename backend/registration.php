<?php

include 'connection.php';


$name = $_GET['name'];
$email = $_GET['email'];
$password = $_GET['password'];
$birth_date = $_GET['birth_date'];
$profile_photo = $_GET['profile_photo'];
$gender = $_GET['email'];
$planet = $_GET['planet'];
$biography = $_GET['biography'];


$sql = "INSERT INTO `users`(`email`, `password`, `name`, `birth_date`, `planet`, `profile_image`, `gender`, `biography`) VALUES ('$email','$password','$name','$birth_date','$planet','$profile_photo','$gender','$biography')";


if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>