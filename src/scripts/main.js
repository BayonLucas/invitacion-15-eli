import AOS from 'aos';

window._pathApp = "https://localhost/";
window._pathProducto = "/";
window._pathJson = "/json/";
window.fechaCuentaRegresiva = "2026/05/24 21:00:00"; // Formato ISO es más seguro

const userAgent = navigator.userAgent || navigator.vendor || window.opera;
window.device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ? 'mobile' : 'desktop';

window.support_format_webp = function() {
    var elem = document.createElement('canvas');
    return (!!(elem.getContext && elem.getContext('2d'))) && (elem.toDataURL('image/webp').indexOf('data:image/webp') == 0);
};

let imageParallax = '';
let imageInstagramParallax = '';

if (window.device === 'mobile' || window.innerWidth < 768) {
    imageParallax = window.support_format_webp() ? 'portada-mobile.webp' : 'portada-mobile.jpg';
    imageInstagramParallax = window.support_format_webp() ? 'instagram_mobile.webp' : 'instagram_mobile.jpg';
} else {
    imageParallax = window.support_format_webp() ? 'portada.webp' : 'portada.jpg';
    imageInstagramParallax = window.support_format_webp() ? 'instagram.webp' : 'instagram.jpg';
}

// Set the date we're counting down to
var countDownDate = new Date(fechaCuentaRegresiva).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    // document.getElementById("reloj").innerHTML = days + " días " + hours + "hs " +  minutes + "m " + seconds + "s ";

    $("#dias .number").text(days);
    $("#horas .number").text(hours);
    $("#minutos .number").text(minutes);
    $("#segundos .number").text(seconds);

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("reloj").innerHTML = '<p class="fin-cuenta">' +
        lang_textoFinalCuentaRegresiva + '</p>';
        $('.falta').text('');
    }
}, 1000);


  


// 5. Inicialización de Plugins (Aseguramos que el DOM esté listo)
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();

    // Portada Parallax
    // @ts-ignore
    $('.portada-picture').parallax({
        imageSrc: window._pathProducto + imageParallax
    });

    // Instagram Parallax
    // @ts-ignore
    $('.instagram').parallax({
        imageSrc: window._pathProducto + imageInstagramParallax
    });

    // Preloader y AOS
    window.addEventListener('load', function() {
        const $preloader = $('.loader');
        const $preloaderArea = $('.preloader-area');

        $preloader.fadeOut(500);
        $preloaderArea.delay(100).fadeOut(500);

        // Verificamos si animLoader existe antes de intentar destruirlo
        if (window.animLoader) {
            window.animLoader.destroy();
        }

        setTimeout(() => {
            AOS.init({ duration: 1000, once: true });
        }, 100);
    });
});




//Events

$('body').on('click', 'a.modal-regalos', function(e) {
    e.preventDefault();
    $('#modalRegalos').modal({
        backdrop: 'static'
    })
});

$('body').on('click', 'a.modal-como-llegar', function(e) {

    e.preventDefault();

    // Para modelos de 15 años, siempre es Fiesta
    var titleModalMapa = lang_titleModalMapaFiesta;
    var latitud = latitudFiesta;
    var longitud = longitudFiesta;
    var linkMapConfigured = linkMapsFiesta;
    var iframeSrc = '';
    var linkMaps = '';

    // Validar si hay coordenadas válidas
    var coordenadasValidas = (latitud !== 0 && longitud !== 0 && latitud !== null && longitud !== null);

    // Generar URL del iframe siempre con coordenadas
    if(coordenadasValidas) {
    // IFRAME: Siempre usa coordenadas (es la única forma confiable)
    iframeSrc = 'https://www.google.com/maps?q=' + latitud + ',' + longitud + '&output=embed';
    
    // AMPLIAR MAPA: Usa linkMaps si está configurado, sino usa coordenadas
    if(linkMapConfigured != '' && linkMapConfigured != null) {
        linkMaps = linkMapConfigured;
    } else {
        linkMaps = 'https://www.google.com/maps/search/?api=1&query=' + latitud + ',' + longitud;
    }
    } 
    // No hay coordenadas válidas
    else {
    console.warn('No hay coordenadas configuradas para el mapa');
    iframeSrc = 'https://www.google.com/maps?q=0,0&output=embed';
    linkMaps = linkMapConfigured != '' ? linkMapConfigured : 'https://www.google.com/maps';
    }

    // Cambio titulo
    $('#modalMapa .modal-title').text(titleModalMapa);

    // Mostrar loader y ocultar iframe temporalmente
    $('#mapLoader').removeClass('hidden');
    $('#googleMapIframe').css('opacity', '0');

    // Cargo el iframe con la URL generada
    $('#googleMapIframe').attr('src', iframeSrc);

    // Ocultar loader cuando el iframe termine de cargar
    $('#googleMapIframe').off('load').on('load', function() {
    $('#mapLoader').addClass('hidden');
    $('#googleMapIframe').css('opacity', '1');
    });

    // Genero el link para ampliar mapa
    $('.ampliar-mapa').attr('href', linkMaps);

    // Abrir modal
    $('#modalMapa').modal({
    backdrop: 'static'
    });

});

// Resetear loader cuando se cierra el modal
$('#modalMapa').on('hidden.bs.modal', function() {
    $('#mapLoader').removeClass('hidden');
    $('#googleMapIframe').css('opacity', '0');
    $('#googleMapIframe').attr('src', '');
});
  







// Functions
const initializeClassAnimation = function(className, jsonPath) {
    let svgContainer = document.querySelector(className);

    let anim = bodymovin.loadAnimation({
      wrapper: svgContainer,
      animType: 'svg',
      loop: true,
      path: _pathProducto + jsonPath
    });

    anim.play();
}

const initializeAnimations = function() {
    initializeClassAnimation('.anim-instagram', 'json/img_instagram.json');
    initializeClassAnimation('.anim-fiesta', 'json/img_fiesta.json');
    initializeClassAnimation('.anim-regalos', 'json/img_regalo.json');
    initializeClassAnimation('.anim-galeria', 'json/json_camara.json');    
    initializeClassAnimation('.corazon-falta', 'json/corazon-falta.json');    
}