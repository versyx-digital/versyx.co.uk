import 'bootstrap';
import './scss/app.scss';
import {library, dom} from '@fortawesome/fontawesome-svg-core';
import { faCircle, faLaptop, faPlus, faServer, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(faCircle, faFacebookF, faLaptop, faPlus, faServer, faShoppingCart, faTimes, faTwitter );
dom.watch();

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');
} catch (e) {
    console.log(e);
}

$(() => {
    "use strict";

    const root = $('html, body');
    const scrollSpeed = 700;

    $('a[href*="#"]:not([href="#"])').on('click', function(event) {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'')
            && location.hostname === this.hostname)
        {
            event.preventDefault();
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + target.slice(1) + ']');
            if (target.length) {
                root.animate({
                    scrollTop: target.offset().top
                }, scrollSpeed, "easeInOutExpo", () => {
                    window.location.hash = target[0]['id']
                })
            }
        }
    });

    const navbarCollapse = () => {
        let nav = $('#mainNav'),
            overlay = $('.full-overlay')[0];

        (typeof overlay === 'undefined')
            ? nav.addClass('prevent-def')
            : nav.removeClass('prevent-def');

        (nav.offset().top > 100)
            ? nav.addClass('shrink')
            : nav.removeClass('shrink');
    };
    navbarCollapse();
    $(window).scroll(navbarCollapse);
});
