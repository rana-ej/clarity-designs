<?php
    // CHANGE THE TWO LINES BELOW
    $email_to = "theroadventures@gmail.com";
    $email_subject = "Roadventures form submissions";
     
    function ReturnErrorMessage($error) 
    {
		$Result = "We are very sorry, but there were error(s) found with the form you submitted. ";
        $Result .= "These errors appear below.<br /><br />";
        $Result .= $error . "<br /><br />";
        $Result .= "Please go back and fix these errors.<br /><br />";
        http_response_code(400);
		exit($Result);
    }

    function clean_string($string) 
    {
		$bad = array("content-type","bcc:","to:","cc:","href");
		return str_replace($bad,"",$string);
    }
     
	function validateInput($FirstName, $LastName, $Email, $Message)
	{     
		$error_message = "";

		$first_name = $FirstName;
		$last_name = $LastName;
		$email_from = $Email;
		$comments = $Message;
		 
		$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

		if(!preg_match($email_exp,$email_from)) {
			$error_message .= 'The Email Address you entered does not appear to be valid.<br />';
		}
			
		$string_exp = "/^[A-Za-z .'-]+$/";
		if(!preg_match($string_exp,$first_name)) {
			$error_message .= 'The First Name you entered does not appear to be valid.<br />';
		}

		if(!preg_match($string_exp,$last_name)) {
			$error_message .= 'The Last Name you entered does not appear to be valid.<br />';
		}
		  
		if(strlen($comments) < 2) {
			$error_message .= 'The Comments you entered do not appear to be valid.<br />';
		}
		
		if(strlen($error_message) > 0) 
		{
			ReturnErrorMessage($error_message);
		}
		else
		{
			$email_message = "Form details below.\n\n";
			$email_message .= "First Name: " . clean_string($first_name)."\n";
			$email_message .= "Last Name: " . clean_string($last_name)."\n";
			$email_message .= "Email: " . clean_string($email_from)."\n";
			$email_message .= "Comments: " . clean_string($comments)."\n";
			return $email_message;
		}
		return "";
	}

	function sendEmail($FirstName, $LastName, $Email, $Message)
	{		
		$validated_email_message = validateInput($FirstName, $LastName, $Email, $Message);
		if(strlen($validated_email_message) > 0)
		{ 
			// create email headers
			$headers = 'From: '.$email_from."\r\n".
			'Reply-To: '.$email_from."\r\n" .
			'X-Mailer: PHP/' . phpversion();
			@mail($email_to, $email_subject, $validated_email_message, $headers);  
			echo "Thank you for contacting us. We will be in touch with you very soon.";
			http_response_code(200);
		}
		else
		{
			echo "An unspecified error occurred, you may try again in a moment.";
			http_response_code(405);
		}
	}
	
	function GetValueFromPostOrGet($requested_value)
	{
		if(isset($_POST[$requested_value])) 
		{
			return $_POST[$requested_value];
		}
		else if(isset($_GET[$requested_value]))
		{
			return $_GET[$requested_value];
		}
		return "";
	}

$FirstName = GetValueFromPostOrGet('firstname');
$LastName = GetValueFromPostOrGet('lastname');
$Email = GetValueFromPostOrGet('email');
$Message = GetValueFromPostOrGet('message');

if(empty($FirstName) || empty($LastName) || empty($Email) || empty($Message))
{
	echo 'We are sorry, but there appears to be a problem with the form you submitted (some values appeared empty).';
	http_response_code(400);
}
else
{
	sendEmail($FirstName, $LastName, $Email, $Message);
}
?>