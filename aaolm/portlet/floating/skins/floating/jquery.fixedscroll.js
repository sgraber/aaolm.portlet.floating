//
// FixedScroll: 
// A plugin to fix an element to the screen while scrolling.
// 
// Initial code from: http://jqueryfordesigners.com/fixed-floating-elements/
// Modified to work as a plugin.  Added options to allow the user to:
//
// 1) add padding to the top of the element being fixed
// 2) set an element that the fixed item cannot scroll past
//
// This does not work in IE6.
//
// Usage:
// Best to be called from the window load function so as to take into 
// account any images that are loaded in the document.  Below is an example:
//
// $(window).load(function(){
// 		$("#element").fixedscroll({
//				padding: 20,
//				boundary: '#element2'
//		});
//	});
//
(function($){
 	$.fn.extend({ 
 		
 		fixedscroll: function(options) {
 		    
			var defaults = { 
			    padding: 0,
           		boundary: null
			};
			
			var options = $.extend(defaults, options);

    		return this.each(function() {
				var o = options;
				var $this = $(this);				
				  
				var msie6 = $.browser == 'msie' && $.browser.version < 7;

                if (!msie6) {
					// this is our position from the top of the screen
					// var top = $this.offset().top - parseFloat($this.css('margin-top').replace(/auto/, 0)) - o.padding;   
					var top = $this.offset().top - (parseFloat($('#comment').css('margin-top')) || 0) - o.padding;
					// this is the height of the element we want to fix
					var h = $this.outerHeight();  
					
					$(window).scroll(function (event) {
						var y = $(this).scrollTop();    // this is where we are vertically on the page
						
						// this is the element we want the item to stop before
						// moved into the loop in case we're lazy loading images
						var bottom = 0;
						if (!(o.boundary==null)) {
							bottom = $(o.boundary).offset().top - h - o.padding; 
						}
						
						var b = bottom - y;             // this is how close to the bottom we are
                        
						// check to see if we've scrolled and the element is touching the window top
                        if (y >= top) {
							// if we've scrolled and are touching, fix the element in place
							$this.css({'position':'fixed', 'top':o.padding+'px'});
							
							// now let's see how close to the bottom we are
							if (bottom && b <= 0) {     
							    // if we're at the bottom, freeze the ad in place
							    $this.css({'position':'absolute', 'top':bottom+'px'});
    			            } else {  
    			                // if we're not at the bottom (anymore?), remove the style attr
    			                $this.css({'position':'fixed', 'top':o.padding+'px'});
    			            }
                        } else {
							// otherwise remove it
							$this.css({'position':'relative', 'top':'auto'}); 
                        }
					});
                }
    		});
    	}
	});
	
})(jQuery);