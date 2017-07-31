function imageRetrieval(folder) {
	var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
	var dir = "/" + folder + "/";
	var fileextension = ".jpg";
	var node = document.getElementsByClassName('flickity-slider');
	var $cellElems = $("<div class='carousel-cell'><a href='" + dir + "nersa.JPG'" + "data-fancybox='images' data-width='2048' data-height='1365'><img alt='nersa.JPG' class='carousel-cell-image' data-flickity-lazyload='" + dir + "nersa.JPG" + "'/></a></div>");
	$carousel.flickity( 'insert', $cellElems, 1 );
}