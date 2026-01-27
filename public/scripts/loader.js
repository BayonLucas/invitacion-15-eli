  var prealoaderOption = $(window);

  prealoaderOption.on("load", function() {

    var preloader = $('.loader');
    var preloaderArea = $('.preloader-area');

    preloader.fadeOut(500);
    preloaderArea.delay(100).fadeOut(500);

    // Detengo animacion loader
    animLoader.destroy();

    // Cargo animacion AOS
    setTimeout(function() {
      AOS.init();
    }, 100);

  });