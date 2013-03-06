/***********************************************************************************

Author: Ryan Barry
Email: ryanb@fullscreen.net
	
***********************************************************************************/


(function( $ ) {

	$.fn.scrollbox = function(options) {

		// Default settings.
		var settings = $.extend({

			maxItemsPerPage: 4,			// The maximum number of scrollbox items per page.
			pageIndicator: true,		// Shows the page indicator.
			scrollToPage: true,			// Makes the page indicator items clickable.
			snapToPage: true				// Makes the scrollbox snap to the nearest page when the user stops scrolling it.

		}, options);

		var methods = {
			// `init` attaches behavior to the matched elements, and syncs their state every time it is called.
			init: function() {
				var self = this;

				// Saves the settings for this scrollbox to the DOM.
				$(self).data(settings);

				var boxWidth = $(self).width();

				var $li = $(self).find('li');

				// Scrollbox items are resized (using inline styles) to fit on pages.
				// Since we're going to sum up the widths of our scrollbox items, we should clear their inline styles.
				$li.width('');

				// Writing object state to the DOM.
				// `numPages` depends on `boxWidth`, so we have to save it before we get the number of pages.
				$(self).data({ boxWidth:boxWidth });

				var numPages = methods.numPages.apply(self);
				$(self).data({ numPages:numPages });

				// Here's where we evenly apportion the widths of all scrollbox items, 
				// so we don't have a differently sized last page in the event that the `contentWidth` isn't a multiple of the `boxWidth`.
				var itemCount = $li.length;

				// Fill in the last page so that the number of items on it is the same as the maximum number of items per page.
				// This will cause the item layout, and the pagination feature to not look terrible.
				var blankItems = settings.maxItemsPerPage - (itemCount % settings.maxItemsPerPage);
				if (blankItems === settings.maxItemsPerPage)
					blankItems = 0;

				for(var i = 0; i < blankItems; i++) {
					$(self).append('<li class="scrollbox-blank"></li>');	
				}

				// This satisfies the `maxItemsPerPage` expectancy, but the last page screws up if its item count is less than the maximum.
				$li = $(self).find('li');
				var itemWidth = boxWidth / settings.maxItemsPerPage;
				$li.width(itemWidth);

				if (settings.pageIndicator) {
					// The `pageIndicator` setting shows the page indicator.

					var page = methods.curPage.apply(self);

					// Removing any previously placed indicator.
					var $pageIndicator = $(self).next('.scrollbox-page-indicator').remove();

					$(self).after('<ul class="scrollbox-page-indicator"></ul>');

					// Filling the indicator container with page items.
					for(var i = 0; i < numPages; i++) {
						var classStr = '';
						var current = (i === (page - 1));
						if (current) {
							classStr = ' class="current"';
						}

						var li = '<li'+classStr+'></li>';
						if (settings.scrollToPage) {
							li = '<a href="javascript:void(0)">'+li+'</a>';
						}

						$(self).next('.scrollbox-page-indicator').append(li);
					}

					// Detecting when the page changes as the scrollbox is scrolled, so that the page indicator can be updated.
					var lastPage = 0;
					$(self).scroll(function() {
						var newPage = methods.curPage.apply(self);

						if (newPage !== lastPage) {
							lastPage = newPage;
							methods.updatePageIndicator.apply(self, [newPage]);
						}
					});

					if (settings.scrollToPage) {
						// The `scrollToPage` setting makes the page indicator items clickable.

						var clickAction = function(event) {
							// We determine the page we should scroll to based on the index of the page indicator item that was clicked.
							var i = $(event.target).parent().index();
							var pageNum = i + 1;
							methods.scrollToPage.apply(this, [pageNum]);
						};

						$(self).next('.scrollbox-page-indicator').find('a').click(function(e) {
							clickAction.apply(self, [e]);
						});
					}
				}

				if (settings.snapToPage) {
					// The `snapToPage` setting makes the scrollbox snap to the nearest page after it is scrolled.

					// Since there is no event that is triggered for when the scrollbox stops scrolling, 
					// we must repeatedly keep checking for it.

					var timer;
					var snap = function () { 
						var nearestPage = methods.nearestPage.apply(self);
						var offset = $(self).scrollLeft();
						var numPages = methods.numPages.apply(self);

						methods.scrollToPage.apply(self, [nearestPage, 80]);
					};

					$(self).bind('scroll', function () {
						// While the user is scrolling, the timer keeps clearing.
						clearTimeout(timer);

						// When the timer goes off, we snap to the nearest page.
						timer = setTimeout(snap, 140);
					});
				}
			},
			curPage: function() {
				// Returns the page the user is currently on.

				var offset = $(this).scrollLeft();
				var boxWidth = $(this).data('boxWidth');
				var page = Math.round(offset / boxWidth) + 1;

				// var contentWidth = $(this).data('contentWidth');

				return Math.floor(page);
			},
			nearestPage: function() {
				// Returns the page number of the nearest page.

				var offset = $(this).scrollLeft();
				var boxWidth = $(this).data('boxWidth');
				var page = offset / boxWidth;

				return Math.round(page) + 1;
			},
			numPages: function() {
				// Returns the total number of pages.

				var itemCount = $(this).find('li').length;
				var maxItemsPerPage = $(this).data('maxItemsPerPage');

				var numPages = Math.ceil(itemCount / maxItemsPerPage);

				if (numPages < 1)
					numPages = 1;

				return numPages;
			},
			updatePageIndicator: function(newPage) {
				// Updates the page indicator (if one is present).
				if ($(this).data('pageIndicator')) {
					var $indicator = $(this).next('.scrollbox-page-indicator');

					var $current = $indicator.find('li.current').removeClass('current');

					if ($(this).data('scrollToPage')) {
						$indicator.find('a:nth-child('+newPage+') li').addClass('current');
					}
					else {
						$indicator.find('li:nth-child('+newPage+')').addClass('current');
					}
				}
			},
			offsetForPage: function(pageNum) {
				// Converts `pageNum` into a pixel offset relative to the far left edge of the scrollbox content.

				var boxWidth = $(this).data('boxWidth');
				return ((pageNum - 1) * boxWidth);
			},
			scrollToPage: function(pageNum, duration) {
				// Jumps the scrollbox to `pageNum`. Animates for `duration` milliseconds.

				var offset = methods.offsetForPage.apply(this, [pageNum]);

				var d = 400;
				if (typeof duration !== 'undefined')
					d = duration;

				$(this).animate({ scrollLeft:offset }, d, 'swing');
			}
    };

		// Invoking this plugin calls `init` for each matched element.
		return this.each(function() {
			methods.init.apply(this);
		});

	};
})( jQuery );