<?php

if (isset($_POST)) {

	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
    $cmmnt = $_POST['message'];
    $aptType = $_POST['aptType'];
    $moveIn = $_POST['moveIn'];

	$clearance = 0;

	//Validate Requireds
	$reqs = Array($name, $phone, $email);
	foreach( $reqs as $r ) {
		$clearance += (required($r)) ? 0 : 1;
	}
	//Validate Email
	// $clearance += (email($email)) ? 0 : 1;

	//Check Validation & Send Email
	if ($clearance !== 0) {
	/* submission invalidation */

		/* error-handling */
		echo "failure:validation";

	} else {
	/* submission clear */

		// $address = "contact@liveatbishopsplace.com";
		$address = "mitchell@primarydesign.com";
		$subject = "New Form Submission on liveatbishopsplce.com";
		$message = "User Submission:\n";
		$message .= "Name: " . $name . "\n";
		$message .= "Phone: " . $phone . "\n";
		$message .= "Email: " . $email . "\n";
        foreach ($aptType as $key){$message .= "Apt Type: " . $aptType[$key] . "\n";} 
        $message .= "Move-in Date: " . $moveIn . "\n";
        $message .= "Message: " . $cmmnt . "\n";

		if( mail($address, $subject, $message) ) {
			echo "Successful submission from " . $_SERVER['HTTP_HOST'];
		} else {
			echo "failure:mailing";
		}

	}/**(submission)**/
}
//GENERAL GLOBAL DECLARATIONS
function required($x) {
	if ($x !== "") return true;
	else return false;
}
function email($x) {
	$rgx = '/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([.][a-zA-Z]+)+$/';
	$val = preg_match($rgx,$x);
	return ($val === 1) ? true : false;
}
function phone($x) {
	$rgx = '/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/';
	$val = preg_match($rgx,$x);
	return ($val === 1) ? true : false;
}

?>
