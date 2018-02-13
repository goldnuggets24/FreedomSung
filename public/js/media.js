$(window).on("load", function(){
		var $container = $('#container');
		$container.isotope({
			itemSelector : '.photo',
			masonryHorizontal: {
				columnWidth: 50
			}
		});
	$('.slick-show').slick({ // Slick Slider initialization
		arrows: true,
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
		centerImage();
	});
	$(window).resize(function(){
		centerImage();
	});
	centerImage();
});