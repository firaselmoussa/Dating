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

$userId_sql = "SELECT  id FROM `users` WHERE email = '$email'";
$result = mysqli_query($conn, $userId_sql);
    
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

// returned result
$return_data =array(
    "status"=> 0,
    "Message"=> "",
    "user_id"=> $data[0]['id']
    
);

if ($conn->query($sql) === TRUE) {
    $return_data['status'] = 1;
    $return_data['Message'] = "Signed up successfully";
} else {
    $return_data['Message'] = "Error: " . $sql . "<br>" . $conn->error;
}

echo json_encode($return_data);

$conn->close();

?>