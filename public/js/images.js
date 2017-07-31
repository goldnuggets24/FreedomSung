var dir = "/images/local";
var fileextension = ".jpg";
$.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: dir,
    success: function (data) {
        //List all .png file names in the page
        $(data).find("a:contains(" + fileextension + ")").each(function () {
            var filename = this.href.replace(window.location.host, "").replace("http://", "");
            var node = document.getElementById('carousel');
			var newNode = document.createElement('div');
			newNode.setAttribute('class', 'carousel-cell');
			a = $(newNode).append("<a href='" + filename + "data-fancybox='images'>");
			img = $(a).append("<data-flickity-lazyload='" + dir + filename + "'>");
			img.setAttribute('class', 'carousel-cell-image');
			img.setAttribute('alt', filename);
			node.appendChild(newNode);

        });
    }
});