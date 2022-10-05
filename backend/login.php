<?php
include 'connection.php';


$email = $_GET['email'];
$password = $_GET['password'];


if (isset($email) && isset($email)){


    $sql = "SELECT email, password, id FROM `users` WHERE email = '$email'";

    $result = mysqli_query($conn, $sql);
    
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

    // checking if given email have account
    if($data){
    
        // getting 1st result
        $data = $data[0];

        // returned result
        $return_data =array("message"=> "Loggedin succesfully", "id"=> $data["id"]);

        // validating password
        if($password == $data['password']){
            echo json_encode($return_data);
        }else{
            echo "wrong credentials";
        }
    }else{
        echo "no account with such email exist";
    }
}else{
    echo "empty input";
}

?>