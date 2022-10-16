<?php

include 'connection.php';
error_reporting(0);


if(isset($_GET['chat_id'])){
    $chat_id = $_GET['chat_id'];
}else{
    $chat_id = ' ';
}


$sql = "SELECT * FROM `messages` 
JOIN chats on chats.id = chat_id
Having chats.id = $chat_id
ORDER BY sent_at;";

$result = mysqli_query($conn, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($data);

$conn->close();

?>