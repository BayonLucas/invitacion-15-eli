    // Si el ancho es de Telefono
    if ($(window).width() < 768) {

      // Aceptar webp?
      if (support_format_webp()) {
        var imageInstagramParallax = 'img/instagram_mobile.webp';
      } else {
        var imageInstagramParallax = 'img/instagram_mobile.jpg';
      }

    } else {

      // Aceptar webp?
      if (support_format_webp()) {
        var imageInstagramParallax = 'img/instagram.webp';
      } else {
        var imageInstagramParallax = 'img/instagram.jpg';
      }

    }

    $('.instagram').parallax({
      imageSrc: _pathProducto + imageInstagramParallax
    });
