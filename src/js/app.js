$(() => {
    "use strict";

    const $root = $('html, body');
    const scrollSpeed = 700;

    $('a[href*="#"]:not([href="#"])').on('click', function(event) {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'')
            && location.hostname === this.hostname)
        {
            event.preventDefault();
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + target.slice(1) + ']');
            if (target.length) {
                $root.animate({
                    scrollTop: target.offset().top
                }, scrollSpeed, () => {
                    window.location.hash = target[0]['id']
                })
            }
        }
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $root.scrollspy({
        target: '#mainNav',
        offset: 56
    });

    // Collapse navbar
    const navbarCollapse = () => {
        let nav = $('#mainNav');
        if (nav.offset().top > 100) {
            nav.addClass("shrink");
        } else {
            nav.removeClass("shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
});
