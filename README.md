Usage
=====

HTML
----

The scrollbox must contain a `<div>` element for each item. The the custom content in each item will be centered. The scrollbox automatically assigns items to pages.

		<div class="scrollbox">
			<div>foo</div>
			<div>bar</div>
			<div>baz</div>
			<div>foofoo</div>
			<div>foobar</div>
			<div>foobaz</div>
			<div>barfoo</div>
			<div>barbar</div>
			<div>barbaz</div>
		</div>

CSS
---

This is recommended for your base CSS, but you can override it with custom styling.

		.scrollbox {
			min-height: 2em;
			border-radius: 4px;
			padding: 0;
			overflow: scroll;
			left: 0;
			right: 0;
			margin-left: auto;
			margin-right: auto;

			-webkit-box-shadow: inset 0 1px 4px rgba(0,0,0,.5);
			-moz-box-shadow: inset 0 1px 4px rgba(0,0,0,.5);
			box-shadow: inset 0 1px 4px rgba(0,0,0,.5);
		}
		.scrollbox-item-container {
			overflow: auto;
		}
		.scrollbox-item-container > div {
			text-align: center;
			vertical-align: text-top;
			float: left;
		}

		.scrollbox-page-indicator {
			list-style: none;
			margin: .2em;
			padding: 0;
			text-align: center;
		}
		.scrollbox-page-indicator li {
			display: inline-block;
			width: 9px;
			height: 9px;
			border-radius: 9px;
			-webkit-border-radius: 9px;
			-moz-border-radius: 9px;
			background-color: #dbdbdb;
			margin-right: 5px;

			-webkit-transition: all 0.2s ease-out;  /* Saf3.2+, Chrome */
			-moz-transition: all 0.2s ease-out;  /* FF4+ */
			-ms-transition: all 0.2s ease-out;  /* IE10 */
			-o-transition: all 0.2s ease-out;  /* Opera 10.5+ */
			transition: all 0.2s ease-out;
		}
		.scrollbox-page-indicator li.current {
			background-color: #929292;
		}

JavaScript
----------

Scrollbox is a jQuery plugin. When all the above HTML and CSS have been loaded, call it like this:

		$('.scrollbox').scrollbox({		// You can use selectors that match any number of elements you want to scrollbox-ify.
			maxItemsPerPage: 4,					// The maximum number of scrollbox items per page.
			pageIndicator:true,					// Shows the page indicator.
			scrollToPage:true,					// Makes the page indicator items clickable (only relevant when `pageIndicator` is true.
			snapToPage:true							// Makes the scrollbox snap to the nearest page when the user stops scrolling it.
		});

Every time this is called, the scrollbox will sync with the DOM state.
