/**
 * @desc : put common functionality in here
 */

(function($){
	
	RGI.PageController = function(options){
		
		var self = this;
		var $parent = $("body");
		
		var $mainMenu = $parent.find("nav#main-nav ul#menu");
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
			
			if($mainMenu.length > 0){
				initMainMenu();
			}
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
		
		function initMainMenu(){
			$mainMenu.find("> li").on({
				mouseenter : function(){
					$(this).addClass("active");
				},
				mouseleave : function(){
					$(this).removeClass("active");
				}
			})
		}
		
		/** 
		 * @desc Validate all forms
		 */
		function initForms(){
			var validateSettings = $.extend(true, self.options.defaultValidateSettings, self.options.extraValidateSettings);
			$("form").each(function(){
				$(this).validate(validateSettings)
				$(this).find("input, select").on({
					focusout : function(){
						$(this).valid();
					}
				});
			});
			
			initCustomFields();
			
			var $datePicker = $(".datepicker");
			if($datePicker.length > 0){
				$datePicker.datepicker({
					 changeMonth: true,
					 changeYear: true
			    });	
			}
			
			$("form").find(".help-icon").qtip({
				position: {
					my: "left center",
					at: "right center",
					viewport: $(window)
				}
			});
		}
		
		/**
		 * dynamically adds validate options
		 */
		function initCustomFields(){
			$parent.find(".custom-field").each(function(){
				var $target = $(this);
				var fieldName = $target.attr("name");
				var customConditions = $target.data("customconditions").toString();
				var customConditionVals = $target.data("customconditionvals").toString();
				var requiredMessage = $target.data("requiredmessage");
				
				var options = {};
				if(customConditions != null){
					customConditions = customConditions.split(",");
					customConditionVals = customConditionVals.split(",");
					for(var i=0; i<customConditions.length; i++){
						options[customConditions[i]] =  customConditionVals[i];
					}
				}
				if(requiredMessage != null && requiredMessage != ""){
					options.messages = {
						"required" : requiredMessage
					}
				}
				
				$target.rules("add", options);
			});
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