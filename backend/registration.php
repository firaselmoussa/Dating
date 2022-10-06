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

// returned result
$return_data =array(
    "status"=> 0,
    "message"=> "",
    "id"=> ""
);

// check_email_availability_query 
$check_email_availability_query = "SELECT  email FROM `users` WHERE email = '$email'";

$result = mysqli_query($conn, $check_email_availability_query);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
if($data){
    $return_data['message'] = "Email is already used!";
}else{

    $sql = "INSERT INTO `users`(`email`, `password`, `name`, `birth_date`, `planet`, `profile_image`, `gender`, `biography`) VALUES ('$email','$password','$name','$birth_date','$planet','$profile_photo','$gender','$biography')";

    if ($conn->query($sql) === TRUE) {
        $return_data['status'] = 1;
        $return_data['message'] = "Signed up successfully";
    } else {
        $return_data['message'] = "Error: " . $sql . "<br>" . $conn->error;
    }
}

echo json_encode($return_data);

$conn->close();

?>