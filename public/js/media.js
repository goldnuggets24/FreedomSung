$(document).ready(function(){
	setTimeout(function(){
		var $container = $('#container');
		$container.isotope({
			itemSelector : '.photo',
			masonryHorizontal: {
				columnWidth: 50
			}
		});
	}, 1200);
    	$('.slick-show').slick({ // Slick Slider initialization
			arrows: false,
			fade: false,
			slidesToShow: 1,
			autoplay: false
		});
		$('.slick-show').on('afterChange', function(slick, currentSlide){
				console.log(currentSlide.currentSlide);
		});
	    $("#menu-toggle").click(function(e) {
	    	$('.slick-show')[0].slick.refresh(); // resizes photo on toggle
	        $("#wrapper").toggleClass("toggled toggle");
	    });
	    $(".isotope-item").click(function(){
			var index = $(".isotope-item").index(this);
			$('.slick-show').slick('slickGoTo', index, false);
		});
	});