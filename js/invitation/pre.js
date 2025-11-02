// Get the current page scroll position
scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop;
scrollLeft =
    window.pageXOffset ||
    document.documentElement.scrollLeft,

    // if any scroll is attempted,
    // set this to the previous value
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };

function enableScroll() {
    window.onscroll = function () { };
}

setTimeout(function() {
  $('#preloader').delay(350).fadeOut('slow');
}, 20000);

