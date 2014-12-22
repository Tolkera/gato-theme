$(window).on('load', function () {
    $('.blockquote-slider').carouselira({
        arrowNav: {
            navNext: '.blockquote_slider--prev',
            navPrev: '.blockquote_slider--next'
        },
        speed: .3
    })
});
