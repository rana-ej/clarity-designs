function EmailSubmitFormSuccess(returnText)
{
	alert('Success!\n' + returnText);
}

function EmailSubmitFormError(xhr, textStatus, errorThrown)
{
alert("EmailSubmitFormError: " + xhr + ", textStatus=" +textStatus + ", errorThrown=" + errorThrown);
alert(xhr.responseText);
	var jsonValues = JSON.parse(xhr.responseText);
alert("jsonValues: " + jsonValues);
	alert('An error occurred: ' + jsonValues.Message);

	alert("Message: " + jsonValues.Message);
	alert("StackTrace: " + jsonValues.StackTrace);
	alert("ExceptionType: " + jsonValues.ExceptionType);
}

function SendEmailForm()
{
	var FirstName = document.getElementById("contact-first-name").value;
	var LastName = document.getElementById("contact-last-name").value;
	var Email = document.getElementById("contact-email").value;
	var Message = document.getElementById("contact-message").value;

	if(FirstName == "" || LastName == "" || Email == ""  || Message == "")
	{	
		alert("Please fill in all the fields before submitting.");
		return;
	}

	$.ajax
	(
		{ 
			url: 'http://rana.carlstrom.fi/Roadventures/email-submit-form.php',
			/*async: false,*/
			/*dataType: "json",*/
	        type: 'post',
			
	        data:
	        { 
	         	firstname: FirstName, 
	         	lastname: LastName,
	         	email: Email, 
	         	message: Message 
	        },
	         
	        success: EmailSubmitFormSuccess,
            error: EmailSubmitFormError
		}
	);
}