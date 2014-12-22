(function($){

    function tabira(element, options){
        this.options = $.extend({}, {
            effect: 'fade',
            activeClass: '',
            tabContentParent: '',
            initialTab: 0
        }, options);

        this.tab = $(element);
        this.init();
    }

    tabira.prototype = {
        init: function(){
            this.tabsLinks = this.tab.children();
            this.content = this.checkOptionType(this.options.tabContentParent).children();
            var self = this;
            this.setInitialDisplay();

            this.tabsLinks.on('click', function(e){
                e.preventDefault();
                var clickedLink = $(this);

                if(!(clickedLink.hasClass(self.options.activeClass))){
                    self.filterItems(clickedLink);
                }
            })
        },

        setInitialDisplay: function(){
            var initialLink = this.tabsLinks.eq(this.options.initialTab);
            this.filterItems(initialLink);
            this.makeLinkActive(initialLink)
        },

        filterItems: function(clickedLink){
            var tabsToShow = this.content.hide().filter('.'+ clickedLink.data('tab'));

            switch(this.options.effect) {
                case 'show':
                    tabsToShow.show();
                    break;
                case 'fade':
                    tabsToShow.fadeIn(500);
                    break;
            }
            this.makeLinkActive(clickedLink)
        },

        makeLinkActive: function(self){
            this.tabsLinks.removeClass(this.options.activeClass);
            self.addClass(this.options.activeClass);
        },

        checkOptionType: function(option){
            switch (typeof(option)){
                case 'function':
                    return option.call(this.tab);
                case 'string':
                    return $(option)
            }
        }
    };

    $.fn.tabira = function(options){
        return this.each(function(){
            new tabira(this, options)
        })
    }

}(jQuery));

$(function(){
   $('.js-process-tab').tabira({
       activeClass: 'js-tab-link--active',
       action: 'tab',
       tabContentParent: '.js-process-content',
       effect: 'show'
   });

    $('.js-portfolio-nav').tabira({
       action: 'sort',
       activeClass: 'js-tab-link--active',
       tabContentParent: '.js-portfolio',
       effect: 'fade',
    })
});