  let svgContainerLoader = document.querySelector('.loader');

  let animLoader = bodymovin.loadAnimation({
    wrapper: svgContainerLoader,
    animType: 'svg',
    loop: true,
    path: _pathProducto + "img/corazon.json"
  });
