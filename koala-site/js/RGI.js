(function($){
	
	RGI = {};
	RGI.Helpers = {};
	
	
/**						HELPER METHODS
 * ______________________
 */
	RGI.Helpers = {
		getCustomQtipSettings : function(defaults, custom){
			return $.extend(true, defaults, custom);
		}
	}
	
	
/**						QTIP SETTINGS
 * ______________________
 */
	RGI.QtipSettings = {

		Modal : {
			id: 'modal', // override this
			content: {
				text: "Loading...",
				title: {
					text: '',
					button: false
				},
				ajax : {
					url : "",
					type : "GET",
					data : {}
				}
			},
			position: {
				my: 'center', // ...at the center of the viewport
				at: 'center',
				target: $(window),
				effect : false
			},
			show: {
				event: 'click', // Show it on click...
				ready: true, // Show it immediately on page load.. override otherwise
				modal: {
					on: true,
					// Don't let users exit the modal in any way.. override otherwise
					blur: false, escape: false
				},
				effect : function(offset){
					$(this).fadeIn(300);
				}
			},
			hide: false,
			style: {
				classes: 'qtip-light qtip-rounded qtip-modal',
				tip: false
			},
			events: {
				render: function(event, api) {},
				show : function(event, api) {}
			}
		}
	}
	
	
/**						FORM VALIDATE SETTINGS
 * ______________________
 */
	RGI.FormValidateSettings = {
		Main : {
			debug : true,
			errorClass: "errormessage",
			onkeyup : false,
			errorClass: 'input-error',
			validClass: 'input-valid',
			rules: {
				"username" : { required: true, minlength: 3 },
				"password" : { required: true, minlength: 8 },
				"confirmpassword" : { required: true, minlength: 8, equalTo:"[name='password']" },
				"firstname" : { required: true, minlength: 3 },
				"lastname" : { required: true, minlength: 3 },
				"email" : { required: true, email: true },
				"dob-year" : { required: true, number: true},
				"dob-month" : { required: true},
				"dob-day" : { required: true, number: true},
				"policy" : {required:true}
			},
			messages: {
				"firstname" : "Please enter your firstname",
				"lastname" : "Please enter your lastname",
				"username" : {
					required: "Please enter a username",
					minlength: "Your username must consist of at least 3 characters"
				},
				"password" : {
					required: "Please provide a password",
					minlength: "Your password must be at least 8 characters long"
				},
				"confirmpassword" : {
					required: "Please provide a password",
					minlength: "Your password must be at least 3 characters long",
					equalTo: "Please enter the same password as above"
				},
				"email" : "Please enter a valid email address",
				"dob-year" : "Please select a year",
				"dob-month" : "Please select a month",
				"dob-day" : "Please select a day",
				"policy" : "Please accept our policy if you wish to continue"
			},
			errorPlacement: function(error, element){
				// Set positioning based on the elements position in the form
				var elem = $(element),
					corners = ['right center', 'left center'],
					flipIt = (elem.data("errorPos") == "left");

				// Check we have a valid error message
				if(!error.is(':empty')) {
					// Apply the tooltip only if it isn't valid
					elem.filter(':not(.valid)').qtip({
						overwrite: false,
						content: error,
						position: {
							my: corners[ flipIt ? 0 : 1 ],
							at: corners[ flipIt ? 1 : 0 ],
							viewport: $(window)
						},
						show: {
							event: false,
							ready: true
						},
						hide: false,
						style: {
							classes: 'qtip-red' // Make it red... the classic error colour!
						}
					})

					// If we have a tooltip on this element already, just update its content
					.qtip('option', 'content.text', error);
				}

				// If the error is empty, remove the qTip
				else { elem.qtip('destroy'); }
			},
			success: $.noop // Odd workaround for errorPlacement not firing!nsole.log("highlight "+element);
			
		}
	}
	
})(jQuery);