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
//
// $(document).ready(function(){
// 	$("#element").fixedscroll({padding: 20,	boundary: '#element2'});
// });
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
                
                // explicitly set the width of the parent container otherwise 
                // image positioning will shift left/right
                // make sure that the DOM object you've targeted with $(this) has 
                // an explicit width set on it otherwise this will NOT WORK
                var left = $this.offset().left;
 
                var msie6 = $.browser == 'msie' && $.browser.version < 7;

                if (!msie6) {
                    // this is our position from the top of the screen
                    // make sure that the DOM element exists
                    var top = $this.offset().top - (parseFloat($(o.boundary).css('margin-top')) || 0) - o.padding;
                    
                    // this is the height of the element we want to fix
                    var h = $this.outerHeight();  
                    
                    $(window).scroll(function (event) {
                        var y = $(this).scrollTop();    // this is where we are vertically on the page
                        // alert("var y");
                        // this is the element we want the item to stop before
                        // moved into the loop in case we're lazy loading images
                        var bottom = 0;
                        if (!(o.boundary==null)) {
                            bottom = $(o.boundary).offset().top - h - o.padding; 
                        }
                        
                        var b = bottom - y;             // this is how close to the bottom boundary we are
                        
                        // check to see if we've scrolled and the element is touching the window top
                        if (y >= top) {
                            // alert("y>=top");
                            // if we've scrolled and are touching, fix the element in place
                            $this.css({'position':'fixed', 'top':o.padding+'px', 'left':left+'px'});
                            
                            // now let's see how close to the bottom we are
                            //if (bottom && b <= 0) {     
                            //    // if we're at the boundary, freeze the ad in place
                            //    $this.css({'position':'absolute', 'top': bottom + 'px !important'});
                            //} else {  
                            //    // if we're not at the boundary (anymore?), remove the style attr
                            //    $this.css({'position':'fixed', 'top':o.padding+'px'});
                            //}
                        } else {
                            // otherwise remove it
                            $this.css({'position':'static', 'top':'auto'}); 
                        }
                    });
                }
            });
        }
    });
    
})(jQuery);
