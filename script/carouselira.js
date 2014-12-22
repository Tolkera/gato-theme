(function($){

    function Carouselira(element, options){
        this.options = $.extend({}, {
            speed: 1,
            firstSlide: 0,
            bulletNav: {
                container: '',
                bulletHtml: '',
                bulletActive: ''
            },
            arrowNav: {
                navNext: '',
                navPrev: ''
            },
            effect: 'fade'
        }, options);

        this.slider = $(element);
        this.init();
    }

    Carouselira.prototype = {
        init: function(){
            this.slides = this.slider.children();
            this.slidesLen = this.slides.length;
            this.lastSlide = this.slidesLen - 1;
            this.current = this.options.firstSlide;
            this.nextSlide = this.current;
            if(this.slidesLen > 1){
                this.setInitialDisplay();
            }
        },

        setInitialDisplay: function(){

            switch(this.options.effect) {
                case 'slide':
                    this.slides.hide().eq(this.options.firstSlide).show();
                    break;
                case 'fade':
                    this.slides.css('opacity', 0).eq(this.options.firstSlide).css('opacity', 1);
            }

            this.slider.css({
                position: 'relative',
                overflow: 'hidden'
            });

            this.slides.css({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            });


            if(this.options.bulletNav.container && this.options.bulletNav.bulletHtml) {
                this.buildBulletNav = true;
                this.initializeBulletNav();
            }

            if(this.options.arrowNav.navNext && this.options.arrowNav.navPrev) {
                this.buildArrowNav = true;
                this.initializeArrowNav();
            }
        },

        initializeArrowNav: function(){
            var self = this;

            var navPrev = this.checkOptionType(this.options.arrowNav.navPrev);
            var navNext = this.checkOptionType(this.options.arrowNav.navNext);

            passDirection(navPrev, 'prev');
            passDirection(navNext, 'next');

            function passDirection(btn, dir){
                btn.on('click.carouselira', function(){
                    self.handleClick('arrow', dir);
                })
            }
        },

        initializeBulletNav: function() {
            var self = this;
            this.createBulletNav();
            this.updateCurrent();

            this.bullet.on('click.carouselira', function(){
                var clickedBulletIndex = $(this).index();
                if (clickedBulletIndex != self.current){
                    self.handleClick('bullet', '', clickedBulletIndex)
                }

            })
        },

        handleClick: function(method, dir, next){
            if(!(this.slider.hasClass('transitioning'))){

                var nextSlideData = {
                    nextSlide: next,
                    direction: dir,
                    method: method
                };

                if(this.options.effect == "slide" && method == 'bullet') {
                    nextSlideData.direction = (next > this.current) ? "next" : "prev";
                }

                this.setNextSlide(nextSlideData);
            }
        },

        setNextSlide: function(options){

            switch(options.method){
                case 'arrow':
                    if(options.direction == "next") {
                        this.nextSlide = (this.current == this.lastSlide) ? 0 : this.current + 1;
                    } else {
                        this.nextSlide = (this.current == 0) ? this.lastSlide : this.current - 1;
                    }
                    break;
                case 'bullet':
                    this.nextSlide = options.nextSlide;
                    break;
            }

            this.changeSlides(options.direction);
        },

        changeSlides: function(options){
            var self = this;
            var currentSlide = this.slides.eq(self.current);
            var nextSlide = this.slides.eq(self.nextSlide);

            this.slider.addClass('transitioning');

            switch (this.options.effect) {
                case "fade":
                    this.changeSlidesWithFading(currentSlide, nextSlide);
                    break;
                case "slide":
                    this.changeSlidesWithSliding(currentSlide, nextSlide, options);
                    break;
            }

            nextSlide.on('transitionend', function(){
                currentSlide.off('transitionend');
                nextSlide.off('transitionend');
                self.slider.removeClass('transitioning');
                self.updateCurrent();
            });
        },

        updateCurrent: function(){
            this.current = this.nextSlide;
            var activeClass = this.options.bulletNav.bulletActive;
            if(this.buildBulletNav) {
                this.bullet.removeClass(activeClass).eq(this.current).addClass(activeClass);
            }
        },

        createBulletNav: function(){
            var bulletsHtml = "";
            var bullet = this.options.bulletNav.bulletHtml;
            var navContainer = this.checkOptionType(this.options.bulletNav.container);

            for ( var i = 0; i < this.slidesLen; i++ ){
                bulletsHtml += bullet;
            }
            navContainer.html(bulletsHtml);
            this.bullet = navContainer.children();
        },

        changeSlidesWithFading: function(currentSlide, nextSlide){
            currentSlide.css({'opacity': 0,'transition': 'opacity ' + this.options.speed + 's' + ' ease-in-out'});
            nextSlide.css({'opacity': 1,'transition': 'opacity ' + this.options.speed +'s' + ' ease-in-out'});
        },

        changeSlidesWithSliding: function(currentSlide, nextSlide, options){
            var self = this;
            var currentSlidePositioning, nextSlidePositioning;
            if (options == "next") {
                currentSlidePositioning = '-100%';
                nextSlidePositioning = '100%'
            } else {
                currentSlidePositioning = '100%';
                nextSlidePositioning = '-100%'
            }

            nextSlide.css({'left': nextSlidePositioning}).show().delay()
                .queue(function() {
                    $(this).css({'transition': 'left ' + self.options.speed +'s' + ' ease-in-out', 'left': '0'});
                    currentSlide.css({'left': currentSlidePositioning,'transition': 'left ' + self.options.speed +'s' + ' ease-in-out'});
                    $(this).on('transitionend', function(){
                        $(this).dequeue();
                        currentSlide.hide().css({ left: 0, 'transition': 'none'});
                    })
                })
        },

        checkOptionType: function(option){
            switch (typeof(option)){
                case 'function':
                    return option.call(this.slider);
                case 'string':
                    return $(option)
            }
        }
    };

    $.fn.carouselira = function(options){
        return this.each(function(){
            new Carouselira(this, options)
        })
    }

}(jQuery));