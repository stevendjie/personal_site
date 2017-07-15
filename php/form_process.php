<?php

$errorPresent = false;


if ($_SERVER["REQUEST_METHOD"] == "POST"){
	if (empty($_POST["name"]) || empty($_POST["email"]) || empty($_POST["message"]) || 
		!preg_match("/^([a-zA-Z0-9])+$/", $_POST["name"]) || 
		!preg_match("/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,10})+$/", $_POST["email"]) || 
		(strlen($_POST["message"]) <= 2) ){
		$errorPresent = true;
	}

	if (!$errorPresent){
		$email_body = '';
		
		foreach($_POST as $key => $value){
			$email_body .= "$key: $value\n"; 
		}
		$to = 'stevendjie1@gmail.com';
		$subject = 'Contact Form Submission';
		$header = 'Form Submission';
		mail($to, $subject, $email_body, $header);
	}

}

?>