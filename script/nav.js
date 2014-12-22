$(function(){
    var $window = $(window),
        navButton = $('.nav__button'),
        mainNav = $('.main-nav'),
        header = $('.site-header'),
        headerFixedClass = 'site-header__fixed',
        positionToFixHeader = $('#about').offset().top;

        navButton.on('click', function(){
        mainNav.toggle();
        navButton.toggleClass('nav__button--open');
    });

    $window.on('resize', function(){
        if( navButton.is(':hidden') ){
            mainNav.show();
        }
    });

    $window.on('scroll', function(){
        ($window.scrollTop() >= positionToFixHeader) ? header.addClass(headerFixedClass) :  header.removeClass(headerFixedClass);
    });
});
