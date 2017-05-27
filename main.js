$(window).on('resize', function () {
  if (document.body.clientWidth < 960) {
    if (document.body.clientHeight > 700) {
      $('.nav-desk').hide(0);
    }
  } else {
    $('.nav-desk').show(0);
  }
});

$(document).ready(function () {
  $('.nav-toggle').click( function (e) {
    e.preventDefault();

    if ($('.nav-resp').hasClass('nav-show')) {
      $('.nav-resp').removeClass('nav-show')
      $('.nav-desk').hide(550);
    } else {
      $('.nav-resp').addClass('nav-show')
      $('.nav-desk').show(550);
    }
  });
});
var lastscroll = $(document).scrollTop();

$(window).scroll(function () {
  var scrollPos = $(document).scrollTop();
  if (scrollPos > 1) {
    $('.nav').css("padding", "8px 20px");
  }

  if (scrollPos < lastscroll) {
    $('.nav').css("padding", "30px 20px");
  }

  lastscroll = scrollPos;
});

$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 700);

        if ($('.nav-resp').hasClass('nav-show')) {
          $('.nav-resp').removeClass('nav-show')
          $('.nav-desk').hide(750);
        }
      }
    }
  });
