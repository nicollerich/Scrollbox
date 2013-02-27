(function( $ ) {

	var boxWidth;
	var numPages;

  $.fn.scrollbox = function(options) {

  	var settings = $.extend({
  		pageIndicator:true,
  		scrollToPage:true
    }, options);

    var lastPage = 0;
    var contentWidth = 0;

    var methods = {
    	init: function() {
	  		boxWidth = $(this).width();

		    $(this).find('li').each(function(i, elem) {
		    	var w = $(elem).width();
		    	contentWidth += w;
		    });

		    numPages = methods.numPages.apply(this);

		    if (settings.pageIndicator) {
		    	$(this).after('<ul class="scrollbox-page-indicator"></ul>');

		    	var page = methods.curPage.apply(this);
		    	for(var i = 0; i < numPages; i++) {

		    		var classStr = '';
		    		var current = (i === (page - 1));
		    		if (current) {
		    			classStr = ' class="current"';
		    		}
		    		
		    		var li = '<li'+classStr+'></li>';
		    		if (!current && settings.scrollToPage) {
		    			li = '<a href="javascript:void(0)">'+li+'</a>';
		    		}

		    		$('.scrollbox-page-indicator').append(li);
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

				if (settings.pageIndicator) {
					var $indicator = $('.scrollbox-page-indicator');

					var $current = $indicator.find('li.current').removeClass('current');

					if (settings.scrollToPage) {
						$current.wrap('<a href="javascript:void(0)"></a>');
						$indicator.find('a:nth-child('+newPage+') li').addClass('current').unwrap();
					}
					else {
						$indicator.find('li:nth-child('+newPage+')').addClass('current');
					}
				}
			},
			offsetForPage: function(pageNum) {
				return (pageNum - 1) * boxWidth;
			},
			scrollToPage: function(pageNum) {
				var offset = methods.offsetForPage.apply(this);
				// $('.')
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