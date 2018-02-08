$(window).on("load", function(){
	setTimeout(function(){
		var $container = $('#container');
		$container.isotope({
			itemSelector : '.photo',
			masonryHorizontal: {
				columnWidth: 50
			}
		});
	}, 2000);
	$('.slick-show').slick({ // Slick Slider initialization
		arrows: false,
		fade: false,
		slidesToShow: 1,
		autoplay: false
	});
	// $('.slick-show').on('afterChange', function(slick, currentSlide){
	// 		console.log(currentSlide.currentSlide);
	// });
    $("#menu-toggle").click(function(e) {
    	$('.slick-show')[0].slick.refresh(); // resizes photo on toggle
        $("#wrapper").toggleClass("toggled toggle");
    });
    $(".photo").click(function(){
		var index = $(".photo").index(this);
		console.log(index);
		$('.slick-show').slick('slickGoTo', index, false);
	});
});