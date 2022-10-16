
<?php

include 'connection.php';
error_reporting(0);


if(isset($_GET['chat_id'])){
    $chat_id = $_GET['chat_id'];
}else{
    $chat_id = ' ';
}

if(isset($_GET['message'])){
    $message = $_GET['message'];
}else{
    $message = ' ';
}

if(isset($_GET['sender_id'])){
    $sender_id = $_GET['sender_id'];
}else{
    $sender_id = ' ';
}

if(isset($_GET['reciever_id'])){
    $reciever_id = $_GET['reciever_id'];
}else{
    $reciever_id = ' ';
}


$sql = "INSERT INTO `messages`(`chat_id`, `message`, `sender_id`, `reciever_id`) VALUES ('$chat_id','$message','$sender_id','$reciever_id');";

$result = mysqli_query($conn, $sql);

if($result){
    echo json_encode("Sent");
}else{
    echo json_encode("Something went wrong :(");
}

$conn->close();

?>