//BEGIN SHUFFLE FUNCTION
$.fn.shuffle = function() { 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
};
//END SHUFFLE FUNCTION   

//BEGIN MODAL BOX FUNCTION
var modalBox = (function(){
    var 
    method = {},
    $pageOverlay,
    $modalBox,
    $modalContent,
    $modalClose;

    //take the absolute positioned modal-box div and center it
    method.centerModal = function () {
		var top, left;
		top = Math.max($(window).height() - $modalBox.outerHeight(), 0) / 2;
		left = Math.max($(window).width() - $modalBox.outerWidth(), 0) / 2;

		$modalBox.css({
			top:top + $(window).scrollTop(), 
			left:left + $(window).scrollLeft()
		});
	};

    // Open the modal box
    method.openModal = function (settings) {
		$modalContent.empty().append(settings.modalContent);
		$modalBox.css({
			width: settings.width || 'auto', 
			height: settings.height || 'auto'
		})
		method.centerModal();
		$(window).bind('resize.modalBox', method.centerModal);
		$modalBox.show();
		$pageOverlay.show();
	};

    // Close the modal box
    method.modalClose = function () {
		$modalBox.hide();
		$pageOverlay.hide();
		$modalContent.empty();
		$(window).unbind('resize.modalBox');
	};
	
	// Build html items
	$pageOverlay = $('<div id="page-overlay"></div>');
	$modalBox = $('<div id="modal-box"></div>');
	$modalContent = $('<div id="modal-content"></div>');	

	$modalBox.hide();
	$pageOverlay.hide();
	$modalBox.append($modalContent);
	
	$(document).ready(function(){
		$('body').append($pageOverlay, $modalBox);						
	});
	
    return method;
}());
//END MODAL BOX FUNCTION

