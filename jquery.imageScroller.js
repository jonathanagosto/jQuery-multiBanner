(function($) {

	$.fn.imageScroller = function(options) {
		var defaults = {
			visibleImages : 3,
			slideSpeed : 1200,
			scrollClass : 'scroller'
		};

		var options = $.extend(defaults, options);

		return this.each(function() {
			var $obj = $(this), elem = $(this).attr('id'), o = options, len = $obj.children().length, imgs = [], $inner = function() {
				var $img = $obj.children(), width = function() {
					var width = 0;
					$img.each(function(i, img) {
						var imgWidth = Math.floor($obj.width() / o.visibleImages) + 1;
						$(img).css({
							'width' : imgWidth + 'px'
						});
						imgs.push({
							'scrollLeft' : {
								'left' : '+=' + imgWidth + 'px'
							},
							'scrollRight' : {
								'left' : '-=' + imgWidth + 'px'
							}
						});
						width += imgWidth;
					});
					return width;
				}, $outer = $('<div/>', {
					'class' : elem + '-outer-wrapper'
				}).appendTo($obj), $inner = $('<div/>', {
					'class' : elem + '-inner-wrapper',
					'width' : width
				}).appendTo($outer);

				$inner.append($img);
				return $inner;
			}(), onScrollClick = function() {
				var imgCounter = o.visibleImages - 1;
				return function() {
					var $this = $(this);
					if ($this.hasClass('scrollLeft')) {
						if (imgCounter - o.visibleImages < 0)
							return;
						$inner.animate(imgs[imgCounter].scrollLeft, 1200);
						imgCounter -= 1;
						return;
					}
					if ($this.hasClass('scrollRight')) {
						if (imgCounter >= len - 1)
							return;
						$inner.animate(imgs[imgCounter].scrollRight, 1200);
						imgCounter += 1;
						return;
					}
				};
			}(), $scrollRight = $('<div/>', {
				'class' : o.scrollClass + ' scrollRight'
			}).click(onScrollClick).appendTo($obj), $scrollLeft = $('<div/>', {
				'class' : o.scrollClass + ' scrollLeft'
			}).click(onScrollClick).appendTo($obj);

		});
	}
})(jQuery);
