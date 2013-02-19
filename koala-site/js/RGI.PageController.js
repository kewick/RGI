/**
 * @desc : put common functionality in here
 */

(function($){
	
	RGI.PageController = function(options){
		
		var self = this;
		var $parent = $("body");
		
		self.options = {
			defaultValidateSettings : RGI.FormValidateSettings.Main,
			extraValidateSettings : {
				//overrides defaultValidateSettings
			}
		};
		
		$.extend(true, self.options, options);
		
	
	/**						INIT
	 * ______________________
	 */
		function initialize(){
			initSlideShow();
			initForms();
		}
		initialize();
		
		
	
	/**						PUBLIC
	 * ______________________
	 */
		this.removeAllErrorQtips = function(){
			$parent.find(".input-error").qtip("destroy");
		};
	
	
	/**						PRIVATE
	 * ______________________
	 */
		function initSlideShow(){
			if ($('.fadein').find('img').size()!==1) {
				$('.fadein img').shuffle();
				$('.fadein img:gt(0)').hide();
				setInterval(function(){$('.fadein :first-child').fadeOut().next('img').fadeIn().end().appendTo('.fadein');}, 5000);
			}
		}
		
		/** 
		 * @desc Validate all forms
		 */
		function initForms(){
			var validateSettings = $.extend(true, self.options.defaultValidateSettings, self.options.extraValidateSettings);
			$("form").each(function(){
				$(this).validate(validateSettings);
			});
		}
	}
	
})(jQuery);