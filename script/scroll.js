$(window).load(function(){

    var body = $('body'),
        $window = $(window),
        linkActiveClass = 'main-nav__link--current',
        introLinkClass = 'js-intro-link',
        mainNavLink = $('.js-nav-link'),
        destinationBlock = $('.js-scroll-destination'),
        linkHasClass = false;

    mainNavLink.on('click', function(e) {
        e.preventDefault();
        var sectionId = $(this).attr('href'),
            currentLink = ($(this).hasClass(introLinkClass)) ? findCurrentLink(sectionId) : $(this);
        animateBody(sectionId, currentLink);
    });

    destinationBlock.each(function(){  //when scrolling need to update the classes
        var section = $(this),
            sectionId = '#' + section.attr('id'),
            top = section.offset().top,
            bottom = section.height() + top,
            correspondingNavLink = findCurrentLink(sectionId);

        updatePosition(top, bottom, correspondingNavLink);

        $window.on('scroll', function(){
            updatePosition(top, bottom, correspondingNavLink)
        })
    });

    function updatePosition(top, bottom, correspondingNavLink){

        if($window.scrollTop() > top && $window.scrollTop() < bottom) {
            if(!linkHasClass){
                updateClass(correspondingNavLink);
                linkHasClass = true
            } else {
                linkHasClass = false;
            }
        }
    }

    function animateBody(sectionId, currentLink){
        body.animate({scrollTop: $(sectionId).offset().top}, 800, function(){
            updateClass(currentLink)});
    }

    function updateClass(currentLink){
        mainNavLink.removeClass(linkActiveClass);
        currentLink.addClass(linkActiveClass);
    }

    function findCurrentLink(sectionId){
        return mainNavLink.filter(function(){return $(this).attr('href') == sectionId})
    }

});
