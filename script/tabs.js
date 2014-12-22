///*
//$(function () {
//
//   var tabLink = $('.js-tab-link'),
//        tabContent = $('.tab__item-content'),
//        tabLinkActiveClass = 'js-tab-link--active';
//
//    tabContent.hide().eq(0).show();
//    tabLink.eq(0).addClass(tabLinkActiveClass);
//
//    tabLink.on('click', function(e){
//        tabClickHandler($(this), e, tabLinkActiveClass, tabLink, switchTabs($(this)))
//    });
//
//    var portfolioItem = $('.portfolio-item'),
//        portfolioNav = $('.js-portfolio-tab-link');
//
//    portfolioNav.on('click', function (e) {
//        tabClickHandler($(this), e, tabLinkActiveClass, portfolioNav, filterProjects($(this)));
//    });
//
//    function tabClickHandler(self, e, activeClass, allLinks, callback ){
//       e.preventDefault();
//       if(!(self.hasClass(activeClass))){
//           callback;
//           makeLinkActive(activeClass, allLinks, self)
//       }
//    }
//
//    function makeLinkActive(activeClass, allLinks, self){
//        allLinks.removeClass(activeClass);
//        self.addClass(activeClass);
//    }
//
//    function switchTabs(self){
//        tabContent.hide();
//        $('#' + self.data('tab')).show();
//    }
//
//    function filterProjects(self){
//        var category = self.data('project');
//        if(category == 'js-project-cat_all') {
//            portfolioItem.fadeIn();
//        } else {
//            portfolioItem.hide().filter('.'+ category).fadeIn(800);
//        }
//    }
//})*/
