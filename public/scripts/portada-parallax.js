  if (device == 'mobile' || $(window).width() < 768) {

    // Aceptar webp?
    if (support_format_webp()) {
      var imageParallax = '/portada-mobile.webp';
    } else {
      var imageParallax = '/portada-mobile.jpg';
    }

  } else {

    // Aceptar webp?
    if (support_format_webp()) {
      var imageParallax = '/portada.webp';
    } else {
      var imageParallax = '/portada.jpg';
    }

  }

  $('.portada-picture').parallax({
    imageSrc: _pathProducto + imageParallax
  });
