Usage
=====
	
HTML
----

The scrollbox itself must be a `<ul>` or an `<ol>` element. The scrollbox must contain `<li>` elements. The `<li>` items contain automatically centered, custom content. The scrollbox automatically assigns items to pages.

		<ul class="scrollbox">
	  	<li>foo</li>
	  	<li>bar</li>
	  	<li>baz</li>
	  	<li>foofoo</li>
	  	<li>foobar</li>
	  	<li>foobaz</li>
	  	<li>barfoo</li>
	  	<li>barbar</li>
	  	<li>barbaz</li>
	  </ul>

CSS
---

This should be your base CSS, but you can override it with custom styling.

		.scrollbox {																					
		  box-shadow: inset 0 1px 4px rgba(0,0,0,.5);
		  -webkit-box-shadow: inset 0 1px 4px rgba(0,0,0,.5);
		  -moz-box-shadow: inset 0 1px 4px rgba(0,0,0,.5);
			min-height: 2em;
			list-style: none;
			border-radius: 4px;
			padding: 0;
			white-space: nowrap;
			overflow: scroll;
			left: 0;
			right: 0;
			margin-left: auto;
			margin-right: auto;
		}
		.scrollbox li {
			display: inline-block;
			margin-right: -4px;
			text-align: center;
			vertical-align: text-top;
			white-space: normal;
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

		  -webkit-transition: all 0.2s ease-out;
		 	-moz-transition: all 0.2s ease-out;
		  -ms-transition: all 0.2s ease-out;
		  -o-transition: all 0.2s ease-out;
		  transition: all 0.2s ease-out;
		}
		.scrollbox-page-indicator li.current {
			background-color: #929292;
		}		

JavaScript
----------

Scrollbox is a jQuery plugin. Call it like the following when the element(s) you want to scrollbox-ify have loaded.

		$('.scrollbox').scrollbox({		// You can use selectors that match any number of elements you want to scrollbox-ify.
      pageIndicator:true,					// See the defaults in the source below for a guide on what options are available.
      scrollToPage:true,
      snapToPage:true
    });