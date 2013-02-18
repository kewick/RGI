/**
 * @desc : put common functionality in here
 */

(function($){
	
	RGI = {};
	
	RGI.PageController = function(options){
		
		var self = this;
		
		self.options = { };
		
		$.extend(true, self.options, options);
		
		
		function initialize(){
			if ($('.fadein').find('img').size()!==1) {
				$('.fadein img').shuffle();
				$('.fadein img:gt(0)').hide();
				setInterval(function(){$('.fadein :first-child').fadeOut().next('img').fadeIn().end().appendTo('.fadein');}, 5000);
			}
		}
		initialize();
	}
	
})(jQuery);