<?php

include 'connection.php';


$email = $_GET['email'];
$password = $_GET['password'];


// returned result
$return_data =array(
    "status"=> 0,
    "message"=> ' ',
    "id"=> ' '
);

if (isset($email) && isset($email)){


    $sql = "SELECT email, password, id FROM `users` WHERE email = '$email'";

    $result = mysqli_query($conn, $sql);
    
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

    // checking if given email have account
    if($data){
    
        // getting 1st result
        $data = $data[0];

        // validating password
        if($password == $data['password']){
            $return_data['status'] = 1;
            $return_data['message'] = 'Loggedin succesfully';
        }else{
            $return_data['message'] = 'wrong credentials';
        }
    }else{
        $return_data['message'] = 'no account with such email exist';
    }
}else{
    $return_data['message'] = 'empty input';
}

echo json_encode($return_data);

?>