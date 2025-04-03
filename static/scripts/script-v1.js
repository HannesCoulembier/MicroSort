$(document).ready(function () {
    $('#fullpage').fullpage({
        menu: '#nav-top, #nav-mobile',
        lockAnchors: false,
        scrollingSpeed: 400,

        anchors: ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5', 'slide-6'],
        navigation: false,
        slidesNavigation: false,

        
    });

    // close nav on click
    $('.navbar-sticky, .navbar-top').click(function(){
        $('.mobilemenu').toggleClass('active');
    });

    $('.mobilemenu, .mobilemenu a').on('click', function(){
        $('.mobilemenu').removeClass('active');
    });

    // add active class to active menu link on detail page
    var slug = self.location.href.split('/');
    slug = slug[slug.length - 2];
    $('.navbar-top li, .mobilemenu li').each(function(index, item){
        if($(item).find('a').attr('href') == '/' + slug){
            $(item).addClass('active');
        }
    });

    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        autoHeight: true,
        dots: true,
        nav: false
    });
});
