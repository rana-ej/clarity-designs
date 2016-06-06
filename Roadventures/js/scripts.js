

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

	//contact-first-name, contact-last-name, contact-email, message
	$.ajax
	(
		{ 
			url: 'http://rana.carlstrom.fi/Roadventures/email-submit-form.php',
	         
	        data:
	        { 
	         	firstname: FirstName, 
	         	lastname: LastName,
	         	email: Email, 
	         	message: Message 
	        },
	         
	        type: 'post',
	         
	        success: function(output) 
	        {
                  alert('ok'/*output*/);
            },

            error: function()
            {
    			alert('error!');
  			}
		}
	);
}