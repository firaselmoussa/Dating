<?php

include 'connection.php';
error_reporting(0);


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

// check if liked already
$check_duplication = "SELECT `id`, `liked_user_id`, `liked_by_id` FROM `liked_users` WHERE `liked_by_id` = '$user_id' AND `liked_user_id` = '$liked_user_id';";

$check_duplication_result = mysqli_query($conn, $check_duplication);

$data = mysqli_fetch_all($check_duplication_result, MYSQLI_ASSOC);


if(count($data) < 1){

    $sql = "INSERT INTO `liked_users`(`liked_user_id`, `liked_by_id`) VALUES ('$liked_user_id','$user_id');";

    $result = mysqli_query($conn, $sql);

    if($result){
        echo json_encode("Liked :)");
    }else{
        echo json_encode("Something went wrong :(");
    }

}else{
    echo json_encode("Already Liked :)");
}


$conn->close();

?>