/**
 * @desc : put common functionality in here
 */

(function($){
	
	RGI.PageController = function(options){
		
		var self = this;
		var $parent = $("body");
		
		var $checkboxTree;
		
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
			initCheckboxTree();
		}
		initialize();
		
		
	
	/**						PUBLIC
	 * ______________________
	 */
		this.removeAllErrorQtips = function(){
			$parent.find(".input-error").qtip("destroy");
		};
		
		this.updateQtipPosition = function(){
			updateQtipPosition();
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
			
			var $datePicker = $(".datepicker");
			if($datePicker.length > 0){
				$datePicker.datepicker({
					 changeMonth: true,
					 changeYear: true
			    });	
			}
		}
		
		function updateQtipPosition(){
			$parent.find(".input-error").qtip("reposition");
		}
		
		function initCheckboxTree(){
			$checkboxTree = $(".checkbox-tree");
			
			if($checkboxTree.length > 0){
			   	$checkboxTree.checkboxTree({
                   initializeChecked: 'expanded',
                   initializeUnchecked: 'collapsed',
                   collapseEffect : null,
                   expandEffect : null,
                   collapse : function(){
                       updateQtipPosition();
                   },
                   expand : function(){
                       updateQtipPosition();
                   },
                   checkParents : false,
                   checkChildren : false,
                   uncheckChildren : false,
                   initialState : 'collapse'
               });
           }
		}
	}
	
})(jQuery);