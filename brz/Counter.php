<?php
	// Before Headers are sent
	
	// Set past expiration date
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	
	// Define mod date to indicate page is modified
	header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	
	// HTTP 1.1 cache commands
	header("Cache-Control: no-store, no-cache, must-revalidate");
	header("Cache-Control: post-check=0, pre-check=0", false);
	
	// HTTP 1.0 cache commands
	header("Pragma: no-cache");


	$my_cookie_name  = 'BRZCookie';
	// . getenv('HTTP_HOST');
	$my_cookie_value = "Cookie that keeps this site from counting same user over and over";	
	$my_cookie_lifespan  = "1800";

	if(isset($HTTP_COOKIE_VARS[$my_cookie_name])) {
	}
	else {
		// New user, make sure we don't count the same user again for an hour...
		setcookie($my_cookie_name, $my_cookie_value, time()+$my_cookie_lifespan, "");
	}

	header('Content-Type: image/png');

?>

<?php

function Replace($strText,$searchText,$replaceText) {
	$strText = str_replace($searchText, $replaceText, $strText);
	return $strText;
}

function TextReadFile($Filename) {
	$Filename = Replace($Filename,"/","");
	$Filename = Replace($Filename,"\\","");
	$Filename = Replace($Filename,"..","");
	
	if (file_exists($Filename)) {
		$handle = fopen($Filename, "r");
		$file_content = fread($handle, filesize($Filename)); 
		fclose($handle);
		return $file_content;
	}
	else 
	{
		return "File not found (" . $Filename . ").";
	}
}

function TextWriteFile($Filename,$DataString) {
	$handle = fopen($Filename, "w");
	fwrite($handle, $DataString); 
	fclose($handle);
}

function iif($expression, $returntrue, $returnfalse = '') { 
    return ($expression ? $returntrue : $returnfalse); 
} 



function GetDateNow($Type) {
	// Returns Date - Time
	$today = getdate(); 
	$ReturnNow = '';
	if ($Type == 'US') {
		$ReturnNow = $ReturnNow . $today['year'] . '-';
		$ReturnNow = $ReturnNow . iif($today['mon'] < 10,'0' . $today['mon'],$today['mon']) . '-';
		$ReturnNow = $ReturnNow . iif($today['mday'] < 10,'0' . $today['mday'],$today['mday']);
	}
	else {
		$ReturnNow = $ReturnNow . iif($today['mday'] < 10,'0' . $today['mday'],$today['mday']) . '.';
		$ReturnNow = $ReturnNow . iif($today['mon'] < 10,'0' . $today['mon'],$today['mon']) . '.';
		$ReturnNow = $ReturnNow . $today['year'];
	}
	return $ReturnNow;
}
function GetTime() {
	// Returns Date - Time
	$today = getdate(); 
	$ReturnNow = '';
	$ReturnNow = $ReturnNow . iif($today['hours'] < 10,'0' . $today['hours'],$today['hours']) . ':';
	$ReturnNow = $ReturnNow . iif($today['minutes'] < 10,'0' . $today['minutes'],$today['minutes']) . ':';
	$ReturnNow = $ReturnNow . iif($today['seconds'] < 10,'0' . $today['seconds'],$today['seconds']);
	return $ReturnNow;
}


include("BrowserInfo.php");
function GetUserAgentDetails($DetailRequested) {
	// Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705) 
	
    $is = new sniffer();
    $returnString = '';

	$BrowserDetails = getenv('HTTP_USER_AGENT');
	switch ($DetailRequested) {
		case 'BROWSER':
			$returnString = $is->NAME . ' ' . $is->VERSION;
			//return 'Microsoft Internet Explorer 6.0';
		break;
		case 'OS':
			$returnString = $is->OS;
			//return 'Microsoft Windows XP';
		break;
		default:
		break;
	}
	return $returnString;
}

function IncrementCounter() {
	// Also increase the hits-counter
	$filename = "count.txt";
	
	//check if file exists
	if (!file_exists($filename)){
		$file = fopen($filename , "w");
		fwrite($file, "0");
		fclose($file);
	}
	
	//find count - number of ip addresses
	$file = fopen($filename,"r");
	$count = fgets($file); //get number of visiting ips
	fclose($file);
	
	$count = $count + 1;
	$file = fopen($filename, "r+");
	fwrite($file, "$count");
	fclose($file);
	
	return $count;
}

function ReturnHits() {
	$filename = "count.txt";
	$file = fopen($filename,"r");
	$count = fgets($file); //get number of visiting ips
	fclose($file);

	return $count;
}

function AddNewHit() 
{
	IncrementCounter();
	
	$HOST = getenv('REMOTE_HOST');
	if ($HOST == "") { 
		$HOST = gethostbyaddr($_SERVER['REMOTE_ADDR']); 
	}
	
	$hitString = "DATE=" . GetDateNow("US");
	$hitString = $hitString . ";TIME=" . GetTime();
	$hitString = $hitString . ";IP=" . getenv('REMOTE_ADDR');
	$hitString = $hitString . ";HOST=" . $HOST;
	$hitString = $hitString . ";SYSTEM=" . GetUserAgentDetails('OS');
	$hitString = $hitString . ";BROWSER=" . GetUserAgentDetails('BROWSER');
	$hitString = $hitString . ";REFERRER=" . getenv('HTTP_REFERER');

	$FileContentString = "";
	if (file_exists("CounterData.txt")) {
		$FileContentString = TextReadFile("CounterData.txt");
	}
	$FileContentString = $FileContentString . $hitString . "\n";
	TextWriteFile("CounterData.txt", $FileContentString);
}

function Main() {
	$im = imagecreatefrompng("images/red.png");
	if(isset($_COOKIE['BRZCookie'])) {
		//Do not count this user, already been on page.
		//echo ReturnCount();
		$im = imagecreatefrompng("images/yellow.png");
	}
	else {
		// New HIT, add to Hits...
		AddNewHit();
		$im = imagecreatefrompng("images/green.png");
	}

	imagepng($im);
	imagedestroy($im);
}

Main();

?>
