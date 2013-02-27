(function( $ ) {

	var boxWidth;
	var numPages;

  $.fn.scrollbox = function(options) {

  	var settings = $.extend({
  		pageIndicator:true
    }, options);

    var lastPage = 0;

    var methods = {
    	init: function() {
	  		boxWidth = $(this).width();
		  	contentWidth = 0;

		    $(this).find('li').each(function(i, elem) {
		    	var w = $(elem).width();
		    	contentWidth += w;
		    });

		    numPages = methods.numPages.apply(this);

		    if (settings.pageIndicator) {
		    	$(this).after('<ul class="searchbox-page-indicator"></ul>');

		    	var page = methods.curPage.apply(this);
		    	for(var i = 0; i < numPages; i++) {

		    		var classStr = '';

		    		if (i === page - 1) {
		    			classStr = ' class="current"';
		    		}

		    		$('.searchbox-page-indicator').append('<li'+classStr+'></li>');
		    	}
		    }
    	},
    	curPage: function() {
				var offset = $(this).scrollLeft();
				var page = offset / boxWidth;

				return Math.floor(page) + 1;
			},
			numPages: function() {
		    var numPages = Math.floor(contentWidth / boxWidth);
		    if (numPages < 1)
		    	numPages = 1;

		    return numPages;
			},
			pageChanged: function(newPage) {
				console.log('pageChanged to '+newPage);

				$('.searchbox-page-indicator li.current').removeClass('current');
				$('.searchbox-page-indicator li:nth-child('+newPage+')').addClass('current');
			},
			offsetForPage: function(pageNum) {
				return (pageNum - 1) * boxWidth;
			},
			scrollToPage: function(pageNum) {

			}
    };
    m_ = methods;	// debug

    $(this).scroll(function() {
    	var newPage = methods.curPage.apply(this);
    	if (newPage !== lastPage) {
    		lastPage = newPage;
    		methods.pageChanged.apply(this, [newPage]);
    	}
    });

  	return this.each(function() {
  		methods.init.apply(this);
	  });

  };
})( jQuery );