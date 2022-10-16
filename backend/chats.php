
<?php

include 'connection.php';
error_reporting(0);


if(isset($_GET['logged_user_id'])){
    $logged_user_id = $_GET['logged_user_id'];
}else{
    $logged_user_id = ' ';
}


$sql = "SELECT * 
FROM `chats`
Join `users`
on (users.id = chats.sender_id
OR users.id = chats.reciever_id) 
AND (users.id != $logged_user_id
OR users.id != $logged_user_id)
Having sender_id = $logged_user_id OR reciever_id = $logged_user_id;";

$result = mysqli_query($conn, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($data);

$conn->close();

?>
