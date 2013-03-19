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
				"password" : { required: true, minlength: 6 },
				"confirmpassword" : { required: true, minlength: 6, equalTo:"[name='password']" },
				"firstname" : { required: true, minlength: 3 },
				"lastname" : { required: true, minlength: 3 },
				"email" : { required: true, email: true },
				"birthdate" : { required: true, dateITA: true},
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
					minlength: "Your password must be at least 6 characters long"
				},
				"confirmpassword" : {
					required: "Please provide a password",
					minlength: "Your password must be at least 6 characters long",
					equalTo: "Please enter the same password as above"
				},
				"email" : "Please enter a valid email address",
				"birthdate" : {required : "Please enter your birth date"},
				"policy" : "Please accept our policy if you wish to continue"
			},
			errorPlacement: function(error, element){
				// Set positioning based on the elements position in the form
				var elem = $(element),
					corners = ['right center', 'left center'],
					flipIt = (elem.data("errorPos") == "left");
				
				var $inputIcon = elem.siblings(".input-icon");
				

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
					
					if($inputIcon.length > 0){
						$inputIcon.removeClass("correct-icon");
					}
				}

				// If the error is empty, remove the qTip and show check mark
				else { 
					elem.qtip('destroy'); 
					
					if($inputIcon.length > 0){
						$inputIcon.removeClass("help-icon, wrong-icon").addClass("correct-icon");
					}
				}
			},
			success: $.noop // Odd workaround for errorPlacement not firing!nsole.log("highlight "+element);
			
		}
	}
	
	
	
	/**							ADDIONAL VALIDATE METHODS
	 * __________________________
	/**
	 * Return true, if the value is a valid date, also making this formal check dd/mm/yyyy.
	 *
	 * @example jQuery.validator.methods.date("01/01/1900")
	 * @result true
	 *
	 * @example jQuery.validator.methods.date("01/13/1990")
	 * @result false
	 *
	 * @example jQuery.validator.methods.date("01.01.1900")
	 * @result false
	 *
	 * @example <input name="pippo" class="{dateITA:true}" />
	 * @desc Declares an optional input element whose value must be a valid date.
	 *
	 * @name jQuery.validator.methods.dateITA
	 * @type Boolean
	 * @cat Plugins/Validate/Methods
	 */
	$.validator.addMethod("dateITA", function(value, element) {
		var check = false;
		var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
		if( re.test(value)) {
			var adata = value.split('/');
			var gg = parseInt(adata[0],10);
			var mm = parseInt(adata[1],10);
			var aaaa = parseInt(adata[2],10);
			var xdata = new Date(aaaa,mm-1,gg);
			if ( ( xdata.getFullYear() === aaaa ) && ( xdata.getMonth() === mm - 1 ) && ( xdata.getDate() === gg ) ){
				check = true;
			} else {
				check = false;
			}
		} else {
			check = false;
		}
		return this.optional(element) || check;
	}, "Please enter a correct date");
	
	
})(jQuery);