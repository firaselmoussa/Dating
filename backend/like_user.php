<?php

include 'connection.php';
// error_reporting(0);


if(isset($_GET['user_id'])){
    $user_id = $_GET['user_id'];
}else{
    $user_id = '';
}

if(isset($_GET['liked_user_id'])){
    $liked_user_id = $_GET['liked_user_id'];
}else{
    $liked_user_id = '';
}


    $sql = "INSERT INTO `liked_users`(`liked_user_id`, `liked_by_id`) VALUES ('$liked_user_id','$user_id');";

    $result = mysqli_query($conn, $sql);

    if($result){
        echo json_encode("Liked :)");
    }else{
        echo json_encode("Something went wrong :(");
    }


$conn->close();

?>