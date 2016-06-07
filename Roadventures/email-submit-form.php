<?php
    if (!function_exists('http_response_code')) {
        function http_response_code($code = NULL) {

            if ($code !== NULL) {

                switch ($code) {
                    case 100: $text = 'Continue'; break;
                    case 101: $text = 'Switching Protocols'; break;
                    case 200: $text = 'OK'; break;
                    case 201: $text = 'Created'; break;
                    case 202: $text = 'Accepted'; break;
                    case 203: $text = 'Non-Authoritative Information'; break;
                    case 204: $text = 'No Content'; break;
                    case 205: $text = 'Reset Content'; break;
                    case 206: $text = 'Partial Content'; break;
                    case 300: $text = 'Multiple Choices'; break;
                    case 301: $text = 'Moved Permanently'; break;
                    case 302: $text = 'Moved Temporarily'; break;
                    case 303: $text = 'See Other'; break;
                    case 304: $text = 'Not Modified'; break;
                    case 305: $text = 'Use Proxy'; break;
                    case 400: $text = 'Bad Request'; break;
                    case 401: $text = 'Unauthorized'; break;
                    case 402: $text = 'Payment Required'; break;
                    case 403: $text = 'Forbidden'; break;
                    case 404: $text = 'Not Found'; break;
                    case 405: $text = 'Method Not Allowed'; break;
                    case 406: $text = 'Not Acceptable'; break;
                    case 407: $text = 'Proxy Authentication Required'; break;
                    case 408: $text = 'Request Time-out'; break;
                    case 409: $text = 'Conflict'; break;
                    case 410: $text = 'Gone'; break;
                    case 411: $text = 'Length Required'; break;
                    case 412: $text = 'Precondition Failed'; break;
                    case 413: $text = 'Request Entity Too Large'; break;
                    case 414: $text = 'Request-URI Too Large'; break;
                    case 415: $text = 'Unsupported Media Type'; break;
                    case 500: $text = 'Internal Server Error'; break;
                    case 501: $text = 'Not Implemented'; break;
                    case 502: $text = 'Bad Gateway'; break;
                    case 503: $text = 'Service Unavailable'; break;
                    case 504: $text = 'Gateway Time-out'; break;
                    case 505: $text = 'HTTP Version not supported'; break;
                    default:
                        exit('Unknown http status code "' . htmlentities($code) . '"');
                    break;
                }

                $protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');

                header($protocol . ' ' . $code . ' ' . $text);

                $GLOBALS['http_response_code'] = $code;

            } else {

                $code = (isset($GLOBALS['http_response_code']) ? $GLOBALS['http_response_code'] : 200);

            }

            return $code;

        }
    }

?>

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