//function modal immediately executed, which returns an object containing modal controls
//Object is assigned to the modal variable
//Other variables corespond to the corresponding elements in the html doc

var modal = (function(){
	var
	method = {},
	$overlay,
	$modal,
	$content,
	$close;
	
	//centre the modal in viewport:
	//find vertical/horizontal centre - outerHeight includes buff/padding, mathmax => no values less than 0
	//If the values are 0, positioned in top left
	//Keep the viewport centered if the viewer has changed the scroll position
	method.center = function () {
		var top, left;
		
		top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
		left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;
		
		$modal.css({
			top:top + $(window).scrollTop(),
			left:left + $(window).scrollLeft()
		});
	};
	
	//Open the modal - Appends data from settings.content to #content
	//Give modal a width and height if it was specified in the settings object
	method.open = function (settings) {
		$content.empty().append(settings.content);
		
		$modal.css({
			width: settings.width || 'auto',
			height: settings.height || 'auto'	
		})
		
		//Re-centre the modal if viewport changes size and reveal the model and overlay
		method.center();
		$(window).bind('resize.modal', method.center);
		$modal.show();
		$overlay.show();
	};
	
	//Close the modal - Hide modal and overlay, empty content, and unbind
	method.close = function () {
		$modal.hide();
		$overlay.hide();
		$content.empty();
		$(window).unbind('resize.modal');
	};
	
	//Create the new HTML to append the HTML with
	$overlay = $('<div id="overlay"></div>');
	$modal = $('<div id="modal"></div>');
	$content = $('<div id="content"></div>');
	$close = $('<a id="close" href="#">close</a>');
	
	$modal.hide();
	$overlay.hide();
	$modal.append($content, $close);
	
	$(document).ready(function(){
		$('body').append($overlay, $modal);
	});
	
	//stops redirecting to href and closes the modal on clicking close
	$close.click(function(e){
		e.preventDefault(); 
		method.close();		
	});
	
	return method;
}());

// Wait until the DOM has loaded before querying the document
$(document).ready(function(){
	modal.open({content: "<p><strong><h2>LIGHT BOX</h2></strong><br>The rest of the screen is greyed out of focus so the attention is on this box!</p>"});
	
	$('a#text').click(function(e){
		$('#content').css({background : "url(tears.png)", height: "180px", "text-align" : "left"});
		modal.open({content: "<h2>It works!</h2>", width: "450px", height: "220px"});
		e.preventDefault();
	});
});